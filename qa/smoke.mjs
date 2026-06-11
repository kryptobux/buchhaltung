// Smoke-Test der Buchhaltungs-App (B1).
// Lädt index.html headless (Chromium/Playwright), prüft UI-Rendering, Kernlogik
// (Unit-Checks im Seitenkontext), Buchen inkl. Steuersplit, Journal, SuSa-Summen-
// gleichheit, UStVA, Bilanz-Ausgeglichenheit, Festschreibung und Storno.
// Testdaten nur im frischen Headless-Profil (Mandant "SEED-Smoke") — berührt nie
// echte Browserdaten. Aufruf: node qa/smoke.mjs   → Exit 0 = grün.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const APP = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html')).href;
let fails = 0;
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✅' : '❌'} ${label}${ok || !detail ? '' : ' — ' + detail}`);
  if (!ok) fails++;
};

const browser = await chromium.launch();
const page = await browser.newPage();
page.on('dialog', d => d.accept(d.type() === 'prompt' ? 'SEED-Smoke' : undefined));
await page.goto(APP);

// --- 1. UI-Grundgerüst -----------------------------------------------------
check((await page.locator('nav button[data-testid^="nav-"]').count()) === 8, '8 Tab-Buttons vorhanden');
check((await page.locator('section.tab').count()) === 8, '8 Tab-Sections vorhanden');
check(await page.locator('#tab-buchen.active').isVisible(), 'Buchen-Tab initial aktiv');

// --- 2. Unit-Checks der Kernfunktionen (im Seitenkontext) -------------------
const u = await page.evaluate(() => {
  const r = {};
  r.parse1 = parseBetrag('1.234,56') === 123456;
  r.parse2 = parseBetrag('0,1') === 10;
  r.parse3 = parseBetrag('quatsch') === null && parseBetrag('') === null;
  const v = buchungsZeilen('4801', '1200', 11900, 'VSt19');
  r.vstSplit = v.netto === 10000 && v.steuer === 1900 &&
    JSON.stringify(v.zeilen) === JSON.stringify([{kto:'4801',s:10000,h:0},{kto:'1576',s:1900,h:0},{kto:'1200',s:0,h:11900}]);
  const s = buchungsZeilen('1200', '8300', 10700, 'USt7');
  r.ustSplit = s.netto === 10000 && s.steuer === 700 &&
    s.zeilen.every(z => (z.s + z.h) > 0) && s.zeilen[2].kto === '1771';
  const o = buchungsZeilen('1200', '8110', 100000, '');
  r.ohneSteuer = o.steuer === 0 && o.zeilen.length === 2;
  // Soll=Haben-Invariante für alle drei Fälle
  const sum = z => z.reduce((a, x) => [a[0] + x.s, a[1] + x.h], [0, 0]);
  r.invariante = [v, s, o].every(x => { const [so, ha] = sum(x.zeilen); return so === ha; });
  r.eur = eurTxt(123456) === '1.234,56';
  return r;
});
for (const [k, ok] of Object.entries(u)) check(ok, `Unit: ${k}`);

// --- 3. SEED-Mandant anlegen ------------------------------------------------
await page.getByTestId('mandant-neu').click();
check(await page.getByTestId('mandant-select').locator('option:checked').textContent() === 'SEED-Smoke',
  'SEED-Mandant angelegt und aktiv');

// --- 4. Buchen: Eingangsrechnung mit 19 % VSt --------------------------------
const buche = async (text, betrag, steuer, soll, haben) => {
  await page.getByTestId('buchen-text').fill(text);
  await page.getByTestId('buchen-betrag').fill(betrag);
  await page.getByTestId('buchen-steuer').selectOption(steuer);
  await page.getByTestId('buchen-soll').fill(soll);
  await page.getByTestId('buchen-haben').fill(haben);
  await page.getByTestId('buchen-speichern').click();
  return page.getByTestId('buchen-msg').getAttribute('class');
};
check((await buche('SEED-Handwerker', '119,00', 'VSt19', '4801', '1200')).includes('ok'),
  'Buchung 1 (4801 an 1200, VSt19) gespeichert');
check((await buche('SEED-Miete', '1.000,00', '', '1200', '8110')).includes('ok'),
  'Buchung 2 (1200 an 8110, steuerfrei) gespeichert');
check(await page.getByTestId('letzte-buchungen').textContent().then(t => t.includes('SEED-Handwerker') && t.includes('SEED-Miete')),
  'Beide Buchungen unter „Letzte Buchungen"');

// --- 5. Journal ---------------------------------------------------------------
await page.getByTestId('nav-journal').click();
const jTxt = await page.getByTestId('journal-tabelle').textContent();
check(jTxt.includes('SEED-Handwerker') && jTxt.includes('119,00') && jTxt.includes('1.000,00'),
  'Journal zeigt beide Buchungen mit Beträgen');

// --- 6. SuSa: Summengleichheit Soll = Haben ----------------------------------
const jahr = new Date().getFullYear();
await page.getByTestId('nav-susa').click();
await page.fill('#sVon', `${jahr}-01-01`);
await page.fill('#sBis', `${jahr}-12-31`);
await page.locator('#tab-susa button', { hasText: 'Anzeigen' }).click();
const susaTxt = await page.getByTestId('susa-tabelle').textContent();
// Perioden-Soll = Perioden-Haben = 119,00 + 1.000,00 = 1.119,00 (je einmal in der Summenzeile)
check((susaTxt.match(/1\.119,00/g) || []).length >= 2, 'SuSa-Summen Soll = Haben = 1.119,00',
  `gefunden: ${(susaTxt.match(/1\.119,00/g) || []).length}×`);
check(susaTxt.includes('4801') && susaTxt.includes('1576') && susaTxt.includes('8110'),
  'SuSa enthält Aufwands-, Vorsteuer- und Erlöskonto');

// --- 7. UStVA: Vorsteuer Kz 66 ------------------------------------------------
await page.getByTestId('nav-ustva').click();
await page.locator('#tab-ustva button', { hasText: 'Berechnen' }).click();
const uTxt = await page.locator('#ustvaTabelle').textContent();
check(uTxt.includes('66') && uTxt.includes('19,00'), 'UStVA zeigt Kz 66 mit 19,00 VSt');

// --- 8. Bilanz ausgeglichen -----------------------------------------------------
await page.getByTestId('nav-abschluss').click();
await page.locator('#tab-abschluss button', { hasText: 'Anzeigen' }).click();
const bTxt = await page.locator('#bilanzTabelle').textContent();
// Aktiva: 1200 (881,00) + 1576 (19,00) = 900,00 · Passiva: Bilanzergebnis 900,00
check((bTxt.match(/900,00/g) || []).length >= 2, 'Bilanz ausgeglichen (Aktiva = Passiva = 900,00)',
  `gefunden: ${(bTxt.match(/900,00/g) || []).length}×`);

// --- 9. Festschreibung blockiert Buchung + Storno funktioniert ------------------
await page.getByTestId('nav-extras').click();
await page.getByTestId('fest-datum').fill(new Date().toISOString().slice(0, 10));
await page.getByTestId('fest-button').click(); // confirm wird akzeptiert
await page.getByTestId('nav-buchen').click();
check((await buche('SEED-Nachzügler', '10,00', '', '4910', '1200')).includes('err'),
  'Buchung im festgeschriebenen Zeitraum wird abgelehnt');
// Storno der festgeschriebenen Buchung 1
await page.locator('#letzteBuchungen tr', { hasText: 'SEED-Handwerker' }).locator('button[title="Storno"]').click();
const lTxt = await page.getByTestId('letzte-buchungen').textContent();
check(lTxt.includes('Storno-Beleg') && lTxt.includes('storniert'),
  'Storno erzeugt Gegenbuchung, Original als storniert markiert');

await page.evaluate(() => localStorage.clear()); // Hygiene (Profil ist ohnehin flüchtig)
await browser.close();

console.log(fails === 0 ? '\nSMOKE GRÜN (alle Checks bestanden)' : `\nSMOKE ROT: ${fails} Check(s) fehlgeschlagen`);
process.exit(fails === 0 ? 0 : 1);

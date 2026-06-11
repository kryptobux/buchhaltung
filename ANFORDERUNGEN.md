# Anforderungen an die Buchhaltungs-App — Recherche, Gap-Analyse, Plan

Stand 2026-06-11. Quellen: Primärrecherche (gesetze-im-internet.de, developer.datev.de,
BMF-Schreiben, DATEV-Hilfe) + vollständige Code-Analyse von `index.html` (939 Zeilen).
Anwendungsfall: VV-Immobilien-GmbH (steuerfreie Vermietung § 4 Nr. 12 UStG) + Holding-GmbH,
beide bilanzierend, ~10–50 Buchungen/Monat, Selbstbuchung.

## Zentrale Recherche-Befunde

- **GoBD aktuell** = BMF v. 28.11.2019, geändert 11.03.2024 und 14.07.2025 (E-Rechnung, Datenzugriff).
- **Aufbewahrung:** Buchungsbelege 8 Jahre (BEG IV, § 147 Abs. 3 AO verifiziert), Bücher/Jahresabschlüsse weiterhin 10 Jahre.
- **Festschreibung spätestens bis Ablauf des Folgemonats** (GoBD Tz 58) — nicht erst zum Jahresabschluss.
- **UStVA-Befreiung** seit 2025 bei Vorjahres-Zahllast ≤ 2.000 € (§ 18 Abs. 2 S. 3 UStG) → bei rein steuerfreier Vermietung per FA-Bescheid üblich.
- **E-Bilanz:** unverdichteter Kontennachweis (Salden je Konto) ab WJ 2025 Pflicht (JStG 2024); Taxonomie 6.9 ab WJ 2026.
- ⚠️ **Holding evtl. keine Kleinstkapitalgesellschaft** (§ 267a Abs. 3 Nr. 3 HGB schließt reine Beteiligungsverwalter aus) → dann Offenlegung statt Hinterlegung.
- **E-Rechnungs-Empfangspflicht** seit 1.1.2025 auch für steuerfrei vermietende GmbHs; XML-Original aufbewahren.

## A) Anforderungskatalog

Einstufung gilt für DIESEN Anwendungsfall. Status: ✅ erfüllt · 🟡 teilweise · ❌ fehlt · ➖ außerhalb der App (organisatorisch/StB).

| ID | Anforderung | Kat. | Stufe | Status (Beleg im Code) |
|----|-------------|------|-------|------------------------|
| A01 | Doppelte Buchführung mit Journal- und Kontenfunktion | HGB | MUSS | ✅ Journal/SuSa (`renderJournal`, `renderSusa`) |
| A02 | Keine Buchung ohne Beleg; Belegnr. eindeutig, jahresbezogen | GoBD | MUSS | 🟡 Belegnr. optional, nicht eindeutig, Zähler resettet nie, Jahr aus Systemdatum statt Buchungsdatum (`belegVorschlag` Z.456) |
| A03 | Progressive/retrograde Prüfbarkeit Beleg↔Journal↔Konto↔Bilanz | GoBD | MUSS | 🟡 Journal→SuSa→Bilanz ja; Verknüpfung zur Belegdatei fehlt (A14) |
| A04 | Festschreibung: danach weder löschbar noch änderbar | GoBD | MUSS | 🟡 vorhanden (`festschreiben` Z.818), aber **Import hebelt sie aus** (`importJson` Z.835), Kontenplan-Änderung wirkt rückwirkend |
| A05 | Festschreibung spätestens Ablauf Folgemonat | GoBD | MUSS | ➖ organisatorisch; App kann es, erinnert aber nicht |
| A06 | Korrektur nach Festschreibung nur per Storno mit Verweis | GoBD | MUSS | 🟡 Storno vorhanden (`storno` Z.460), aber **Storni selbst editier-/löschbar** (Guard Z.483 prüft nur fest/storniert) |
| A07/A08 | Zeitgerechte Erfassung (unbar ≤10 Tage, kreditorisch ≤8) | GoBD | MUSS | ➖ organisatorisch (Verfahrensdoku) |
| A09 | Erfassungsdatum getrennt vom Belegdatum speichern | GoBD | SOLL | 🟡 nur `erstellt`, kein `geaendert` (Z.438) |
| A10 | Audit-Trail für Änderungen an Buchungen + Stammdaten | GoBD | MUSS | ❌ `bearbeiten` überschreibt in-place (Z.433), `loeschen` spurlos (Z.474), Kontenplan ohne Protokoll |
| A11 | Verfahrensdokumentation (4 Teile) | GoBD | MUSS | ❌ fehlt |
| A12 | Z3-Export: maschinell auswertbar (CSV + index.xml Beschreibungsstandard) | GoBD | MUSS | 🟡 CSV-Journal ja (Z.585), index.xml/Vollexport fehlt |
| A13 | Verfügbarkeit 10 J. (Bücher) / 8 J. (Belege), lesbar, auswertbar | GoBD | MUSS | 🟡 JSON+CSV-Export ja; hängt an Backup-Disziplin (A16) |
| A14 | Beleg↔Buchung-Verknüpfung (Dateiname/Link) | GoBD | MUSS | ❌ kein Belegfeld-Bezug zur Datei in `belege/` |
| A15 | E-Rechnung: XML-Original unverändert aufbewahren | GoBD | MUSS | ➖ Belegablage außerhalb der App; in Verfahrensdoku regeln |
| A16 | Datensicherheit: localStorage allein genügt NICHT | Technik | MUSS | 🟡 Backup-Banner ab 7 Tagen (Z.904); aber korrupter Storage → stiller Seed-Reset (Z.364–368), Multi-Tab last-write-wins, kein Quota-Handling |
| A17 | Hash-Kette über festgeschriebene Buchungen als Unveränderbarkeitsnachweis | Technik | SOLL | ❌ fehlt |
| A18 | Versionierte Backups + dokumentierter Restore-Test | Technik | SOLL | 🟡 Export ja, Versionierung/Prozess fehlt |
| A19 | Mandantentrennung | Funktion | MUSS | ✅ (`mandanten[]`, getrennte Buchungskreise) |
| A20 | Bilanz + GuV nach HGB, EB-Werte mit Bilanzidentität | HGB | MUSS | ✅ (`renderAbschluss` Z.715, Konto 9000, Ausgeglichenheitsprüfung) |
| A21 | Inventar/Bestandsnachweise (Anlagenverzeichnis) | HGB | MUSS | ❌ keine Anlagenverwaltung (AfA manuell — dokumentieren) |
| A22 | SuSa je Periode | Funktion | MUSS | ✅ (`renderSusa` Z.597) |
| A23 | Kleinst-Erleichterungen (verkürzte Bilanz/GuV) | HGB | SOLL | 🟡 eigene Gliederung, keine §-266/275-Schemata |
| A24/A25 | Aufstellung ≤6 Mon., Offenlegung ≤12 Mon. | HGB | ➖ | organisatorisch |
| A26 | Holding: Kleinst-Status prüfen (§ 267a Abs. 3 Nr. 3 HGB) | HGB | MUSS | ➖ **Steuerberater-Frage** |
| A27 | Getrennte Erlöskonten steuerfrei/steuerpflichtig | Steuer | MUSS | ✅ (8110 steuerfrei in `KONTEN_VORLAGE`) |
| A28 | Bruttobuchung bei steuerfreier Vermietung (kein VSt-Abzug) | Steuer | MUSS | 🟡 möglich, aber kein Warnhinweis bei VSt-Schlüssel im VV-Mandanten |
| A29 | UStVA-Modul | Steuer | KANN | ✅ vorhanden (Kz 41/48/81/86/66/83) — Befreiung beantragen |
| A30 | Saldenexport je Konto (E-Bilanz-Kontennachweis, Pflicht ab WJ 2025) | Steuer | MUSS | ❌ SuSa nur als HTML, kein CSV-Export |
| A31 | E-Bilanz-Übermittlung (XBRL 6.9) | Steuer | MUSS (extern) | ➖ via myebilanz/StB; App liefert A30 |
| A32 | Einfache Anlagenverwaltung + AfA-Plan | Steuer | SOLL | ❌ fehlt (manuelle AfA-Buchung dokumentiert in BUCHHALTUNG.md) |
| A33 | Kontentrennung f. erweiterte GewSt-Kürzung (§ 9 Nr. 1 GewStG) | Steuer | SOLL | 🟡 Konten frei anlegbar; Auswertung je Ertragsart fehlt |
| A34 | Holding-Konten f. § 8b-Sachverhalte | Steuer | SOLL | ✅ 2600 Beteiligungserträge vorhanden |
| A35 | Verrechnungskonten Holding↔Tochter↔GF | Steuer | SOLL | 🟡 Konten anlegbar; Disziplin/Verfahrensdoku |
| A36–A41 | DATEV EXTF valide: Formatversion 13, Encoding ISO-8859-1 oder UTF-8 **mit BOM**, S/H-Kennzeichen, TTMM, Generalumkehr für Storni, Festschreibekennzeichen, keine BU auf Automatikkonten, SKL = Kanzlei-Konfig | DATEV | MUSS | ❌ Formatversion 12, UTF-8 ohne BOM, immer „S", **Storno-Asymmetrie** (Original gefiltert Z.854, Gegenbuchung bleibt), Festschreib-Kz 0 |
| A42 | Bank-Import CSV/CAMT mit Duplikatserkennung | Funktion | SOLL | ❌ fehlt |
| A43 | Wiederkehrende Buchungen als Vorlagen | Funktion | SOLL | 🟡 nur „Buchung kopieren" |
| A44–A47 | OPOS, BWA, Kassenbuch, ELSTER-API | Funktion | KANN | BWA ✅; Rest bewusst weggelassen (bar-frei arbeiten!) |

## B) Zusätzliche Befunde aus der Code-Analyse (nicht im Katalog)

| # | Befund | Schwere |
|---|--------|---------|
| K1 | UStVA summiert nur Buchungen MIT Steuerschlüssel — Direktbuchungen auf 8400/1776 fehlen in der UStVA, stehen aber in der Bilanz (`renderUstva` Z.685) | Korrektheit |
| K2 | XSS über manipuliertes Import-JSON: `b.soll/haben/key` ungeprüft in HTML (`buchungZeile` Z.557) | Sicherheit |
| K3 | Storno per Konsole auf Storno-Belege möglich (Guard prüft `stornoVon` nicht, Z.462); `festschreiben` akzeptiert Zukunftsdaten (irreversibel) | Korrektheit |
| K4 | CSV-Journal quotet nur `text` — Semikolon im Belegfeld zerschießt Zeilen (Z.590) | Klein |
| K5 | Schemafeld `version:1` existiert, wird aber nie geprüft/migriert (Z.366) | Technik |
| K6 | Positiv: Cent-Integer-Arithmetik durchgängig, Soll=Haben konstruktiv garantiert, Storno-Umdatierung bei festen Buchungen korrekt | — |

## C) Häufige Irrtümer (Kurzfassung)

1. „GoBD-zertifizierte Software" existiert nicht — entscheidend ist das Gesamtverfahren inkl. Verfahrensdoku. Eigenbau ist zulässig.
2. Festschreibung erst beim Jahresabschluss ist zu spät (Folgemonat!).
3. Steuerfrei vermietet ≠ keine USt-Pflichten — Befreiung nur per FA-Bescheid.
4. PDF-Journal genügt dem Betriebsprüfer nicht (Z3 = CSV + index.xml).
5. DATEV-Importe scheitern typisch an Encoding/BOM, Sachkontenlänge, BU auf Automatikkonten, Belegdatum außerhalb Stapelperiode.
6. Offenlegung (Unternehmensregister) und E-Bilanz (Finanzamt) sind zwei getrennte Pflichten.

## D) Fragen an den Steuerberater (Operator)

1. UStVA-/USt-Jahreserklärungs-Befreiung beantragen? Neue Kleinunternehmerregelung (§ 19 UStG n.F.) anwendbar?
2. Gefährden Nebeneinnahmen die erweiterte GewSt-Kürzung (§ 9 Nr. 1 S. 2 GewStG)?
3. Holding: Kleinstkapitalgesellschaft ja/nein (§ 267a Abs. 3 Nr. 3 HGB) → Offenlegungsumfang?
4. USt-Organschaft Holding/Tochter prüfen; Verrechnungskonten/vGA-Risiko.
5. E-Bilanz-Prozess: Wer übermittelt, Mapping SKR03→Taxonomie 6.9, Kontennachweis ab WJ 2025.

## E) Umsetzungsplan (Vorschlag)

**Leitlinie:** Erst testbar machen, dann die GoBD-MUSS-Lücken schließen (vor produktiver
Nutzung!), dann Export-Korrektheit, dann Komfort. Bis Phase 1 fertig ist: **Buchen ok,
aber JSON-Import nicht benutzen** (hebelt Festschreibung aus).

### Phase 0 — Testfundament
- B1 QA-Grundgerüst: Playwright-Smoke + data-testid + Unit-Harness für Kernfunktionen (absorbiert B6)

### Phase 1 — GoBD-Härtung (alle MUSS)
- B7 Import-Schutz: Import darf Festschreibung/feste Buchungen nie abschwächen; Feld-Validierung + Sanitizing (fixt auch K2/XSS); korrupten Storage sichern statt still ersetzen [A04, A16]
- B8 Audit-Trail: append-only Änderungs-/Löschprotokoll für Buchungen + Kontenplan, `geaendert`-Zeitstempel [A10, A09]
- B9 Storno-Härtung: Storni unveränderlich, Guards (`stornoVon`), DATEV-Generalumkehr-Kennzeichnung, Journal-Summe korrigieren [A06, K3]
- B10 Belegnummern: Jahr aus Buchungsdatum, Zähler je Jahr, Eindeutigkeitsprüfung, Pflichtfeld [A02]
- B11 Kontenplan-Schutz: Typ/Gruppe/UStKz bebuchter Konten sperren, Löschen serverseitig prüfen [A04/A10]
- B2′ Persistenz-Härtung: Schemaversion aktiv prüfen + Migrationskette, Multi-Tab-Guard (storage-Event), Quota-Fehlerbehandlung [A16, K5]
- B12 Hash-Kette über festgeschriebene Buchungen + Prüf-Button [A17]

### Phase 2 — Exporte & Steuer-Korrektheit
- B13 DATEV-Export v2: Formatversion 13, BOM, S/H-Logik, Storno-Symmetrie, Festschreib-Kz, SKL konfigurierbar [A36–A41]
- B14 GoBD-Z3-Exportpaket: Vollexport CSV + index.xml (Beschreibungsstandard) [A12]
- B15 SuSa-/Saldenexport als CSV (E-Bilanz-Kontennachweis) [A30]
- B16 UStVA kontenbasiert prüfen: Warnung bei Direktbuchungen auf Steuer-/Erlöskonten ohne Schlüssel; VSt-Warnung im VV-Mandanten [K1, A28]

### Phase 3 — Betrieb & Komfort
- B4′ Verfahrensdokumentation (4 Teile nach GoBD Tz 151 ff., inkl. E-Rechnungs-Ablage, Backup-/Restore-Prozess, Belegablage-Konvention `belege/<Jahr>/<BelegNr>_<Name>.pdf`) [A11, A14, A15, A18]
- B18 Belegfeld → Dateiname-Verknüpfung in der Buchungsmaske [A14]
- B19 Buchungsvorlagen (wiederkehrende Mieten/Raten) [A43]
- B20 Bank-CSV-Import mit Duplikatserkennung [A42]
- B3 Pages-Deploy-Beweis (nach Pages-Aktivierung)

Bewusst NICHT geplant: OPOS, Kassenbuch (bar-frei arbeiten), ELSTER-API (manuelle Übertragung reicht; ggf. Befreiung), OCR, In-App-E-Bilanz, Mehrbenutzer (architekturbedingt).

**Update 2026-06-11:** Funktions-Benchmark über 8 Marktprodukte → [FUNKTIONEN.md](FUNKTIONEN.md).
Konsequenzen: B18 (Beleg-Verknüpfung) und B19 (Buchungsvorlagen) in Phase 2 hochgestuft;
neu B21 (Anlagenspiegel light + AfA-Automatik, revidiert die A32-Entscheidung) und
B22 (E-Rechnungs-Ablage/Viewer). Bemerkenswert: Bilanz + Mandantenfähigkeit des Eigenbaus
bieten 6 von 8 Marktprodukten nicht bzw. nur gegen Doppellizenz.

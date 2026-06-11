# KANBAN

Regeln: WIP max. 1–2 pro Session · eine Karte = eine Aufgabe = ein Commit (Hash auf die Karte) · Befunde sofort als Karte mit Beleg. Anforderungs-IDs (A…/K…) → [ANFORDERUNGEN.md](ANFORDERUNGEN.md).

> ⚠️ Bis Phase 1 abgeschlossen: produktiv buchen ok, aber **JSON-Import nicht benutzen** (hebelt Festschreibung aus, B7).

## 📥 Backlog (priorisiert)

### Phase 0 — Testfundament

#### B1 — QA-Grundgerüst: Playwright-Smoke + data-testid + Unit-Harness
`qa/smoke.*`: lädt `index.html` headless, prüft Tab-Rendering, legt im SEED-Mandanten Testbuchung an (Soll=Haben im Journal), SuSa-Summengleichheit, räumt auf. `data-testid` an Tabs/Buchen-Form/Journal. Dazu `qa/unit.mjs` für reine Funktionen (parseBetrag, buchungsZeilen-Splitlogik, Rundung). Exit 0 = grün. (absorbiert Alt-B6)
**Akzeptanz:** beide Skripte lokal grün; Doku im Kopf. **Pfade:** `qa/`, `index.html` [QA]

### Phase 1 — GoBD-Härtung (vor produktiver Vollnutzung)

#### B7 — Import-Schutz + Sanitizing [A04, A16, K2]
`importJson` darf Festschreibung/feste Buchungen nie abschwächen (Abgleich mit Bestand, sonst Abbruch mit Begründung); Feld-Validierung + Escaping aller importierten Werte (fixt XSS K2); korrupter localStorage wird als `*.korrupt.json`-Download gerettet statt still durch Seed ersetzt.
**Akzeptanz:** Import eines Alt-Backups gegen festgeschriebenen Bestand bricht ab (Beweis im Smoke); XSS-Payload im Backup rendert als Text. **Pfade:** `index.html` (`importJson`, Z.835 ff.) [App]

#### B8 — Audit-Trail [A10, A09]
Append-only Protokoll je Mandant: Änderung/Löschung nicht-festgeschriebener Buchungen (vorher/nachher), Kontenplan-Änderungen; Buchung erhält `geaendert`-Zeitstempel. Anzeige im Extras-Tab, Export im JSON-Backup enthalten.
**Akzeptanz:** bearbeiten/löschen erzeugt Protokolleintrag (Smoke-Beweis). **Pfade:** `index.html` (`bearbeiten` Z.433, `loeschen` Z.474, `kontoSpeichern` Z.787) [App]

#### B9 — Storno-Härtung [A06, K3]
Storno-Buchungen (`stornoVon` gesetzt) sind unveränderlich (kein bearbeiten/löschen/erneutes storno); `festschreiben` lehnt Zukunftsdaten ab; Journal-Bruttosumme zählt Storno-Paare nicht doppelt.
**Akzeptanz:** Guards greifen auch bei Konsolen-Aufruf; Smoke-Fall Storno→Edit verweigert. **Pfade:** `index.html` (`storno` Z.460, Guards Z.476/483, `festschreiben` Z.818) [App]

#### B10 — Belegnummern jahresbezogen + eindeutig [A02]
Vorschlag nutzt Jahr des BUCHUNGSdatums; Zähler je Mandant+Jahr; Eindeutigkeitsprüfung beim Speichern; Belegnr. Pflichtfeld.
**Akzeptanz:** Januar-Buchung fürs Vorjahr bekommt Vorjahres-Präfix; Duplikat wird abgelehnt. **Pfade:** `index.html` (`belegVorschlag` Z.456, `buchungSpeichern` Z.415) [App]

#### B11 — Kontenplan-Schutz [A04, A10]
Typ/Gruppe/UStVA-Kz bebuchter Konten nicht änderbar (nur Name); `kontoLoeschen` prüft Benutzung selbst (nicht nur UI); Änderungen landen im Audit-Trail (B8).
**Akzeptanz:** Änderung an bebuchtem Konto verweigert; Smoke-Beweis. **Pfade:** `index.html` (`kontoSpeichern` Z.787, `kontoLoeschen` Z.804) [App]

#### B2′ — Persistenz-Härtung [A16, K5]
`version` aktiv prüfen + Migrationskette (v1→vN); Multi-Tab-Guard per `storage`-Event (Warnung + Reload statt Last-write-wins); `speichern()` mit Quota-Fehlerbehandlung und Nutzerwarnung.
**Akzeptanz:** Alt-Daten laden fehlerfrei + werden gestempelt; Zwei-Tab-Szenario verliert keine Buchung (manueller Beweis). **Pfade:** `index.html` (Load Z.363, `speichern` Z.369) [App]

#### B12 — Hash-Kette für festgeschriebene Buchungen [A17]
Bei Festschreibung SHA-256-Kette über die festgeschriebenen Buchungen (Vorgänger-Hash einbezogen); „Integrität prüfen"-Button im Extras-Tab; Hashes im JSON-Backup.
**Akzeptanz:** Manipulation einer festen Buchung (via Konsole) wird vom Prüf-Button erkannt. **Pfade:** `index.html` (`festschreiben` Z.818, `renderExtras`) [App]

### Phase 2 — Exporte & Steuer-Korrektheit

#### B13 — DATEV-Export v2 [A36–A41]
Formatversion 13, UTF-8 MIT BOM (oder ISO-8859-1), korrektes S/H-Kennzeichen statt immer „S", Storno-Symmetrie (Original + Gegenbuchung oder Generalumkehr-Kz), Festschreibekennzeichen aus App-Zustand, Sachkontenlänge/Berater-/Mandantennr. konfigurierbar, keine BU-Schlüssel auf Automatikkonten.
**Akzeptanz:** Validierung gegen developer.datev.de-Spezifikation; Testdatei für StB-Testimport. **Pfade:** `index.html` (`exportDatev` Z.850) [App][Export]

#### B14 — GoBD-Z3-Exportpaket [A12]
Vollexport: Buchungen+Konten+Mandantenstammdaten als CSV mit Kopfzeilen + `index.xml` nach Beschreibungsstandard (IDEA-auswertbar), als ZIP-Download.
**Akzeptanz:** index.xml validiert gegen Beschreibungsstandard-Schema. **Pfade:** `index.html` [App][Export]

#### B15 — SuSa-/Saldenexport CSV [A30]
SuSa als CSV (E-Bilanz-Kontennachweis, Pflicht ab WJ 2025): Konto, Bezeichnung, EB, Soll, Haben, Saldo je Geschäftsjahr.
**Akzeptanz:** Export stimmt mit SuSa-Anzeige überein. **Pfade:** `index.html` (`renderSusa` Z.597) [App][Export]

#### B16 — UStVA-/Steuer-Plausibilität [K1, A28]
Warnung in der UStVA bei Direktbuchungen auf Erlös-/Steuerkonten ohne Steuerschlüssel; Hinweis beim Buchen mit VSt-Schlüssel im VV-Mandanten (kein VSt-Abzug bei steuerfreier Vermietung § 15 Abs. 2 UStG).
**Akzeptanz:** beide Warnfälle im Smoke nachgestellt. **Pfade:** `index.html` (`renderUstva` Z.666, `buchungSpeichern`) [App]

### Phase 3 — Betrieb & Komfort

#### B4′ — Verfahrensdokumentation [A11, A14, A15, A18]
`VERFAHRENSDOKUMENTATION.md`, 4 Teile (GoBD Tz 151 ff.): allgemein, Anwender, Technik, Betrieb. Inkl. Belegablage `belege/<Jahr>/<BelegNr>_<Name>.pdf`, E-Rechnungs-XML-Aufbewahrung, Backup-/Restore-Prozess mit Restore-Test.
**Akzeptanz:** Entwurf vollständig, User-Review angefordert. [Doku]

#### B18 — Beleg↔Buchung-Verknüpfung [A14]
Optionales Feld „Belegdatei" je Buchung (Dateiname in `belege/`); Anzeige im Journal.
**Pfade:** `index.html` [App]

#### B19 — Buchungsvorlagen [A43]
Wiederkehrende Buchungen (Miete, Hausgeld, Darlehensrate) als benannte Vorlagen mit 1-Klick-Übernahme.
**Pfade:** `index.html` [App]

#### B20 — Bank-CSV-Import [A42]
CSV-Import (Spalten-Mapping) mit Duplikatserkennung, Vorschlag von Gegenkonten aus Historie.
**Pfade:** `index.html` [App]

#### B3 — Pages-Deploy-Beweis + Versionsmarker
Versionsmarker in `index.html` + `qa/deploy-check.ps1` grept ihn über HTTP von der Pages-URL. **Voraussetzung:** Pages aktiv (Operator). [Ops]

## 🔨 In Arbeit

*(leer — wartet auf Freigabe des Plans aus ANFORDERUNGEN.md §E)*

## 🐞 Kaputt-Klären

#### K1 — UStVA ignoriert Direktbuchungen ohne Steuerschlüssel
Kz 81/86/66 summieren nur `b.key`-Buchungen (`renderUstva` Z.685) → Bilanz und UStVA können auseinanderlaufen. Fix in B16. [Korrektheit]

#### K2 — XSS über Import-JSON
`b.soll/haben/key` ungeprüft in HTML (`buchungZeile` Z.557); Angriffsvektor manipuliertes Backup. Fix in B7. [Sicherheit]

#### K4 — CSV-Journal: Belegfeld ungequotet
Semikolon im Belegfeld zerschießt CSV-Zeilen (`exportJournalCsv` Z.590). Quick-Fix bei nächster Journal-Arbeit. [Klein]

## ✅ Läuft

### 2026-06-11 — Recherche & Plan
- **Anforderungs-Recherche + Ist-Analyse** (2 parallele Subagenten): 47 Anforderungen mit MUSS/SOLL/KANN + Quellen, 12 Code-Befunde mit Zeilen-Belegen → [ANFORDERUNGEN.md](ANFORDERUNGEN.md); Backlog auf Phasen 0–3 umgestellt. Commit: siehe `git log`.

### 2026-06-11 — Setup
- **App + Doku aus kryptobux/Schach übernommen** (buchhaltung.html → index.html, BUCHHALTUNG.md), Erst-Commit `efe084d`.
- **Arbeitssystem aufgesetzt:** CLAUDE/STATE/KANBAN/DECISIONS/ARCHITECTURE, Commands, .gitignore. Commit `8066fa2`.

# ARCHITECTURE — Bausteinkarte

Die gesamte App lebt in `index.html` (Vanilla JS, ~50 KB). „Code-Pfad" = Funktions-/Konstantennamen im `<script>`-Block. KANBAN-Tags referenzieren die Baustein-Namen.

| Baustein | Zweck | Code-Pfad (index.html) |
|---|---|---|
| Persistenz | localStorage-Laden/Speichern, Mandantenobjekt, JSON-Backup/Restore | `LS_KEY`, `speichern`, `exportJson`, `importJson` |
| Stammdaten | Kontenplan-Vorlage (~75 SKR03-Konten), Steuerschlüssel, BWA-Kategorien, Bilanzgruppen | `KONTEN_VORLAGE`, `STEUER`, `BWA_KAT`, `GRUPPEN` |
| Mandanten | Mehrere Gesellschaften anlegen/umbenennen/löschen | `mandantNeu`, `mandantNeuObj`, `mandantUmbenennen`, `mandantLoeschen` |
| Buchen | Buchungserfassung mit Steuer-Splitlogik, Belegnr.-Vorschlag, Kopieren, Bearbeiten, Storno | `buchungsZeilen`, `buchungSpeichern`, `belegVorschlag`, `kopieren`, `storno`, `renderBuchenForm` |
| Journal | Filterbare Buchungsliste, CSV-Export, Druck | `renderJournal`, `tabelleBuchungen`, `exportJournalCsv` |
| SuSa | Summen-/Saldenliste mit EB-Salden je Zeitraum | `renderSusa`, `bewegungen`, `saldo`, `vortag` |
| BWA | Monatsspalten, Betriebs-/Finanzergebnis | `renderBwa` |
| UStVA | Kennzahlen (81/86/66/83 …) je Monat/Quartal/Jahr, ELSTER-Abrundung | `renderUstva` |
| Abschluss | GuV + Bilanz zum Stichtag mit Ausgeglichenheits-Prüfung | `renderAbschluss` |
| Konten | Kontenplan ansehen/erweitern/bearbeiten | `renderKonten`, `kontoSpeichern`, `kontoBearbeiten`, `kontoLoeschen` |
| GoBD | Festschreibung (danach nur Storno), Backup-Erinnerung | `festschreiben`, `backupBanner` |
| Export | DATEV-Buchungsstapel EXTF (Beta), Datei-Download | `exportDatev`, `download` |
| UI-Gerüst | Tab-Navigation, Formular-Rendering, Format-Helfer (EUR, Datum) | `zeigeTab`, `initUI`, `eur`, `dDE`, `parseBetrag` |

## Umfeld

| Baustein | Zweck | Pfad |
|---|---|---|
| Fach-Doku | GoBD-Pflichten, Schnellstart, Grenzen | `BUCHHALTUNG.md` |
| QA | Smoke-/Unit-/Deploy-Checks (geplant, B1/B3/B6) | `qa/` |
| Legacy-Skills | Buchhaltungsbutler-Browser-Automation (Alt-Workflow) | `.claude/skills/buchen-*` |
| Echtdaten (lokal) | Belege & Buchungsprotokoll — git-ignoriert, vertraulich | `belege/`, `buchungen.csv` |

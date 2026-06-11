# KANBAN

Regeln: WIP max. 1–2 pro Session · eine Karte = eine Aufgabe = ein Commit (Hash auf die Karte) · Befunde sofort als Karte mit Beleg.

## 📥 Backlog (priorisiert)

### B1 — QA-Grundgerüst: Playwright-Smoke + data-testid
Smoke-Skript `qa/smoke.py` (oder .mjs): lädt `index.html` headless, prüft dass alle
Tabs rendern, legt im SEED-Mandanten eine Testbuchung an (Soll=Haben, Journal zeigt sie),
prüft SuSa-Summengleichheit, räumt auf. Exit 0 = grün.
Dabei `data-testid` an zentrale UI-Elemente (Tabs, Buchen-Form, Speichern-Button, Journal-Tabelle).
**Akzeptanz:** Skript läuft lokal gegen `index.html` durch; Doku im Skript-Kopf. **Pfade:** `qa/`, `index.html` [App][QA]

### B2 — localStorage-Schemaversion + Migrationsgerüst
Datenobjekt bekommt `schemaVersion`; beim Laden Migrationskette (v0→v1 = Bestandsdaten
ohne Version übernehmen). Schützt Echtdaten des Users bei künftigen App-Updates.
**Akzeptanz:** Alt-Daten (ohne Version) laden fehlerfrei; Version wird gestempelt; Beweis per Browser-Test. **Pfade:** `index.html` (Persistenz) [App]

### B3 — Pages-Deploy-Beweis + Versionsmarker
Versions-/Build-Marker in `index.html` (Kommentar + sichtbar im Extras-Tab);
`qa/deploy-check.ps1`: grept Marker über HTTP von der Pages-URL.
**Voraussetzung:** Operator-Aktion „Pages aktivieren". **Akzeptanz:** Skript meldet deployte Version. **Pfade:** `index.html`, `qa/` [Ops]

### B4 — Verfahrensdokumentation (GoBD) als Entwurf
`VERFAHRENSDOKUMENTATION.md` (1–2 Seiten): wie wird gebucht, gesichert, festgeschrieben;
Belegablage-Konvention (`belege/<Jahr>/<BelegNr>_<Name>.pdf` ↔ Belegnummer in der App).
**Akzeptanz:** Entwurf liegt vor, User-Review angefordert. [Doku]

### B5 — DATEV-Export (Beta) härten
EXTF-Export gegen DATEV-Formatdoku prüfen (Pflichtfelder, Encoding, Festschreibungs-Kz);
Testdatei für Steuerberater-Testimport erzeugen.
**Akzeptanz:** Export einer SEED-Buchungsliste validiert gegen Formatspezifikation; offene Punkte als Karten. **Pfade:** `index.html` (`exportDatev`) [App][Export]

### B6 — Kernlogik testbar machen
Buchungs-/Steuer-/Splitlogik in `<script>`-Block so strukturieren, dass sie per Node
ohne Browser testbar ist (reine Funktionen); Mini-Testsuite `qa/unit.mjs`
(Splitbuchung 19 %/7 %, Rundung, SuSa-Invariante Soll=Haben).
**Akzeptanz:** `node qa/unit.mjs` Exit 0; keine Verhaltensänderung der App (Smoke grün). **Pfade:** `index.html`, `qa/` [App][QA]

## 🔨 In Arbeit

*(leer)*

## 🐞 Kaputt-Klären

*(leer)*

## ✅ Läuft

### 2026-06-11 — Setup
- **App + Doku aus kryptobux/Schach übernommen** (buchhaltung.html → index.html, BUCHHALTUNG.md), gepusht als Erst-Commit. Commit `efe084d`.
- **Arbeitssystem aufgesetzt:** CLAUDE/STATE/KANBAN/DECISIONS/ARCHITECTURE, `.claude/commands/` (orient/finish/sync), `.gitignore` (belege/, buchungen.csv, settings.local.json). Commit: siehe `git log`.

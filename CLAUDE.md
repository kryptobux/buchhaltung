# GmbH-Buchhaltung — Projektdoku für Claude

## Überblick

Doppelte Buchführung (SKR03) als **eine einzige HTML-Datei** ohne Server, Build oder
Abhängigkeiten — Eigenbau als Ersatz für Buchhaltungsbutler. Zielgruppe: kleine
Gesellschaften des Users (vermögensverwaltende Immobilien-GmbH + Holding-GmbH).
Alle Daten liegen im **localStorage des Browsers** — die App selbst enthält keine Daten.

Fachliche Doku & GoBD-Hinweise: [BUCHHALTUNG.md](BUCHHALTUNG.md).

## Stack

| Ebene | Technologie |
|---|---|
| App | `index.html` — Vanilla JS, kein Framework, kein Build-Schritt |
| Persistenz | Browser-localStorage (Schlüssel `LS_KEY`), JSON-Backup/Restore |
| Repo | https://github.com/kryptobux/buchhaltung (public), Branch `main` |
| „Prod" | GitHub Pages (https://kryptobux.github.io/buchhaltung/) — **noch nicht aktiviert** |
| QA | geplant: Playwright headless gegen lokale Datei/Pages |

## Verzeichnisstruktur

```
index.html          Die komplette App (~50 KB, eine Datei)
BUCHHALTUNG.md      Fachliche Doku: GoBD, Funktionsumfang, Schnellstart, Grenzen
ARCHITECTURE.md     Bausteinkarte der App (Tab-/Funktionsebene)
STATE.md            Lebender Handoff (max ~15 Zeilen)
KANBAN.md           Aufgabenboard
DECISIONS.md        Entscheidungslog (append-only)
belege/             Lokale Belege des Users — VERTRAULICH, git-ignoriert, NIE committen
buchungen.csv       Lokales Buchungsprotokoll (falls vorhanden) — git-ignoriert
.claude/skills/     buchen-* Skills: betreffen den ALTEN Buchhaltungsbutler-Workflow
                    (Browser-Automation), nicht diese App
qa/                 geplant: Smoke-/E2E-Skripte
```

## Deploy-Ablauf

Deploy = `git push origin main`. Sobald GitHub Pages aktiv ist, liefert Pages den
Stand von `main` automatisch aus (Verzögerung bis ~1 Min).

- Nach Deploy beweisen, dass der neue Code ankam: eindeutigen Marker-String
  (z. B. Versions-Kommentar in `index.html`) per HTTP gegen die Pages-URL greppen —
  nicht nur „Seite lädt".
- **Live-Daten werden vom Deploy nie berührt** — sie liegen im localStorage des
  User-Browsers. Dafür gilt aber: siehe „Bekannte Fallen".

## Bekannte Fallen

1. **localStorage ist die einzige Datenhaltung.** Jede Änderung am Datenschema in
   `index.html` muss mit Bestandsdaten im localStorage des Users rückwärtskompatibel
   sein oder einen Migrationspfad haben. Niemals `LS_KEY` umbenennen oder das Format
   brechen, ohne Migration + JSON-Backup-Hinweis.
2. **GoBD-Logik nicht aufweichen:** Festschreibung und Storno-statt-Löschen sind
   Compliance-Features (§§ 238 ff. HGB, GoBD). Änderungen daran nur mit expliziter
   Freigabe des Users + DECISIONS-Eintrag.
3. **`belege/` und `buchungen.csv` sind vertrauliche Echtdaten** — git-ignoriert,
   nie committen, nie in Agenten-Prompts zitieren.
4. **Repo ist public.** Es darf ausschließlich Code/Doku enthalten, niemals Echtdaten,
   Salden, Mandantennamen über die Vorlagen hinaus oder Belege.
5. Die `buchen-*` Skills automatisieren Buchhaltungsbutler (Legacy) — nicht mit
   dieser App verwechseln.

---

# Dauer-Regeln (jede Session)

## Rollenteilung

Hauptthread = Orchestrierung, Entscheidungen, Merges, Pushes. Andere Arbeit möglichst
in Subagenten, gern parallel:

- Exploration/Recherche → Explore-/general-purpose-Agent; liefert nur Destillat
  (Pfade+Zeilen · Erkenntnis), nie Rohinhalte.
- Abgegrenzte Features → general-purpose-Agent im eigenen Git-Worktree.
- Verifikation/Testläufe → Agent mit Checkliste, Berichtsformat „✅/❌ + 1–3 Zeilen
  je Punkt, keine Rohdumps".
- Nicht delegieren: triviale Einzel-Reads, eng gekoppelte Edits in `index.html`
  (eine Datei → hohe Konfliktgefahr!), Pushes, alles mit vertraulichen Daten.
- Jeder Agenten-Prompt ist selbsterklärend (Pfade, Konventionen, Verbote) — der
  Agent kennt die Konversation nicht.

## Worktree-Playbook

- Pro Feature: `git worktree add ../wt-<name> -b feat/<name>`; Agent arbeitet NUR
  dort, committet EINEN Commit, pusht nicht. Hauptthread merged, verifiziert, räumt
  auf (`git worktree remove` + `git worktree prune` + Branch löschen).
- Kein Build-Schritt in diesem Projekt → keine node_modules-Verlinkung nötig.
  Sollte je ein Build dazukommen: node_modules per Junction teilen und Agenten
  explizit „KEIN npm install / npm ci" verbieten.
- Toter Agent ≠ verlorene Arbeit: Worktree prüfen, oft nur Commit ausstehend.
- ⚠️ Die App ist EINE Datei — zwei parallele Feature-Agenten in `index.html`
  kollidieren fast sicher. Parallelität nur bei disjunkten Dateien (z. B. qa/ vs.
  Doku), sonst sequenziell arbeiten.

## Parallel-Session-Protokoll

- Vor jedem Commit: `git status` + `git log -3` — andere Sessions committen
  dazwischen. Fremde ungecommittete Änderungen NIE verwerfen; nimmt ein Commit
  fremde Hunks mit, im Commit-Text kennzeichnen.
- Commit-Hashes können sich durch Amends ändern → Referenzen in Doku korrigieren.
- STATE.md ist die gemeinsame Wahrheit; Konflikte beim Sessionende konsolidieren.
- Deploy-Artefakte gibt es hier nicht (Pages baut aus main) — bei Einführung:
  immer eindeutige Namen.

## Qualität & Verifikation

- Definition of Done je Karte: Funktion im Browser bewiesen (Playwright-Screenshot,
  geprüfter Output) — „sollte funktionieren" zählt nicht.
- `data-testid`-Attribute beim Anfassen von UI-Teilen ergänzen.
- QA-Skripte wiederverwendbar in `qa/` (Exit 0 = grün); nach jedem Deploy Smoke
  gegen die Pages-URL.
- Testdaten in der App immer mit Präfix `SEED-` (Mandant/Buchungstext), nie in
  echte Mandanten buchen; nach Tests aufräumen bzw. Test-Mandanten löschen.
- Befunde aus Tests SOFORT als KANBAN-Karte (mit Beleg), nicht nur im Chat.
- Wurzelursachen beweisen (Konsole/Trace), nicht Symptome fixen.

## Betrieb & Sicherheit

- Push nach `main` = Deploy; macht der Hauptthread selbständig (grundsätzlich
  freigegeben). Destruktives und Externes (Pages-Konfiguration ändern, Repo-Settings,
  DNS) → Operator-Aktion, im STATE führen.
- Secrets: gibt es in diesem Projekt nicht im Repo und das bleibt so. Vertrauliche
  Echtdaten (belege/, buchungen.csv) nie committen, nie zitieren.

## State-Pflege

- STATE.md bei jedem Übergabepunkt aktualisieren, max ~15 Zeilen, Details ins Board.
- DECISIONS.md append-only bei jeder Architektur-/Produktentscheidung, auch bei
  mündlichen Freigaben des Users.
- Eine Karte = eine abgeschlossene Aufgabe = ein Commit (Hash auf die Karte).
- Sessionende: STATE konsolidieren, Board aktuell, alles gepusht, Memory-Eintrag.
  Neue Session startet mit `/orient`.

## Präferenzen des Users

- Antworten auf Deutsch; Befunde mit Belegen; bei Fehlern Ursache statt Beschönigung.
- Eigenständig arbeiten: erledigen → committen → deployen → dokumentieren → nächster
  Backlog-Punkt. Rückfragen nur bei Produkt-/Geld-/Rechts-Entscheidungen oder
  destruktiven Aktionen — dann mit klarer Empfehlung.
- Vor größeren Umbauten: kurzer recherche-gestützter Vorschlag (Subagent Best
  Practices + Subagent Ist-Analyse) → Freigabe → Umsetzung.

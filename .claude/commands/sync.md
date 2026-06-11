---
description: State-Dateien committen und pushen
---

Prüfe mit `git status -s`, ob STATE.md, KANBAN.md, DECISIONS.md, ARCHITECTURE.md, CLAUDE.md oder BUCHHALTUNG.md geänderte/neue Inhalte haben.

Falls ja: nur diese Doku-/State-Dateien stagen, committen (Message: `docs: State-Sync — <Kurzbeschreibung>`) und pushen. App-Änderungen (`index.html`, `qa/`) NICHT mitnehmen — die gehören in eigene Karten-Commits.

Falls nichts zu tun: kurz „State ist synchron" melden. Vorher `git log -3` prüfen (Parallel-Sessions).

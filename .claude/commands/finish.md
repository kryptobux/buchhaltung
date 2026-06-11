---
description: Übergabepunkt — STATE/Board aktualisieren, committen, nächsten Schritt nennen
---

Schließe den aktuellen Arbeitsstand sauber ab:

1. KANBAN.md aktualisieren: erledigte Karte nach ✅ Läuft (mit Commit-Hash), neue Befunde als Karten erfassen.
2. STATE.md auf den neuen Stand bringen (max ~15 Zeilen; über ~20 Zeilen → konsolidieren). Tagesdetails gehören ins Board, nicht ins STATE.
3. Vor dem Commit: `git status` + `git log -3` (Parallel-Session-Schutz — fremde ungecommittete Änderungen nie verwerfen, fremde Hunks im Commit-Text kennzeichnen).
4. Alles committen (aussagekräftige deutsche Commit-Message) und pushen.
5. Abschlussmeldung: Was wurde erledigt (mit Beleg) · Commit-Hash · empfohlener nächster Schritt.

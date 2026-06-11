# DECISIONS (append-only)

## 2026-06-11 · Eigenbau-App statt Buchhaltungsbutler
Die Buchführung der beiden GmbHs läuft künftig über die selbstgebaute Single-File-App
(`index.html`, SKR03, GoBD-Festschreibung) statt über Buchhaltungsbutler.
**Begründung:** keine laufenden Kosten, volle Kontrolle, Umfang reicht für VV-/Holding-GmbH (siehe BUCHHALTUNG.md).
**Verworfen:** Buchhaltungsbutler weiterführen (Kosten, Overkill); die `buchen-*` Skills bleiben als Legacy erhalten.

## 2026-06-11 · Ziel-Repo kryptobux/buchhaltung, App als index.html
Übernahme aus `kryptobux/Schach@claude/gmbh-accounting-software-l5j6pd` in das leere
Repo `kryptobux/buchhaltung`, Branch `main`; `buchhaltung.html` → `index.html`.
**Begründung:** eigenes Repo fürs eigenständige Produkt; `index.html` ermöglicht GitHub Pages ohne Pfad.
**Verworfen:** Weiterentwicklung im Schach-Repo (Themenfremd, Branch-Wildwuchs).

## 2026-06-11 · Echtdaten bleiben lokal, Repo public nur mit Code/Doku
`belege/` und `buchungen.csv` sind git-ignoriert und werden nie committet oder in
Agenten-Prompts zitiert; Buchungsdaten leben ausschließlich im localStorage + lokalen JSON-Backups.
**Begründung:** Repo ist public; Steuer-/Mandantendaten sind vertraulich.
**Verworfen:** privates Repo mit Daten im Repo (vermischt Code und Daten, Backup-Weg ist JSON-Export).

## 2026-06-11 · GitHub Pages als „Prod", Aktivierung = Operator-Aktion
Deploy-Modell: Push nach `main` → Pages liefert aus. Aktivierung der Pages bleibt
beim User (publiziert die App öffentlich).
**Begründung:** einfachster Deploy-Weg ohne Server; Veröffentlichung ist eine Außenwirkung → Operator entscheidet.
**Verworfen:** Hosting mit Server/CI (unnötig für eine statische Datei).

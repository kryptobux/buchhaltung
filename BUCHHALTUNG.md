# GmbH-Buchhaltung (SKR03) – Eigenbau statt Buchhaltungsbutler

Eine komplette doppelte Buchführung als **einzelne HTML-Datei** (`buchhaltung.html`) –
ohne Server, ohne Installation, ohne laufende Kosten. Einfach im Browser öffnen
(Doppelklick oder über GitHub Pages). Ausgelegt auf kleine Gesellschaften wie eine
vermögensverwaltende Immobilien-GmbH und eine Holding-GmbH.

## Darf ich selbstgeschriebene Buchhaltungssoftware nutzen?

**Ja.** Es gibt keine Zulassungs- oder Zertifizierungspflicht für Buchhaltungssoftware
in Deutschland. Entscheidend ist nicht das Programm, sondern dass deine Buchführung
die gesetzlichen Anforderungen erfüllt (§§ 238 ff. HGB, §§ 140 ff. AO, GoBD):

1. **Unveränderbarkeit / Festschreibung:** Gebuchte Geschäftsvorfälle dürfen nachträglich
   nicht mehr unbemerkt änderbar sein. → Die App hat dafür eine Festschreibungsfunktion;
   danach sind nur noch Stornobuchungen möglich. Spätestens mit Abgabe der UStVA des
   jeweiligen Zeitraums festschreiben (bei rein steuerfreier Vermietung: zeitnah, z. B. monatlich).
2. **Nachvollziehbarkeit & Belegprinzip:** Keine Buchung ohne Beleg. Belege (Rechnungen,
   Kontoauszüge) getrennt aufbewahren – z. B. ein PDF-Ordner je Jahr mit Dateinamen, die der
   Belegnummer in der App entsprechen (`2026-001_Handwerkerrechnung.pdf`).
3. **Aufbewahrung:** Bücher/Abschlüsse 10 Jahre, Buchungsbelege 8 Jahre (seit 2025),
   **maschinell auswertbar**. → Regelmäßig JSON-Backup + CSV-Journal exportieren und
   mehrfach sichern (lokal + Cloud). Die Daten liegen sonst nur im Browser-localStorage!
4. **Verfahrensdokumentation:** Kurz schriftlich festhalten, wie du buchst, sicherst und
   festschreibst (1–2 Seiten reichen bei diesem Umfang).

Was die Software **nicht** ersetzt:

- **UStVA-Übermittlung:** muss elektronisch via ELSTER erfolgen. Die App berechnet die
  Kennzahlen (81, 86, 66, 83 …) – du überträgst sie manuell in „Mein ELSTER“ (2 Minuten).
  Bei rein steuerfreier Wohnraumvermietung ohne USt-Option besteht oft gar keine UStVA-Pflicht.
- **E-Bilanz (§ 5b EStG), KSt-/GewSt-Erklärung:** weiterhin über ELSTER bzw. Steuerberater
  oder Tools wie myebilanz. Die App liefert dafür GuV, Bilanz und SuSa als Grundlage.
- **Offenlegung:** Hinterlegung/Offenlegung des Jahresabschlusses beim Unternehmensregister
  bleibt Pflicht (Kleinstkapitalgesellschaft: Hinterlegung der Bilanz genügt).
- Für die Übergabe an den Steuerberater gibt es einen **DATEV-Export (Beta)** – vor
  produktiver Nutzung einen Testimport machen lassen.

## Funktionsumfang

| Bereich | Inhalt |
|---|---|
| **Mandanten** | Mehrere Gesellschaften getrennt führen (VV GmbH + Holding vorangelegt) |
| **Kontenplan** | An SKR03 angelehnt (~75 Konten für Immobilien-/Holding-Bedarf), frei erweiterbar |
| **Buchen** | Soll an Haben, Steuerschlüssel (19 %/7 % USt & VSt) mit automatischer Splitbuchung, Belegnummern-Vorschlag, Buchung kopieren (wiederkehrende Mieten) |
| **Journal** | Filterbar, CSV-Export, Druck |
| **SuSa** | Summen- und Saldenliste mit EB-Salden für beliebige Zeiträume |
| **BWA** | Monatsspalten, Betriebsergebnis, Finanzergebnis, Ergebnis vor/nach Steuern |
| **UStVA** | Kennzahlen je Monat/Quartal/Jahr inkl. Abrundung auf volle Euro für ELSTER |
| **Abschluss** | GuV je Geschäftsjahr + Bilanz zum Stichtag mit Ausgeglichenheits-Prüfung |
| **GoBD** | Festschreibung, Stornobuchungen statt Löschen, Backup-Erinnerung |
| **Export** | JSON-Komplettbackup, CSV-Journal, DATEV-Buchungsstapel (EXTF, Beta) |

## Schnellstart

1. `buchhaltung.html` im Browser öffnen (immer derselbe Browser/Rechner, da die Daten
   im localStorage liegen – oder per JSON-Backup umziehen).
2. **Eröffnungsbilanz einbuchen:** alle Anfangsbestände gegen Konto `9000 Saldenvorträge`,
   z. B. `1200 Bank an 9000`, `0140 Wohnbauten an 9000`, `9000 an 0800 Stammkapital`,
   `9000 an 0630 Bankdarlehen`. Danach muss die Bilanz „ausgeglichen“ melden.
   (Die Salden bekommst du aus dem Buchhaltungsbutler-Export / der letzten Bilanz.)
3. Laufend buchen, typische Fälle VV GmbH:
   - Mieteingang (steuerfrei § 4 Nr. 12): `1200 an 8110`, ohne Steuerschlüssel
   - Handwerkerrechnung: `4801 an 1200` mit Schlüssel *19 % Vorsteuer* — **Achtung:**
     bei steuerfreier Vermietung ist Vorsteuer i. d. R. nicht abziehbar, dann ohne
     Schlüssel brutto buchen!
   - Darlehensrate: Zins `2110 an 1200`, Tilgung `0630 an 1200`
   - Gebäude-AfA (jährlich): `4831 an 0140`
   - Holding, Gewinnausschüttung der Tochter: `1200 an 2600`
4. Monatlich: JSON-Backup ziehen, Zeitraum festschreiben, ggf. UStVA übertragen.

## Grenzen / Hinweise

- Kontonummern sind an SKR03 angelehnt, aber vor DATEV-Übergabe mit der offiziellen
  DATEV-Kontenliste abgleichen (im Konten-Tab anpassbar).
- Keine offene-Posten-Buchhaltung, keine Anlagenbuchführung (AfA manuell buchen),
  keine automatische Ergebnisverwendung (Gewinnvortrag bei Bedarf manuell umbuchen –
  die Bilanz weist das kumulierte Ergebnis automatisch aus).
- Steuerliche Besonderheiten (erweiterte Gewerbesteuerkürzung § 9 Nr. 1 GewStG,
  § 8b KStG bei der Holding, USt-Option § 9 UStG) bitte weiterhin mit dem
  Steuerberater abstimmen – die App bucht, sie berät nicht.

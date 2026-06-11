---
name: buchen
description: |
  Buchhaltungsbutler Browser-Automation. Haupt-Dispatcher fuer alle Buchungsaufgaben.
  Trigger: "buchen", "Beleg", "Buchung", "Buchhaltungsbutler", "Rechnung buchen",
  "Beleg hochladen", "Buchfuehrung machen", "Buchhaltung".
---

# Buchhaltungsbutler — Haupt-Dispatcher

Du steuerst Chrome um in Buchhaltungsbutler (https://app.buchhaltungsbutler.de) Belege zu buchen.

## Ablauf

### 1. Browser vorbereiten
1. `tabs_context_mcp` mit `createIfEmpty: true` aufrufen
2. Pruefen ob ein Tab auf `app.buchhaltungsbutler.de` offen ist
3. Falls nicht: `tabs_create_mcp` und `navigate` zu `https://app.buchhaltungsbutler.de`
4. Screenshot machen um den aktuellen Zustand zu sehen

### 2. Login pruefen
- Screenshot analysieren: Ist das Dashboard sichtbar oder die Login-Seite?
- Falls Login-Seite: Folge dem Login-Flow (siehe unten)
- Falls Dashboard: Weiter zu Schritt 3

### 3. Aufgabe ermitteln
Falls nicht klar aus der User-Nachricht, frage:
- **Beleg hochladen**: "Ich moechte einen Beleg/eine Rechnung hochladen und buchen"
- **Manuelle Buchung**: "Ich moechte eine Buchung manuell erfassen"
- **Frage zur Buchfuehrung**: Konsultiere das Wissen aus /buchen-wissen

### 4. An Sub-Workflow dispatchen

**Beleg hochladen → /buchen-beleg Workflow**
**Manuelle Buchung → /buchen-manuell Workflow**
**Login noetig → /buchen-login Workflow**

---

## Login-Flow

1. Navigiere zu `https://app.buchhaltungsbutler.de`
2. Screenshot machen
3. User fragen: "Bitte gib deine E-Mail und dein Passwort fuer Buchhaltungsbutler ein. Die Zugangsdaten werden NICHT gespeichert."
4. `find` das E-Mail-Eingabefeld → `form_input` zum Ausfuellen
5. `find` das Passwort-Eingabefeld → `form_input` zum Ausfuellen
6. `find` den Login-Button → `computer` mit `left_click` klicken
7. 3 Sekunden warten, Screenshot machen
8. Falls 2FA-Eingabe erscheint: User nach Code fragen, eingeben, absenden
9. Verifizieren dass das Dashboard sichtbar ist

**KRITISCH**: Zugangsdaten NIEMALS speichern, loggen oder wiederholen. Jede Session neu abfragen.

---

## Beleg-Upload Workflow

1. Login sicherstellen
2. Dateien in `E:\Claude\Buch\belege\` auflisten (per `ls`)
3. User fragen welche Datei(en) hochgeladen werden sollen
4. Zu "Belege" im Menue navigieren:
   - `find` nach "Belege" oder "Belegerfassung" in der Navigation
   - Klicken um den Bereich zu oeffnen
5. Screenshot machen
6. Upload-Element finden:
   - `find` nach "hochladen", "upload", "Datei" oder File-Input
   - `read_page` fuer das ref des File-Input-Elements
7. `file_upload` mit ref und absolutem Pfad (z.B. `E:\Claude\Buch\belege\rechnung.pdf`)
8. Warten auf Upload-Bestaetigung, Screenshot
9. Falls Buchungsformular erscheint:
   - `read_page` um vorausgefuellte Felder zu lesen
   - Erkannte Daten dem User zeigen
   - Kontierung vorschlagen (basierend auf SKR03-Wissen)
   - Fehlende Felder nach Rueckfrage ausfuellen
   - Screenshot zur Pruefung
   - "Soll ich die Buchung absenden?" — nur nach Bestaetigung submitten

10. Nach erfolgreicher Buchung: Zeile an `E:\Claude\Buch\buchungen.csv` anhaengen
    Format: `Datum;Belegnr;Betrag;Konto;Gegenkonto;Steuersatz;Buchungstext;Dateiname`

---

## Manuelle Buchung Workflow

1. Login sicherstellen
2. Zum Buchungsbereich navigieren:
   - `find` nach "Buchen", "Buchung erfassen" oder "Neue Buchung"
   - Klicken
3. Screenshot machen
4. Buchungsdetails vom User erfragen (falls nicht schon genannt):
   - Datum (DD.MM.YYYY)
   - Betrag (in EUR)
   - Soll-Konto (mit SKR03-Hilfe)
   - Haben-Konto / Gegenkonto
   - Steuersatz (0%, 7%, 19%)
   - Buchungstext
   - Belegnummer (optional)
5. `read_page` mit `filter: "interactive"` um Formularfelder zu finden
6. Felder mit `form_input` ausfuellen
7. Screenshot zur Pruefung: "Bitte pruefe die Buchung. Soll ich absenden?"
8. Nach Bestaetigung: Submit-Button finden und klicken
9. Erfolg verifizieren per Screenshot

10. Nach erfolgreicher Buchung: Zeile an `E:\Claude\Buch\buchungen.csv` anhaengen

---

## Buchungsprotokoll (buchungen.csv)

Nach JEDER erfolgreichen Buchung eine Zeile anhaengen:

```
Datum;Belegnr;Betrag;Konto;Gegenkonto;Steuersatz;Buchungstext;Dateiname
```

- Falls die Datei nicht existiert: Zuerst den Header schreiben
- Semikolon-getrennt (deutsches Format)
- Dateiname nur bei Beleg-Upload, sonst leer
- Bash verwenden um die Zeile anzuhaengen: `echo "..." >> "E:/Claude/Buch/buchungen.csv"`

---

## Fehlerbehandlung

- **Login fehlgeschlagen**: Screenshot, Fehler melden, User erneut nach Zugangsdaten fragen
- **Upload fehlgeschlagen**: Datei pruefen, alternative Upload-Methode versuchen
- **Formularfeld nicht gefunden**: `read_page` mit voller Tiefe, adaptieren
- **Session abgelaufen**: Login-Seite erkennen, Login-Flow neu starten
- **Immer**: Nach jeder Aktion Screenshot machen zur Verifizierung

## Navigation-Tipps
- Hauptmenue ist typischerweise links als Sidebar
- Wichtige Bereiche: Belege, Zahlungen, Buchen, Rechnungen, Auswertungen
- Falls Elemente nicht gefunden werden: `read_page` mit `filter: "interactive"` nutzen
- Kontofelder sind oft Autocomplete-Felder: Nummer/Name tippen, Vorschlag abwarten, dann klicken

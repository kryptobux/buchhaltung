---
name: buchen-beleg
description: |
  Beleg (Rechnung/Quittung) in Buchhaltungsbutler hochladen und buchen.
  Trigger: "Beleg hochladen", "Rechnung hochladen", "Beleg buchen", "PDF hochladen",
  "Rechnung erfassen", "Eingangsrechnung", "Ausgangsrechnung".
---

# Beleg hochladen & buchen in Buchhaltungsbutler

## Voraussetzungen
- Muss in Buchhaltungsbutler eingeloggt sein (sonst Login-Flow starten)
- Belegdateien liegen in `E:\Claude\Buch\belege\`

## Ablauf

### 1. Login pruefen
- Screenshot machen
- Falls nicht eingeloggt: Login-Flow ausfuehren

### 2. Verfuegbare Belege anzeigen
- Dateien in `E:\Claude\Buch\belege\` auflisten (Bash: `ls "E:/Claude/Buch/belege/"`)
- User fragen welche Datei(en) hochgeladen werden sollen
- Unterstuetzte Formate: PDF, JPEG, PNG, TIFF

### 3. Zum Beleg-Upload navigieren
- `find` nach "Belege" oder "Eingangsbelege" oder "Belegerfassung" im Seitenmenue
- Klicken um den Bereich zu oeffnen
- Screenshot machen um die Upload-Oberflaeche zu sehen

### 4. Datei hochladen
- `find` nach "hochladen", "upload", "Datei waehlen", oder einem File-Input
- `read_page` nutzen um das `ref` des File-Input-Elements zu finden
  - Falls kein sichtbarer File-Input: `read_page` mit voller Tiefe nach hidden Inputs suchen
- `file_upload` mit:
  - `ref`: das gefundene Input-Element
  - `paths`: absoluter Pfad z.B. `["E:\\Claude\\Buch\\belege\\rechnung.pdf"]`
  - `tabId`: aktuelle Tab-ID
- Warten auf Upload-Bestaetigung
- Screenshot machen

### 5. OCR-Ergebnisse pruefen
- `read_page` um die automatisch erkannten Daten zu lesen
- Dem User zeigen was erkannt wurde:
  - Betrag
  - Datum
  - Lieferant/Kunde
  - Evtl. bereits vorgeschlagenes Konto

### 6. Kontierung durchfuehren
- Basierend auf dem erkannten Beleg das passende SKR03-Konto vorschlagen
  - Nutze das Wissen aus /buchen-wissen
  - Beispiele:
    - Telefonrechnung → 4920 Telefon
    - Bueromaterial → 4930 Buerokosten
    - Miete → 4210 Miete
    - Werkzeug → 4800 Reparaturen/Instandhaltung
- Felder ausfuellen:
  - **Buchungskonto**: `form_input` (oft Autocomplete — Nummer tippen, Vorschlag abwarten, klicken)
  - **Steuersatz**: Dropdown auswaehlen (19%, 7%, 0%)
  - **Debitor/Kreditor**: Falls noetig zuordnen
  - **Buchungstext**: Beschreibung eintragen
  - **Kostenstelle**: Falls gewuenscht
- Screenshot zur Pruefung zeigen

### 7. Bestaetigung und Submit
- User fragen: "Die Buchung ist ausgefuellt. Soll ich sie absenden?"
- **NUR nach expliziter Bestaetigung** den Submit/Speichern-Button klicken
- Screenshot machen um Erfolg zu verifizieren
- Erfolgsmeldung oder Fehlermeldung dem User zeigen

### 8. Buchungsprotokoll aktualisieren
Nach erfolgreicher Buchung:
```bash
# Falls buchungen.csv nicht existiert, Header schreiben:
if [ ! -f "E:/Claude/Buch/buchungen.csv" ]; then
  echo "Datum;Belegnr;Betrag;Konto;Gegenkonto;Steuersatz;Buchungstext;Dateiname" > "E:/Claude/Buch/buchungen.csv"
fi
# Dann Zeile anhaengen:
echo "23.03.2026;RE-001;119,00;4930;1600;19%;Bueromaterial;rechnung.pdf" >> "E:/Claude/Buch/buchungen.csv"
```
(Werte durch die tatsaechlichen Buchungsdaten ersetzen)

## Fehlerbehebung

- **Kein File-Input gefunden**: `read_page` mit `depth: 20` versuchen, nach iframe pruefen
- **Upload schlaegt fehl**: Dateiformat und -groesse pruefen, alternative Upload-Methode suchen
- **OCR erkennt nichts**: Manuell die Daten vom Beleg ablesen (User um Hilfe bitten)
- **Autocomplete-Feld reagiert nicht**: Text eingeben, kurz warten, dann `read_page` fuer Dropdown-Optionen, mit `computer` klicken

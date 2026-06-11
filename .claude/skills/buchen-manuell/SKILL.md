---
name: buchen-manuell
description: |
  Manuelle Buchung in Buchhaltungsbutler erfassen ohne Beleg-Upload.
  Trigger: "manuelle Buchung", "Buchung erfassen", "Buchung anlegen",
  "neue Buchung", "manuell buchen", "Transaktion erfassen".
---

# Manuelle Buchung in Buchhaltungsbutler

## Voraussetzungen
- Muss in Buchhaltungsbutler eingeloggt sein

## Ablauf

### 1. Login pruefen
- Screenshot machen
- Falls nicht eingeloggt: Login-Flow ausfuehren

### 2. Zum Buchungsbereich navigieren
- `find` nach "Buchen", "Buchung erfassen", "Neue Buchung" im Menue
- Klicken um den Bereich zu oeffnen
- Screenshot machen um das Buchungsformular zu sehen

### 3. Buchungsdetails sammeln
Vom User erfragen (was nicht schon genannt wurde):

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| **Datum** | Buchungsdatum (DD.MM.YYYY) | 23.03.2026 |
| **Betrag** | Bruttobetrag in EUR | 119,00 |
| **Soll-Konto** | Aufwandskonto aus SKR03 | 4930 (Buerokosten) |
| **Haben-Konto** | Gegenkonto | 1200 (Bank) oder 1600 (Verbindlichkeiten) |
| **Steuersatz** | USt-Satz | 19%, 7%, oder 0% |
| **Buchungstext** | Beschreibung | "Bueromaterial Amazon" |
| **Belegnummer** | Optional, Referenz | RE-2026-042 |

**Hilfe bei der Kontenwahl:**
- Nutze das SKR03-Wissen aus /buchen-wissen
- Schlage passende Konten vor basierend auf der Beschreibung
- Beispiel: "Ich habe Druckerpatronen gekauft" → 4930 Buerokosten, 19% USt

### 4. Formular ausfuellen
- `read_page` mit `filter: "interactive"` um alle Formularfelder zu identifizieren
- Fuer jedes Feld:
  - `find` oder `read_page` um das Element zu lokalisieren
  - `form_input` zum Ausfuellen

**Kontofelder (Autocomplete):**
- Kontonummer oder -name eintippen
- Kurz warten bis Vorschlaege erscheinen
- `read_page` um die Dropdown-Optionen zu sehen
- Mit `computer` `left_click` die richtige Option auswaehlen

**Steuersatz (Dropdown):**
- `form_input` mit dem Wert (z.B. "19%") oder
- `find` nach dem Dropdown, oeffnen, Option klicken

**Datumsfeld:**
- `form_input` mit dem Datum im Format DD.MM.YYYY
- Oder: Feld anklicken, Datepicker nutzen

### 5. Pruefung vor Submit
- Screenshot machen
- Dem User zeigen: "Bitte pruefe die Buchung:"
  - Datum: ...
  - Betrag: ...
  - Soll: ... an Haben: ...
  - Steuersatz: ...
  - Text: ...
- Fragen: "Stimmt alles? Soll ich die Buchung absenden?"

### 6. Absenden
- **NUR nach expliziter User-Bestaetigung**
- `find` den Speichern/Submit-Button
- `computer` mit `left_click` klicken
- Screenshot machen
- Erfolg verifizieren (Bestaetigungsmeldung suchen)
- Ergebnis dem User melden

### 7. Buchungsprotokoll aktualisieren
Nach erfolgreicher Buchung:
```bash
# Falls buchungen.csv nicht existiert, Header schreiben:
if [ ! -f "E:/Claude/Buch/buchungen.csv" ]; then
  echo "Datum;Belegnr;Betrag;Konto;Gegenkonto;Steuersatz;Buchungstext;Dateiname" > "E:/Claude/Buch/buchungen.csv"
fi
# Zeile anhaengen (Dateiname leer bei manueller Buchung):
echo "23.03.2026;RE-042;119,00;4930;1200;19%;Bueromaterial Amazon;" >> "E:/Claude/Buch/buchungen.csv"
```
(Werte durch die tatsaechlichen Buchungsdaten ersetzen)

## Haeufige Buchungsszenarien

### Einkauf bezahlt per Bank
- Soll: Aufwandskonto (4xxx) + Vorsteuer (1576/1571)
- Haben: Bank (1200)

### Einkauf auf Rechnung (noch nicht bezahlt)
- Soll: Aufwandskonto (4xxx) + Vorsteuer (1576/1571)
- Haben: Verbindlichkeiten (1600)

### Einnahme erhalten per Bank
- Soll: Bank (1200)
- Haben: Erloeskonto (8xxx) + USt (1770/1771)

### Privatentnahme
- Soll: Privatentnahmen (1800)
- Haben: Bank (1200)

### Bankgebuehren
- Soll: Nebenkosten Geldverkehr (4970)
- Haben: Bank (1200)
- Steuersatz: 0% (steuerfrei)

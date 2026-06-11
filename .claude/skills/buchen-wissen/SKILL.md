---
name: buchen-wissen
description: |
  Wissensbasis fuer Buchfuehrung, SKR03-Kontenrahmen und Buchhaltungsbutler-Bedienung.
  Wird automatisch konsultiert bei Buchungsfragen, Kontenwahl und Kontierung.
  Trigger: "welches Konto", "SKR03", "Buchungssatz", "wie buche ich", "Buchfuehrung",
  "Kontierung", "Steuersatz", "Vorsteuer", "Umsatzsteuer", "EUeR", "Bilanz".
---

# Wissensbasis: Buchfuehrung, SKR03 & Buchhaltungsbutler

Du bist ein Buchfuehrungs-Assistent. Nutze dieses Wissen um dem User bei der Kontierung, Buchungssaetzen und der Bedienung von Buchhaltungsbutler zu helfen.

---

## A. Grundlagen der Buchfuehrung

### Doppelte Buchfuehrung
- Jeder Geschaeftsvorfall wird auf mindestens zwei Konten gebucht
- **Soll** (links) und **Haben** (rechts)
- Buchungssatz-Formel: "Soll an Haben" — z.B. "Aufwand an Verbindlichkeiten"
- Die Summe der Soll-Buchungen muss immer gleich der Summe der Haben-Buchungen sein

### Kontenarten

**Bestandskonten (Bilanzkonten)**
- Aktivkonten: Vermoegen (Bank, Kasse, Forderungen, Anlagen)
  - Zugang = Soll, Abgang = Haben
- Passivkonten: Kapital & Schulden (Eigenkapital, Verbindlichkeiten)
  - Zugang = Haben, Abgang = Soll
- Werden ins naechste Jahr vorgetragen

**Erfolgskonten (GuV-Konten)**
- Aufwandskonten (4xxx): Miete, Gehaelter, Material, Werbung etc.
  - Aufwand = Soll
- Ertragskonten (8xxx): Umsatzerloese
  - Ertrag = Haben
- Werden am Jahresende ueber GuV abgeschlossen

### EUeR vs. Bilanzierung
- **EUeR** (Einnahmen-Ueberschuss-Rechnung): Fuer Freiberufler und Kleinunternehmer
  - Erfassung nach Zahlungszeitpunkt (Zufluss-/Abflussprinzip)
  - In Buchhaltungsbutler: Aufwand/Ertrag wird bei der ZAHLUNG gebucht, nicht am Beleg
- **Bilanzierung**: Fuer Kapitalgesellschaften und groessere Unternehmen
  - Erfassung nach Leistungszeitpunkt
  - In Buchhaltungsbutler: Aufwand/Ertrag wird direkt am Beleg gebucht

---

## B. SKR03-Kontenrahmen

### Kontenklassen 0-9

| Klasse | Bezeichnung | Beispiele |
|--------|-------------|-----------|
| **0** | Anlage- und Kapitalkonten | Grundstuecke, Maschinen, Eigenkapital |
| **1** | Finanz- und Privatkonten | Bank, Kasse, Forderungen, Verbindlichkeiten, USt |
| **2** | Abgrenzungskonten | Rueckstellungen, aktive/passive Rechnungsabgrenzung |
| **3** | Wareneingang und Bestaende | Wareneinkauf, Rohstoffe |
| **4** | Betriebliche Aufwendungen | Miete, Gehaelter, Werbung, Versicherung |
| **5** | Frei / Sonderkonten | Individuell nutzbar |
| **6** | Frei / Sonderkonten | Individuell nutzbar |
| **7** | Bestaende an Erzeugnissen | Fertige/unfertige Erzeugnisse |
| **8** | Erloeskonten | Umsatzerloese, sonstige Ertraege |
| **9** | Vortrags- und statist. Konten | Saldenvortraege, Eröffnungsbilanz |

### Wichtigste Konten fuer kleine Unternehmen

#### Finanzkonten (Klasse 1)
| Konto | Bezeichnung |
|-------|-------------|
| 1000 | Kasse |
| 1200 | Bank |
| 1300 | Wechsel |
| 1400 | Forderungen aus Lieferungen und Leistungen |
| 1571 | Abziehbare Vorsteuer 7% |
| 1576 | Abziehbare Vorsteuer 19% |
| 1600 | Verbindlichkeiten aus Lieferungen und Leistungen |
| 1770 | Umsatzsteuer 19% |
| 1771 | Umsatzsteuer 7% |
| 1780 | Umsatzsteuer-Vorauszahlungen |
| 1790 | Umsatzsteuer Vorjahr |
| 1800 | Privatentnahmen allgemein |
| 1890 | Privateinlagen |

#### Aufwandskonten (Klasse 4)
| Konto | Bezeichnung |
|-------|-------------|
| 4100 | Loehne |
| 4120 | Gehaelter |
| 4130 | Gesetzliche Sozialaufwendungen |
| 4200 | Raumkosten / Miete |
| 4210 | Miete (unbewegliche Wirtschaftsgueter) |
| 4240 | Gas, Strom, Wasser |
| 4250 | Reinigung |
| 4260 | Instandhaltung Raeume |
| 4300 | Beitraege und Versicherungen |
| 4360 | Bueroversicherungen |
| 4400 | Versicherungen |
| 4500 | Fahrzeugkosten |
| 4510 | Kfz-Steuer |
| 4520 | Kfz-Versicherungen |
| 4530 | Laufende Kfz-Betriebskosten |
| 4540 | Kfz-Reparaturen |
| 4570 | Fremdfahrzeuge (Mietwagen, Taxi) |
| 4580 | Sonstige Fahrzeugkosten |
| 4600 | Werbekosten |
| 4610 | Werbekosten |
| 4630 | Geschenke bis 50 EUR |
| 4635 | Geschenke ueber 50 EUR (nicht abzugsfaehig) |
| 4640 | Repraesentationskosten |
| 4650 | Bewirtungskosten (70% abzugsfaehig) |
| 4654 | Nicht abzugsfaehige Bewirtungskosten (30%) |
| 4660 | Reisekosten Arbeitnehmer |
| 4670 | Reisekosten Unternehmer |
| 4700 | Kosten der Warenabgabe (Verpackung, Versand) |
| 4800 | Reparaturen und Instandhaltung |
| 4900 | Sonstige betriebliche Aufwendungen |
| 4910 | Porto |
| 4920 | Telefon |
| 4921 | Internet |
| 4930 | Buerokosten / Bueromaterial |
| 4940 | Zeitschriften und Buecher |
| 4950 | Rechts- und Beratungskosten |
| 4955 | Buchfuehrungskosten |
| 4960 | Miete fuer Einrichtungen (Leasing) |
| 4970 | Nebenkosten des Geldverkehrs (Bankgebuehren) |
| 4980 | Sonstige betriebliche Aufwendungen |

#### Erloeskonten (Klasse 8)
| Konto | Bezeichnung |
|-------|-------------|
| 8100 | Steuerfreie Umsaetze (Export) |
| 8120 | Steuerfreie innergemeinschaftliche Lieferungen |
| 8300 | Erloese 7% USt |
| 8400 | Erloese 19% USt |
| 8500 | Provisionseinnahmen |
| 8700 | Erloese aus Vermoegensgegenstaenden 19% |
| 8900 | Sonstige betriebliche Ertraege |
| 8920 | Ertraege aus Wertminderung von Gegenstaenden des UV |

### Steuersaetze und USt-Konten

| Steuersatz | Vorsteuer-Konto | Umsatzsteuer-Konto | Anwendung |
|------------|----------------|---------------------|-----------|
| **19%** | 1576 | 1770 | Standard (die meisten Waren und Dienstleistungen) |
| **7%** | 1571 | 1771 | Ermaessigt (Lebensmittel, Buecher, Zeitschriften, OEPNV) |
| **0%** | - | - | Steuerfreie Umsaetze (Export, innergemeinschaftlich, Kleinunternehmer) |

### Typische Buchungssaetze

#### Eingangsrechnung (Einkauf) — z.B. Bueromaterial 100 EUR netto + 19% USt
```
Soll: 4930 Buerokosten           100,00 EUR
Soll: 1576 Vorsteuer 19%          19,00 EUR
Haben: 1600 Verbindlichkeiten    119,00 EUR
```

#### Ausgangsrechnung (Verkauf) — z.B. Dienstleistung 1.000 EUR netto + 19% USt
```
Soll: 1400 Forderungen          1.190,00 EUR
Haben: 8400 Erloese 19%         1.000,00 EUR
Haben: 1770 Umsatzsteuer          190,00 EUR
```

#### Bankzahlung an Lieferant — z.B. Rechnung 119 EUR bezahlen
```
Soll: 1600 Verbindlichkeiten    119,00 EUR
Haben: 1200 Bank                119,00 EUR
```

#### Zahlungseingang vom Kunden — z.B. Rechnung 1.190 EUR erhalten
```
Soll: 1200 Bank                1.190,00 EUR
Haben: 1400 Forderungen        1.190,00 EUR
```

#### Barausgabe — z.B. Briefmarken 10 EUR
```
Soll: 4910 Porto                 10,00 EUR
Haben: 1000 Kasse                10,00 EUR
```

#### Privatentnahme — z.B. 500 EUR
```
Soll: 1800 Privatentnahmen      500,00 EUR
Haben: 1200 Bank                500,00 EUR
```

---

## C. Buchhaltungsbutler — Bedienungsanleitung

### Navigation (Hauptmenue links)
- **Dashboard**: Uebersicht, offene Aufgaben, To-Do-Liste
- **Belege**: Eingangsbelege und Ausgangsbelege hochladen und verwalten
- **Zahlungen**: Banktransaktionen, Zuordnung zu Belegen
- **Buchen**: Buchungen erstellen und bearbeiten
- **Rechnungen**: Ausgangsrechnungen, Angebote, Gutschriften erstellen
- **Auswertungen**: BWA, EUeR, Bilanz, Kontoauszuege
- **Einstellungen**: Kontenrahmen, Bankverbindungen, Automatisierungsregeln

### Belegerfassung (Belege hochladen)

**Upload-Methoden:**
- Drag-and-Drop in der Web-App
- E-Mail-Weiterleitung an die zugewiesene Adresse
- BuchhaltungsButler Scan-App (mobil)
- Dropbox-Synchronisation
- GetMyInvoices-Integration

**Unterstuetzte Formate:** PDF, JPEG, PNG, TIFF, ZUGFeRD, XRechnung

**Verarbeitungsprozess:**
1. Beleg wird hochgeladen
2. OCR (ABBYY) erkennt Text automatisch
3. Betrag, Datum, Lieferant werden extrahiert
4. System schlaegt Kontierung vor (lernt aus Korrekturen)
5. User prueft und bestaetigt

### Felder beim Beleg buchen
- **Debitor/Kreditor**: Geschaeftspartner zuordnen
- **Buchungskonto**: SKR03-Konto waehlen (z.B. 4930 Buerokosten)
- **Steuersatz**: 0%, 7% oder 19% auswaehlen
- **Kostenstelle**: Optional, fuer Auswertung nach Bereichen
- **Buchungstext**: Beschreibung der Buchung
- **Belegnummer**: Interne Referenznummer

### Besonderheiten nach Buchhaltungsart
- **EUeR-Nutzer**: Aufwand/Ertrag wird NICHT am Beleg erfasst, sondern erst bei der Zahlung im Bereich "Zahlungen"
- **Bilanzierer**: Aufwand/Ertrag wird direkt am Beleg erfasst

### Magic Flow
- Button oben rechts in der Beleg-Detailansicht
- Erscheint wenn: OCR-Erkennung UND Zahlungszuordnung beide vollstaendig
- Ein Klick bestaetigt die gesamte Buchung
- Spart Zeit bei korrekt erkannten Belegen

### Bank-Anbindung
- Ueber 5.000 Banken via finAPI/Qwist
- Taeglicher automatischer Kontoauszugs-Import
- PayPal, Stripe, Amazon, eBay, Shopify
- Manueller CSV-Import moeglich

### Automatisierungsregeln
- Unter Einstellungen konfigurierbar
- Bedingungen: Keywords im Verwendungszweck, Betraege, Lieferanten
- Aktionen: Automatische Kontierung, Steuersatz, Kostenstelle
- System lernt zusaetzlich aus manuellen Buchungen

### ELSTER-Integration
- USt-Voranmeldung direkt aus BuchhaltungsButler
- Ein-Klick-Uebermittlung ans Finanzamt
- eBilanz+ fuer E-Bilanz-Uebertragung

### DATEV-Export
- Fuer Uebergabe an den Steuerberater
- GDPdU-Export fuer Betriebspruefungen
- Export der Buchungsstapel im DATEV-Format

---

## Hilfe-Modus

Wenn der User eine Buchungsfrage stellt:
1. Identifiziere den Geschaeftsvorfall
2. Bestimme die betroffenen Konten (Soll und Haben)
3. Nenne Kontonummern und -bezeichnungen aus SKR03
4. Zeige den vollstaendigen Buchungssatz mit Betraegen
5. Erklaere bei Bedarf die Logik dahinter

Wenn der User nicht sicher ist, welches Konto:
1. Frage nach der Art des Aufwands/Ertrags
2. Schlage 2-3 passende Konten vor
3. Erklaere die Unterschiede
4. Lass den User waehlen

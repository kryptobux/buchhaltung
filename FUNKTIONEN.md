# Funktions-Benchmark Buchhaltungssoftware (Markterhebung)

Stand 2026-06-11. Erhebung über die offiziellen Funktions-/Preisseiten von 8 Produkten
(sevDesk, Lexware Office, BuchhaltungsButler, WISO MeinBüro Web, Papierkram, FastBill,
Collmex, easybill). Bewertungsmaßstab: unser Anwendungsfall — VV-Immobilien-GmbH +
Holding, bilanzierend, 10–50 Buchungen/Monat. Rechtliche Anforderungen: [ANFORDERUNGEN.md](ANFORDERUNGEN.md).

## A) Feature-Matrix

✓ vorhanden · ✗ nicht vorhanden · € nur teurerer Tarif · ~ eingeschränkt · k.A. nicht ausgewiesen

| Funktionsbereich | sevDesk | Lexware | BHButler | WISO | Papierkram | FastBill | Collmex | easybill |
|---|---|---|---|---|---|---|---|---|
| Belegerfassung (OCR/KI, E-Mail, Scan-App) | € | ✓ | ✓ | € | ✓ (KI €) | ✓ | ~ | ~ |
| E-Rechnung erstellen (XRechnung/ZUGFeRD) | ✓ | ✓ | ✓ | ✓ | € | ✓ | ✓ | ✓ |
| E-Rechnung empfangen/auslesen | € | ✓ | ✓ | € | ✓ | ✓ | ✓ | ✓ |
| Rechnungsstellung (Angebote, wiederkehrend, Mahnung) | ✓/€ | € | ✓ | ✓/€ | ✓/€ | ✓ | ✓ | ✓✓ (Kern) |
| Banking (Anbindung, Auto-Abgleich, Regeln, lernend) | € | ✓ | ✓ (stark) | € | ✓ | ✓ | ~ (nur Import) | ✗ |
| Doppelte BuFü, SKR03/04, Split, Vorlagen | ~ | ~ | ✓ | ~ | ~ (Kategorien) | ✗ | ✓ | ✗ |
| OPOS / Debitoren / Kreditoren | ~ | ✓ | ✓ (Nebenbücher) | ✓ | ~ | ✓ | ✓ | ~ |
| Anlagenbuchhaltung / AfA | € | € | ✓ | € | ✓ | ✗ | ✓ | ✗ |
| Kassenbuch | € | € | ✓ | € | ✓ | ✗ | ✓ | ✗ |
| BWA / SuSa / GuV / **Bilanz** | ~ (keine Bilanz) | ~ (keine Bilanz) | ✓ inkl. Bilanz | ~ (keine Bilanz) | ~ (keine Bilanz) | ~ | ✓ inkl. Bilanz | ✗ |
| UStVA-ELSTER, ZM, EÜR, **E-Bilanz** | € (keine E-Bil.) | € | ✓ (UStVA+ZM) | € | ~ (nur XML) | ~ | ✓ (**inkl. E-Bilanz**) | ✗ |
| GoBD: Festschreibung, Prüfer-Export | ~ k.A. | ✓ | ✓ (**Z3/GDPdU**) | ~ k.A. | ✓ | ~ k.A. | ✓ | ~ |
| DATEV-Export / -Schnittstellen | ✓ | ✓ (+Cloud-Services) | ✓ (+Belege) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Steuerberater-Zugang | ✓ | ✓ (gratis) | € | ✓ | € | ✓ | ✓ | ✓ |
| Mandanten-/Mehrfirmenfähig | ✗ | ✗ | ~ (je Firma Account) | € | ✗ | k.A. | ✓ (**Unterfirmen**) | ~ |
| Dokumentenablage / Archiv | ✓ | ✓ | ✓ (Volltext) | ✓ | ✓ | ✓ | ✓ | ✓ |
| API / Schnittstellen / Importe | € | € | ✓ | € | ✓ (Beta) | ✓ | ✓ | ✓ |
| Datenexport/-zugriff nach Kündigung | k.A. | ✓ | ✓ | ✓ (Lesemodus) | ✓ | ~ | ✓ (**10 J. gratis lesen**) | ~ |

Quellen: sevdesk.de/funktionen · lexware.de/funktionen + /preise · buchhaltungsbutler.de/funktionen · meinbuero.de + /preise · papierkram.de/funktionen + /preise · fastbill.com/funktionen · collmex.de + /buchhaltungssoftware.html · easybill.de/funktionen

## B) Marktstandard (haben praktisch alle)

E-Rechnung erstellen + empfangen (8/8) · Rechnungs-/Mahnwesen · wiederkehrende Rechnungen · Beleg-Upload mit OCR + E-Mail-Inbox + Scan-App · Bankanbindung mit Auto-Abgleich · UStVA via ELSTER · EÜR-Bericht · DATEV-Export (8/8) · Steuerberater-Workflow (8/8) · GoBD-Belegarchiv · OPOS-Übersicht/Dashboard.

## C) Einordnung für UNSEREN Fall

### Notwendig (Benchmark-Sicht) — Abgleich mit Eigenbau

| # | Funktion | Eigenbau | Karte |
|---|----------|----------|-------|
| 1 | Doppelte BuFü Soll/Haben SKR03 | ✅ vorhanden | — |
| 2 | GuV + Bilanz | ✅ vorhanden (Alleinstellung! s. E) | — |
| 3 | SuSa + Journal | ✅ vorhanden (SuSa-Export fehlt) | B15 |
| 4 | Festschreibung/GoBD + Storno | 🟡 vorhanden, Lücken | B7–B12 |
| 5 | DATEV-Export zuverlässig | ❌ Beta mit Fehlern | B13 |
| 6 | Mandantenfähigkeit (2 GmbHs) | ✅ vorhanden (Markt: meist 2. Lizenz nötig!) | — |
| 7 | Splitbuchungen | ✅ Steuer-Split; freie Mehrzeiler fehlen | — (beobachten) |
| 8 | Wiederkehrende Buchungen/Vorlagen | 🟡 nur „kopieren" | **B19 → Phase 2** |
| 9 | Anlagenbuchhaltung/Gebäude-AfA | ❌ manuell | **B21 neu** |
| 10 | E-Rechnungs-Empfang + Belegarchiv mit Beleg-Bezug | ❌ | **B18 → Phase 2, B22 neu** |

### Nice-to-have mit echtem Nutzen
Bank-Import mit Abgleich (B20, als CSV-Variante) · Zuordnungsregeln/Lernfunktion (Erweiterung von B20) · OPOS-Mietrückstände (KANN) · BWA (✅ vorhanden) · StB-Zugang (entfällt: Export-Workflow) · OCR (entfällt bei ~30 Belegen/Monat) · UStVA-Direktversand (entfällt, Befreiung anstreben) · E-Bilanz in-App (entfällt, StB/myebilanz) · Mahnwesen (KANN).

### Irrelevant für diesen Fall
Angebots-/Auftragswesen, Lieferscheine, Warenwirtschaft/Lager, Lohn, Zeiterfassung/Projekte, CRM/Kundenportal, Shop-Schnittstellen, OSS, Kassenbuch (bar-frei!), Layout-Designer.

## D) Auffälligkeiten

**Eigenbau schlägt hier den halben Markt:**
- **Bilanz**: sevDesk, Lexware, WISO, Papierkram, FastBill, easybill erstellen KEINE Bilanz (nur EÜR/GuV) — nur BHButler und Collmex können sie. Der Eigenbau auch.
- **Mandantenfähigkeit**: bei den meisten Anbietern = zweiter kostenpflichtiger Account; Eigenbau hat sie nativ.
- **Freies Soll/Haben-Buchen + SuSa**: in dieser Preisklasse nur BHButler/Collmex; sevDesk führt SuSa nur als Beta im Top-Tarif.

**Größte objektive Lücken des Eigenbaus (Reihenfolge = Risiko):**
1. localStorage statt gesichertem Speicher — Risikolücke Nr. 1 (adressiert durch B2′/B7/B12 + Backup-Disziplin/Verfahrensdoku, bleibt aber architekturbedingt)
2. DATEV-Export Beta-Qualität (B13)
3. Betriebsprüfer-Export Z3/GDPdU (B14)
4. Beleg↔Buchung-Verknüpfung/Archiv (B18)
5. E-Rechnungs-Empfang XRechnung/ZUGFeRD (B22)
6. Anlagenspiegel/AfA-Automatik (B21)
7. Bankabgleich (B20, nur als CSV-Import sinnvoll — PSD2-Anbindung ist ohne Server unmöglich)
8. Mehrbenutzer/StB-Zugang — architekturbedingt nicht lösbar; Workaround: Exporte (akzeptiert)

**Konsequenz fürs Backlog:** B18 (Beleg-Verknüpfung) und B19 (Buchungsvorlagen) steigen von Phase 3 in Phase 2 auf; neu: B21 (Anlagenspiegel light + AfA) und B22 (E-Rechnungs-Ablage/Viewer); ELSTER-Direktversand, OCR und In-App-E-Bilanz bleiben bewusst draußen.

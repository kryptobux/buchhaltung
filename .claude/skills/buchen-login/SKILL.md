---
name: buchen-login
description: |
  Login in Buchhaltungsbutler. Navigiert zur App, fragt nach Zugangsdaten, loggt ein.
  Trigger: "einloggen", "anmelden", "login", "Buchhaltungsbutler oeffnen".
---

# Buchhaltungsbutler Login

## Schritte

1. `tabs_context_mcp` mit `createIfEmpty: true`
2. Neuen Tab erstellen oder bestehenden auf `app.buchhaltungsbutler.de` nutzen
3. `navigate` zu `https://app.buchhaltungsbutler.de`
4. Screenshot machen

5. **Falls bereits eingeloggt** (Dashboard sichtbar): Melden "Bereits eingeloggt." und fertig.

6. **Falls Login-Seite sichtbar:**
   - User fragen: "Bitte gib deine E-Mail und dein Passwort fuer Buchhaltungsbutler ein. Die Zugangsdaten werden NICHT gespeichert."
   - `find` das E-Mail-Eingabefeld
   - `form_input` mit der E-Mail
   - `find` das Passwort-Eingabefeld
   - `form_input` mit dem Passwort
   - `find` den Login/Anmelden-Button
   - `computer` mit `left_click` auf den Button
   - 3 Sekunden warten (`computer` mit `wait`)
   - Screenshot machen

7. **Falls 2FA-Abfrage erscheint:**
   - User fragen: "Es wird ein Bestaetigungscode benoetigt. Bitte gib den Code ein."
   - `find` das Code-Eingabefeld
   - `form_input` mit dem Code
   - Submit-Button finden und klicken
   - Screenshot machen

8. **Verifizierung:**
   - Dashboard sollte sichtbar sein
   - Melden: "Login erfolgreich! Was moechtest du tun?"

## Sicherheit

- Zugangsdaten werden **NIEMALS** gespeichert, geloggt oder in Dateien geschrieben
- Bei jedem Session-Start neu abfragen
- Passwort nicht in der Antwort wiederholen

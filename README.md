## 🚀 Funktionen

- Benutzerregistrierung und -anmeldung
- Bücher erstellen, lesen, aktualisieren und löschen (CRUD)
- Nur authentifizierte Benutzer können Bücher verwalten

## 🔐 Authentifizierung (JWT)

- Benutzer können sich registrieren und anmelden.
- Nach erfolgreichem Login erhalten sie ein JWT-Token.
- Der Token muss im Header `Authorization` als `Bearer <token>` gesendet werden.

## 📚 API-Endpunkte

### Authentifizierung:
- `POST /api/auth/register` – Benutzer registrieren
- `POST /api/auth/login` – Benutzer anmelden

### Bücher (authentifiziert):
- `GET /api/books` – Alle Bücher abrufen
- `GET /api/books/:id` – Ein bestimmtes Buch abrufen
- `POST /api/books` – Neues Buch hinzufügen
- `PUT /api/books/:id` – Buch aktualisieren
- `DELETE /api/books/:id` – Buch löschen

## run

npm start

 
 

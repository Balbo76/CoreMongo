# 🧀 AtlasScale - Dashboard Project

**AtlasScale** è un progetto di dashboard amministrativa full-stack sviluppato per esplorare l'integrazione tra React Router 7 ed Express 5 in un ambiente monorepo. L'obiettivo principale è l'applicazione di pratiche solide per la sicurezza, la gestione dei dati e l'organizzazione del codice.

---

## 🚀 Funzionalità

- **Autenticazione:** Gestione delle sessioni tramite JWT (JSON Web Tokens).
- **Rotte Protette:** Layout dedicato per l'area riservata con controllo dell'accesso lato client.
- **Interfaccia Utente:** Sviluppata con TailwindCSS e piccole animazioni tramite Framer Motion per migliorare l'interazione.
- **Validazione Unificata:** Condivisione degli schemi di validazione (Zod) tra frontend e backend.

---

## 🏗️ Architettura

Il progetto è organizzato come un **Monorepo** utilizzando gli workspace di npm:

- **`/frontend`**: Applicazione React Router 7. Recentemente è stato eseguito un refactoring per separare la logica delle rotte protette (`_protected.tsx`) dalla struttura visuale (`DashboardLayout.tsx`), migliorando la leggibilità.
- **`/backend`**: API REST costruita con Express 5. Include un sistema centralizzato per la gestione degli errori e middleware per la sicurezza.
- **`/shared`**: Pacchetto contenente i tipi TypeScript e gli schemi Zod utilizzati da entrambi i servizi.

---

## 🛡️ Sicurezza Implementata

La sicurezza è stata gestita attraverso diversi livelli di protezione:

1.  **Validazione degli Input:** Ogni richiesta al backend viene verificata tramite schemi Zod definiti nel pacchetto shared.
2.  **Protezione Database:** Utilizzo di `mongo-sanitize` per prevenire attacchi di tipo NoSQL Injection.
3.  **Header HTTP:** Configurazione di header di sicurezza tramite `Helmet.js` (protezione XSS, Clickjacking, ecc.).
4.  **Rate Limiting:** Limitazione delle richieste per IP per mitigare tentativi di brute-force.
5.  **Crittografia:** Hashing delle password tramite Bcrypt prima del salvataggio nel database.

---

## 🛠️ Tech Stack

| Tecnologia | Utilizzo |
| :--- | :--- |
| **React Router 7** | Framework Frontend |
| **Express 5** | Framework Backend |
| **MongoDB** | Database NoSQL |
| **Mongoose** | Object Data Modeling (ODM) per MongoDB |
| **TypeScript** | Linguaggio di programmazione |
| **Zod** | Validazione dati |
| **TailwindCSS** | Styling |
| **Headless UI** | Componenti UI accessibili e senza stile |
| **Docker** | Containerizzazione |

---

## 📈 Stato del Progetto

### ✅ Completato
- [x] Setup dell'architettura Monorepo.
- [x] Sistema di autenticazione e protezione delle rotte.
- [x] Implementazione dei principali middleware di sicurezza.
- [x] Refactoring del layout della dashboard per una migliore modularità.
- [x] Dockerizzazione dell'intero stack.

### 🛠️ Da Implementare
- [ ] Estensione della copertura dei test (attualmente presenti test base per l'autenticazione).
- [ ] Introduzione di Skeleton Screens per i caricamenti asincroni.
- [ ] Configurazione di una pipeline CI/CD per test e linting automatizzati.

---

## ⚙️ Setup

Il progetto è configurato per essere eseguito tramite Docker Compose.

1.  **Configurazione:**
    Crea i file `.env` nelle cartelle `frontend` e `backend` partendo dai file `.env.example`.
2.  **Esecuzione:**
    ```bash
    docker compose up -d --build
    ```

### Accesso
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:3001`
- **Mongo Express:** `http://localhost:8081`

---
*Progetto creato a scopo didattico e professionale per testare l'integrazione di tecnologie moderne.*

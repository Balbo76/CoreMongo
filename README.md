# 🧀 CoreMongo - Dashboard Project

**CoreMongo** è un progetto di dashboard amministrativa full-stack sviluppato per esplorare l'integrazione tra React Router 7 ed Express 5 in un ambiente monorepo. L'obiettivo principale è l'applicazione di pratiche solide per la sicurezza, la gestione dei dati e l'organizzazione del codice.

---

## 🏗️ Architettura e Funzionalità

Il progetto è strutturato come un **Monorepo** utilizzando npm workspaces, permettendo una gestione centralizzata del codice e una condivisione efficiente di tipi e logiche tra frontend e backend.

### 💻 Frontend (React Router 7)
L'applicazione client è costruita per offrire un'esperienza utente fluida e reattiva, sfruttando le potenzialità del nuovo **React Router 7** (precedentemente Remix).
- **Core Stack**: `React 19` e `React Router 7` per il rendering e il routing.
- **Styling**: `TailwindCSS v4` per un design moderno e scalabile.
- **UI Components**: `Headless UI` per componenti accessibili e `Framer Motion` per animazioni e transizioni di pagina (`PageTransition.tsx`).
- **Autenticazione**: Gestione delle sessioni tramite JWT salvati in modo sicuro, con logica di protezione delle rotte centralizzata in `_protected.tsx`.
- **Layout**: Sistema modulare con `DashboardLayout.tsx` per separare la struttura della dashboard dalla logica di navigazione.

### ⚙️ Backend (Express 5)
L'API REST è progettata seguendo i principi di modularità e sicurezza, utilizzando le ultime versioni del framework Express.
- **Framework**: `Express 5` per una gestione ottimizzata delle richieste e delle rotte.
- **Database**: `MongoDB` interfacciato tramite `Mongoose`, garantendo schemi di dati chiari e validazione ODM.
- **Sicurezza**: Implementazione di `Helmet.js` per gli header di sicurezza, `express-rate-limit` per la prevenzione di attacchi brute-force e `mongo-sanitize` per bloccare NoSQL Injection.
- **Middleware**: Sistema centralizzato per la gestione degli errori (`errorHandler.ts`) e middleware di validazione basati su Zod.
- **Autenticazione**: Hashing delle password con `Bcrypt` e generazione di token tramite `jsonwebtoken`.

### 📦 Shared Package
Il cuore della coerenza del progetto risiede nel pacchetto `/shared`.
- **Single Source of Truth**: Gli schemi di validazione `Zod` sono definiti qui e utilizzati sia dal backend (per validare le request) che dal frontend (per la validazione dei form).
- **Type Safety**: Condivisione dei tipi TypeScript per assicurare che i dati siano coerenti lungo tutto il flusso (API -> Client).

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

| Tecnologia | Utilizzo | Versione |
| :--- | :--- | :--- |
| **React Router 7** | Framework Frontend & Routing | 7.15.0 |
| **Express 5** | Framework Backend API | 5.2.1 |
| **MongoDB / Mongoose** | Database NoSQL & ODM | Mongoose 9.6.2 |
| **TypeScript** | Linguaggio di programmazione | 6.0.3 (Backend) / 5.9.3 (Frontend) |
| **Zod** | Validazione dati (Shared) | 4.4.3 |
| **TailwindCSS** | Styling (Utility-first CSS) | 4.2.2 |
| **Headless UI** | Componenti UI accessibili | 2.2.10 |
| **Framer Motion** | Animazioni e Transizioni | 12.38.0 |
| **JWT / Bcrypt** | Sicurezza e Autenticazione | - |
| **Docker** | Containerizzazione | - |
| **Vitest** | Unit & Integration Testing | 3.0.0 |

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

Il progetto è configurato per essere gestito comodamente tramite **Docker** e script **NPM** centralizzati nella root.

### 1. Configurazione Variabili d'Ambiente
Prima di iniziare, crea i file `.env` nelle cartelle `frontend` e `backend` partendo dai file `.env.example`:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Gestione tramite NPM Scripts (Consigliato)
Dalla root del progetto, puoi utilizzare i seguenti comandi per gestire l'intero stack Docker:

- **Avvio Sviluppo:**
  ```bash
  npm run docker:dev
  ```
- **Build Completa (senza cache):**
  ```bash
  npm run docker:build
  ```
- **Arresto Stack:**
  ```bash
  npm run docker:stop
  ```
- **Visualizzazione Log:**
  ```bash
  npm run docker:logs
  ```
- **Esecuzione Test:**
  ```bash
  npm run test
  ```

### 3. Modalità Produzione
Per testare l'applicazione in un ambiente simile alla produzione:

- **Build e Avvio Produzione:**
  ```bash
  npm run prod:build && npm run prod:up
  ```
- **Arresto Produzione:**
  ```bash
  npm run prod:stop
  ```
- **Log Produzione:**
  ```bash
  npm run prod:logs
  ```

### 4. Accesso ai Servizi
Una volta avviato lo stack:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:3001`
- **Mongo Express:** `http://localhost:8081` (Interfaccia web per MongoDB)

---
*Progetto creato a scopo didattico e professionale per testare l'integrazione di tecnologie moderne.*

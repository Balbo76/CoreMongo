# 🧀 CoreMongo - Dashboard Project

**CoreMongo** è un progetto di dashboard amministrativa full-stack sviluppato per esplorare l'integrazione tra React Router 7 ed Express 5 in un ambiente monorepo. L'obiettivo principale è l'applicazione di pratiche solide per la sicurezza, la gestione dei dati e l'organizzazione del codice.

---

## 🏗️ Architettura e Funzionalità

Il progetto è strutturato come un **Monorepo** utilizzando npm workspaces, permettendo una gestione centralizzata del codice e una condivisione efficiente di tipi e logiche tra frontend e backend.

### 💻 Frontend (React Router 7)
L'applicazione client è costruita per offrire un'esperienza utente fluida e reattiva, sfruttando le potenzialità del nuovo **React Router 7** (precedentemente Remix).
- **Core Stack**: `React 19` e `React Router 7`.
- **Styling**: `TailwindCSS v4`.
- **UI Components**: `Headless UI` e `Framer Motion` per animazioni (`PageTransition.tsx`).
- **Autenticazione**: JWT gestiti via cookie/header sicuri.
- **Layout**: Sistema modulare con `DashboardLayout.tsx`.

### ⚙️ Backend (Express 5)
L'API REST è progettata seguendo i principi di modularità e sicurezza.
- **Framework**: `Express 5`.
- **Database**: `MongoDB` interfacciato tramite `Mongoose`.
- **Sicurezza**: `Helmet.js`, `express-rate-limit` e `mongo-sanitize`.
- **Validazione**: Middleware basati su **Zod** per il controllo degli input.

### 📦 Shared Package
- **Single Source of Truth**: Gli schemi di validazione `Zod` e i tipi TypeScript sono condivisi tra frontend e backend per garantire coerenza totale dei dati.

---

## 🛡️ Sicurezza e HTTPS

Il progetto implementa una gestione avanzata dell'HTTPS sia in locale che in produzione.

### 1. Local HTTPS (mkcert) - Default Prod Mode
Per testare l'applicazione in un ambiente identico alla produzione ma sulla propria macchina, utilizziamo **mkcert**.
1.  **Installa mkcert**: `brew install mkcert` (macOS) o `sudo apt install mkcert` (Linux).
2.  **Genera certificati**: `npm run mkcert`.
3.  **Avvia**: `npm run prod:up`.
4.  **Accesso**: `https://localhost`.

### 2. Production SSL (Certbot & Let's Encrypt)
Per il deploy su un server pubblico con un dominio reale:
1.  **Configura**: Modifica il dominio in `deploy/nginx/nginx.prod-www.conf` e `deploy/nginx/init-ssl.sh`.
2.  **Inizializza SSL**: `npm run ssl:init`. Questo script gestirà il challenge di Let's Encrypt.
3.  **Avvia**: `npm run prod-www:up`.

---

## 🛠️ Tech Stack

| Tecnologia | Utilizzo | Versione |
| :--- | :--- | :--- |
| **React Router 7** | Framework Frontend & Routing | 7.15.0 |
| **Express 5** | Framework Backend API | 5.2.1 |
| **MongoDB / Mongoose** | Database NoSQL & ODM | Mongoose 9.6.2 |
| **TypeScript** | Linguaggio di programmazione | 6.0.3+ |
| **Zod** | Validazione dati (Shared) | 4.4.3 |
| **TailwindCSS** | Styling (Utility-first CSS) | 4.2.2 |
| **Nginx** | Reverse Proxy & SSL Gateway | Alpine |
| **Certbot** | Gestione SSL Let's Encrypt | - |
| **Docker** | Containerizzazione | - |

---

## ⚙️ Setup & Comandi

### 1. Variabili d'Ambiente
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Script di Gestione (Root)

| Comando | Descrizione | Ambiente |
| :--- | :--- | :--- |
| `npm run docker:dev` | Avvio rapido per sviluppo (HTTP) | Docker Compose base |
| `npm run mkcert` | Genera chiavi SSL locali per localhost | Locale |
| `npm run prod:up` | **Default Prod**: Avvio HTTPS su localhost | `docker-compose.prod.yml` |
| `npm run prod-www:up`| Avvio HTTPS su Dominio Reale | `docker-compose.prod-www.yml` |
| `npm run ssl:init` | Primo setup certificati Let's Encrypt | Certbot |
| `npm run test` | Esegue la suite di test nel container | Backend |
| `npm run docker:clean`| Pulisce volumi e builder cache | - |

### 3. Accesso ai Servizi

**Modalità Sviluppo (`docker:dev`):**
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3001`

**Modalità Produzione Locale (`prod:up`):**
- **Frontend/API Gateway**: `https://localhost` (Porte 80/443)
- **Backend**: Nascosto dietro Nginx

---
*Progetto creato a scopo didattico e professionale per testare l'integrazione di tecnologie moderne.*

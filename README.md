# 🧀 CoreMongo - Dashboard Amministrativa Professionale

**CoreMongo** è una dashboard amministrativa full-stack robusta, progettata con un'architettura moderna e ad alte prestazioni. Il progetto funge da implementazione di riferimento per l'integrazione di **React Router 7 (Remix)** con **Express 5** in un ambiente **Monorepo** completamente tipizzato.

L'obiettivo è fornire una base solida che enfatizzi la sicurezza, la scalabilità e l'esperienza di sviluppo, integrando un livello di validazione condiviso e strategie di deployment containerizzate avanzate.

---

## 🚀 Funzionalità Principali

- **Architettura Monorepo Unificata**: Gestita tramite npm workspaces per una condivisione fluida di codice, tipi e logiche tra frontend e backend.
- **Framework React Router 7**: Sfrutta le ultime capacità client/server per un'esperienza utente reattiva e veloce.
- **Backend Express 5**: Un'API modulare e sicura costruita sull'ultima evoluzione di Express.
- **Validazione Condivisa**: Schemi **Zod** e tipi TypeScript condivisi tra frontend e backend per garantire una "Single Source of Truth".
- **Autenticazione Avanzata**: Sistema sicuro basato su JWT con rotte protette e gestione delle sessioni.
- **Interfaccia UI/UX Moderna**:
  - **TailwindCSS v4**: Styling di nuova generazione utility-first.
  - **Headless UI**: Componenti UI accessibili e pronti all'uso.
  - **Framer Motion**: Transizioni di pagina fluide e animazioni interattive.
- **Sicurezza di Grado Production**:
  - **Helmet.js** per l'hardening degli header HTTP lato backend.
  - **Hardening Nginx**: Implementazione di header di sicurezza (`X-Frame-Options`, `CSP`, `X-Content-Type-Options`) per protezione totale contro Clickjacking e attacchi lato client.
  - **Rate Limiting** per prevenire attacchi brute-force.
  - **Sanitizzazione MongoDB** per proteggere da NoSQL injection.
  - **Supporto HTTPS/SSL Completo** (sia locale che produzione).
- **DevOps Integrato**: Build Docker multi-stage e reverse proxy Nginx.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React Router 7](https://reactrouter.com/) (v7.15.0)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (v4.2.2)
- **Componenti**: Headless UI, Framer Motion
- **Tooling**: Vite, TypeScript

### Backend
- **Framework**: [Express 5](https://expressjs.com/) (v5.2.1)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) (v9.6.2)
- **Validazione**: [Zod](https://zod.dev/) (v4.4.3)
- **Sicurezza**: Helmet, Express-Rate-Limit, BCrypt, JWT

### Infrastruttura
- **Containerizzazione**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (Alpine)
- **SSL**: mkcert (Locale)

---

## 📂 Struttura del Progetto

```text
CoreMongo/
├── backend/            # API Express 5
│   ├── src/
│   │   ├── middleware/ # Auth, validazione e gestione errori
│   │   ├── models/     # Schemi Mongoose
│   │   ├── routes/     # Endpoint API (Auth, User)
│   │   └── validations/# Logica di validazione specifica per le rotte
│   └── tests/          # Suite di test (Vitest + Supertest)
├── frontend/           # Applicazione React Router 7
│   ├── app/
│   │   ├── components/ # Componenti UI modulari (Admin, UI, Form)
│   │   ├── routes/     # Pagine e logica di routing
│   │   └── utils/      # Helper lato client (Auth, API)
│   └── public/         # Asset statici
├── shared/             # Logica e Tipi Condivisi (NPM Workspace)
│   └── src/            # Schemi Zod e tipi globali
├── deploy/             # Configurazioni di deployment
│   └── nginx/          # Configurazioni Nginx per vari ambienti
├── compose.yaml        # Orchestrazione Sviluppo
└── docker-compose.prod.yml # Orchestrazione Produzione
```

---

## 🚦 Inizio Rapido

### 1. Prerequisiti
- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) & Docker Compose
- [mkcert](https://github.com/FiloSottile/mkcert) (per test HTTPS in locale)

### 2. Configurazione Ambiente
Configura le variabili d'ambiente per entrambi i servizi:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 3. Modalità Sviluppo (HTTP)
Avvia l'intero stack in modalità sviluppo:
```bash
npm run docker:dev
```
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001`

### 4. Simulazione Produzione Locale (HTTPS)
Testa le build di produzione e la terminazione SSL sulla tua macchina:
```bash
npm run mkcert      # Genera CA locale e certificati (installa CA nel sistema)
npm run prod:up     # Avvia Nginx + SSL + Build di produzione
```
- **Accesso**: `https://localhost`

---

## 🧪 Test e Qualità

- **Test Unitari/Integrazione**: Assicurati che i container siano avviati (`npm run docker:dev`), quindi esegui la suite di test del backend:
  ```bash
  npm run test
  ```
- **Linting**: Esegui ESLint su tutto il monorepo:
  ```bash
  npm run lint
  ```
- **Type Checking**: TypeScript è rigorosamente applicato per garantire stabilità e prevenire errori a runtime.

---

## 🤝 Contribuire

Questo progetto è stato sviluppato come dimostrazione professionale di pattern full-stack moderni. I contributi sono benvenuti!
1.  Fai un Fork del progetto.
2.  Crea il tuo branch per la funzionalità (`git checkout -b feature/NuovaFeature`).
3.  Fai il commit delle tue modifiche (`git commit -m 'Aggiunta NuovaFeature'`).
4.  Pusha il branch (`git push origin feature/NuovaFeature`).
5.  Apri una Pull Request.

---

## 📜 Licenza

Distribuito sotto Licenza MIT. Consulta il file `LICENSE` per ulteriori informazioni.

---
*Sviluppato con ❤️ per esplorare le frontiere delle moderne tecnologie web.*

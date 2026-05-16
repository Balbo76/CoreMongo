# --- STAGE 1: Base ---
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# --- STAGE 2: Dependencies ---
FROM base AS dependencies
# Copiamo i file di configurazione delle dipendenze per tutto il monorepo
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/
# Installiamo tutte le dipendenze dalla root sfruttando gli workspaces
RUN npm ci

# --- STAGE 3: Build ---
FROM dependencies AS build
COPY shared/ ./shared/
COPY backend/ ./backend/
# Eseguiamo la build del backend usando il flag --workspace
# Il nome 'server' viene dal campo "name" in backend/package.json
RUN npm run build --workspace=server

# --- STAGE 4: Development ---
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
WORKDIR /usr/src/app/backend
CMD ["npm", "run", "dev"]

# --- STAGE 5: Production ---
FROM base AS production
ENV NODE_ENV=production
RUN chown node:node /usr/src/app
USER node

# In produzione installiamo solo le dipendenze necessarie per il backend e shared
COPY --chown=node:node package*.json ./
COPY --chown=node:node backend/package*.json ./backend/
COPY --chown=node:node shared/package*.json ./shared/
RUN npm ci --omit=dev --workspace=server --workspace=@atlasscale/shared

# Copiamo gli artefatti compilati
COPY --chown=node:node --from=build /usr/src/app/backend/dist ./backend/dist

WORKDIR /usr/src/app/backend
CMD ["node", "dist/server.js"]

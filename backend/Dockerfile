# --- STAGE 1: Base ---
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# --- STAGE 2: Dependencies ---
FROM base AS dependencies
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/
RUN npm ci

# --- STAGE 3: Build ---
FROM dependencies AS build
COPY shared/ ./shared/
COPY backend/ ./backend/

# Compiliamo prima lo shared (genera shared/dist)
RUN npm run build --workspace=@atlasscale/shared

# Poi compiliamo il backend (genera backend/dist)
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

COPY --chown=node:node package*.json ./
COPY --chown=node:node backend/package*.json ./backend/
COPY --chown=node:node shared/package*.json ./shared/

RUN npm ci --omit=dev --workspace=server --workspace=@atlasscale/shared

# Copiamo gli artefatti compilati del backend
COPY --chown=node:node --from=build /usr/src/app/backend/dist ./backend/dist

# CRUCIALE: Copiamo lo shared includendo la sua cartella dist appena compilata!
# Non copiamo tutta la cartella con i file .ts, ma solo il pacchetto pronto
COPY --chown=node:node --from=build /usr/src/app/shared/dist ./shared/dist

WORKDIR /usr/src/app/backend
CMD ["node", "dist/server.js"]
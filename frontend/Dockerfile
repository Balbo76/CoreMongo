# --- STAGE 1: Base ---
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# --- STAGE 2: Dependencies ---
FROM base AS dependencies
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

RUN npm ci

# --- STAGE 3: Build ---
FROM dependencies AS build
COPY shared/ ./shared/
COPY frontend/ ./frontend/
# Il nome 'my-react-router-app' viene dal campo "name" in frontend/package.json
RUN npm run build --workspace=my-react-router-app

# --- STAGE 4: Development ---
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
WORKDIR /usr/src/app/frontend
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]

# --- STAGE 5: Production ---
FROM base AS production
ENV NODE_ENV=production
RUN chown node:node /usr/src/app
USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node frontend/package*.json ./frontend/
COPY --chown=node:node shared/package*.json ./shared/
RUN npm ci --omit=dev --workspace=my-react-router-app --workspace=@atlasscale/shared

# Copiamo gli artefatti della build
COPY --chown=node:node --from=build /usr/src/app/frontend/build ./frontend/build

WORKDIR /usr/src/app/frontend
EXPOSE 3000
CMD ["npm", "start"]

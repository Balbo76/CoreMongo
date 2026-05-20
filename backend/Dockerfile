FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/
RUN npm ci

FROM dependencies AS build
COPY shared/ ./shared/
COPY backend/ ./backend/

RUN npm run build --workspace=@coremongo/shared
RUN npm run build --workspace=server

FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
WORKDIR /usr/src/app/backend
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN chown node:node /usr/src/app
USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node backend/package*.json ./backend/
COPY --chown=node:node shared/package*.json ./shared/

RUN npm ci --omit=dev --workspace=server --workspace=@coremongo/shared

COPY --chown=node:node --from=build /usr/src/app/backend/dist ./backend/dist
COPY --chown=node:node --from=build /usr/src/app/shared/dist ./shared/dist

WORKDIR /usr/src/app/backend
CMD ["node", "dist/server.js"]
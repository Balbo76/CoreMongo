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

# 1. Compiliamo prima lo shared (genera shared/dist/) stando nella root
RUN npm run build --workspace=@coremongo/shared

# 2. Ora entriamo nel frontend e compiliamo l'applicazione React Router
WORKDIR /usr/src/app/frontend
RUN npm run build

# --- STAGE 4: Development ---
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
WORKDIR /usr/src/app/frontend
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]

# --- STAGE 5: Production ---
FROM nginx:alpine AS production

# Puliamo la cartella di default di Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamo i file statici generati dalla build della SPA
COPY --from=build /usr/src/app/frontend/build/client /usr/share/nginx/html

# Configurazione Nginx: Gestione rotte SPA + Reverse Proxy per le API
RUN printf '%s\n' \
'server {' \
'    listen 3000;' \
'    ' \
'    # Frontend statico' \
'    location / {' \
'        root /usr/share/nginx/html;' \
'        index index.html index.htm;' \
'        try_files $uri $uri/ /index.html;' \
'    }' \
'    ' \
'    # Invia le chiamate /api al container del backend Express' \
'    location /api/ {' \
'        proxy_pass http://backend:3000/; # Porta interna del backend' \
'        proxy_http_version 1.1;' \
'        proxy_set_header Upgrade $http_upgrade;' \
'        proxy_set_header Connection "upgrade";' \
'        proxy_set_header Host $host;' \
'        proxy_set_header X-Real-IP $remote_addr;' \
'        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' \
'        proxy_set_header X-Forwarded-Proto $scheme;' \
'    }' \
'}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
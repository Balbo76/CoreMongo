FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/
RUN npm ci

FROM dependencies AS build
COPY shared/ ./shared/
COPY frontend/ ./frontend/

RUN npm run build --workspace=@coremongo/shared

WORKDIR /usr/src/app/frontend
RUN npm run build

FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
WORKDIR /usr/src/app/frontend
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]

FROM nginx:alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/frontend/build/client /usr/share/nginx/html

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
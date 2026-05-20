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

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
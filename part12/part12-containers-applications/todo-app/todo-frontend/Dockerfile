FROM node:20-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000/

ENV NODE_ENV=production

RUN npm run build

RUN npm install -g serve

CMD [ "serve", "dist" ]
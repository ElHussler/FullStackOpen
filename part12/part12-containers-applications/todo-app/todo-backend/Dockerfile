FROM node:20-bullseye-slim

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

CMD [ "npm", "start" ]
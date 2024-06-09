# Dockerfile
FROM node:14

ARG SERVICE_DIR
WORKDIR /usr/src/app

COPY ${SERVICE_DIR}/package*.json ./
RUN npm install

COPY ${SERVICE_DIR} .

CMD ["node", "app.js"]

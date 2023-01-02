FROM node:lts-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./
RUN npm install

ARG API_URL
ENV API_URL=$API_URL

COPY . .

EXPOSE 8000

CMD npm run migrate:latest && npm run dev
FROM node:lts-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./
RUN npm install

ARG TZ
ARG API_URL
ENV TZ=$TZ
ENV API_URL=$API_URL

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 8000

CMD npm run migrate:latest && npm run dev
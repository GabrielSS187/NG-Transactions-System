FROM node:lts-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json .
COPY package-lock.json .
RUN npm install

ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL


COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
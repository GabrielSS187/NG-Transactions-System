# Base image
FROM node:lts-alpine
# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /usr/src/app/frontend
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install

ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Copy our app
COPY . .
# Expose port to access server
EXPOSE 3000
# Command to run our app
CMD [ "npm", "run", "dev" ]
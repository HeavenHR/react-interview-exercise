FROM node:latest

RUN mkdir /var/www
WORKDIR /var/www

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean
COPY . .

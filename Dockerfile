FROM node:12.14-alpine

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install
ENV HOST 0.0.0.0

CMD npm start

FROM node:8.14.0-alpine

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]

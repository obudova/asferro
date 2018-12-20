FROM mhart/alpine-node:8

WORKDIR /opt/app

COPY package.json npm-shrinkwrap.json ./

RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

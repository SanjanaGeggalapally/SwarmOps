FROM node:alpine

WORKDIR /SwarmOps/Frontend

COPY package*.json ./

RUN npm i

COPY  . .

CMD ["npm","run","dev"]
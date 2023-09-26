FROM --platform=linux/amd64 node:20-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 2023

CMD ["npm", "run", "start"]
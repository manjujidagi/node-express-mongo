# First stage: install dependencies
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6000

CMD ["npm", "start"]

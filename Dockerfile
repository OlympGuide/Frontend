FROM node:alpine as development
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]

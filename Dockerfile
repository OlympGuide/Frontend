FROM node:alpine as development
WORKDIR /src
COPY . .

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev

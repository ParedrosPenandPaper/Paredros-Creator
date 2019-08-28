FROM node:8
WORKDIR /usr/src/app
COPY server/server.js ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# start node build
EXPOSE 80
CMD [ "node", "server.js" ]

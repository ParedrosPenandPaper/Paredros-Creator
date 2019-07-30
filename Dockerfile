FROM node:8
WORKDIR /usr/src/app
COPY server/server.js ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run serve

# start node build
EXPOSE 8080
CMD [ "node", "server.js" ]

# production stage 
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
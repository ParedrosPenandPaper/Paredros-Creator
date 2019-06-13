# build stage
FROM node:lts-alpine as build-stage
# FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# start node server
EXPOSE 80
# CMD [ "node", "server.js" ]

# production stage 
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
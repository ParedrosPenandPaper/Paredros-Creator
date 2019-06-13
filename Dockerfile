FROM node:8
WORKDIR /usr/src/app
COPY server/server.js ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# start node server
EXPOSE 80
ENTRYPOINT echo "i'm a test"

# production stage 
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
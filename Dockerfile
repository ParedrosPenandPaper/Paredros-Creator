FROM nginx:latest

RUN rm -r /etc/nginx/conf.d

COPY content /usr/share/nginx/html

COPY conf /etc/nginx

EXPOSE 80
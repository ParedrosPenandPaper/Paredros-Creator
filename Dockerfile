FROM nginx:latest

RUN rm -r /etc/nginx/conf.d/default.conf

COPY content/* /usr/share/nginx/html

COPY conf/default.conf /etc/nginx/conf.d

EXPOSE 80
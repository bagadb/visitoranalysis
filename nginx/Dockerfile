#Base image

FROM nginx:1.23

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./backend-not-found.html /var/www/html/backend-not-found.html

COPY ./includes/ /etc/nginx/includes/

COPY ./ssl/ /etc/ssl/certs/nginx/

EXPOSE 80
EXPOSE 443
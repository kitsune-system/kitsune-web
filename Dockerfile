FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

ADD docker/default.conf /etc/nginx/conf.d/default.conf
ADD docker/init /init

ADD dist .

CMD /init

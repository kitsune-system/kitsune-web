FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

ADD docker/default.conf /root
ADD docker/init /init

ADD dist/index.html /root
ADD dist/main*.js .

CMD /init

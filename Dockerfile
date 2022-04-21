FROM node:16-alpine

WORKDIR /usr/easy-notes/web

ADD *.json ./
ADD *.lock ./

RUN yarn install:ci

ADD . .

RUN yarn build

RUN rm -rf /usr/easy-notes/web/node_modules

RUN yarn install:ci --production

# app port
EXPOSE 3000

#CMD bash heroku-exec.sh && yarn start
CMD yarn start
#CMD ./start.sh

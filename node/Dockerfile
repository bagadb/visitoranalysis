#Base image

FROM node:18-alpine

WORKDIR /app/

ADD app/package.json /app/package.json
RUN npm install
RUN npm install --global nodemon

CMD [ "npm", "start" ]


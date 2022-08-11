#Base image

FROM node:18-alpine

WORKDIR /app/
COPY app/* /app/

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "npm" ]

CMD [ "start" ]


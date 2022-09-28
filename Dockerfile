FROM node:16.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn

ENTRYPOINT [ "tail", "-f", "/dev/null" ]

EXPOSE 3000

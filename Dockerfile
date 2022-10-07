FROM node:16.16.0-alpine

WORKDIR /app

COPY . .


ENV NODE_ENV=production
ARG PORT=8080
RUN yarn
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]

EXPOSE $PORT

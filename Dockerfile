FROM node:16.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build
ENV NODE_ENV=production
RUN yarn

ENTRYPOINT [ "yarn", "start" ]

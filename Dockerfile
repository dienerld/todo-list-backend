FROM node:16.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn build
ENV NODE_ENV=production
RUN yarn --frozen-lockfile --production

ENTRYPOINT [ "yarn", "start" ]

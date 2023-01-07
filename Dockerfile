## build
FROM node:16.16.0-alpine AS BUILD_IMAGE_TEMP

RUN apk update --no-cache && apk add curl --no-cache && rm -rf /var/cache/apk/* \
  && curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /app


COPY . .

RUN yarn --frozen-lockfile && yarn build && yarn --production && node-prune

## Prod
FROM node:16.16.0-alpine
WORKDIR /app

ENV NODE_ENV=production
# copy from build image
COPY --from=BUILD_IMAGE_TEMP /app/dist ./dist
COPY --from=BUILD_IMAGE_TEMP /app/node_modules ./node_modules


ENTRYPOINT [ "node", "dist/infra/http/server.js" ]

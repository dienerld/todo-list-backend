## build
FROM node:16.16.0-alpine AS BUILD_IMAGE

RUN apk update && apk add curl && rm -rf /var/cache/apk/*
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /app


COPY . .

RUN yarn --frozen-lockfile
RUN yarn build
ENV NODE_ENV=production
RUN npm prune --production
RUN node-prune

## Prod
FROM node:16-alpine
WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules


ENTRYPOINT [ "node", "./dist/infra/http/server.js" ]

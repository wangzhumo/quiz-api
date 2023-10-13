###################
# BUILD FOR LOCAL DEVELOPMENT
###################
# env
FROM node:18 As development
LABEL authors="ease"
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# workspace dir & source code
WORKDIR /app

# build script
COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install

# run script or cmd
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:18 As build
LABEL authors="ease"
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# workspace dir & source code
WORKDIR /app

# copy config
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/config ./config
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

# run script or cmd
RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################
FROM node:18-alpine As production
LABEL authors="ease"

# workspace dir & source code
WORKDIR /app

# build script
# we have dist,does't need build
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/config ./config

# export dir & port
VOLUME ["/app/logs"]
EXPOSE 4000

# run script or cmd
CMD [ "node", "dist/main.js" ]
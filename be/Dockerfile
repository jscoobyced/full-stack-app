FROM node:14-alpine as base

WORKDIR /opt/dnm
COPY *.json ./
COPY yarn.lock ./
COPY src/index.html ./
RUN yarn install
EXPOSE 3001

FROM base as development
ENV NODE_ENV=development
VOLUME ["/opt/dnm/src"]
CMD ["yarn", "start"]

FROM base as production
ENV NODE_ENV=production
COPY src src
RUN yarn build
CMD ["node", "build"]
FROM node:20.13-bookworm-slim AS base

FROM base AS development

WORKDIR /usr/src/app

COPY package.*json .

RUN npm install

COPY . .

RUN npm run build

FROM base AS production

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --omit=dev --ignore-scripts

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm","run","start"]
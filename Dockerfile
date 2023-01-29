FROM node:16.18.1-alpine3.16 as build-stage

WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable
# RUN npm install --global yarn
# RUN yarn config set registry https://registry.npm.taobao.org/
RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:latest
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# RUN ["echo","hello world"]
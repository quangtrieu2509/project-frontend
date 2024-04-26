FROM node:16.0.0-alpine AS build
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn  --ignore-engines
ADD . /app
RUN yarn build

FROM nginx:1.21.6
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]


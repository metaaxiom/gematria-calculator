FROM node:16.5.0-alpine AS build
WORKDIR /app
COPY package*.json ./
ENV PUBLIC_URL /app/population-choropleth
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:1.23.1-alpine AS production
ENV NODE_ENV production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:20.15.0 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:alpine

COPY --from=build-stage /app/dist/orangotango-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install react-scripts@5.0.1 && npm install
RUN npm cache clean --force && npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

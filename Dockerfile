FROM node:24-alpine
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","app.js"]

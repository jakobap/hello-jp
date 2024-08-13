# Step 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm audit fix
COPY . ./
COPY .env ./
COPY server.js ./
COPY package*.json ./
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]

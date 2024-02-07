# Step 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
COPY server.js ./
RUN npm run build

# # Step 2: Set up the Express server
# FROM node:14
# WORKDIR /app
# COPY --from=build /app/build ./build
# COPY server.js ./
# COPY package*.json ./
# RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]

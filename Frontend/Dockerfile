# Use the official Node.js image as a base
FROM node:lts AS build
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Build the Vite application
RUN npm run build
 
# Use a lightweight web server to serve the application
FROM nginx:alpine
 
# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d
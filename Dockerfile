# Use the official Node.js 14 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./public ./
COPY ./src ./

# Expose a port (optional, if your application listens on a specific port)
EXPOSE 3000

# Specify the command to run when the container starts
CMD [ "npm", "start" ]

# Specify a base image
FROM node:current-alpine

# Specify the working directory for the project inside the container
WORKDIR /usr/app

# COPY the package.json file for dependency installation
COPY ./package.json ./package-lock.json ./

# INSTALL dependencies
RUN npm install

# COPY project files
COPY ./ ./

# SET default command
CMD ["npm", "start"]
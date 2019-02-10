FROM node:8

# specifies the work directory
WORKDIR /usr/src/app

# copies the package specs and install dependencies
COPY package*.json ./
RUN npm install

# bundles all app soruce
COPY . .

# runs the application
CMD node index.js

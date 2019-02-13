FROM node:8

# specifies the work directory
WORKDIR /usr/src/app

# copies the package specs and install dependencies
COPY package*.json ./
RUN npm install

# bundles all app soruce
COPY . .

# expose port for the application
EXPOSE 3011:3011

# runs the application
CMD npm start

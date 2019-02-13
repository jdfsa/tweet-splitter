FROM node:8

# specifies the work directory
WORKDIR /usr/src/app

# copies the package specs and install dependencies
COPY package*.json ./
RUN npm install

# bundles all app soruce
COPY . .

# expose port for the application
EXPOSE 8080

# conditional running
ARG run_as
RUN chmod u+x ./run-config.sh && ./run-config.sh $run_as

# runs the application
CMD npm run app

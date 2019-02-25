# Tweet Splitter

Developed initially with the aim of exploring some simple features of NodeJS working together with Docker, the role of this app is just to grab any random tweet from the tweets API and split its message into many parts of *N* characters, but avoiding to break any word in the process.

The tweets API used exposes those endpoints:
> POST https://n8e480hh63o547stou3ycz5lwz0958.herokuapp.com/1.1/auth
> (authenticate and retrieve the access token)
> 
> GET https://n8e480hh63o547stou3ycz5lwz0958.herokuapp.com/1.1/statuses/home_timeline.json
> (retrieve the tweets)

## How to run

There are two ways of running the app with docker, depending on what's expected; the simplest way just prints the result via console; the other way exposes an endpoint which can be acceced through an HTTP GET call.

## Running the "console" mode

Execute the command below to build a docker image:

```
docker build -t <user>/<app-name> .
```

To start the image with the application, execute the following command:

```
docker run --rm <user>/<app-name>
```

> *Note: this way runs the application only once; it's necessary to rerun whenever a new result is wanted.*

## Running the "server" mode

The commands don't differ much from the console version, except this time the *build* command makes use of an arg that indicates a server mode, and the *run* command needs a port mapping, which is required accordingly to the Docker network documentation ([read more](https://docs.docker.com/config/containers/container-networking/)).

The commands are as follows:

```
docker build -t <user>/<app-name> --build-arg run_as="server" .
docker run -p <local-port>:8080 --rm <user>/<app-name>
```

Now it can be tested with *curl* (or any other preferable mean):

```
curl -i localhost:<local-port>
```

> *Note: `local-port` reffers to the local machine port. The application is already configured to listen in port 8080 inside the Docker container.*

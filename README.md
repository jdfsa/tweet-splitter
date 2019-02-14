# TweetSplitter

Developed initially with the aim of exploring some simple features of NodeJS working together with Docker, this role of this app is just to grab a message from a tweets API and split it into many parts of N characters, but avoiding break any word in the process.


## How to run

There are two ways of running the app with docker, depending on what's expected; the simplest way just prints the result via console; the other way exposes an endpoint which can be acceced through an HTTP GET call.

## Running the "console" mode

Execute the command below to build a docker image:

```
docker build -t zuldigital/engineer-exam .
```

To start the image with the application, execute the following command:

```
docker run --rm zuldigital/engineer-exam
```

> *Note: this way runs the application only once; it's necessary to rerun whenever a new result is wanted.*

## Running the "server" mode

The commands don't differ much from the console version, except this time the *build* command makes use of an arg that indicates a server mode, and the *run* command needs a port mapping, which is required accordingly to the Docker network documentation ([read more](https://docs.docker.com/config/containers/container-networking/)).

The commands are as follows:

```
docker build -t zuldigital/engineer-exam --build-arg run_as="server" .
docker run -p <local_port>:8080 --rm zuldigital/engineer-exam
```

Now it can be tested with *curl* (or any other preferable mean):

```
curl -i localhost:<local_port>
```

> *Note: `local_port` reffers to the local machine port. The application is already configured to listen in port 8080 inside the Docker container.*
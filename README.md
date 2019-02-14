# TweetSplitter

Developed initially with the aim of exploring some simple features of NodeJS working altogether with Docker, this app role is just to grab a message from a tweets API and split it into many parts of N characters, but avoiding break any word in the process.


## How to run

There is two ways to run it with docker, depending on what's expected; the simplest just prints the result in console; the other way exposes and endpoint that can be called with a HTTP GET method.

## Running the "console" mode

Execute the command below to build a docker image:

docker build -t zuldigital/engineer-exam .

To start the image with the application, execute as follows:

docker run --rm zuldigital/engineer-exam

Note: this way runs the application only once; it's necessary to rerun whenever a new result is wanted.

## Running the "server" mode

The commands don't differ much from the console version, except that the build command makes use of some args to indicate that it's going to run the server mode, and the "run" command needs a internal-to-external port mapping, which is required accordingly to the Docker documentation.

docker build -t zuldigital/engineer-exam --build-arg run_as="server" .
docker run -p 3020:8080 --rm zuldigital/engineer-exam

Now it can be tested with curl (or any other preferable mean):

curl -i localhost:<port>


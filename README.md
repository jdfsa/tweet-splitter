# TweetSplitter
Grabs a message from a tweets API and split it into many parts of N characters


## Running
docker build -t zuldigital/engineer-exam .
docker run --rm zuldigital/engineer-exam

docker build -t zuldigital/engineer-exam --build-arg run_as="server" .
docker run -p 8080:3011 --rm zuldigital/engineer-exam

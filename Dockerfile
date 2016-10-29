FROM ubuntu:latest
MAINTAINER Bastien Fiorentino "fiorentino.bastien@gmail.com"
ADD requirements.txt requirements.txt
RUN apt-get update -y && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update -y && apt-get install -y nodejs && npm install -g $(cat requirements.txt) && npm update && bower update --allow-root
RUN node -v && npm -v && grunt --version && bower --version
RUN grunt build
WORKDIR /app

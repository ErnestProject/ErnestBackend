FROM ubuntu:latest
MAINTAINER Bastien Fiorentino "fiorentino.bastien@gmail.com"
ADD requirements.txt requirements.txt
RUN apt-get update -y && apt-get install -y curl bzip2 lsb-release

RUN echo "deb http://nginx.org/packages/ubuntu/ $(lsb_release -a 2>/dev/null | grep Codename | sed 's/.*\s//g') nginx" >> /etc/apt/sources.list
RUN echo "deb-src http://nginx.org/packages/ubuntu/ $(lsb_release -a 2>/dev/null | grep Codename | sed 's/.*\s//g') nginx" >> /etc/apt/sources.list
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ABF5BD827BD9BF62
RUN apt-get update -y && apt-get install -y nginx

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update -y && apt-get install -y nodejs git

RUN rm -rf /usr/share/nginx/html && mkdir -p /app/dist/ && ln -s /app/dist /usr/share/nginx/html
WORKDIR /app
CMD /app/docker/startup.sh

#!/bin/bash

usage()
{
cat << EOF

docker_startup.sh

Run the docker image of AWSInstancesManager application


USAGE: ./docker_startup.sh [OPTIONS]

OPTIONS:
  -h    Show this message
  -p    Port exposed for application on host (default: 8080)

EXAMPLES:

  ./docker_startup.sh

    Connect to http://localhost:8080 and access to AWSInstancesManager application.

  ./docker_startup.sh -p 80

    Connect to http://localhost and access to AWSInstancesManager application.

EOF
}

# Defaults
HOST_PORT=8080
while getopts ":p:h" flag
do
  case "$flag" in
    h)
      usage
      exit 0
      ;;
    p)
      HOST_PORT=$OPTARG
      ;;
    ?)
      usage
      exit 1
      ;;
  esac
done

docker run -dit -v $(pwd):/app -p $HOST_PORT:80 aws-instances-manager /bin/bash docker/startup.sh > .container.tmp

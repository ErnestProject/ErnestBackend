#!/bin/bash

usage()
{
cat << EOF

docker_deploy.sh

Compile and Deploy AWSInstancesManager application on existing aws-instances-manager docker container


USAGE: ./docker_deploy.sh [OPTIONS]

OPTIONS:
  -h    Show this message
  -d    aws-instances-manager docker container id (Use the file .container.tmp if missing)

EXAMPLES:

  ./docker_deploy.sh

    Compile and Deploy on the container specified on .container.tmp file.

  ./docker_deploy.sh -d dc16f2aa08e1

    Compile and Deploy on the container dc16f2aa08e1.

EOF
}

while getopts ":d:h" flag
do
  case "$flag" in
    h)
      usage
      exit 0
      ;;
    d)
      CONTAINER_ID=$OPTARG
      ;;
    ?)
      usage
      exit 1
      ;;
  esac
done
if [ -z "$CONTAINER_ID" ]; then
  if [ ! -f .container.tmp ]; then
      echo ".container.tmp file not found"
      echo "Did you run ./docker_startup.sh ?"
      exit 2
  fi
CONTAINER_ID=$(cat .container.tmp)
fi
docker exec -i -t $CONTAINER_ID /bin/bash docker/dist.sh

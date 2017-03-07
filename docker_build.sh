#!/bin/bash
usage()
{
cat << EOF

docker_build.sh

Build the docker image of AWSInstancesManager application


USAGE: ./docker_build.sh [OPTIONS]

OPTIONS:
  -h    Show this message
  -e    Environnement: dev or prod (default: dev)

EXAMPLES:

  ./docker_build.sh

  ./docker_startup.sh -e prod

    build the docker AWSInstancesManager application and push it to dockerhub.

EOF
}

# Defaults
ENV=dev
while getopts ":e:h" flag
do
  case "$flag" in
    h)
      usage
      exit 0
      ;;
    e)
      ENV=$OPTARG
      ;;
    ?)
      usage
      exit 1
      ;;
  esac
done
if [ "$ENV" == "prod" ]
then
  docker build -f Dockerfile-prod -t bastienf/ernest:aws_instances_manager_prod .
  docker push bastienf/ernest:aws_instances_manager_prod
else
  docker build -t bastienf/ernest:aws_instances_manager_dev .
fi

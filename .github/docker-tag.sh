#!/bin/bash

GHTAG=$(git name-rev --tags --name-only $(git rev-parse HEAD))
GHBR=$(git rev-parse --abbrev-ref HEAD)
DOCKER_TAG='dev'

if [ "${GHTAG}" = "undefined" ]
then
  if [ "${GHBR}" = "main" ]
  then
    DOCKER_TAG="latest"
  fi
else
  DOCKER_TAG=${GHTAG}
fi

echo -e "DOCKER_TAG=${DOCKER_TAG}" >> $GITHUB_ENV
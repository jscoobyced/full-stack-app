#!/bin/bash

GHTAG=$(git name-rev --tags --name-only $(git rev-parse HEAD))
GHBR=$(git rev-parse --abbrev-ref HEAD)
DOCKER_TAG='dev'
JSCWORKSPACE="$1"

if [ "${GHTAG}" = "undefined" ]
then
  if [ "${GHBR}" = "main" ]
  then
    DOCKER_TAG="latest"
  fi
else
  DOCKER_TAG=${GHTAG}
fi

echo -e "DOCKER_TAG=${DOCKER_TAG}" | tee -a $GITHUB_ENV
sed -i "s/JSCVERSION/${DOCKER_TAG}/" "${JSCWORKSPACE}/fe/package.json"
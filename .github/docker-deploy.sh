#!/bin/bash

echo "Configuring SSH keys"
mkdir -p "${HOME}/.ssh"
chmod 700 "${HOME}/.ssh"
printf '%s\n' "$2" > "${HOME}/.ssh/id_rsa"
chmod 600 "${HOME}/.ssh/id_rsa"
printf '%s\n' "$3" > "${HOME}/.ssh/known_hosts"

WITH_DB=$(cat ./with_db)

DOCKER_SERVICES="fe be ${WITH_DB}"

ssh "$4@$5" "mkdir -p ~/db/my_data && mkdir -p ~/db/updates"

docker -H "ssh://${4}@${5}" system prune -a -f
docker-compose -f docker-compose.production.yml -H "ssh://${4}@${5}" pull
SERVER_DB_PASSWORD="$1" docker-compose -f docker-compose.production.yml -H "ssh://${4}@${5}" up -d ${DOCKER_SERVICES}

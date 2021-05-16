#!/bin/bash

DTFMT=$(date +%Y%m%d-%H%M%S)
UPDATE_FOLDER="~/db/updates/${DTFMT}"
DOCKER_UPDATE_FOLDER="/home/${DTFMT}"
ssh "$1@$2" "mkdir -p ${UPDATE_FOLDER}"
scp ./db/sql/update/update.sql "$1@$2:${UPDATE_FOLDER}/"
cat ./db/sql/update/stored_procedure/*.sql > stored_procedures.sql
scp stored_procedures.sql "$1@$2:${UPDATE_FOLDER}/"

DBUSER=${3}
DBPASS=${4}
DBNAME=${5}

docker -H "ssh://${1}@${2}" exec docker-nodejs-mariadb_db_1 sh -c \
  "mysql --host=localhost --port=3306 --protocol=tcp -u ${DBUSER} -p${DBPASS} ${DBNAME} < ${DOCKER_UPDATE_FOLDER}/update.sql"

docker -H "ssh://${1}@${2}" exec docker-nodejs-mariadb_db_1 sh -c \
  "mysql --host=localhost --port=3306 --protocol=tcp -u ${DBUSER} -p${DBPASS} ${DBNAME} < ${DOCKER_UPDATE_FOLDER}/stored_procedures.sql"

rm -Rf "${HOME}/.ssh"
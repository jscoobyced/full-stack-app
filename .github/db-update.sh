#!/bin/bash

echo "Preparing configuration"

DTFMT=$(date +%Y%m%d-%H%M%S)
UPDATE_FOLDER="~/db/updates/${DTFMT}"
DOCKER_UPDATE_FOLDER="/home/${DTFMT}"
ssh "$1@$2" "mkdir -p ${UPDATE_FOLDER}"
scp ./db/sql/update/update.sql "$1@$2:${UPDATE_FOLDER}/"
scp ./db/sql/update/data.sql "$1@$2:${UPDATE_FOLDER}/"
cat ./db/sql/update/stored_procedure/*.sql > stored_procedures.sql
scp stored_procedures.sql "$1@$2:${UPDATE_FOLDER}/"

echo "Setting DB parameters"
DBUSER="${3}"
DBPASS="${4}"
DBNAME="${5}"

echo "Configuration complete"

echo "Updating schema"
docker -H "ssh://${1}@${2}" exec full-stack-app_db_1 sh -c \
  "mysql --host=localhost --port=3306 --protocol=tcp -u \"${DBUSER}\" -p\"${DBPASS}\" \"${DBNAME}\" < ${DOCKER_UPDATE_FOLDER}/update.sql"

echo "Adding stored procedures"
docker -H "ssh://${1}@${2}" exec full-stack-app_db_1 sh -c \
  "mysql --host=localhost --port=3306 --protocol=tcp -u \"${DBUSER}\" -p\"${DBPASS}\" \"${DBNAME}\" < ${DOCKER_UPDATE_FOLDER}/stored_procedures.sql"

echo "Inserting data"
docker -H "ssh://${1}@${2}" exec full-stack-app_db_1 sh -c \
  "mysql --host=localhost --port=3306 --protocol=tcp -u \"${DBUSER}\" -p\"${DBPASS}\" \"${DBNAME}\" < ${DOCKER_UPDATE_FOLDER}/data.sql"

rm -Rf "${HOME}/.ssh"
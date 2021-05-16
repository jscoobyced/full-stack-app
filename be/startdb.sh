#!/bin/bsh

docker run --rm -d -p 3306:3306 \
            -e MYSQL_DATABASE='my_app' \
            -e MYSQL_USER='app_user' \
            -e MYSQL_PASSWORD='oas87nyfrc8odvs7' \
            -e MYSQL_RANDOM_ROOT_PASSWORD='1' \
            --name docker_nodejs_mariadb_db \
            mariadb:latest
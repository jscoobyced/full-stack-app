FROM mariadb:latest

COPY ./sql/current/create.sql /docker-entrypoint-initdb.d/01-create.sql
COPY ./sql/current/stored_procedure/*.sql /docker-entrypoint-initdb.d/
COPY ./sql/data/dev.sql /docker-entrypoint-initdb.d/02-data.sql

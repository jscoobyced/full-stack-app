FROM mariadb:latest

COPY ./sql/current/create.sql /docker-entrypoint-initdb.d/01-create.sql
COPY ./sql/update/update.sql /docker-entrypoint-initdb.d/02-update.sql
COPY ./sql/current/stored_procedure/*.sql /docker-entrypoint-initdb.d/
COPY ./sql/update/stored_procedure/*.sql /docker-entrypoint-initdb.d/
COPY ./sql/data/dev.sql /docker-entrypoint-initdb.d/03-dev.sql
COPY ./sql/update/data.sql /docker-entrypoint-initdb.d/04-data.sql

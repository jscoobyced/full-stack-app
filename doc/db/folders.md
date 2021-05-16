# Folder structure

The folder structure is as follows:
```
sql
  |- current
  |     |- stored_procedure
  |     |      |- xxx_v1.sql
  |     |- create.sql
  |- data
  |   |- dev.sql
  |- update
  |     |- stored_procedure
  |     |      |- xxx_v2.sql
  |     |- update.sql

```

## Current

This folder contains the full DB schema in `create.sql`. There is also a `stored_procedure` folder that contains the list of all Stored Procedures that are currently deployed.

## Data

The `data` folder includes some data to be inserted on a new MariaDB instance for development purpose. The `dev.sql` file is configured to be installed on each `docker-compose up` from the root of this project.

## Update

This is used for upgrding a database. This should be used in a deployement script to upgrade the database. Similarly to the `current` folder, there can be stored procedures in a `stored_procedure` by adding `.sql` file to that folder.
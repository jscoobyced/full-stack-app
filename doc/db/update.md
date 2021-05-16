# Updating database

When you want to update the database, i.e. add or modify a table (never remove a table) or adding a new stored procedure or a new stored procedure version, you can follow this guide.

## Schema updates

The guidelines for the best backward compatibility:
* never delete or rename anything: column, table or stored procedure.
* therefore always add what you want to change:  
-- add a new table/column with the new properties and copy the data to it. It does increase the size of the data, but it is much safer in case you need to rollback a software version.  
-- add a new version of the stored procedure. If you had `get_users_v1` and you need to make a change, create a new stored procedure `get_users_v2` and your new code can use it. Again, if you need to rollback the code in production, the previous stored procedure will still be there.

## How to update

There are a few steps you need to do to properly setup an update of your database schema or data.

### SQL schema changes

You can place your changes in the `/db/sql/update/` folder, using `.sql` extension. Any file here will be automatically picked up by the deployment script.

### Data changes

You can directly add any data change in the `/db/sql/data/dev.sql`

### Enabling a new environment

If you want to enable a new environment (like qa or production), you will need to:
- create a new Dockerfile in `/db/` folder to handle the files needed for initial deployment (or to be used to reset the environment)
- create or update the `/docker-compose.environment.yml`

### Integration

Once you have deployed your database scripts from the `./db/sql/update/` folder to production, move them to the `./db/sql/update/` folder as the current version:
- update the `create.sql` script by adding the content of `update.sql`. You should empty the `update.sql` afterwards.
- move the stored procedure files to the `stored_procedure` folder

A good automation would be to perform the above automatically after deployment.
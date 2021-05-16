# How to redeploy

Because you don't want to restart MariaDB all the time you deploy, you can use the following to redeploy only the applications.

All you need to do is to delete the content of the [/with_db](/with_db) file. Do not delete the file. Only the content to be empty.

If you need to redeploy it, you can put the following content in the [/with_db](/with_db) file:
```
db
```
If you change the name of the database service in the `docker-compose.production.yml` file, then you need to use the new name in the above configuration.
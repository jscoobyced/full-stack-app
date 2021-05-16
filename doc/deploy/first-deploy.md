# How to deploy the application the first time
To enable automated deployment to your server, you need to prepare the following.

## Docker
Install docker on your remote server. Follow the installation method for your remote server OS.
Create an account on [Docker Hub](https://hub.docker.com/), then create an [access token](https://hub.docker.com/settings/security).

## SSH non-privileged account
Create a user on your server with the following properties:
- non admin
- in the `docker` group to be able to perform docker operations


If your remote server is linux based OS, you can do the following:

```
sudo useradd -m -d /opt/dnm -G docker -s /usr/bin/bash dnm
sudo passwd dnm
```
Above commands will:
1. Create a `dnm` user with home folder `/opt/dnm`, added to group `docker`, using `bash` as shell. Note it is not required to force the `bash` shell for this to work
2. Create a password for the new account. Make sure you set one very strong. Keep note as you will need it once for the next steps.


Then on your local machine, generate a new SSH keys pair (be carefull to not override your current ones).
```
tar -zcf ~/ssh-keys-backup.tgz ~/.ssh
cd ~
mkdir -p .ssh
chmod 700 .ssh/
ssh-keygen -t rsa -m PEM -f .ssh/dnm
mv .ssh/known_hosts .ssh/known_hosts.bak
ssh-copy-id -i ~/.ssh/dnm dnm@your-server.tld
ssh -i .ssh/dnm dnm@your-server.tld
exit
mv .ssh/known_hosts .ssh/known_hosts.dnm
mv .ssh/known_hosts.bak .ssh/known_hosts
```
Above commands will:
1. Backup your current `.ssh` folder and save it a `ssh-keys-backup.tgz` in your home folder. This is just as a safety precaution.
2. Move to you home directory
3. Create the `.ssh` folder. This will have no effect if it already exists.
4. Set the permission to your user only. This will have no effect if it is already set with this permission. Otherwise, it will apply a safe permission.
5. Create a new SSH keys pair named `dnm`. This ensures it doesn't override your possibly existing default keys (named `id_rsa` and `id_ras.pub`)
6. Rename your `known_hosts` file. It will be restored at the end.
7. Copie securely you public key to the remote server. Make sure you use your real server name instead of `your-server.tld`. Type `yes` when asked if you recognize the remote server and accept the connection. You will be asked for the password of the `dnm` user created in previous step.
7. Test that you can SSH to the remote server without requiring password.
8. Logout and go back to your local machine prompt.
9. Rename the newly created `known_hosts` file. We will use it later.
10. Restore the original `known_hosts` file.


You need to create 2 Github Secrets. In your repository, go to `Settings` then `Secrets` then click on `New repository secret` button. The 2 new entries are:
1. Secret name: `DEPLOY_KNOWN_HOST`  
Secret value: the content of the `~/.ssh/known_hosts.dnm`
2. Secret name: `DEPLOY_KEY`  
Secret value: the content of the `~/.ssh/dnm` private keys file. The file content is like this:
```
-----BEGIN RSA PRIVATE KEY-----
XXXXX
-----END RSA PRIVATE KEY-----~
```
## Additional Github Secrets values
1. Secret name: `DEPLOY_SERVER`  
Secret value: the domain name of the server you want to deploy to. I.e. `my-server.tld`
2. Secret name: `DEPLOY_USERNAME`  
Secret value: the username of the account you have created on the server. I.e. `dnm` from above example.
3. Secret name: `DOCKERHUB_TOKEN`  
Secret value: the docker hub access token you have created in [access token](https://hub.docker.com/settings/security)
4. Secret name: `DOCKERHUB_USERNAME`  
Secret value: the username of your docker account.
5. Secret name: `SERVER_DB_PASSWORD`  
Secret value: The password you want to be used for your application. It will be used to create the database user and to configure the back-end application to use it.


## Update production information

In the `/docker-compose.production.yml` file, update the environment variables to your production values.
The values you can modify for the Back-End are:
```
      DB_HOST: db
      DB_USER: my_user
      DB_NAME: my_app
      BACK_END_API_PORT: 3001
      FRONT_END_API_HOST: my-server.tld
      FRONT_END_API_PORT: "80, 443"
```
Do not modify the value for:
```
      DB_PASSWORD: ${SERVER_DB_PASSWORD}
```
We will use the Github Secret value created earlier instead.


The values you can modify for the database are:
```
      MYSQL_DATABASE: my_app
      MYSQL_USER: my_user
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
```
Make sure the database name and username are the same as in the Back-End section.


In the `/fe/.env.production` file, override the environment variables of the `/fe/.env` file for your production settings.
For example, to update the back-end API hostname in the `fe` container:
```
REACT_APP_BACK_END_API_HOST='api.my-server.tld'
```
Above value should be a domain name that resolves to the same server where you deploy this application. It can be different from the application main domain name, as long as it resolves to the same IP address.

## Github Actions

When the above is complete, the following builds and actions will occur:
- On Pull Request creation:  
--> the unit tests for Front-End and Back-End will be run  
--> the development container will be built and pushed to Docker Hub with the `dev` tag
- On the merge of Pull Request to the `main` branch:  
--> the unit tests for Front-End and Back-End will be run  
--> the development container will be built and pushed to Docker Hub with the `latest` tag
- On Release creation:  
--> the unit tests for Front-End and Back-End will be run  
--> the development container will be built and pushed to Docker Hub with the Github release tag
--> the application will be deployed to the remote server

Note that at the first deployment the database schema will not be created or data won't be inserted. Please follow the [database](./database.md) process to do so.

The Reacy application will be running at [http://my-server.tld:3000](http://my-server.tld:3000) and APIs at [http://api.my-server.tld:3001](http://api.my-server.tld:3001). See how to setup nginx as a [reverse proxy](./reverse-proxy.md) to run on standard port if needed. You can of course also expose directly port 80 to you front-end and back-end by setting the corresponding ports in the `/docker-compose.production.yml` file.
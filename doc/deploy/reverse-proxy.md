# nginx as reverse proxy

You can run an nginx instance (or add to your existing instance) the following configuration:
```
server {
    server_name   my-server.tld;
    server_tokens off;
    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    access_log /var/log/nginx/my-server-access.log;
    error_log /var/log/nginx/my-server-error.log;
}
```
and for the APIs
```
server {
    server_name   api.my-server.tld;
    server_tokens off;
    location / {
        proxy_pass         http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    access_log /var/log/nginx/api.my-server-access.log;
    error_log /var/log/nginx/api.my-server-error.log;
}

```
You must update the `my-server.tld`, `api.my-server.tld` and `3000` to reflect the actual settings.
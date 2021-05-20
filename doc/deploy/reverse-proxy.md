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

    add_header   Strict-Transport-Security 'max-age=31536000; includeSubDomains';
    add_header   Content-Security-Policy 'default-src * data: blob: \'self\'; script-src \'unsafe-inline\' blob: data: \'self\'; style-src data: blob: \'unsafe-inline\' *;block-all-mixed-content;upgrade-insecure-requests';
    add_header   X-Frame-Options SAMEORIGIN;
    add_header   X-Content-Type-Options nosniff;
    add_header   Referrer-Policy strict-origin-when-cross-origin;

    access_log /var/log/nginx/my-server-access.log;
    error_log /var/log/nginx/my-server-error.log;
}
```
The above includes some safe practice of secure HTTP Headers.

For the APIs
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
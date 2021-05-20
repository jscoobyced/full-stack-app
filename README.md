# Typescript ReactJS application with Typescript NodeJS API and MariaDB

This is all you need to build a full website using ReactJS and NodeJS.

[![codecov](https://codecov.io/gh/jscoobyced/full-stack-app/branch/main/graph/badge.svg)](https://codecov.io/gh/jscoobyced/full-stack-app)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jscoobyced_full-stack-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=jscoobyced_full-stack-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jscoobyced_full-stack-app&metric=bugs)](https://sonarcloud.io/dashboard?id=jscoobyced_full-stack-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jscoobyced_full-stack-app&metric=code_smells)](https://sonarcloud.io/dashboard?id=jscoobyced_full-stack-app)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jscoobyced_full-stack-app&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=jscoobyced_full-stack-app)


## Quick Start

### Development mode
You can simply run `docker-compose up -d` on the root folder and it will start a hot-reload version of both Front-End and Back-End. This means if you change anything on either side, it will immediately be reflected. Depending on what you change you might still have to refresh the browser page though.

You can then open the application at http://localhost:3000.

## Front-End
The Front-End uses the [Create React App](https://github.com/facebook/create-react-app) with Typescript.

In production mode it uses nginx to serve the application. By default it runs on port 3000 and you will need a reverse-proxy or a load-balancer to expose it to port 80. Refere to [proxy](./doc/deploy/reverse-proxy.md) for details.

You can refer to the [README](./be/README.md) for more details about the Front-End application.

## Back-End
The Back-End runs on ExpressJS and exposes port 3001. In the same way, you can run a reverse-proxy or a load-balancer in front of it to expose it to the Internet.

You can refer to the [README](./be/README.md) for more details.

## Documentation
You can find full documentations in the [doc](doc/README.md) folder.
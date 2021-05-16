# NodeJS Back-End with Typescript

## Quick start

### Stand-alone development mode

To run this ExpressJS back-end API, simply run
```
yarn start
```
and this will be hot-realoadable available at http://localhost:3001.

### Full-Stack development mode

To run the full stack in development mode (i.e. hot-relaodable), run
```
docker-compose up -d
```
from the root folder of this project.

## Configuration

When running the application using `yarn` by command line, the file [./.env](./env) is used to load the configuration:
```
BACK_END_API_PORT=3001
FRONT_END_API_HOST='localhost'
FRONT_END_API_PORT=3000
```

When running in `docker-compose`, you can override the above configuration in the `environment` section.

You can see that the [docker-compose.yml](../docker-compose.yml) actually binds the port 3002 to this back-end API as a demonstration.

## Adding a new end-point

To add a new end-point, you need to do the following steps:

1. Create the service that will serve the request
2. Add the new handler in the `/be/src/handlers` folder. You can read the [handlers](/doc/be/handlers.md) document for more details.
3. Add your routes in the `/be/src/routes` folder. You can read the [routes](/doc/be/routes.md) document for more details.

## Testing

To execute the tests, you can run:
```
yarn test
```

This will run ES-Lint, unit tests and integration tests.

### Unit tests

These are regular unit tests using jest. Add you test with your new Typescript files

### Integration tests

In the `/be/src/integrations` folder are the integration tests for all your route files.
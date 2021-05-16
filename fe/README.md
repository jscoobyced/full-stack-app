# React Front-End with Typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start

### Mock/stand-alone version

If you want to run this Front-End without the dependency of Back-End, this application is fully functional with mock data.

Simply run
```
yarn start:mock
```
and you will be able to develop the Front-End, hot-reload, served by mocked data.

If you create a new Service that provides, creates or updates data, you need to provide 2 versions and register them:
1. Real implementation
In the `src/services/YOUR_SERVICE/index.ts`, create the functions you need.

You should use this template:
```
export const IMyService {
  myFunction: () => Something;
  myAsyncFunction: () => Promise<Something>;
}

export const MyService = (): IMyService => {
  const myFunction = () => {}
  const myAsyncFunction = async () => {}

  return {
    myFunction,
    myAsyncFunction
  }
}
```
2. Mock implementation
In the `src/services/YOUR_SERVICE/mock.ts`, create the mocked versions of the functions.

You should use this template:
```
export const MockMyService = (): IMyService => {
  const myFunction = () => {}
  const myAsyncFunction = async () => {}

  return {
    myFunction,
    myAsyncFunction
  }
}
```
3. Register you services
In `src/services/context/index.tsx` add you service:
```
interface IServiceContext {
  userService: IUserService,
  myService: IMyService
}
```
Then is `src/index.tsx` and `src/index-mock.tsx` add the instance of your service in the
```
const myService: IMyService = MyService();
<ServiceContext.Provider value={{ userService, myService }}>
```

### Develop using the Back-End API

Simply run:
```
docker-compose up -d
```
from the root folder of this project. This will start the development environment for both Front-End and Back-End, hot-reload enabled.

Any change made in Front-End and Back-End will be instantly reflected.

You can also run
```
yarn start
```
but make sure you have the back-end running too. See section [Stand-alone development mode](/be/README.md).

## Configuration

When running the application using `yarn` by command line, the file [./.env](./env) is used to load the configuration:
```
REACT_APP_BACK_END_API_HOST='localhost'
REACT_APP_BACK_END_API_PORT=3001
REACT_APP_WEBSITE_DESCRIPTION='React Application with ExpressJS and MariaDB back-end'
REACT_APP_WEBSITE_TITLE='React Application'
```

When running in `docker-compose`, you can override the above configuration in the `environment` section.

You can see that the [docker-compose.yml](../docker-compose.yml) actually binds the port 3002 to the back-end API as a demonstration.
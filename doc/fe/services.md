# Services and Mocking

If you create a new Service in the Front-End that provides, creates or updates data, you can follow this application standard to allow easy mocking.

The motivation to mocking the Back-End services in the Front-End is to allow fast and easy development with minimum dependencies.


## Implementation

If you follow my recommendation, you can use these steps:
1. Real implementation
In the `/fe/src/services/YOUR_SERVICE/index.ts`, create the functions you need.

I recommend this template for easy injection of mock:
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
In the `/fe/src/services/YOUR_SERVICE/mock.ts`, create the mocked versions of the functions.

You can use this template:
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
  myService: IMyService        // Return the new IMyService
}
```
Then in `/fe/src/index.tsx` and `/fe/src/index-mock.tsx` add the instance of your service:
```
const myService: IMyService = MyService();  // or MockMyService in the index-mock.tsx
<ServiceContext.Provider value={{ userService, myService }}>
```

## Motivation

This solution has the advantage to not bundle your mocked services in the production build.

## How is it done

You can see the [config-overrides.js](/fe/src/config-overrides.js) file that when the webpack build is in `mock` mode, it will use the `index-mock.ts` as entry point instead of the default `index.ts`.

Therefore everything you register in the `index-mock.ts` file will only be used when `mock` mode is used.

To enable the `mock` mode, the [package.json](/fe/src/package.json) file includes this in the `scripts` section:
```
"start:mock": "REACT_APP_ENV=mock react-app-rewired start",
```
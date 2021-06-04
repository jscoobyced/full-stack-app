# Routes

Routes are used to declare the attached end-point of your controller/handlers. Additionally you can add middleware in order to add some functionalities. You can read about [middleware](./middleware.md) document for more details.
To add a new handler, follow these steps:

1. Create a new file in `/be/src/routes`
2. Configure the route (see below)
4. Add your routes to the `/be/src/routes/routes.ts`
3. You don't have to implement the unit tests if you follow the same approach to the other routes.

## Configuring the route

To configure the route, you only need to define the 4 parts of it and export the route array. The format is as bellow:
```
export const routes: Route[] = [
  {
    // The method is onr of get, post, put, delete... from ExpressJS, so it needs to be in lowercase
    method: 'get',
    // The path you want to expose the end-point
    path: '/',
    // Add any middleware you want for this end-point
    middleware: [],
    // Pass the handler that will handle the request
    handler: home,
  },
];
```
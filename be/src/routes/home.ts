import { Route } from '../models/route';
import { home } from '../controllers/home/home';

export const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    middleware: [],
    handler: home,
  },
];

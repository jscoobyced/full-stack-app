import { Route } from '../models/route';
import { routes as homeRoutes } from './home';
import { routes as userRoutes } from './user';

export const routes: Route[] = [...homeRoutes, ...userRoutes];

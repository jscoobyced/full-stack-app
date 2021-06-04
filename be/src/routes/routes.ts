import { Route } from '../models/route';
import { routes as homeRoutes } from './home';
import { routes as ingredientRoutes } from './ingredients';
import { routes as userRoutes } from './user';

export const routes: Route[] = [...homeRoutes, ...ingredientRoutes, ...userRoutes];

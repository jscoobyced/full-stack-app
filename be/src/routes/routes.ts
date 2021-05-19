import { Route } from '../models/route';
import { routes as homeRoutes } from './home';
import { routes as ingredientRoutes } from './ingredients';

export const routes: Route[] = [...homeRoutes, ...ingredientRoutes];

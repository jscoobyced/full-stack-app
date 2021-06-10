import { Route } from '../models/route';
import { requestLogger } from '../middleware/logger';
import { API_VERSION } from '../config/constants';
import { getRecipesByUserId, saveRecipe } from '../controllers/recipes';

export const routes: Route[] = [
  {
    version: API_VERSION.V1,
    method: 'post',
    path: '/recipes',
    middleware: [requestLogger],
    handler: saveRecipe,
  },
  {
    version: API_VERSION.V1,
    method: 'get',
    path: '/recipes',
    middleware: [requestLogger],
    handler: getRecipesByUserId,
  },
];

import { Route } from '../models/route';
import { getIngredients, saveSelectedIngredients } from '../controllers/ingredients';
import { requestLogger } from '../middleware/logger';
import { API_VERSION } from '../config/constants';

export const routes: Route[] = [
  {
    version: API_VERSION.V1,
    method: 'get',
    path: '/ingredients',
    middleware: [requestLogger],
    handler: getIngredients,
  },
  {
    version: API_VERSION.V1,
    method: 'post',
    path: '/ingredients/selected',
    middleware: [requestLogger],
    handler: saveSelectedIngredients,
  },
];

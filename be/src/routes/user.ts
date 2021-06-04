import { Route } from '../models/route';
import { requestLogger } from '../middleware/logger';
import { postUserLogin } from '../controllers/users';
import { API_VERSION } from '../config/constants';

export const routes: Route[] = [
  {
    version: API_VERSION.V1,
    method: 'post',
    path: '/users/login',
    middleware: [requestLogger],
    handler: postUserLogin,
  },
];

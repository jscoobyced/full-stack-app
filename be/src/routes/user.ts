import { Route } from '../models/route';
import { getUsers, addUser, getUserByUsername } from '../controllers/user/user';
import { requestLogger } from '../middleware/logger';
import { API_VERSION } from '../config/constants';

export const routes: Route[] = [
  {
    version: API_VERSION.V1,
    method: 'post',
    path: '/user',
    middleware: [requestLogger],
    handler: addUser,
  },
  {
    version: API_VERSION.V1,
    method: 'get',
    path: '/users',
    middleware: [requestLogger],
    handler: getUsers,
  },
  {
    version: API_VERSION.V1,
    method: 'get',
    path: '/userByUsername',
    middleware: [requestLogger],
    handler: getUserByUsername,
  },
];

import { RequestHandler as Middleware } from 'express';
import { logger } from '../utils/logger';

export const requestLogger: Middleware = (req, res, next) => {
  const query = JSON.stringify(req.query);
  logger.info(`${req.method} ${req.path} with query: ${query}`);
  next();
};

import { RequestHandler as Middleware } from 'express';
import { logger } from '../utils/logger';

export const requestLogger: Middleware = (req, res, next) => {
  const query = JSON.stringify(req.query);
  const logQuery = !!query ? `\n\tquery: ${query}` : '';
  const body = JSON.stringify(req.body);
  const logBody = !!body ? `\n\tbody: ${body}` : '';
  logger.info(`${req.method} ${req.path}${logQuery}${logBody}`);
  next();
};

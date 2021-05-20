import mysql, { Pool } from 'mysql2';
import { DATABASE } from '../config/constants';
import { logger } from '../utils/logger';

let pool: Pool;

const configuration = {
  connectionLimit: 5,
  host: DATABASE.HOST,
  user: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.NAME,
};

export const createPool = (): void => {
  if (!!pool) {
    return;
  }
  logger.info('Creating database connection pool.');
  pool = mysql.createPool(configuration);
};

export const getPool = (): Pool => {
  return pool;
};

export const closePool = (): void => {
  pool.end((error) => {
    if (error) {
      console.log('Could not close connection pool. Error is: ' + error);
    } else {
      console.log('Connection pool closed.');
    }
  });
};

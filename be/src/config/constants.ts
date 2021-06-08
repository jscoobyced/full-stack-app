import * as dotenv from 'dotenv';

dotenv.config();

export const API_VERSION = {
  V1: '/v1',
};

export const API_ERROR_CODES = {
  NO_INGREDIENT_FOUND: 100,
  CANNOT_INSERT_DATA: 101,
  UNAUTHORIZED: 102,
};

export const ERROR_CODES = {
  INVALID_INPUTS: 1,
};

export const ERRORS = {
  BAD_USER_INFORMATION: 'Bad user information',
};

export const DATABASE = {
  HOST: process.env.DB_HOST,
  USERNAME: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};

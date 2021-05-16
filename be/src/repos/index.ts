import { closePool, createPool } from './mysql';

export const startMySQL = (): void => {
  createPool();
};

export const stopMySQL = (): void => {
  closePool();
};

import { getPool } from '../mysql';

export const storeUserLogin = async (uid: string): Promise<boolean> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL store_user_login_v1(?)', uid)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

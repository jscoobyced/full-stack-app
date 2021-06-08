import { User } from '../../models/common';
import { dbRows } from '../../utils/db';
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

export const getUserByReferenceId = async (uid: string): Promise<User | undefined> => {
  const pool = getPool();
  const users = await pool
    .promise()
    .query('CALL get_user_by_reference_id_v1(?, ?)', [uid, true])
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        const user: User = {
          uid: row.UserUid,
          isAllowed: row.UserIsAllowed,
        };
        return user;
      });
    });
  if (!!users && users.length === 1) {
    return users[0];
  }
};

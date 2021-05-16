import { User } from '../../models/user';
import { db_rows } from '../../utils/db';
import { getPool } from '../mysql';

const users: User[] = [
  {
    username: 'John',
    firstname: 'John',
    lastname: 'Smith',
  },
  {
    username: 'Jane',
    firstname: 'Jane',
    lastname: 'Doe',
  },
];

export const getUsers = async (): Promise<User[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_users_v1(true)')
    .then(([result]) => {
      const rows = db_rows(result);
      const users = rows.map((row) => {
        return {
          userId: row.id,
          username: row.username,
          firstname: row.firstname,
          lastname: row.lastname,
        };
      });
      return users;
    });
};

export const getUserByUsername = async (username: string): Promise<User | never[]> => {
  return getPool()
    .promise()
    .query('CALL get_user_by_username_v1(?)', username)
    .then(([result]) => {
      const rows = db_rows(result);
      const users = rows.map((row) => {
        return {
          userId: row.id,
          username: row.username,
          firstname: row.firstname,
          lastname: row.lastname,
        };
      });
      return users[0];
    });
};

export const addUser = async (user: User): Promise<User> => {
  users.push(user);
  user.userId = users.length;
  return Promise.resolve(user);
};

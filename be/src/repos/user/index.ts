import { Ingredient } from '../../models/ingredients';
import { db_rows } from '../../utils/db';
import { getPool } from '../mysql';

export const getUsers = async (): Promise<Ingredient[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_ingredients_v1(true)')
    .then(([result]) => {
      const rows = db_rows(result);
      const ingredients = rows.map((row) => {
        return ({} as unknown) as Ingredient;
      });
      return ingredients;
    });
};

import { Ingredient } from '../../models/ingredients';
import { dbRows } from '../../utils/db';
import { getPool } from '../mysql';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_ingredients_v1(true)')
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        return {} as unknown as Ingredient;
      });
    });
};

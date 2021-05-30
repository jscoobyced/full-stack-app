import { Calorie } from '../../models/ingredients';
import { dbRows } from '../../utils/db';
import { getPool } from '../mysql';

export const getCalories = async (): Promise<Calorie[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_all_calories_v1(true)')
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        return {
          id: row.CalorieId,
          ingredientId: row.CalorieIngredientId,
          unit: {
            id: row.UnitId,
            name: row.UnitName,
            symbol: row.UnitSymbol,
            category: {
              id: row.CategoryId,
              name: row.CategoryName,
            },
          },
          serving: row.CalorieServing,
          calories: row.CalorieCalories,
        };
      });
    });
};

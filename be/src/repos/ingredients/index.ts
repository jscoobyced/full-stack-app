import { Ingredient, SelectedIngredient } from '../../models/ingredients';
import { dbRows } from '../../utils/db';
import { getPool } from '../mysql';

export const getIngredients = async (): Promise<Ingredient[]> => {
  const pool = getPool();
  return pool
    .promise()
    .query('CALL get_all_ingredients_with_categories_v1(true)')
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        return {
          id: row.IngredientId,
          name: row.IngredientName,
          category: {
            id: row.CategoryId,
            name: row.CategoryName,
          },
        };
      });
    });
};

export const saveSelectedIngredients = async (
  uid: string,
  recipeName: string,
  ingredients: SelectedIngredient[],
): Promise<number> => {
  if (!ingredients || ingredients.length === 0 || !recipeName) {
    return Promise.resolve(0);
  }
  const pool = getPool();
  const recipeIds = await pool
    .promise()
    .query('CALL save_recipe_v1(?, ?)', [recipeName, uid])
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        return row.RecipeId;
      });
    });
  if (!recipeIds) {
    return -1;
  }
  if (recipeIds.length === 0) {
    return 0;
  }
  const recipeId = recipeIds[0];
  const savedIngredients: number[] = [];
  for (const ingredient of ingredients) {
    const results = await pool
      .promise()
      .query('CALL save_selected_ingredients_v1(?,?,?,?)', [
        recipeId,
        ingredient.ingredient.id,
        ingredient.calorie.id,
        ingredient.serving,
      ])
      .then(([result]) => {
        const rows = dbRows(result);
        return rows.map((row) => {
          return row.SelectedIngredientId;
        });
      });
    if (results && results.length === 1) {
      savedIngredients.push(results[0]);
    }
  }

  return savedIngredients.length;
};

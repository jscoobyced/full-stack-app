import { Recipe, SelectedIngredient } from '../../models/ingredients';
import { dbRows } from '../../utils/db';
import { getPool } from '../mysql';

export const saveRecipe = async (recipe: Recipe): Promise<number> => {
  if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0 || !recipe.name || !recipe.uid) {
    return Promise.resolve(0);
  }
  const pool = getPool();
  const recipeIds = await pool
    .promise()
    .query('CALL save_recipe_v1(?, ?)', [recipe.name, recipe.uid])
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
  for (const ingredient of recipe.ingredients) {
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

const mergeRecipeIngredients = (recipes: Recipe[]): Recipe[] => {
  const mergedRecipes: Recipe[] = [];
  for (const recipe of recipes) {
    calculateCalories(recipe.ingredients[0]);
    const existingRecipe = mergedRecipes.find((_recipe) => _recipe.id === recipe.id);
    if (!existingRecipe) {
      mergedRecipes.push(recipe);
    } else {
      const newIngredients = existingRecipe.ingredients.concat(recipe.ingredients);
      existingRecipe.ingredients = newIngredients;
    }
  }
  return mergedRecipes;
};

const calculateCalories = (ingredient: SelectedIngredient) => {
  ingredient.totalCalories = Math.round(
    (ingredient.calorie.calories * ingredient.serving) / ingredient.calorie.serving,
  );
};

export const getRecipesByUserId = async (uid: string): Promise<Recipe[]> => {
  const pool = getPool();
  const recipes = await pool
    .promise()
    .query('CALL get_recipes_by_userid_v1(?, ?)', [uid, true])
    .then(([result]) => {
      const rows = dbRows(result);
      return rows.map((row) => {
        const recipe: Recipe = {
          id: row.RecipeId,
          name: row.RecipeName,
          uid: row.RecipeUserId,
          ingredients: [
            {
              id: row.RecipeIngredientId,
              serving: row.RecipeIngredientServing,
              totalCalories: 0,
              ingredient: {
                id: row.IngredientId,
                name: row.IngredientName,
                category: {
                  id: row.IngredientCategoryId,
                  name: row.IngredientCategoryName,
                },
              },
              calorie: {
                id: row.CalorieId,
                calories: row.CalorieValues,
                ingredientId: row.CalorieIngredientId,
                serving: row.CalorieServing,
                unit: {
                  id: row.CalorieUnitId,
                  name: row.CalorieUnitName,
                  symbol: row.CalorieUnitSymbol,
                  category: {
                    id: row.CalorieCategoryId,
                    name: row.CalorieCategoryName,
                  },
                },
              },
            },
          ],
        };
        return recipe;
      });
    });
  return Promise.resolve(mergeRecipeIngredients(recipes));
};

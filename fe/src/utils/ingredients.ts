import { Ingredient } from '../models/ingredients';

export const sortIngredients = (ingredient1: Ingredient, ingredient2: Ingredient): number => {
  return ingredient1.name.localeCompare(ingredient2.name);
};

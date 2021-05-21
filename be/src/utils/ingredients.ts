import { Ingredient } from '../models/ingredients';

export const mergeAllIngredients = (
  destinationIngredients: Ingredient[],
  source: Ingredient[],
  ingredient?: Ingredient,
): Ingredient[] => {
  if (!ingredient) {
    return destinationIngredients.sort(sortIngredients);
  }
  const exists = destinationIngredients.find((_ingredient) => _ingredient.id === ingredient.id);
  if (!!exists) {
    const merged = mergeIngredients(exists, ingredient);
    const existingIndex = destinationIngredients.findIndex((_ingredient) => _ingredient.id === ingredient.id);
    destinationIngredients[existingIndex] = merged;
  } else {
    destinationIngredients.push(ingredient);
  }
  const head = source.pop();
  return mergeAllIngredients(destinationIngredients, source, head);
};

const mergeIngredients = (from: Ingredient, to: Ingredient): Ingredient => {
  if (!!from.conversions) {
    if (!to.conversions) {
      to.conversions = [];
    }
    const merged = to.conversions?.concat(from.conversions);
    to.conversions = merged;
  }
  return to;
};

const sortIngredients = (ingredient1: Ingredient, ingredient2: Ingredient): number => {
  return ingredient1.name.localeCompare(ingredient2.name);
};

import { Ingredient } from '../models/ingredients';
import { sortIngredients } from './ingredients';
import * as json from '../models/ingredient-data.json';

describe('Ingredients', () => {
  it('can sort ingredients', () => {
    const ingredients = JSON.parse(JSON.stringify(json.ingredients)) as Ingredient[];
    expect(ingredients.length).toEqual(7);
    const sortedIngredients = ingredients.sort(sortIngredients);
    expect(sortedIngredients[0].id).toEqual(2);
  });
});

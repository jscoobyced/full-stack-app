import { Ingredient } from '../models/ingredients';
import { mergeAllIngredients } from './ingredients';
import * as json from '../models/ingredient-data.json';

describe('Ingredients', () => {
  it('can merge ingredients', () => {
    const ingredients = JSON.parse(JSON.stringify(json.ingredients)) as Ingredient[];
    expect(ingredients.length).toEqual(10);
    const head = ingredients.pop();
    const mergedIngredients = mergeAllIngredients([], ingredients, head);
    expect(mergedIngredients.length).toEqual(7);
    expect(mergedIngredients[0].conversions?.length).toEqual(2);
  });

  it('can merge ingredients when there is no in destination conversion', () => {
    const ingredients = JSON.parse(JSON.stringify(json.ingredients)) as Ingredient[];
    expect(ingredients.length).toEqual(10);
    ingredients[0].conversions = undefined;
    const head = ingredients.pop();
    const mergedIngredients = mergeAllIngredients([], ingredients, head);
    expect(mergedIngredients.length).toEqual(7);
    expect(mergedIngredients[0].conversions?.length).toEqual(1);
  });

  it('can merge ingredients when there is no in source conversion', () => {
    const ingredients = JSON.parse(JSON.stringify(json.ingredients)) as Ingredient[];
    expect(ingredients.length).toEqual(10);
    ingredients[1].conversions = undefined;
    const head = ingredients.pop();
    const mergedIngredients = mergeAllIngredients([], ingredients, head);
    expect(mergedIngredients.length).toEqual(7);
    expect(mergedIngredients[0].conversions?.length).toEqual(1);
  });
});

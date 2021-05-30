import { mockIngredients } from '../services/Ingredient/mock-data';
import { sortIngredients } from './ingredients';

describe('Ingredients', () => {
  it('can sort ingredients', () => {
    expect(mockIngredients.length).toEqual(4);
    const sortedIngredients = mockIngredients.sort(sortIngredients);
    expect(sortedIngredients[0].id).toEqual(4);
  });
});

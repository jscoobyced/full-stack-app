import { getIngredients } from './IngredientService';
import { mockIngredients } from './__mocks__/IngredientService';

describe('IngredientService - getIngredients', () => {
  it('returns the ingredients', async () => {
    const response = await getIngredients();
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data).toEqual(mockIngredients);
  });
});

import { getAllIngredients } from './IngredientService';
import * as json from '../models/ingredient-data.json';
import { Ingredient } from '../models/ingredients';

const mockIngredients = json.ingredients;

jest.mock('../repos/ingredients', () => ({
  getIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
  }),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('IngredientService - getIngredients', () => {
  it('returns the ingredients', async () => {
    const response = await getAllIngredients();
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as Ingredient[];
    expect(data.length).toEqual(7);
  });
});

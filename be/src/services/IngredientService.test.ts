import { getAllIngredients } from './IngredientService';
import * as json from '../models/ingredient-data.json';
import { IngredientResponse } from '../models/ingredients';

const mockIngredients = json.ingredients;
const mockCalories = json.calories;

jest.mock('../repos/ingredients', () => ({
  getIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
  }),
}));

jest.mock('../repos/calories', () => ({
  getCalories: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockCalories);
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
    const data = response.data as IngredientResponse;
    expect(data.ingredients.length).toEqual(7);
    expect(data.calories.length).toEqual(8);
  });
});

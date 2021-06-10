import * as IngredientService from './IngredientService';
import * as json from '../models/ingredient-data.json';
import { IngredientResponse } from '../models/ingredients';

const mockIngredients = json.ingredients;
const mockCalories = json.calories;
const mockSelectedIngredients = [
  {
    calorie: json.calories[1],
    id: 5,
    ingredient: json.ingredients[0],
    serving: 53,
    totalCalories: 267,
  },
  {
    calorie: json.calories[0],
    id: 8,
    ingredient: json.ingredients[1],
    serving: 77,
    totalCalories: 95,
  },
];

jest.mock('../repos/ingredients', () => ({
  getIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
  }),
  saveSelectedIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockSelectedIngredients.length);
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
    const response = await IngredientService.getAllIngredients();
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as IngredientResponse;
    expect(data.ingredients.length).toEqual(7);
    expect(data.calories.length).toEqual(8);
  });
});

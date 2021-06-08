import { IngredientService } from ".";
import { SelectedIngredient } from "../../models/ingredients";
import { mockIngredients, mockCalories } from "./mock-data";

const mockResponse = {
  json: () => Promise.resolve({
    data: {
      ingredients: mockIngredients,
      calories: mockCalories,
    },
  }),
  status: 200,
} as Response;

const mockSelectedIngredients: SelectedIngredient[] = [{
  id: 1,
  ingredient: mockIngredients[1],
  calorie: mockCalories[1],
  serving: 1,
  totalCalories: 100,
}];

const recipeName = 'Recipe #1';
const uid = '1234567';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Ingredient Service', () => {
  it('gets the ingredients from API', async () => {
    const response = await IngredientService().getIngredients();
    expect(response.ingredients.length).toEqual(mockIngredients.length);
    expect(response.calories.length).toEqual(mockCalories.length);
  });

  it('can save the selected ingredients to API', async () => {
    const response = await IngredientService().saveSelectedIngredients(uid, recipeName, mockSelectedIngredients);
    expect(response.data).toEqual(true);
  });

  it('can save the selected ingredients to API when no ingredients', async () => {
    const response = await IngredientService().saveSelectedIngredients(uid, recipeName, []);
    expect(response.data).toEqual(true);
  });

  it('cannot save the selected ingredients to API when undefined', async () => {
    const response = await IngredientService().saveSelectedIngredients(uid, recipeName, undefined as unknown as SelectedIngredient[]);
    expect(response.error).toBeDefined();
  });

  it('cannot save the selected ingredients to API when no recipe name', async () => {
    const response = await IngredientService().saveSelectedIngredients(uid, undefined as unknown as string, undefined as unknown as SelectedIngredient[]);
    expect(response.error).toBeDefined();
  });

  it('fails to asve the selected ingredient due to API error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.reject());
    const response = await IngredientService().saveSelectedIngredients(uid, recipeName, mockSelectedIngredients);
    expect(response.error).toBeDefined();
  });

  it('fails to asve the selected ingredient due to unexpected error', async () => {
    const mockErrorResponse = {
      json: () => Promise.resolve({
        error: {
          message: 'blablabla'
        },
      }),
      status: 401,
    } as Response;
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockErrorResponse));
    const response = await IngredientService().saveSelectedIngredients(uid, recipeName, mockSelectedIngredients);
    expect(response.error).toBeDefined();
  });
});

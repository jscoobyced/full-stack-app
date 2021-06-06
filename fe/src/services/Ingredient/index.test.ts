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

  it('can save the ingredients to API', async () => {
    const response = await IngredientService().saveIngredients(mockSelectedIngredients);
    expect(response).toEqual(true);
  });

  it('can save the ingredients to API when no ingredients', async () => {
    const response = await IngredientService().saveIngredients([]);
    expect(response).toEqual(true);
  });

  it('can save the ingredients to API when undefined', async () => {
    const response = await IngredientService().saveIngredients(undefined as unknown as SelectedIngredient[]);
    expect(response).toEqual(false);
  });

  it('fails to asve the ingredient due to API error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.reject());
    const response = await IngredientService().saveIngredients(mockSelectedIngredients);
    expect(response).toEqual(false);
  });
});

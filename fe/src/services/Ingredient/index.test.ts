import { IngredientService } from ".";
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

});

import { IngredientService } from ".";
import { mockIngredients } from "./mock-data";

const mockResponse = {
  json: () => Promise.resolve({
    data: mockIngredients,
  }),
} as Response;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse))
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Ingredient Service', () => {
  it('gets the ingredients from API', async () => {
    const ingredients = await IngredientService().getIngredients();
    expect(ingredients.length).toEqual(mockIngredients.length);
  });
});

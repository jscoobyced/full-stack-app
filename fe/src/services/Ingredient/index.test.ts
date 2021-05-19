import { IngredientService } from ".";
import { mockIngredients } from "./mock-data";

const mockResponse = {
  json: () => Promise.resolve(mockIngredients),
} as Response;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse))
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Configuration Service', () => {
  it('gets the configuration from API', async () => {
    const configuration = await IngredientService().getIngredients();
    expect(configuration).toBeDefined();
    expect(configuration).toEqual(mockIngredients);
  });
});

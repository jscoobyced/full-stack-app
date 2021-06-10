import { ErrorData } from '../../models/service';
import * as IngredientController from '.';
import { IngredientTypes } from '../../models/ingredients';
import { createDefaultMock } from '../../testUtil';
import * as json from '../../models/ingredient-data.json';

let mockData = (): unknown => undefined;
let mockError = (): ErrorData => undefined;

const mockMocks = () => {
  return Promise.resolve({
    data: mockData(),
    error: mockError(),
  });
};

jest.mock('../../services/IngredientService', () => ({
  getAllIngredients: jest.fn().mockImplementation(async () => mockMocks()),
  saveRecipe: jest.fn().mockImplementation(async () => mockMocks()),
}));

beforeEach(() => {
  mockData = (): IngredientTypes => undefined;
  mockError = (): ErrorData => undefined;
});

describe('Ingredient Controller - getIngredients', () => {
  it('does not find ingredients due to an error', async () => {
    mockError = () => {
      return {
        code: 10,
        message: 'Blablabla',
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock();
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('does not find ingredient with undefined data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('does not find ingredient with empty data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    const ingredientResponse = {
      ingredients: [],
      calories: [],
    };
    mockData = () => ingredientResponse;
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('returns ingredient list', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockData = () => json;
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });
});

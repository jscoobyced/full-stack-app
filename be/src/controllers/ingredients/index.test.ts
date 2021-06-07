import { ErrorData } from '../../models/service';
import * as IngredientController from '.';
import { IngredientTypes, SelectedIngredient } from '../../models/ingredients';
import { createDefaultMock } from '../../testUtil';
import * as json from '../../models/ingredient-data.json';

let mockData = (): IngredientTypes => undefined;
let mockError = (): ErrorData => undefined;

jest.mock('../../services/IngredientService', () => ({
  getAllIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve({
      data: mockData(),
      error: mockError(),
    });
  }),
  saveSelectedIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve({
      data: mockData(),
      error: mockError(),
    });
  }),
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

  it('saves selected ingredients', async () => {
    const body = {
      ingredients: [
        {
          calorie: json.calories[0],
          id: 2,
          ingredient: json.ingredients[0],
          serving: 10,
          totalCalories: 100,
        },
      ],
    };
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });

  it('returns error when no selected ingredients to save', async () => {
    const body = {
      ingredients: [],
    };
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('returns error when undefined selected ingredients to save', async () => {
    const body = {
      ingredients: undefined,
    };
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('returns error when undefined to save', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });
});

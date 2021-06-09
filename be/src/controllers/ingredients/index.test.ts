import { ErrorData } from '../../models/service';
import * as IngredientController from '.';
import { IngredientTypes } from '../../models/ingredients';
import { createDefaultMock } from '../../testUtil';
import * as json from '../../models/ingredient-data.json';
import { API_ERROR_CODES } from '../../config/constants';

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
  saveSelectedIngredients: jest.fn().mockImplementation(async () => mockMocks()),
}));

const dataBody = {
  ingredients: [
    {
      calorie: json.calories[0],
      id: 2,
      ingredient: json.ingredients[0],
      serving: 10,
      totalCalories: 100,
    },
  ],
  recipeName: 'My Recipe',
  uid: '123456',
};

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
    mockData = () => {
      return {
        data: 3,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });

  it('fails saving selected ingredients', async () => {
    mockError = () => {
      return {
        code: 3,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('fails saving selected ingredients due to unauthorized', async () => {
    mockError = () => {
      return {
        code: API_ERROR_CODES.UNAUTHORIZED,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await IngredientController.saveSelectedIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
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

  it('returns user recipes', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      uid: '123456',
    };
    await IngredientController.getRecipes(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it('returns HTTP 404 when no user id provided', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {};
    await IngredientController.getRecipes(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

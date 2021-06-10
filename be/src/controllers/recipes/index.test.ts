import { ErrorData } from '../../models/service';
import * as RecipeController from '.';
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

jest.mock('../../services/recipeService', () => ({
  getRecipesByUserId: jest.fn().mockImplementation(async () => mockMocks()),
  saveRecipe: jest.fn().mockImplementation(async () => mockMocks()),
}));

const dataBody = {
  recipe: {
    id: 1,
    ingredients: [
      {
        calorie: json.calories[0],
        id: 2,
        ingredient: json.ingredients[0],
        serving: 10,
        totalCalories: 100,
      },
    ],
    name: 'My Recipe',
    uid: '123456',
  },
};

beforeEach(() => {
  mockData = (): IngredientTypes => undefined;
  mockError = (): ErrorData => undefined;
});

describe('Recipe Controller - saveRecipe', () => {
  it('saves recipe', async () => {
    mockData = () => {
      return {
        data: 3,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });

  it('fails saving recipe', async () => {
    mockError = () => {
      return {
        code: 3,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('fails saving recipe due to unauthorized', async () => {
    mockError = () => {
      return {
        code: API_ERROR_CODES.UNAUTHORIZED,
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock(dataBody);
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('returns error when no recipe to save', async () => {
    const body = {
      ingredients: [],
    };
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('returns error when undefined selected ingredients to save', async () => {
    const body = {
      ingredients: undefined,
    };
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  it('returns error when undefined to save', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await RecipeController.saveRecipe(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });
});

describe('RecipeController - getRecipesByUserId', () => {
  it('returns user recipes', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      uid: '123456',
    };
    await RecipeController.getRecipesByUserId(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it('returns HTTP 404 when no user id provided', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {};
    await RecipeController.getRecipesByUserId(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

import { ErrorData } from '../../models/common';
import * as IngredientController from '.';
import { Ingredient, IngredientTypes } from '../../models/ingredients';
import { createDefaultMock } from '../../testUtil';
import { mockIngredients } from '../../services/__mocks__/IngredientService';

let mockData = (): IngredientTypes => undefined;
let mockError = (): ErrorData => undefined;

jest.mock('../../services/IngredientService', () => ({
  getAllIngredients: jest.fn().mockImplementation(async () => {
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

  it('does not find user with undefined data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('does not find user with empty data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockData = () => [] as Ingredient[];
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('returns ingredient list', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockData = () => mockIngredients;
    await IngredientController.getIngredients(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });
});

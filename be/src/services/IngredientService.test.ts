import * as IngredientRepo from './IngredientService';
import * as json from '../models/ingredient-data.json';
import { IngredientResponse } from '../models/ingredients';
import { User } from '../models/common';
import { API_ERROR_CODES } from '../config/constants';

const mockIngredients = json.ingredients;
const mockCalories = json.calories;
const mockSelectedIngredients = [
  {
    calorie: json.calories[1],
    id: 5,
    ingredient: json.ingredients[0],
    serving: 53,
    totalCalories: 267,
  },
  {
    calorie: json.calories[0],
    id: 8,
    ingredient: json.ingredients[1],
    serving: 77,
    totalCalories: 95,
  },
];

const defaultUser: User = {
  uid: '123456',
  isAllowed: true,
};

let user: User = defaultUser;

const mockUser = () => {
  return user;
};

jest.mock('../repos/ingredients', () => ({
  getIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
  }),
  saveSelectedIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockSelectedIngredients.length);
  }),
}));

jest.mock('../repos/calories', () => ({
  getCalories: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockCalories);
  }),
}));

jest.mock('../repos/users', () => ({
  getUserByReferenceId: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockUser());
  }),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  user = defaultUser;
});

describe('IngredientService - getIngredients', () => {
  it('returns the ingredients', async () => {
    const response = await IngredientRepo.getAllIngredients();
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as IngredientResponse;
    expect(data.ingredients.length).toEqual(7);
    expect(data.calories.length).toEqual(8);
  });

  it('saves the selected ingredients', async () => {
    const response = await IngredientRepo.saveSelectedIngredients('123456', 'recipe', mockSelectedIngredients);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as number;
    expect(data).toEqual(mockSelectedIngredients.length);
  });

  it("doesn't saves the selected ingredients due to unauthorized", async () => {
    user = {
      uid: '132',
      isAllowed: false,
    };
    const response = await IngredientRepo.saveSelectedIngredients('123456', 'recipe', mockSelectedIngredients);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(API_ERROR_CODES.UNAUTHORIZED);
  });

  it("doesn't saves the selected ingredients due to no user", async () => {
    user = undefined as unknown as User;
    const response = await IngredientRepo.saveSelectedIngredients('123456', 'recipe', mockSelectedIngredients);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(API_ERROR_CODES.CANNOT_INSERT_DATA);
  });
});

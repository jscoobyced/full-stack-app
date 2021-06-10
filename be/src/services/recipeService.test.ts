import * as RecipeService from './recipeService';
import * as json from '../models/ingredient-data.json';
import { User } from '../models/common';
import { API_ERROR_CODES } from '../config/constants';
import { Recipe } from '../models/ingredients';

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

const mockRecipe: Recipe = {
  id: 1,
  name: 'My Recipe',
  ingredients: mockSelectedIngredients,
  uid: '123456',
};

const mockUserRecipes: Recipe[] = [mockRecipe, mockRecipe];

jest.mock('../repos/ingredients', () => ({
  getIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
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

jest.mock('../repos/recipe', () => ({
  getRecipesByUserId: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockUserRecipes);
  }),
  saveRecipe: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockSelectedIngredients.length);
  }),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  user = defaultUser;
});

describe('recipeService - saveRecipe', () => {
  it('saves the selected ingredients', async () => {
    const response = await RecipeService.saveRecipe(mockRecipe);
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
    const response = await RecipeService.saveRecipe(mockRecipe);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(API_ERROR_CODES.UNAUTHORIZED);
  });

  it("doesn't saves the selected ingredients due to no user", async () => {
    user = undefined as unknown as User;
    const response = await RecipeService.saveRecipe(mockRecipe);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(API_ERROR_CODES.CANNOT_INSERT_DATA);
  });
});

describe('recipeService - getRecipesByUserId', () => {
  it('get the recipes', async () => {
    const response = await RecipeService.getRecipesByUserId(defaultUser.uid);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as Recipe[];
    expect(data).toEqual(mockUserRecipes);
  });

  it('fail to get recipes because user does not exist', async () => {
    user = undefined as unknown as User;
    const response = await RecipeService.getRecipesByUserId(defaultUser.uid);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(API_ERROR_CODES.USER_DOES_NOT_EXIST);
  });
});

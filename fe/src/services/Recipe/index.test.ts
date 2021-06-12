import { RecipeService } from ".";
import { Recipe, SelectedIngredient } from "../../models/ingredients";
import { mockIngredients, mockCalories, mockRecipes } from "../Ingredient/mock-data";

const mockResponse: { data: any } = {
  data: {
    ingredients: mockIngredients,
    calories: mockCalories,
  },
};

const recipeName = 'Recipe #1';
const uid = '1234567';

jest.mock('../../repos/http', () => ({
  getData: () => Promise.resolve(mockResponse),
  postData: () => Promise.resolve(mockResponse)
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Recipe Service', () => {

  it('can save the recipe to API', async () => {
    mockResponse.data = true;
    const response = await RecipeService().saveRecipe(mockRecipes[0]);
    expect(response.data).toEqual(true);
  });

  it('can save the recipe to API when no ingredients', async () => {
    const recipe: Recipe = {
      id: 1, uid, name: recipeName, ingredients: [],
    };
    const response = await RecipeService().saveRecipe(recipe);
    expect(response.data).toEqual(true);
  });

  it('cannot save the recipe to API when undefined', async () => {
    const recipe: Recipe = {
      id: 1, uid, name: recipeName, ingredients: undefined as unknown as SelectedIngredient[],
    };
    const response = await RecipeService().saveRecipe(recipe);
    expect(response.error).toBeDefined();
  });

  it('cannot save the recipe to API when no recipe name', async () => {
    const recipe: Recipe = {
      id: 1, uid, name: undefined as unknown as string, ingredients: undefined as unknown as SelectedIngredient[],
    };
    const response = await RecipeService().saveRecipe(recipe);
    expect(response.error).toBeDefined();
  });

  it('fails to save the recipe when recipe is undefined', async () => {
    const response = await RecipeService().saveRecipe(undefined as unknown as Recipe);
    expect(response.error).toBeDefined();
  });

  it('retrieves saved recipe', async () => {
    mockResponse.data = mockRecipes;
    const response = await RecipeService().getRecipes(uid);
    expect(response.data).toBeDefined();
    expect(response.data).toEqual(mockRecipes);
  });
});

import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/service';
import { Recipe, SelectedIngredient } from '../../models/ingredients';
import * as IngredientService from '../../services/IngredientService';
import * as json from '../../models/ingredient-data.json';

const isRecipeValid = (recipe: Recipe): boolean => {
  if (!recipe) {
    return false;
  }
  const { ingredients, name, uid } = recipe;
  return !(!ingredients || !name || !uid);
};

export const saveRecipe: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  const recipe: Recipe = req.body?.recipe;
  if (!isRecipeValid(recipe)) {
    response.error = {
      code: API_ERROR_CODES.CANNOT_INSERT_DATA,
      message: 'No data to insert.',
    };
    res.status(400).send(response);
    return;
  }
  const result = await IngredientService.saveRecipe(recipe);
  if (!!result && !!result.data) {
    response.data = result.data;
    res.send(response);
  } else {
    response.error = result.error;
    const status = result.error?.code === API_ERROR_CODES.UNAUTHORIZED ? 401 : 400;
    res.status(status).send(response);
  }
};

export const getRecipes: Handler = async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    res.status(404);
    return;
  }

  const mockSelectedIngredients: SelectedIngredient[] = [
    {
      id: 1,
      ingredient: json.ingredients[0],
      calorie: json.calories[0],
      serving: 1,
      totalCalories: 100,
    },
    {
      id: 2,
      ingredient: json.ingredients[1],
      calorie: json.calories[1],
      serving: 15,
      totalCalories: 65,
    },
    {
      id: 3,
      ingredient: json.ingredients[2],
      calorie: json.calories[2],
      serving: 150,
      totalCalories: 125,
    },
  ];

  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: 'Recipe 1',
      ingredients: mockSelectedIngredients,
      uid: '123456',
    },
    {
      id: 2,
      name: 'Recipe 2',
      ingredients: mockSelectedIngredients.concat(mockSelectedIngredients),
      uid: '123456',
    },
  ];
  const response: ControllerResponse = {
    data: mockRecipes,
  };
  res.send(response);
};

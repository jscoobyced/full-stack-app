import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/service';
import { IngredientResponse, Recipe, SelectedIngredient } from '../../models/ingredients';
import * as IngredientService from '../../services/IngredientService';
import * as json from '../../models/ingredient-data.json';

export const getIngredients: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  const result = await IngredientService.getAllIngredients();
  if (!!result.error) {
    response.error = {
      message: result.error.message,
    };
    res.status(400).send(response);
  } else if (
    !result.data ||
    !(result.data as IngredientResponse).ingredients ||
    (result.data as IngredientResponse).ingredients.length === 0
  ) {
    response.error = {
      code: API_ERROR_CODES.NO_INGREDIENT_FOUND,
    };
    res.status(404).send(response);
  } else {
    res.send(result);
  }
};

export const saveSelectedIngredients: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  const ingredients = req.body?.ingredients;
  const recipeName = req.body?.recipeName;
  const uid = req.body?.uid;
  if (!ingredients || (ingredients as unknown[]).length === 0 || !recipeName || !uid) {
    response.error = {
      code: API_ERROR_CODES.CANNOT_INSERT_DATA,
      message: 'No data to insert.',
    };
    res.status(400).send(response);
    return;
  }
  const selectedIngredients: SelectedIngredient[] = ingredients as SelectedIngredient[];
  const result = await IngredientService.saveSelectedIngredients(uid, recipeName, selectedIngredients);
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
      recipeName: 'Recipe 1',
      ingredients: mockSelectedIngredients,
      uid: '123456',
    },
    {
      id: 2,
      recipeName: 'Recipe 2',
      ingredients: mockSelectedIngredients.concat(mockSelectedIngredients),
      uid: '123456',
    },
  ];
  const response: ControllerResponse = {
    data: mockRecipes,
  };
  res.send(response);
};

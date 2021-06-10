import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/service';
import { Recipe } from '../../models/ingredients';
import * as RecipeService from '../../services/recipeService';

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
  const result = await RecipeService.saveRecipe(recipe);
  if (!!result && !!result.data) {
    response.data = result.data;
    res.send(response);
  } else {
    response.error = result.error;
    const status = result.error?.code === API_ERROR_CODES.UNAUTHORIZED ? 401 : 400;
    res.status(status).send(response);
  }
};

export const getRecipesByUserId: Handler = async (req, res) => {
  if (!req.query.uid) {
    res.status(404);
    return;
  }
  const uid = req.query.uid as string;
  const recipes = await RecipeService.getRecipesByUserId(uid);
  const response: ControllerResponse = {
    data: recipes.data,
  };
  res.send(response);
};

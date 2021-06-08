import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/service';
import { IngredientResponse, SelectedIngredient } from '../../models/ingredients';
import * as IngredientService from '../../services/IngredientService';

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

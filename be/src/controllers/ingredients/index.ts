import * as IngredientService from '../../services/IngredientService';
import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/common';
import { Ingredient } from '../../models/ingredients';

export const getIngredients: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  return IngredientService.getIngredients().then((result) => {
    if (!!result.error) {
      response.error = {
        message: result.error.message,
      };
      res.status(400).send(response);
    } else if (!result.data || (result.data as Ingredient[]).length === 0) {
      response.error = {
        code: API_ERROR_CODES.NO_INGREDIENT_FOUND,
      };
      res.status(404).send(response);
    } else res.send(result);
  });
};

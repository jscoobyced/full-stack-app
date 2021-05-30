import { Handler } from '../../models/route';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/service';
import { IngredientResponse } from '../../models/ingredients';
import { getAllIngredients } from '../../services/IngredientService';

export const getIngredients: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  const result = await getAllIngredients();
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

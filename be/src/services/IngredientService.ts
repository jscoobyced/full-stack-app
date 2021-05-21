import { ServiceResponse } from '../models/common';
import * as IngredientRepo from '../repos/ingredients';
import { mergeAllIngredients } from '../utils/ingredients';

export const getAllIngredients = async (): Promise<ServiceResponse> => {
  return IngredientRepo.getIngredients().then((ingredients) => {
    // `ingredients` contains duplicates if there are conversions
    // so we need to merge them
    const head = ingredients.pop();
    const mergedIngredients = mergeAllIngredients([], ingredients, head);
    return {
      data: mergedIngredients,
    };
  });
};

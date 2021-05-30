import { ServiceResponse } from '../models/service';
import * as IngredientRepo from '../repos/ingredients';

export const getAllIngredients = async (): Promise<ServiceResponse> => {
  return IngredientRepo.getIngredients().then((ingredients) => {
    return {
      data: {
        ingredients: ingredients,
        calories: [],
      },
    };
  });
};

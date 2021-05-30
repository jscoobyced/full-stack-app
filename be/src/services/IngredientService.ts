import { ServiceResponse } from '../models/service';
import * as IngredientRepo from '../repos/ingredients';
import * as CalorieRepo from '../repos/calories';

export const getAllIngredients = async (): Promise<ServiceResponse> => {
  return IngredientRepo.getIngredients().then((ingredients) => {
    return CalorieRepo.getCalories().then((calories) => {
      return {
        data: {
          ingredients: ingredients,
          calories: calories,
        },
      };
    });
  });
};

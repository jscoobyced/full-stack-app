import { ServiceResponse } from '../models/service';
import * as IngredientRepo from '../repos/ingredients';
import * as CalorieRepo from '../repos/calories';
import { SelectedIngredient } from '../models/ingredients';

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

export const saveSelectedIngredients = async (ingredients: SelectedIngredient[]): Promise<ServiceResponse> => {
  const response: ServiceResponse = {} as ServiceResponse;
  const result = await IngredientRepo.saveSelectedIngredients(ingredients);
  response.data = result;
  return Promise.resolve(response);
};

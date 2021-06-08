import { ServiceResponse } from '../models/service';
import * as IngredientRepo from '../repos/ingredients';
import * as CalorieRepo from '../repos/calories';
import { SelectedIngredient } from '../models/ingredients';
import * as UserRepo from '../repos/users';
import { API_ERROR_CODES } from '../config/constants';

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

export const saveSelectedIngredients = async (
  uid: string,
  recipeName: string,
  ingredients: SelectedIngredient[],
): Promise<ServiceResponse> => {
  const response: ServiceResponse = {} as ServiceResponse;
  const user = await UserRepo.getUserByReferenceId(uid);
  if (!!user && user.isAllowed) {
    const result = await IngredientRepo.saveSelectedIngredients(recipeName, ingredients);
    response.data = result;
  } else {
    response.error = {
      code: user && !user.isAllowed ? API_ERROR_CODES.UNAUTHORIZED : API_ERROR_CODES.CANNOT_INSERT_DATA,
      message: 'User is not authorized to save recipe.',
    };
  }
  return Promise.resolve(response);
};

import { API_ERROR_CODES } from '../config/constants';
import { Recipe } from '../models/ingredients';
import { ServiceResponse } from '../models/service';
import * as UserRepo from '../repos/users';
import * as RecipeRepo from '../repos/recipe';

export const saveRecipe = async (recipe: Recipe): Promise<ServiceResponse> => {
  const response: ServiceResponse = {} as ServiceResponse;
  const user = await UserRepo.getUserByReferenceId(recipe.uid);
  if (!!user && user.isAllowed) {
    const result = await RecipeRepo.saveRecipe(recipe);
    response.data = result;
  } else {
    response.error = {
      code: user && !user.isAllowed ? API_ERROR_CODES.UNAUTHORIZED : API_ERROR_CODES.CANNOT_INSERT_DATA,
      message: 'User is not authorized to save recipe.',
    };
  }
  return Promise.resolve(response);
};

export const getRecipesByUserId = async (uid: string): Promise<ServiceResponse> => {
  const response: ServiceResponse = {} as ServiceResponse;
  const user = await UserRepo.getUserByReferenceId(uid);
  if (!!user) {
    const result = await RecipeRepo.getRecipesByUserId(uid);
    response.data = result;
  } else {
    response.error = {
      code: API_ERROR_CODES.USER_DOES_NOT_EXIST,
      message: 'User is not authorized to save recipe.',
    };
  }
  return Promise.resolve(response);
};

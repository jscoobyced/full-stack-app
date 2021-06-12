import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { ControllerResponse } from "../../models/common";
import { Recipe } from "../../models/ingredients";
import HttpService from "../../repos/http";

export interface IRecipeService {
  saveRecipe: (recipe: Recipe) => Promise<ControllerResponse>,
  getRecipes: (uid: string) => Promise<ControllerResponse>,
}

export const RecipeService = (): IRecipeService => {

  const isRecipeValid = (recipe: Recipe): boolean => {
    if (!recipe) {
      return false;
    }
    const { ingredients, name, uid } = recipe;
    return !(!ingredients || !name || !uid);
  };

  const saveRecipe = async (recipe: Recipe): Promise<ControllerResponse> => {
    const controllerResponse: ControllerResponse = {};
    if (!isRecipeValid(recipe)) {
      controllerResponse.error = {
        message: 'Invalid recipe data.',
      }
      return Promise.resolve(controllerResponse);
    }
    return HttpService.postData(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.saveRecipes}`, { recipe: recipe });
  };

  const getRecipes = (uid: string): Promise<ControllerResponse> => {
    return HttpService.getData(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getRecipes}/?uid=${uid}`);
  };

  return {
    saveRecipe,
    getRecipes,
  }
}

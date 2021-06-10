import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { ControllerResponse } from "../../models/common";
import { Recipe } from "../../models/ingredients";

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
    const result = await fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.saveRecipes}`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    }).then(async (response) => {
      if (response.status === 200) {
        controllerResponse.data = true;
      } else {
        await response.json().then((data: ControllerResponse) => {
          controllerResponse.error = {
            message: data.error?.message,
          };
        });
      }
      return controllerResponse;
    });

    return Promise.resolve(result);
  };

  const getRecipes = (uid: string): Promise<ControllerResponse> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getRecipes}/?uid=${uid}`).then(data => {
      return data.json().then(response => {
        const controllerResponse: ControllerResponse = {
          data: response.data,
        };
        return controllerResponse;
      });
    });
  };

  return {
    saveRecipe,
    getRecipes,
  }
}

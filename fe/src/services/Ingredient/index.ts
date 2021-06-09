import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { ControllerResponse } from "../../models/common";
import { IngredientResponse, Recipe, SelectedIngredient } from "../../models/ingredients";

export interface IIngredientService {
  getIngredients: () => Promise<IngredientResponse>,
  saveSelectedIngredients: (uid: string, recipeName: string, ingredients: SelectedIngredient[]) => Promise<ControllerResponse>,
  getRecipes: (uid: string) => Promise<Recipe[]>,
}

export const IngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getIngredients}`).then(data => {
      return data.json().then(response => {
        return response.data as IngredientResponse;
      });
    });
  }

  const saveSelectedIngredients = async (
    uid: string,
    recipeName: string,
    ingredients: SelectedIngredient[]): Promise<ControllerResponse> => {
    const controllerResponse: ControllerResponse = {};
    if (!ingredients || !recipeName) {
      controllerResponse.error = {
        message: 'Need both ingredients and recipe name.',
      }
      return Promise.resolve(controllerResponse);
    }
    const result = await fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.saveSelectedIngredients}`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipeName,
        ingredients,
        uid,
      })
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
    }).catch(() => {
      controllerResponse.error = {
        message: 'Unexpected error occured.',
      }
      return controllerResponse;
    });

    return Promise.resolve(result);
  };

  const getRecipes = (uid: string): Promise<Recipe[]> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.saveSelectedIngredients}/?uid=${uid}`).then(data => {
      return data.json().then(response => {
        return response.data as Recipe[];
      });
    });
  }

  return {
    getIngredients,
    saveSelectedIngredients,
    getRecipes
  };
}

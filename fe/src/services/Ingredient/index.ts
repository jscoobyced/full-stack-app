import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { ControllerResponse } from "../../models/common";
import { IngredientResponse, SelectedIngredient } from "../../models/ingredients";

export interface IIngredientService {
  getIngredients: () => Promise<IngredientResponse>,
  saveSelectedIngredients: (uid: string, recipeName: string, ingredients: SelectedIngredient[]) => Promise<ControllerResponse>
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
    }).then(response => {
      switch (response.status) {
        case 200:
          controllerResponse.data = true;
          break;
        default:
          response.json().then((data: ControllerResponse) => {
            controllerResponse.error = {
              message: data.error?.message,
            };
          })
          break;
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

  return {
    getIngredients,
    saveSelectedIngredients,
  };
}

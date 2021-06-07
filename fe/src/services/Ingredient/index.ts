import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { IngredientResponse, SelectedIngredient } from "../../models/ingredients";

export interface IIngredientService {
  getIngredients: () => Promise<IngredientResponse>,
  saveSelectedIngredients: (ingredients: SelectedIngredient[]) => Promise<boolean>
}

export const IngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getIngredients}`).then(data => {
      return data.json().then(response => {
        return response.data as IngredientResponse;
      });
    });
  }

  const saveSelectedIngredients = async (ingredients: SelectedIngredient[]): Promise<boolean> => {
    if (!ingredients) {
      return Promise.resolve(false);
    }
    const result = await fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.saveSelectedIngredients}`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients,
      })
    }).then(response => {
      return response.status === 200;
    }).catch(() => {
      return Promise.resolve(false);
    });

    return Promise.resolve(result);
  };

  return {
    getIngredients,
    saveSelectedIngredients,
  };
}

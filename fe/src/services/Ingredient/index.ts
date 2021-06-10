import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { IngredientResponse } from "../../models/ingredients";

export interface IIngredientService {
  getIngredients: () => Promise<IngredientResponse>,
}

export const IngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getIngredients}`).then(data => {
      return data.json().then(response => {
        return response.data as IngredientResponse;
      });
    });
  }

  return {
    getIngredients,
  };
}

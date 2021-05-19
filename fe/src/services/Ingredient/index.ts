import { Ingredient } from "..";
import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";

export interface IIngredientService {
  getIngredients: () => Promise<Ingredient[]>
}

export const IngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<Ingredient[]> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getIngredients}`).then(data => {
      return data.json().then(response => {
        return response.data as Ingredient[];
      });
    });
  }

  return {
    getIngredients
  };
}

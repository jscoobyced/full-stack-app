import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { IngredientResponse } from "../../models/ingredients";
import HttpService from "../../repos/HttpService";

export interface IIngredientService {
  getIngredients: () => Promise<IngredientResponse>,
}

export const IngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return HttpService.getData(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getIngredients}`)
      .then(response => {
        return response.data as IngredientResponse;
      });
  }

  return {
    getIngredients,
  };
}

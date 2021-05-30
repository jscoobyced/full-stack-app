import { IIngredientService } from ".";
import { IngredientResponse } from "../../models/ingredients";
import { mockIngredients, mockCalories } from "./mock-data";


export const MockIngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return Promise.resolve({
      ingredients: mockIngredients,
      calories: mockCalories,
    });
  };

  return {
    getIngredients
  };
}

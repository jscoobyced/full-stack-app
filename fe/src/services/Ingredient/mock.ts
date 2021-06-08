import { IIngredientService } from ".";
import { ControllerResponse } from "../../models/common";
import { IngredientResponse, SelectedIngredient } from "../../models/ingredients";
import { mockIngredients, mockCalories } from "./mock-data";


export const MockIngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return Promise.resolve({
      ingredients: mockIngredients,
      calories: mockCalories,
    });
  };

  const saveSelectedIngredients = async (uid: string, recipeName: string, ingredients: SelectedIngredient[]): Promise<ControllerResponse> => {
    return Promise.resolve({
      data: true,
    });
  };

  return {
    getIngredients,
    saveSelectedIngredients,
  };
}

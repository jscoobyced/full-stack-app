import { IIngredientService } from ".";
import { IngredientResponse, SelectedIngredient } from "../../models/ingredients";
import { mockIngredients, mockCalories } from "./mock-data";


export const MockIngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<IngredientResponse> => {
    return Promise.resolve({
      ingredients: mockIngredients,
      calories: mockCalories,
    });
  };

  const saveSelectedIngredients = async (recipeName: string, ingredients: SelectedIngredient[]): Promise<boolean> => {
    return Promise.resolve(true);
  };

  return {
    getIngredients,
    saveSelectedIngredients,
  };
}

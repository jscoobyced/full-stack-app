import { IIngredientService } from ".";
import { Ingredient } from "..";
import { mockIngredients } from "./mock-data";


export const MockIngredientService = (): IIngredientService => {
  const getIngredients = async (): Promise<Ingredient[]> => {
    return Promise.resolve(mockIngredients);
  };

  return {
    getIngredients
  };
}

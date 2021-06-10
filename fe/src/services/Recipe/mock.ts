import { IRecipeService } from ".";
import { ControllerResponse } from "../../models/common";
import { Recipe } from "../../models/ingredients";
import { mockRecipes } from "../Ingredient/mock-data";


export const MockRecipeService = (): IRecipeService => {

  const saveRecipe = async (recipe: Recipe): Promise<ControllerResponse> => {
    return Promise.resolve({
      data: true,
    });
  };

  const getRecipes = (uid: string): Promise<ControllerResponse> => {
    return Promise.resolve({ data: mockRecipes });
  };

  return {
    saveRecipe,
    getRecipes,
  };
}

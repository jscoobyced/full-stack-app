import { newSecureUser } from "../../models/user";
import { AuthenticationHandler } from "../Authentication/handler";
import { MockIngredientService } from "../Ingredient/mock";
import { MockRecipeService } from "../Recipe/mock";

export const mockContext = () => {
  const ingredientService = MockIngredientService();
  const recipeService = MockRecipeService();
  const handler = new AuthenticationHandler();
  const userService = {
    createUser: (user: any) => {
      const newUser = newSecureUser();
      newUser.user.name = 'Test User';
      newUser.user.firstName = 'John';
      newUser.user.lastName = 'Smith';
      newUser.user.referenceId = '12345678';
      return Promise.resolve(newUser);
    },
    userLogin: (user:any) => Promise.resolve(),
  };

  return {
    ingredientService,
    handler,
    userService,
    recipeService,
  };
}

import { newSecureUser } from "../../models/user";
import { AuthenticationHandler } from "../Authentication/handler";
import { MockIngredientService } from "../Ingredient/mock";

export const mockContext = () => {
  const ingredientService = MockIngredientService();
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
  };
}

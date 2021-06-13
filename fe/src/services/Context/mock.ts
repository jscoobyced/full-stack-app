import { IServiceContext } from ".";
import { Language } from "../../models/common";
import { newSecureUser } from "../../models/user";
import { AuthenticationHandler } from "../Authentication/handler";
import { I18nService } from "../i18n";
import { MockIngredientService } from "../Ingredient/mock";
import { MockRecipeService } from "../Recipe/mock";

export const mockContext = (): IServiceContext => {
  const ingredientService = MockIngredientService();
  const recipeService = MockRecipeService();
  const handler = new AuthenticationHandler();
  const languageService = I18nService();
  let language = Language.English;
  const userService = {
    createUser: (user: any) => {
      const newUser = newSecureUser();
      newUser.user.name = 'Test User';
      newUser.user.firstName = 'John';
      newUser.user.lastName = 'Smith';
      newUser.user.referenceId = '12345678';
      return Promise.resolve(newUser);
    },
    userLogin: (user: any) => Promise.resolve(),
  };
  const setLanguage = (_language: Language) => {
    language = _language;
  }

  return {
    ingredientService,
    handler,
    userService,
    recipeService,
    getTranslations: () => languageService.getTranslations(language),
    language,
    setLanguage
  };
}

import React from "react";
import { IUserService } from "../Authentication";
import { IAuthenticationHandler } from "../Authentication/handler";
import { IIngredientService } from "../Ingredient";
import { IRecipeService } from "../Recipe";
import { Language } from "../../models/common";
import { LanguageContent } from "../i18n/language";

export interface IServiceContext {
  ingredientService: IIngredientService;
  userService: IUserService;
  recipeService: IRecipeService;
  handler: IAuthenticationHandler;
  getTranslations: () => LanguageContent;
  language: Language;
  setLanguage: (language:Language) => void;
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);

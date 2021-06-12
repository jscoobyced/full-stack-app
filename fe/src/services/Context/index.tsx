import React from "react";
import { IUserService } from "../Authentication";
import { IAuthenticationHandler } from "../Authentication/handler";
import { IIngredientService } from "../Ingredient";
import { IRecipeService } from "../Recipe";

export interface IServiceContext {
  ingredientService: IIngredientService;
  userService: IUserService;
  recipeService: IRecipeService;
  handler: IAuthenticationHandler;
  }

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);

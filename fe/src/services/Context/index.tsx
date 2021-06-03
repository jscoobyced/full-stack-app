import React from "react";
import { IUserService } from "../Authentication";
import { IAuthenticationHandler } from "../Authentication/handler";
import { IIngredientService } from "../Ingredient";

interface IServiceContext {
  ingredientService: IIngredientService;
  userService: IUserService;
  handler: IAuthenticationHandler;
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);

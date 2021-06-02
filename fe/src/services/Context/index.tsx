import React from "react";
import { SecureUser } from "../../models/user";
import { IAuthenticationHandler } from "../Authentication/handler";
import { IIngredientService } from "../Ingredient";

interface IServiceContext {
  ingredientService: IIngredientService;
  createUser: (user: any) => SecureUser;
  handler: IAuthenticationHandler;
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);

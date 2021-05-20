import React from "react";
import { IIngredientService } from "../Ingredient";

interface IServiceContext {
  ingredientService: IIngredientService
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);

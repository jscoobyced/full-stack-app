import React from "react";
import { IUserService } from "../User";

interface IServiceContext {
  userService: IUserService
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);
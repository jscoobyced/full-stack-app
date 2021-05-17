import React from "react";
import { IConfiguration } from "../Configuration";

interface IServiceContext {
  configuration: IConfiguration
}

const defaultServiceContext = undefined as unknown as IServiceContext;

export const ServiceContext = React.createContext<IServiceContext>(defaultServiceContext);
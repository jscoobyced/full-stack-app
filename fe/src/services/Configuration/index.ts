import { Ingredient } from "..";
import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";

export interface IConfiguration {
  getConfiguration: () => Promise<Ingredient[]>
}

export const ConfigurationService = (): IConfiguration => {
  const getConfiguration = async (): Promise<Ingredient[]> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getConfiguration}`).then(data => {
      return data.json();
    });
  }

  return {
    getConfiguration
  };
}

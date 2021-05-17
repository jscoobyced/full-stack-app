import { IngredientData, UnitData } from "..";
import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";

export type ConfigurationResponse = {
  ingredients: IngredientData,
  units: UnitData,
};


export interface IConfiguration {
  getConfiguration: () => Promise<ConfigurationResponse>
}

export const ConfigurationService = (): IConfiguration => {
  const getConfiguration = async (): Promise<ConfigurationResponse> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getConfiguration}`).then(data => {
      return data.json();
    });
  }

  return {
    getConfiguration
  };
}

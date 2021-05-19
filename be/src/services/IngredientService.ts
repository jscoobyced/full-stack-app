import { ServiceResponse } from '../models/common';
import { mockIngredients } from './__mocks__/IngredientService';

export const getIngredients = async (): Promise<ServiceResponse> => {
  return Promise.resolve(mockIngredients).then((ingredients) => {
    return {
      data: ingredients,
    };
  });
};

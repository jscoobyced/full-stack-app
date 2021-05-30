import supertest from 'supertest';
import app from '..';
import { API_VERSION } from '../config/constants';
import { ServiceResponse } from '../models/service';
import { IngredientResponse } from '../models/ingredients';
import * as json from '../models/ingredient-data.json';

const request = supertest.agent(app);
const mockIngredients: ServiceResponse = {
  data: json,
};

jest.mock('../services/IngredientService', () => ({
  getAllIngredients: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockIngredients);
  }),
}));

jest.mock('../utils/logger');

describe('Default routes', () => {
  it('GET /', async (done) => {
    request.get('/').then((response) => {
      const result = response.text;
      expect(result.indexOf('<title>')).toBeGreaterThan(0);
      done();
    });
  });

  it(`GET ${API_VERSION.V1}/ingredients`, async (done) => {
    request.get(`${API_VERSION.V1}/ingredients`).then((response) => {
      const serviceResponse = response.body as ServiceResponse;
      const data = serviceResponse.data as IngredientResponse;
      expect(data.ingredients.length).toEqual(7);
      done();
    });
  });
});

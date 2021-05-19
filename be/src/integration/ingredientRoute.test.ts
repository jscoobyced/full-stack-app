import supertest from 'supertest';
import app from '..';
import { API_VERSION } from '../config/constants';
import { ServiceResponse } from '../models/common';
import { Ingredient } from '../models/ingredients';

const request = supertest.agent(app);

jest.mock('../services/IngredientService');
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
      expect(Array.isArray(serviceResponse.data)).toBeTruthy();
      const ingredients = serviceResponse.data as Ingredient[];
      expect(ingredients.length).toEqual(3);
      done();
    });
  });
});

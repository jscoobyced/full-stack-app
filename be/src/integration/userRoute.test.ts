import supertest from 'supertest';
import app from '..';
import { API_VERSION } from '../config/constants';
import { User } from '../models/user';

const request = supertest.agent(app);

jest.mock('../services/UserService');
jest.mock('../utils/logger');

describe('User routes', () => {
  it('GET /', async (done) => {
    request.get('/').then((response) => {
      const result = response.text;
      expect(result.indexOf('<title>')).toBeGreaterThan(0);
      done();
    });
  });

  it(`GET ${API_VERSION.V1}/users`, async (done) => {
    request.get(`${API_VERSION.V1}/users`).then((response) => {
      const result = response.body;
      expect(Array.isArray(result)).toBeTruthy();
      const users = result as User[];
      expect(users.length).toEqual(1);
      done();
    });
  });

  it(`GET ${API_VERSION.V1}/userByUsername find user`, async (done) => {
    request
      .get(`${API_VERSION.V1}/userByUsername`)
      .query({ username: 'Mock' })
      .then((response) => {
        const result = response.body;
        const user = result as User;
        expect(user.username).toEqual('Mock');
        done();
      });
  });

  it(`POST ${API_VERSION.V1}/user`, async (done) => {
    const user: User = {
      username: 'John',
      firstname: 'John',
      lastname: 'Smith',
    };
    request
      .post(`${API_VERSION.V1}/user`)
      .type('json')
      .send(user)
      .set('Accept', 'plain/text')
      .then((response) => {
        expect(response.status).toEqual(201);
        const result = response.body;
        expect(result).toBeDefined();
        const user = result as User;
        expect(user.username).toEqual('Mock');
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
        done();
      });
  });
});

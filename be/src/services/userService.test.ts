import { API_ERROR_CODES } from '../config/constants';
import { ErrorData } from '../models/service';
import * as UserService from './userService';

let mockResponse = () => true;

jest.mock('../repos/users', () => ({
  storeUserLogin: jest.fn().mockImplementation(async () => {
    return Promise.resolve(mockResponse());
  }),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('UserService - storeUserLogin', () => {
  it('store the login', async () => {
    const response = await UserService.userLogin('123');
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const data = response.data as boolean;
    expect(data).toEqual(true);
  });

  it('failed to store the login', async () => {
    mockResponse = () => false;
    const response = await UserService.userLogin('123');
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    const data = response.error as ErrorData;
    expect(data?.code).toEqual(API_ERROR_CODES.CANNOT_INSERT_DATA);
  });
});

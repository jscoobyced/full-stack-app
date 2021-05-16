import { ErrorData } from '../../models/common';
import { User, UserTypes } from '../../models/user';
import { createDefaultMock } from '../../testUtil';
import * as UserHandler from './user';

let mockData = (): UserTypes => undefined;
let mockError = (): ErrorData => undefined;
const mockUser: User = {
  username: 'Mocked',
  firstname: 'Johnny',
  lastname: 'Smith',
};

jest.mock('../../services/UserService', () => ({
  addUser: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      data: mockData(),
      error: mockError(),
    });
  }),
}));

beforeEach(() => {
  mockData = (): UserTypes => undefined;
  mockError = (): ErrorData => undefined;
});

describe('User Handler - addUser', () => {
  it('returns an error', async () => {
    mockError = () => {
      return {
        message: 'Blablabla',
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.body = mockUser;
    await UserHandler.addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('returns an error due to invalid data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.body = mockUser;
    await UserHandler.addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('creates the user', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.body = mockUser;
    mockData = () => mockUser;
    await UserHandler.addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});

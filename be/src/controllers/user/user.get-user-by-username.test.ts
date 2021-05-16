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
  getUserByUsername: jest.fn().mockImplementation(() => {
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

describe('User Handler - getUserByUsername', () => {
  it('does not find the user due to an error', async () => {
    mockError = () => {
      return {
        message: 'Blablabla',
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      username: '',
    };
    await UserHandler.getUserByUsername(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('does not find the user', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      username: '',
    };
    await UserHandler.getUserByUsername(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('does not find the user due to username undefined', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      username: undefined,
    };
    await UserHandler.getUserByUsername(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('returns the user', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockRequest.query = {
      username: 'John',
    };
    mockData = () => mockUser;
    await UserHandler.getUserByUsername(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });
});

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
  getUsers: jest.fn().mockImplementation(() => {
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

describe('User Handler - getUsers', () => {
  it('does not find users due to an error', async () => {
    mockError = () => {
      return {
        code: 10,
        message: 'Blablabla',
      };
    };
    const { mockRequest, mockResponse } = createDefaultMock();
    await UserHandler.getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('does not find user with undefined data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await UserHandler.getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('does not find user with empty data', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockData = () => <User[]>[];
    await UserHandler.getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('returns users list', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockData = () => [mockUser];
    await UserHandler.getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
  });
});

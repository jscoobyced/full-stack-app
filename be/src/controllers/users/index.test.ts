import { Request } from 'express';
import * as UserController from '.';
import { ErrorData } from '../../models/service';
import { createDefaultMock } from '../../testUtil';

let mockError = (): ErrorData => undefined;
const body = {
  uid: 12345,
};

jest.mock('../../services/userService', () => ({
  userLogin: jest.fn().mockImplementation(async () => {
    return Promise.resolve({
      data: true,
      error: mockError(),
    });
  }),
}));

beforeEach(() => {
  mockError = (): ErrorData => undefined;
});

describe('User Controller', () => {
  it('can get user id', async () => {
    const { mockRequest, mockResponse } = createDefaultMock(body);
    await UserController.postUserLogin(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).toHaveBeenCalledWith({
      data: {
        uid: body.uid,
        result: {
          data: true,
          error: undefined,
        },
      },
    });
  });

  it('returns an error if no "body"', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    await UserController.postUserLogin(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('returns an error if no "uid"', async () => {
    const mockRequest = {
      body: {
        test: 'bla',
      },
    } as unknown as Request;
    const { mockResponse } = createDefaultMock();
    await UserController.postUserLogin(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('returns an error if cannot save the login info', async () => {
    const { mockRequest, mockResponse } = createDefaultMock(body);
    mockError = () => {
      return {
        code: 10,
        message: 'Blablabla',
      };
    };
    await UserController.postUserLogin(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});

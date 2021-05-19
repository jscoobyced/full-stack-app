import { Request, Response } from 'express';

interface IRequestResponse {
  mockRequest: Request;
  mockResponse: Response;
}

export const createDefaultMock = (): IRequestResponse => {
  const mockRequest = jest.fn() as unknown as Request;
  const mockResponse = jest.fn() as unknown as Response;
  mockResponse.send = jest.fn();
  mockResponse.status = jest.fn().mockImplementation(() => {
    return {
      send: jest.fn(),
    };
  });

  return {
    mockRequest,
    mockResponse,
  };
};

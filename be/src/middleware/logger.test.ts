import { createDefaultMock } from '../testUtil';
import { requestLogger } from './logger';

jest.mock('../utils/logger');

test('console logger', () => {
  const { mockRequest, mockResponse } = createDefaultMock();
  const next = jest.fn();
  requestLogger(mockRequest, mockResponse, next);
  expect(next).toHaveBeenCalledTimes(1);
});

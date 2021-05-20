import { home } from './home';
import { createDefaultMock } from '../../testUtil';

describe('index', () => {
  it('returns index.html', () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockResponse.sendFile = jest.fn();
    home(mockRequest, mockResponse);
    expect(mockResponse.sendFile).toHaveBeenCalledTimes(1);
  });
});

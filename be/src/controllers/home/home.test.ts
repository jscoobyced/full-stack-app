import { home } from './home';
import { createDefaultMock } from '../../testUtil';

describe('index', () => {
  it('returns index.html', async () => {
    const { mockRequest, mockResponse } = createDefaultMock();
    mockResponse.sendFile = jest.fn();
    await home(mockRequest, mockResponse);
    expect(mockResponse.sendFile).toHaveBeenCalledTimes(1);
  });
});

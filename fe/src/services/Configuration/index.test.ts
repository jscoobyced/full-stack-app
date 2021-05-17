import { ConfigurationService } from ".";
import { mockConfigurationResponse } from "./mock";

const mockResponse = {
  json: () => Promise.resolve(mockConfigurationResponse),
} as Response;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse))
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Configuration Service', () => {
  it('gets the configuration from API', async () => {
    const configuration = await ConfigurationService().getConfiguration();
    expect(configuration).toBeDefined();
    expect(configuration).toEqual(mockConfigurationResponse);
  });
});

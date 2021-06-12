import HttpService from "./HttpService";

const httpData = {
  data: 'ok boss.'
};

const httpStatus = 200;
const httpOk = true;

const mockResponse = (data: any, ok: boolean, status: number) => {
  return {
    json: () => Promise.resolve(data),
    ok: ok,
    status: status,
  } as Response;
}

afterEach(() => {
  jest.restoreAllMocks();
});

const api_url = 'https://localhost:9000';
const test_token = 'blablablabla';

describe('Http Service', () => {
  it('can GET data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.getData(api_url);
    expect(result.data).toEqual(httpData.data);
  });

  it('fails to GET data if HTTP is not OK', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, false, httpStatus)));
    const result = await HttpService.getData(api_url);
    expect(result.error?.message).toBeDefined();
  });

  it('fails to GET data if no proper data is returned', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(undefined, httpOk, httpStatus)));
    const result = await HttpService.getData(api_url);
    expect(result.error?.message).toBeDefined();
  });

  it('can GET data with token', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.getData(api_url, test_token);
    expect(result.data).toEqual(httpData.data);
  });

  it('can post data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.postData(api_url, test_token);
    expect(result.data).toEqual(httpData.data);
  });

  it('can put data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.putData(api_url, test_token);
    expect(result.data).toEqual(httpData.data);
  });
});

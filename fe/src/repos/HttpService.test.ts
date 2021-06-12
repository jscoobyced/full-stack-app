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

const apiUrl = 'https://localhost:9000';
const testToken = 'blablablabla';

describe('Http Service', () => {
  it('can GET data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.getData(apiUrl);
    expect(result.data).toEqual(httpData.data);
  });

  it('fails to GET data if HTTP is not OK', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, false, httpStatus)));
    const result = await HttpService.getData(apiUrl);
    expect(result.error?.message).toBeDefined();
  });

  it('fails to GET data if no proper data is returned', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(undefined, httpOk, httpStatus)));
    const result = await HttpService.getData(apiUrl);
    expect(result.error?.message).toBeDefined();
  });

  it('can GET data with token', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.getData(apiUrl, testToken);
    expect(result.data).toEqual(httpData.data);
  });

  it('can post data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.postData(apiUrl, testToken);
    expect(result.data).toEqual(httpData.data);
  });

  it('can put data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(Promise.resolve(mockResponse(httpData, httpOk, httpStatus)));
    const result = await HttpService.putData(apiUrl, testToken);
    expect(result.data).toEqual(httpData.data);
  });
});

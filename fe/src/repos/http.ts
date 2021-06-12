import { ControllerResponse } from "../models/common";

const fetchData = async (method: string, url: string, data?: any, token?: string): Promise<ControllerResponse> => {
  const headers = new Headers();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const options: RequestInit = {
    method,
    headers,
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  if (!!data) {
    headers.append('Content-Type', 'application/json');
    options.body = JSON.stringify(data);
  }
  const response: ControllerResponse = await fetch(url, options).then(_response => {
    if (!_response.ok) {
      return {
        error: {
          message: 'Unexpected error.'
        }
      };
    } else {
      return _response.json()
        .then((json: { data: unknown; }) => {
          if (!json) {
            return {
              error: {
                message: 'Unexpected response data.'
              }
            };
          } else {
            return {
              data: json.data
            }
          }
        });
    }
  });
  return response;
};

const HttpService = {

  getData: (url: string, token?: string): Promise<ControllerResponse> => fetchData('GET', url, undefined, token),

  postData: (url: string, data: any, token?: string): Promise<ControllerResponse> => fetchData('POST', url, data, token),

  putData: (url: string, data: any, token?: string): Promise<ControllerResponse> => fetchData('PUT', url, data, token),
};

export default HttpService;

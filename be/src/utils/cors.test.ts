import { allowedOrigins } from './cors';

const defaultOrigins = 'http://localhost:3000';
const expectedOrigins = 'https://my-server.tld:443';

describe('CORS configuration', () => {
  it('get the default configuration', () => {
    let configuration = allowedOrigins();
    expect(configuration).toEqual(defaultOrigins);
    process.env.FRONT_END_API_PORT = '443';
    process.env.FRONT_END_API_HOST = 'my-server.tld';
    process.env.FRONT_END_API_SCHEME = 'https';
    configuration = allowedOrigins();
    expect(configuration).toEqual(expectedOrigins);
  });
});

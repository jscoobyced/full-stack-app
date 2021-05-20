import { allowedOrigins } from './cors';

const defaultOrigins = 'http://localhost:3000';
const expectedOrigins = 'https://my-server.tld';

describe('CORS configuration', () => {
  it('get the default configuration', () => {
    let configuration = allowedOrigins();
    expect(configuration).toEqual(defaultOrigins);
    process.env.FRONT_END_API_PORT = '';
    process.env.FRONT_END_API_HOST = '';
    process.env.FRONT_END_API_SCHEME = '';
    configuration = allowedOrigins();
    expect(configuration).toEqual(defaultOrigins);
    process.env.FRONT_END_API_HOST = '*';
    configuration = allowedOrigins();
    expect(configuration).toEqual('*');
  });

  it('get the configured configuration', () => {
    process.env.FRONT_END_API_PORT = 'none';
    process.env.FRONT_END_API_HOST = 'my-server.tld';
    process.env.FRONT_END_API_SCHEME = 'https';
    let configuration = allowedOrigins();
    expect(configuration).toEqual(expectedOrigins);
    process.env.FRONT_END_API_PORT = '8443';
    configuration = allowedOrigins();
    expect(configuration).toEqual(expectedOrigins + ':8443');
  });
});

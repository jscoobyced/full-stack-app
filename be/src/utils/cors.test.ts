import { allowedOrigins } from './cors';

const defaultOrigins = ['http://localhost:3000'];
const expectedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

describe('CORS configuration', () => {
  it('get the default configuration', () => {
    let configuration = allowedOrigins();
    expect(configuration).toEqual(defaultOrigins);
    process.env.FRONT_END_API_PORT = '3000, 3001';
    configuration = allowedOrigins();
    expect(configuration).toEqual(expectedOrigins);
    process.env.FRONT_END_API_PORT = 'NaN, 3000, 3001';
    configuration = allowedOrigins();
    expect(configuration).toEqual(expectedOrigins);
    process.env.FRONT_END_API_PORT = 'NaN';
    configuration = allowedOrigins();
    expect(configuration).toEqual(defaultOrigins);
    process.env.FRONT_END_API_HOST = '*';
    configuration = allowedOrigins();
    expect(configuration).toEqual(['*']);
  });
});

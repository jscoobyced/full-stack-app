import * as dotenv from 'dotenv';

dotenv.config();

export const allowedOrigins = (): string => {
  if (process.env.FRONT_END_API_HOST === '*') return '*';

  const scheme = process.env.FRONT_END_API_SCHEME || 'http';
  const port = () => {
    if (process.env.FRONT_END_API_PORT === 'none') return '';
    if (!!process.env.FRONT_END_API_PORT) {
      return `:${process.env.FRONT_END_API_PORT}`;
    }
    return ':3000';
  };
  const origin = process.env.FRONT_END_API_HOST || 'localhost';

  return `${scheme}://${origin}${port()}`;
};

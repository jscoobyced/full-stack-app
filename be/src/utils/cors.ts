import * as dotenv from 'dotenv';

dotenv.config();

export const allowedOrigins = (): string => {
  if (process.env.FRONT_END_API_HOST === '*') return '*';

  const scheme = process.env.FRONT_END_API_SCHEME || 'http';
  const port = process.env.FRONT_END_API_PORT === undefined ? ':3000' : process.env.FRONT_END_API_PORT;
  const origin = process.env.FRONT_END_API_HOST || 'localhost';

  return `${scheme}://${origin}${port}`;
};

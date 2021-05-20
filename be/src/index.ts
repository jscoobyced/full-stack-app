import express from 'express';
import { routes } from './routes/routes';
import cors from 'cors';
import helmet from 'helmet';
import { allowedOrigins } from './utils/cors';
import * as dotenv from 'dotenv';
import { startMySQL, stopMySQL } from './repos';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.BACK_END_API_PORT || 3001;

const corsOptions = {
  origin: allowedOrigins(),
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT'],
};

app.use(cors(corsOptions));
app.use(helmet());
app.disable('x-powered-by');

const extended = process.env.NODE_ENV === 'test';
app.use(express.json());
app.use(express.urlencoded({ extended }));

routes.forEach((route) => {
  const { version, method, path, middleware, handler } = route;
  app[method](`${version}${path}`, ...middleware, handler);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Started Express at http://localhost:${PORT}`);
    startMySQL();
  });
  process.on('exit', () => {
    stopMySQL();
  });
}

export default app;

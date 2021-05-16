import { Handler } from '../../models/route';
import path from 'path';

export const home: Handler = (req, res) => {
  res.sendFile(path.resolve('index.html'));
  return Promise.resolve();
};

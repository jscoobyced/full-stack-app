import { logger } from './logger';

const log = jest.spyOn(console, 'log').mockImplementation(() => {
  // No implementation needed
});

const error = jest.spyOn(console, 'error').mockImplementation(() => {
  // No implementation needed
});

afterAll(() => {
  log.mockReset();
  error.mockReset();
});

describe('logger', () => {
  it('can log info', () => {
    logger.info('blablabla');
    expect(log).toHaveBeenCalledTimes(1);
  });
  it('can log error', () => {
    logger.error('blablabla');
    expect(error).toHaveBeenCalledTimes(2);
  });
});

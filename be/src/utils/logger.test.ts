import { logger } from './logger';

let log: jest.SpyInstance, error: jest.SpyInstance;

beforeEach(() => {
  log = jest.spyOn(console, 'log').mockImplementation(() => {
    // No implementation needed
  });

  error = jest.spyOn(console, 'error').mockImplementation(() => {
    // No implementation needed
  });
});

afterEach(() => {
  log.mockReset();
  error.mockReset();
});

describe('logger', () => {
  it('can log info', () => {
    process.env.LOG_LEVEL = 'info';
    logger.info('blablabla');
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("skip log info when LOG_LEVEL is not 'info'", () => {
    process.env.LOG_LEVEL = 'error';
    logger.info('blablabla');
    expect(log).toHaveBeenCalledTimes(0);
  });

  it('can log error', () => {
    logger.error('blablabla');
    expect(error).toHaveBeenCalledTimes(2);
  });
});

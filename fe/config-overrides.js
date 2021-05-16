const path = require('path');

module.exports = function override(config, env) {
  if (process.env.REACT_APP_ENV === 'mock') {
    config.entry = path.resolve('./src/index-mock.tsx');
  }

  return config
}
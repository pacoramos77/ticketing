const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      webpackDevMiddleware: (config) => {
        config.watchOptions.poll = 300;
        return config;
      },
    };
  }
  return {};
};

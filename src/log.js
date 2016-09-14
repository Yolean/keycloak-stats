var config = require('../config');
var bunyan = require('bunyan');

var options = {
  name: "yolean-keycloak-stats",
  streams: [
    {
      level: 'warn',
      stream: process.stdout
    }
  ]
};

if (config.logPath) {
  options.streams.push({
    level: 'debug',
    path: config.logPath,
  });
  process.stdout.write("Logs to " + config.logPath + "\n");
} else {
  options.streams[0].level = 'debug';
}

var logger = bunyan.createLogger(options);

exports.info = logger.info.bind(logger);
exports.error = logger.error.bind(logger);
exports.warn = logger.warn.bind(logger);
exports.debug = logger.debug.bind(logger);

exports.shh = function () {
  exports.info = function () {};
  exports.error = function () {};
  exports.warn = function () {};
  exports.debug = function () {};
};
const app = require('./src/app');
const config = require('./config');
const log = require('./src/log');

app.listen(config.prefix, config.port);
log.info('Listening to port ' + config.port);
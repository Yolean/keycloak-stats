const express = require('express');

const app = express();
const router = require('./router');


function listen(prefix, port) {
  prefix = (prefix || '').replace(/\/$/, '');
  app.enable('strict routing');

  if (prefix) {
    app.get(prefix, (req, res) => res.redirect(prefix + '/'));
    app.use(prefix + '/', router);
  }
  else app.use(router);

  app.listen(port);
}

exports.listen = listen;
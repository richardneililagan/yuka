//
//  Main application module
//

//let System = require('es6-module-loader').System;

import express from 'express';
import http from 'http';

import config from './config/environment';

//
// :: initialize bootstrap
//
let app = express();
let server = http.createServer(app);

// :: load express server configuration
import expressconfig from './config/express';
expressconfig(app);

// :: TODO routes

server.listen(8080, '127.0.0.1', () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

export default app;
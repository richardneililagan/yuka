import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import errorhandler from 'errorhandler';
import morgan from 'morgan';

import { renderFile } from 'ejs';

import config from './environment';

export default (app) => {

  const env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', renderFile);
  app.set('view engine', 'html');

  app.use(bodyParser.urlencoded({ extended : false }));
  app.use(bodyParser.json());

  // // :: HTTP compression
  app.use(compression());

  // // :: HTTP logger
  app.use(morgan('dev'));

  if (env !== 'production') {
    // :: this has to be the last hook to be registered
    app.use(errorhandler());
  }
};
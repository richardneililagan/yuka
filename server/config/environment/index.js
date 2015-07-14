import path from 'path';
import _ from 'lodash';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// :: default configuration settings
//    all other environment configs can override these
let defaults = {
  env : process.env.NODE_ENV,

  // root path of the server
  root : path.normalize(__dirname + '/../../..'),

  // server port
  port : process.env.PORT || 8080,

  // application secrets
  secrets : {
    salt : process.env.YUKA_SALT || 'yuka_special_seasoning'
  }
};

// :: get specific environment configuration

export default _.merge(
  defaults,
  require('./' + process.env.NODE_ENV + '.js') || {}
  );
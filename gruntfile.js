'use strict';

module.exports = function (grunt) {

  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  }
  catch (e) {
    localConfig = {};
  }

  // :: prepare JIT grunt task aliases
  require('jit-grunt')(grunt, {
    express : 'grunt-express-server',
    buildcontrol : 'grunt-build-control'
  });

  // :: time how long various tasks take
  require('time-grunt')(grunt);

  //
  // :: Grunt primary configuration
  //
  grunt.initConfig({

    // project settings
    pkg : grunt.file.readJSON('package.json'),

    // javascript linting
    eslint : {
      options : {
        config : 'server/.eslintrc'
      },
      server : {
        src : [
          'server/**/*.js',
          '!server/**/*.{spec,mock}.js'
        ]
      }
    }

  });

};
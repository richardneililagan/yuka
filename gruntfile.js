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

    paths : {
      dist : 'dist'
    },

    // javascript linting
    eslint : {
      options : {
        config : 'server/.eslintrc'
      },
      server : {
        options : {},
        src : [
          'server/**/*.js',
          '!server/**/*.{spec,mock}.js'
        ]
      },
      servertests : {
        options : {},
        src : [
          'server/**/*.{spec,mock}.js'
        ]
      }
    },

    // clean build and temp folders
    clean : {
      dist : {
        files : [{
          dot : true,
          src : [
            '.tmp',
            '<%= paths.dist %>/*',
            '!<%= paths.dist %>/.git'
          ]
        }]
      },
      server : '.tmp'
    },

    // copy files required by build to places
    // exposed to the build process
    copy: {
      dist: {
        files: [{
          expand: true,
          dest: '<%= paths.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      }
    },
  });

};
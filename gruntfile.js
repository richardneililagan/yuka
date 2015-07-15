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

    env : {
      test : {
        NODE_ENV : 'test'
      },
      prod : {
        NODE_ENV : 'production'
      },
      all : localConfig
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

    // web server management
    express : {
      options : {
        port : process.env.PORT || 8080
      },
      dev : {
        options : {
          script : 'server/index.js',
          debug : true
        }
      },
      prod : {
        options : {
          script : 'dist/server/index.js'
        }
      }
    },

    // serverside testing
    mochaTest : {
      options : {
        reporter : 'spec'
      },
      src : ['server/**/*.spec.js']
    },

    // watches
    watch : {
      express : {
        files : [
          'server/**/*.{js,json,es6}'
        ],
        tasks : ['express:dev','wait'],
        options : {
          livereload : true,
          nospawn : true
        }
      }
    }
  });

  //
  // :: Manual task declarations
  //

  // Use to delay livereload until after the server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    // timeouts are a bitch
    var done = this.async();
    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  // Keep the express instance alive
  grunt.registerTask('express-keepalive', function () {
    this.async();
  });

  // start up the web server
  grunt.registerTask('serve', function (target) {

    // :: prod
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'env:all',
        'env:prod',
        'express:prod',
        'wait',
        'express-keepalive'
      ]);
    }

    // :: dev
    grunt.task.run([
      'clean:server',
      'env:all',
      'express:dev',
      'wait',
      'watch'
    ]);

  });

  // Run tests
  grunt.registerTask('test', function (target) {

    if (target === 'server') {
      grunt.task.run([
        'env:all',
        'env:test',
        'eslint:server',
        'mochaTest'
      ]);
    }
    // TODO other environments (if ever)
    else {
      grunt.task.run([
        'test:server'
      ]);
    }
  });

  // build for production
  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist'
  ]);

};
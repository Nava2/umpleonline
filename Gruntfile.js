module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        globals: {
          module: true
        }
      }
    },

    watch: {
      client: {
        files: ['client/**/*.ts', 'client/**/*.js', 'test/client/**/*.ts', 'bower.json'],
        tasks: ['dist:client']
      },
      sass: {
        files: ['styles/*.scss'],
        tasks: ['sass']
      }

    },

    // read the npm package
    pkg: grunt.file.readJSON('package.json'),

    tsd: {
      install: {
        options: {
          // execute a command
          command: 'reinstall',

          //optional: always get from HEAD
          latest: true,

          // specify config file
          config: './tsd.json',

          // experimental: options to pass to tsd.API
          opts: {
            // props from tsd.Options
          }
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          dest: './',
          src: ['styles/*.scss'],       // 'destination': 'source'
          ext: '.css'
        }]
      }
    },

    ts: {

      options: {
        module: 'commonjs', //or commonjs
        target: 'es5', //or es3
        sourceMap: true,
        declaration: false,
        fast: 'watch'
      },

      app: {
        outDir: '.',
        src: ['app.ts', 'config/**/*.ts', '!**/*.d.ts']
      },

      routes: {
        outDir: 'routes/',
        src: ['routes/**/*.ts', '!routes/**/*.d.ts']
      },

      client: {
        outDir: 'client/',
        src: ['client/**/*.ts', '!client/**/*.d.ts']
      },

      test: {
        outDir: 'test/',
        src: ['test/**/*.ts', '!test/**/*.d.ts']
      }
    },

    concat: {
      options: {
        stripBanner: true,
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },

      client: {
        src: ['client/*.js', '*.js',
              '!<%= bower_concat.all.dest %>', '!client/_bower.min.js', '!client/<%= pkg.name %>*.js',
              '!app.js', '!Gruntfile.js'],
        dest: 'client/<%= pkg.name %>.js'
      }
    },

    bower_concat: {
      all: {
        dest: 'client/_bower.js',
        cssDest: 'styles/_bower.css',
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
        bowerOptions: {
          relative: false
        },
        mainFiles: {
          "codemirror": ["lib/codemirror.js", "lib/codemirror.css", "mode/clike/clike.js"]
        }
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'client/<%= pkg.name %>.min.js': ['<%= concat.client.dest %>'],
          'client/_bower.min.js': '<%= bower_concat.all.dest %>'
        }
      }
    },

    copy: {
      // Copy client files into /public/
      client: {
        files: [
          // includes files within path
          {
            expand: true,
            flatten: true,
            src: [ 'client/<%= pkg.name %>*.js', 'client/_bower*.js', 'client/<%= pkg.name %>.js.map'],
            dest: 'public/js/',
            filter: 'isFile'
          },
          // includes files within path
          {
            expand: true,
            flatten: true,
            src: [ 'styles/**/*css*'],
            dest: 'public/stylesheets/',
            filter: 'isFile'
          }
        ]
      }
    },

    clean: {
      client: ['public/js/**/*.js',  'public/js/**/*.map', 'public/js/**/*.d.ts',
               'client/**/*.js',     'client/**/*.map',    'client/**/*.d.ts', '!client/umple-cm-mode.js',
               'public/stylesheets/**/*.css', 'styles/*.css', 'styles/*.map' ],

      server: ['config/**/*.js',     'config/**/*.map',    'config/**/*.d.ts',
               'routes/**/*.js',     'routes/**/*.map',    'routes/**/*.d.ts',
               '*.js',               '*.map',              '*.d.ts',
               '!**/*.json',         '!Gruntfile.js',      '!bower_components', '!node_modules'],
      test: ['test/**/*.js',       'test/**/*.map',      'test/**/*.d.ts']
    },

    build: {
      client: ['bower_concat', 'ts:client',     'sass'],
      server: ['ts:routes',    'ts:app'],
      test:   ['build:client', 'build:server',  'ts:test']
    },

    dist: {
      client: ['build:client', 'concat', 'uglify', 'copy:client'],
      server: ['build:server']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tsd');

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('init', ['jshint', 'clean']);

  grunt.registerMultiTask('build', 'Build components', function () {
    this.data.forEach(function (target) {
      grunt.task.run(target);
    });
  });

  grunt.registerMultiTask('dist', 'Generate distribution files', function () {
    this.data.forEach(function (target) {
      grunt.task.run(target);
    });
  });

  grunt.registerTask('default', ['init', 'dist']);

  grunt.registerTask('test', ['build:test', 'mochaTest']);
};

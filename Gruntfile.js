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
        files: ['src/client/**/*.ts', 'src/client/**/*.js', 'test/client/**/*.ts', 'bower.json'],
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
          cwd: 'styles',
          dest: 'public/stylesheets',
          src: ['*.scss'],       // 'destination': 'source'
          ext: '.css'
        }]
      }
    },

    ts: {
      app: {
        outDir: '.',
        src: ['src/app.ts'],

        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true,
          fast: 'watch'
        }
      },
      routes: {
        outDir: 'routes/',
        src: ['src/routes/**/*.ts'],

        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true,
          fast: 'watch'
        }
      },
      client: {
        outDir: 'public/js/',
        src: ['src/client/**/*.ts'],

        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true,
          fast: 'watch'
        }
      },

      test: {
        outDir: 'dist-test/',
        src: 'test/**/*.test.ts',

        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true,
          fast: 'watch'
        }
      }
    },
    concat: {
      options: {
        stripBanner: true,
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },
      dist: {
        src: ['public/js/**/*.js', 'src/**/*.js', '!public/js/_bower*', '!public/js/<%= pkg.name %>*.js'],
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },

    bower_concat: {
      all: {
        dest: 'public/js/_bower.js',
        cssDest: 'public/stylesheets/_bower.css',
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
          'public/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>'],
          'public/js/_bower.min.js': 'public/js/_bower.js'
        }
      }
    },

    clean: {
      js: ['public/js/**/*.js', 'public/js/**/*.map', 'public/js/**/*.d.ts',
        'routes/**/*.js', 'routes/**/*.map', 'routes/**/*.d.ts'],
      css: ['public/stylesheets/**/*.css', 'public/stylesheets/**/*.map']
    },

    build: {
      client: ['bower_concat', 'ts:client', 'sass'],
      server: ['ts:routes', 'ts:app']
    },

    dist: {
      client: ['build:client', 'concat', 'uglify'],
      server: ['build:server']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tsd');

  grunt.registerTask('init', ['jshint', 'clean', 'tsd:install']);

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
};

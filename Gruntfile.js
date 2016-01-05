
module.exports = function(grunt) {

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
            files: ['<%= jshint.files %>', 'src/**/*.ts', 'test/**/*.ts', 'styles/*.scss'],
            tasks: ['jshint', 'ts', 'sass', 'concat', 'uglify']
        },

        // read the npm package
        pkg: grunt.file.readJSON('package.json'),

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
                src: ['app.ts'],

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
                src: ['public/js/**/*.js'],
                dest: 'public/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        clean: {
            js: ['public/js/**/*.js', 'public/js/**/*.map', 'public/js/**/*.d.ts',
                 'routes/**/*.js', 'routes/**/*.map', 'routes/**/*.d.ts',
                 'app.js*', 'app.d.ts'],
            css: ['public/stylesheets/**/*.css', 'public/stylesheets/**/*.map']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['jshint', 'clean', 'ts', 'concat', 'sass', 'uglify']);

};

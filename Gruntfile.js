module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var configFileCreationNeeded = function() {
        return !grunt.file.exists('test/config.js')
    };

    grunt.initConfig({
        clean: ['dist'],

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
            },
            dist1: {
                src: ['src/base64.js','src/json3.js', 'node_modules/bluebird/js/browser/bluebird.js', 'node_modules/fetch-polyfill/fetch.js', 'src/hipay-fullservice-sdk.js'],
                dest: 'dist/hipay-fullservice-sdk-2.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/hipay-fullservice-sdk-2.min.js': ['dist/hipay-fullservice-sdk-2.js']
                }
            }
        },
        casperjs: {
            casper_test:
            {
                options: {
                    async: {
                        parallel: false
                    },
                    silent: false
                },
                files: {
                    src:['tests/casperjs/*.js']
                }
            },
            casper_test_min:
            {

                options: {
                    casperjsOptions: ['--type=min'],
                    async: {
                        parallel: false
                    },
                    silent: false
                },
                files: {
                    src:['tests/casperjs/*.js']
                }
            }

        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'dist/',
                    themedir: 'node_modules/yuidoc-lucid-theme',
                    helpers: ["node_modules/yuidoc-lucid-theme/helpers/helpers.js"],
                    outdir: 'docs'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-casperjs');

    grunt.registerTask('default', ['sync', 'clean', 'concat', 'uglify']);
    grunt.registerTask('dist', ['concat:dist1']);
    grunt.registerTask('doc', ['default', 'yuidoc']);
    grunt.registerTask('test', ['casperjs:casper_test']);

    // yuidoc . --configfile yuidocs.json


};
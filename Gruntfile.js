'use strict'

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.option("force", true);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                src: ['scss/app.scss'],
                dest: 'www/css/app.css'
            }
        },

        concat: {
            options: {
                "separator": '\n'
            },
            js: {
                src: [
                   'bower_components/jquery/jquery.min.js',
                   //'bower_components/jquery-ui/jquery-ui.js',
                    //'bower_components/requirejs/require.js',
                    'external/**/*.js',
                    //'bower_components/ionicons/lib/parse.min.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/hammerjs/hammer.min.js',
                    'bower_components/parse-js-sdk/lib/parse.min.js'
                ],
                dest: 'www/lib/bundle.js'
            },
            css: {
                src: [
                    'bower_components/ionicons/css/ionicons.css',
                    'www/css/app.css'
                ],
                dest: 'www/css/app.css'
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: 'bower_components/ionicons/fonts/*',
                        dest: 'www/fonts/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['sass', 'concat', 'copy:main']);
}
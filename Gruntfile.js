module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            build: {
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'dist/assets/js/',
                    cwd: 'assets/js'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    src: '**/*.css',
                    dest: 'dist/assets/css/',
                    cwd: 'assets/css'
                }]
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: ['**/*.html', '!node_modules/**/*.html'],
                    dest: 'dist/',
                    cwd: './'
                }]
            }
        },
        cwebp: {
            dynamic: {
                options: {
                    q: 50
                },
                files: [{
                    expand: true,
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: 'dist/assets/img',
                    cwd: 'assets/img'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-cwebp');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'cwebp']);

};
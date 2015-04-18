/* jslint node: true */
/* global require, module */
'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		paths: {
			src: 'app/src',
			dist: 'app/dist',
			libs: 'app/lib',
			server: 'server'
		},

		bowerInstall: {
			dist: {
				src: ['<%= paths.src %>/index.html'],
				ignorePath: '<%= paths.src %>/'
			}
		},

		usemin: {
			options: {
				assetsDirs: ['<%= paths.dist %>']
			},
			html: ['<%= paths.dist %>/{,*/}*.html'],
			css: ['<%= paths.dist %>/styles/{,*/}*.css']
		},

		useminPrepare: {
			options: {
				dest: '<%= paths.dist %>'
			},
			html: '<%= paths.src %>/index.html'
		},

		htmlmin: {
			dist: {
				options: {
					// removeCommentsFromCDATA: true,
					// collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: '*.html',
					dest: '<%= paths.dist %>'
                }]
			}
		},

		rev: {
			dist: {
				files: {
					src: [
                        '<%= paths.dist %>/scripts/{,*/}*.js',
                        '<%= paths.dist %>/styles/{,*/}*.css',
                        '<%= paths.dist %>/styles/fonts/{,*/}*.*'
                    ]
				}
			}
		},

		compass: {
			options: {
				sassDir: '<%= paths.src %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= paths.src %>/images',
				javascriptsDir: '<%= paths.src %>/scripts',
				fontsDir: '<%= paths.src %>/styles/fonts',
				importPath: '<%= paths.libs %>',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= paths.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= paths.src %>',
					dest: '<%= paths.dist %>',
					src: [
                        '*.{ico,png,txt}',
						'./views/{,*/}*',
						'./images/{,*/}*'
                    ]
                }]
			},
			dist_fonts: {
				files: [{
					expand: true,
					dot: true,
					flatten: true,
					cwd: '<%= paths.src %>',
					dest: '<%= paths.dist %>/fonts',
					src: [
                        '../lib/fontawesome/fonts/*'
                    ]
                }]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= paths.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
                        '.tmp',
                        '<%= paths.dist %>/*',
                        '!<%= paths.dist %>/.git*'
                    ]
                }]
			},
			server: '.tmp'
		},

		uglify: {
			options: {
				mangle: false
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
                }]
			}
		},
		concurrent: {
			default: ['nodemon', 'watch', 'open'],
			options: {
				logConcurrentOutput: true
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js, html',
					watch: ['server', 'config']
				}
			}
		},
		watch: {
			serverJS: {
				files: ['Gruntfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js'],
				tasks: [],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: ['app/src/**/*.html'],
				options: {
					livereload: true
				}
			},
			clientJS: {
				files: ['app/src/**/*.js'],
				tasks: [],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: ['app/src/**/*.scss'],
				tasks: ['compass'],
				options: {
					livereload: true
				}
			}
		},
		open: {
			dev: {
				path: 'http://localhost:3000'
			}
		}
	});

	grunt.registerTask('serve', [
		'build',
		'concurrent'
	]);

	grunt.registerTask('dev', [
        'compass',
        'autoprefixer',
		'concurrent'
	]);

	grunt.registerTask('build', [
		'clean:dist',
        'useminPrepare',
        'compass',
		'copy:styles',
		'htmlmin',
        'autoprefixer',
        'concat',
		'uglify',
        'cssmin',
        'copy:dist',
		'copy:dist_fonts',
        'rev',
        'usemin'
    ]);

	grunt.registerTask('default', [
        'build'
    ]);
};

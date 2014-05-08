'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	try {
		yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
	} catch (e) {}

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			less: {
				files: ['<%= yeoman.app %>/styles/*.less'],
				tasks: ['less']
			},
			jade: {
				files: ['<%= yeoman.app %>/*.jade','<%= yeoman.app %>/views/**/*.jade'],
				tasks: ['jade']
			},
			copy: {
				files: ['<%= yeoman.app %>}/scripts/**/*.js'],
				tasks: ['copy:server']
			},
			livereload: {
				files: [
					'.tmp/{,*/}*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['concat:server', 'livereload']
			}
		},
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/**/*.js'
			]
		},
		jade: {
			compile: {
				options: {
					pretty: true	
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/',
					dest: '.tmp',
					src: '**/*.jade',
					ext: '.html'
				}]
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		less : {
			options: {
				paths: ['<%= yeoman.app %>/styles']
			},
			files: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				src: '*.less',
				ext: '.css',
				dest: '.tmp/styles/'
			}
		},
		concat: {
			server: {
				files: {
					'.tmp/scripts/scripts.js': [
						'<%= yeoman.app %>/scripts/**/*.js'
					]
				}
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'.tmp/scripts/**/*.js',
						'<%= yeoman.app %>/scripts/**/*.js'
					]
				}
			}
		},
		useminPrepare: {
			html: '.tmp/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/views/**/*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '.tmp',
					src: ['**/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/scripts',
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.dist %>/scripts/scripts.js'
					]
				}
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'	
					]
				}
			}
		},
		copy: {
			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '.tmp',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'components/**/*',
						'images/{,*/}*.{gif,webp,png,jpg,jpeg}',
						'scripts/**/*.js',
						'styles/fonts/*'
					]
				}]
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'components/**/*',
						'images/{,*/}*.{gif,webp,png,jpg,jpeg}',
						'styles/fonts/*'
					]
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('server', [
		'clean:server',
		'less',
		'jade:compile',	
		'concat:server',
		'copy:server',
		'livereload-start',
		'connect:livereload',
		'open',
		'watch'
	]);

	grunt.registerTask('test', [
		'clean:server',
		'jshint',
		'less',
		'jade:compile',	
		'connect:test'
		//'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'less',
		'jade:compile',	
		'useminPrepare',
		'cssmin',
		'htmlmin',
		'concat:dist',
		'copy:dist',
		//'cdnify',
		'ngmin',
		//'uglify',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', ['build']);
};

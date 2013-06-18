module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg: pkg,
		
		watch: {
			files: ['*.coffee'],
			tasks: ['coffee', 'uglify', 'concat']
    	},
		
		coffee: {
			compile: {
				options: {
					bare: true
				},
				expand: true,
				cwd: './',
				src: ['jquery.*.coffee'],
				dest: './',
				rename: function(dest, src){ return dest + src.replace('.coffee', '.js') }
			}
		},
		
		uglify: {
			targets: {
				files: {
					'jquery.<%= pkg.name %>.min.js': ['jquery.<%= pkg.name %>.js']
				}
			}
		},
		
		concat: {
			options: {
				stripBanners: true,
				banner: '/*!\n' +
						' * jquery.<%= pkg.name %>.js - v<%= pkg.version %> - https://github.com/<%= pkg.author.name %>/jquery.<%= pkg.name %>.js\n' +
						' * <%= pkg.description %>\n' +
						' * \n' +
						' * \n' +
						' * Copyright (c) <%= pkg.license.since %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
						' * Licensed under the <%= pkg.license.name %> license (<%= pkg.license.url %>).\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' **/\n;'
			},
			files: {
				expand: true,
				cwd: './',
				src: ['jquery.*.js'],
				dest: './'
			}
		}
	});
	
	for(var taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}
	
	grunt.registerTask('default', ['watch']);

	
	var proc = require('child_process');
	var hooker = require('hooker');

	hooker.hook(grunt.fail, ['warn', 'fatal'], function(msg) {
		proc.exec("growlnotify /t:\"grunt.js\" \"" + msg + "\"");
	});


};
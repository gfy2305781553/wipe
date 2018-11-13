//gruntfile.js
//模块化导入函数
module.exports = function(grunt){
	//所有插件的配置信息
	grunt.initConfig({
		//获取package.json
		pkg:grunt.file.readJSON("package.json"),
		//gulif插件的配件信息
		uglify:{
			options:{
				banner:'/*!<%= pkg.name %> <%= pkg.version %> 发布日期:<%= grunt.template.today("yyyy-mm-dd")%>*/',
			},
			build:{
				src:"src/js/wipe.js",
				dest:"build/js/wipe-<%= pkg.version %>.min.js"
			}
		},
		cssmin:{
			options:{
				mergeIntoShorthands:false,
				roundingPrecision:-1
			},
			target:{
				files:[{
					expand:true,
					cwd:'src/css',
					src:['*.css'],
					dest:'build/css',
					ext:'.min.css'
				}]
			}
		},
		clean:{
			dest:['build/*','sample/js/*']
		},
		jshint:{
			test:['src/js/wipe.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		copy: {
		    js: {expand: true, cwd: 'src/js/', src: '*.min.js', dest: 'sample/js/'}
		},
		replace:{
			example:{
				src:['sample/js/index.html'],
				overwrite:true,
				replacements:[{
					from:/wipe-\.\.min\.js/g,
					to:'wipe-<%= pkg.version %>.min.js'
				}]
			}
		}
	});
	//告诉grunt需要使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	//告诉grunt当我们输入grunt命令后需要这些什么，有先后顺序
	grunt.registerTask('default',['jshint','clean','uglify','copy']);

};
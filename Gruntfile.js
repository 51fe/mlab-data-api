module.exports = function(grunt) {
  // 配置路径
  var config = {
    app: 'app',
    dist: 'dist'
  };
  // 项目配置
  grunt.config.init({
    config: config,

    clean: {
      dist: '<%= config.dist %>',
      temp: '.tmp'
    },

    copy: {
      generated: {
        expand: true,
        cwd: '<%= config.app %>',
        src: '**/*.html',
        dest: '<%= config.dist %>'
      }
    },

    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      source: {
        files: [{
          src: [
            '<%= config.dist %>/js/*.js',
            '<%= config.dist %>/css/*.css'
          ]
        }]
      }
    },

    useminPrepare: {
      html: '<%= config.app %>/**/*.html',
      options: {
        root: '<%= config.app %>'
      }
    },

    uglify: {
      options: {
        screwIE8: false
      }
    },

    usemin: {
      html: '<%= config.dist %>/**/*.html',
      options: {
        assetsDirs: ['<%= config.dist %>']
      }
    }
  });

  // 加载提供任务的插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');

  // 设置默认任务
  grunt.registerTask('default', [
    'clean:dist',
    'copy:generated',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'filerev',
    'usemin',
    'clean:temp'
  ]);
};
// 配置路径
var config = {
  app: 'app',
  dist: 'dist'
};

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var del = require('del'),
  minifycss = require('gulp-minify-css'), //css压缩
  uglify = require('gulp-uglify'), //js压缩
  useref = require('gulp-useref'), //替换引用
  gulpif = require('gulp-if'),//
  rev = require('gulp-rev'), //文件Md5
  revReplace = require('gulp-rev-replace'); //替换


gulp.task('clean', function() {
  return del(config.dist + '/*');
});

gulp.task('copy:image', function () {
  return gulp.src(config.app + '/img/*')
    .pipe(gulp.dest(config.dist + '/img'));
});

gulp.task('copy:tpl', function () {
  return gulp.src(config.app + '/tpl/*')
    .pipe(gulp.dest(config.dist + '/tpl'));
});

// html中合并css/js/加md5更名并压缩
gulp.task('html', function() {
  return gulp.src(config.app + '/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifycss()))
    .pipe(gulpif('!*.html', rev()))
    .pipe(revReplace())
    .pipe(gulp.dest(config.dist))
});

// 默认任务
gulp.task('default', ['clean'], function() {
  gulp.start(['copy:image', 'copy:tpl', 'html'])
})
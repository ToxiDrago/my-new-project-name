const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('scss', () => {
  return gulp
    .src('src/scss/*.scss')
    .pipe(
      sass({ includePaths: ['node_modules'], outputStyle: 'compressed', errLogToConsole: true }).on(
        'error',
        sass.logError,
      ),
    )
    .pipe(gulp.dest('public/css'));
});

gulp.task('js', () => {
  return gulp
    .src('src/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('public/js'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
    },
    port: 4444,
    open: false,
    notify: false,
    ui: false,
  });
  gulp.watch('src/scss/**/*.scss', gulp.series('scss')).on('change', browserSync.reload);
  gulp.watch('src/**/*.js', gulp.series('js')).on('change', browserSync.reload);
  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('scss', 'js'));

gulp.task('default', gulp.series('build', 'serve'));

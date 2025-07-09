const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// Сборка SCSS
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

// Сборка React (Webpack)
gulp.task('react', () => {
  return gulp
    .src('src/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('public/js'));
});

// Слежение и live reload
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
    host: '0.0.0.0',
    port: 4444,
    open: false,
    socket: {
      domain: 'localhost:3000',
    },
  });
  gulp.watch('src/scss/**/*.scss', gulp.series('scss')).on('change', browserSync.reload);
  gulp
    .watch(['src/**/*.js', 'src/**/*.jsx'], gulp.series('react'))
    .on('change', browserSync.reload);
  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('scss', 'react'));
gulp.task('default', gulp.series('build', 'serve'));

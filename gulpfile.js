const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
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
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
        errLogToConsole: true,
      }).on('error', sass.logError),
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('react', () => {
  return gulp
    .src('src/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('ejs', () => {
  return gulp
    .src(['src/ejs/index.ejs']) // Только index.ejs для React приложения
    .pipe(plumber())
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(
      require('gulp-rename')(function (path) {
        path.extname = '.html';
      }),
    )
    .pipe(gulp.dest('./public'));
});

gulp.task('serve', () => {
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/ejs/**/*.ejs', gulp.series('ejs'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.{js,jsx}', gulp.series('react'));

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
  gulp.watch('public/*.html').on('change', browserSync.reload);
  gulp.watch('public/js/*.js').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('ejs', 'js', 'scss', 'react'));

gulp.task('default', gulp.series('serve'));

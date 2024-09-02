const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function style() {
  return gulp
    .src('src/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
}

function watch() {
  gulp.watch('src/css/styles.scss', style);
}

exports.style = style;
exports.watch = watch;

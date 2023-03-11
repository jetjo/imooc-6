// eg - 5 - js - rename.js
const { src, dest, series } = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const opt = {
  // "presets": ["@babel/preset-env"]
  "presets": ["@babel/env"]
};

const renameJs = function ()
{
  return src(['src/**/*.js', '!src/vendor/**/*.js']).pipe(
    babel({
      ...opt
    })
  ).pipe(
    concat('js/app.js')
  ).pipe(src('src/vendor/**/*.js')).pipe(dest('dist/')).pipe(
    uglify()
  ).pipe(
    rename({
      extname: '.min.js'
    })
  ).pipe(dest('dist/'));
}

exports.renameJs = series(require('./eg-1-clean任务').clean, renameJs);

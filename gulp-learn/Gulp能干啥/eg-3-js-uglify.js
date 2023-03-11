const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const { pipeline } = require('readable-stream');
const babel = require('gulp-babel');

const opt = {
  // "presets": ["@babel/preset-env"]
  "presets": ["@babel/env"]
};


function uglifyJs(cb)
{
  // return pipeline(
  //   src('src/**/*.js'),
  //   uglify(),
  //   dest('dist/'),
  //   // cb()
  // )
  return src(['src/**/*.js', '!src/vendor/**/*.js']).pipe(
    babel({
      ...opt
    })
  ).pipe(src('src/vendor/**/*.js')).pipe(
    uglify()
  ).pipe(dest('dist/'))
}

exports.uglifyJs = series(require('./eg-1-clean任务').clean, uglifyJs);

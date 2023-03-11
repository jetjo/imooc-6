const { src, dest, series } = require('gulp')

const concat = require("gulp-concat");

function concatJs()
{
  return src(['src/**/*.js', '!src/vendor/**/*.js']).pipe(
    concat('index.js')
  ).pipe(src('src/vendor/**/*.js')).pipe(dest('dist/'))
}


exports.concatJs = series(require('./eg-1-clean任务').clean, concatJs);

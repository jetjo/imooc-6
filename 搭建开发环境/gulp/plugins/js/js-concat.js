const { src, dest, series } = require('gulp')

const concat = require("gulp-concat");
const { wrapper } = require('../../utils/wrapper')

function concatJs(cb, stream, noEmit)
{
  stream ||= src(['src/**/*.js', '!src/**/vendor/**']);
  if (process.env?.GULP_ENV === 'dev') return stream;
  const res = stream
    .pipe(
      concat('index.js')
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/'))
}

exports.concatJs = wrapper(concatJs)

const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const { pipeline } = require('readable-stream');
const { wrapper } = require('../../utils/wrapper');

function uglifyJs(cb, stream, noEmit)
{
  // return pipeline(
  //   src('src/**/*.js'),
  //   uglify(),
  //   dest('dist/'),
  //   // cb()
  // )
  stream ||= src(['src/**/*.js', '!src/**/vendor/**']);
  if (process.env?.GULP_ENV === 'dev') return stream;
  const res = stream
    .pipe(
      uglify()
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/'))
}

exports.uglifyJs = wrapper(uglifyJs);


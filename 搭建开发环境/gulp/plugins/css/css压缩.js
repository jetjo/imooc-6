const { dest, src } = require('gulp');

const cssmin = require('gulp-cssmin');

const { wrapper } = require('../../utils/wrapper')

const glob = ['src/**/*.css']
const cssDist = 'dist/css';

function cssMin(cb, stream, noEmit)
{
  stream ||= src(glob);
  if (process.env?.GULP_ENV === 'dev') return stream;
  const res = stream
    .pipe(
      cssmin()
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest(cssDist))
}

exports.cssMin = wrapper(cssMin);

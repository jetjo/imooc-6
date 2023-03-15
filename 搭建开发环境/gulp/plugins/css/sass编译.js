const { src, dest } = require('gulp');

const sass = require('gulp-sass')(require('sass'))

const { wrapper } = require('../../utils/wrapper')

const glob = ['src/**/*.{sass,scss}']

function sassCompiler(cb, stream, noEmit)
{
  stream ||= src([...glob, '!src/scss/**/_*.{scss,sass}']);
  const res = stream
    .pipe(
      sass()
    )
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/css'))
}

exports.sassCompiler = wrapper(sassCompiler);


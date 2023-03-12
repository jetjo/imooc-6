const { src, dest, series, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'))

const { wrapper } = require('../utils/wrapper')

async function cssClean(cb, glob)
{
  await require('../Gulp能干啥/eg-1-clean任务').clean(cb, glob || ['dist/css'])
}

const glob = ['src/scss/**/*.{sass,scss}']
// const glob = ['src/s(c|a)ss/**/*.{sass,scss}']

async function sassCompiler(cb)
{
  await cssClean(cb);
  return sassCompilerNoClean(cb);
}

function sassCompilerNoClean(cb, stream, noEmit)
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

function sassCompilerWatch()
{
  watch(glob, sassCompiler)
}

exports.cssClean = cssClean;

// exports.sassCompiler = sassCompilerNoClean;
exports.sassCompiler = wrapper(sassCompilerNoClean);

exports._sassCompilerWatch = series(sassCompiler, sassCompilerWatch)

exports.watchGlob = ['src/**/*.{scss,sass,css,less,styl}', "!src/**/_*.{scss,sacc,less,styl}"];

exports.cssDist = 'dist/css';


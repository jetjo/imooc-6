const { dest, watch, series, src } = require('gulp');
const { watchGlob, cssClean, sassCompiler, cssDist } = require('./sass编译');

const cssmin = require('gulp-cssmin');

const { wrapper } = require('../utils/wrapper')

const glob = ['src/css/**/*.css']

function _cssMinNoClean(cb, stream, noEmit)
{
  // console.log('stream 是 null？？？', stream == null);
  stream ||= src(glob);
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

function cssMinNoClean(cb, stream, noEmit)
{
  stream ||= src([...watchGlob, '!src/scss/**/_*.{scss,sass}', 'src/css/*.css']);
  stream = sassCompiler(cb, stream, true);
  return _cssMinNoClean(cb, stream, noEmit);
}

async function cssMin(cb)
{
  await cssClean(cb);
  return cssMinNoClean(cb);
}

function cssMinWatch()
{
  watch([...watchGlob, 'src/css/*.css'], cssMin);
}

exports.cssMin = cssMinNoClean;

exports.cssMin_ = wrapper(_cssMinNoClean);

exports._cssMinWatch = series(cssMin, cssMinWatch);

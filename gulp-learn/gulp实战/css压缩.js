const { dest, watch, series, src } = require('gulp');
const { watchGlob, cssClean, sassCompiler, cssDist } = require('./sass编译');

const cssmin = require('gulp-cssmin');

function cssMinNoClean(cb, stream, noEmit)
{
  stream ||= src([...watchGlob, '!src/scss/**/_*.{scss,sass}', 'src/css/*.css']);
  const res = sassCompiler(cb, stream, true)
    // const res = stream
    .pipe(
      cssmin()
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest(cssDist))
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

exports.cssMinWatch = series(cssMin, cssMinWatch);

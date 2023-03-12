const { dest, watch, series } = require('gulp');
const { watchGlob, cssClean, sassCompiler, cssDist } = require('./sass编译');

const autoprefixer = require('gulp-autoprefixer');

function cssAutoPrefixNoClean(cb)
{
  return sassCompiler(cb, null, true)
    .pipe(
      autoprefixer(
        {
          cascade: false,
          grid: 'autoplace'
        }
      )
    )
    .pipe(dest(cssDist))
}

async function cssAutoPrefix(cb)
{
  await cssClean(cb);
  return cssAutoPrefixNoClean(cb);
}

function cssAutoPrefixWatch()
{
  watch(watchGlob, cssAutoPrefix);
}

exports.cssAutoPrefix = cssAutoPrefixNoClean;

exports._cssAutoPrefixWatch = series(cssAutoPrefix, cssAutoPrefixWatch);

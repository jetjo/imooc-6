const { dest, watch, series } = require('gulp');
const { watchGlob, cssClean, sassCompiler, cssDist } = require('./sass编译');

const { wrapper } = require('../utils/wrapper')

const autoprefixer = require('gulp-autoprefixer');

const glob = ['src/css/**/*.css']

function _cssAutoPrefixNoClean(cb, stream, noEmit)
{
  // console.log('---------------------------:', stream.__proto__);
  stream ||= src(glob);
  const res = stream
    .pipe(
      autoprefixer(
        {
          cascade: false,
          // grid: 'autoplace'
        }
      )
    )
  if (noEmit)
  {
    // console.log('---------------------------:');
    return res;
  }
  return res.pipe(dest(cssDist))
}

function cssAutoPrefixNoClean(cb)
{
  return _cssAutoPrefixNoClean(cb, sassCompiler(cb, null, true), false)
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
exports.cssAutoPrefix_ = wrapper(_cssAutoPrefixNoClean);

exports._cssAutoPrefixWatch = series(cssAutoPrefix, cssAutoPrefixWatch);

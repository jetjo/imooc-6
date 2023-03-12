const { src, dest, watch, series } = require('gulp');

const { cssClean, sassCompiler: { _name: sassCompiler } } = require('./sass编译');
const { cssAutoPrefix_: { _name: cssAutoPrefix } } = require('./css厂商前缀');
const { cssMin_: { _name: cssMin } } = require('./css压缩');

const rename = require('gulp-rename');

async function cssHandle(cb)
{
  await cssClean(cb, ['dist/css']);
  return cssHandleNoClean(cb);
}

function cssHandleNoClean(cb)
{
  console.log({ sassCompiler, cssAutoPrefix, cssMin });
  const stream = src(['src/**/*.{scss,sass}', '!src/**/_*.{scss,sass}'])
  [sassCompiler]()
    .pipe(src('src/**/*.css'))
  [cssAutoPrefix]()
  // console.log('---------------------------:', stream.__proto__);
  return stream[cssMin]()
    .pipe(
      rename((streamPath) =>
      {
        console.log({ streamPath });
        return {
          ...streamPath,
          dirname: 'css'
          // // dirname: streamPath.extname ? streamPath.dirname + '/newPath/' : streamPath.dirname
        }
      })
    )
    .pipe(dest('dist'));
}

function cssHandleWatch()
{
  watch('src/**/*.{css,sass,scss}', cssHandle);
  // watch('src/**/*.{css,sass,scss,less,styl}', cssHandle);
}

exports.cssHandleWatch = series(cssHandle, cssHandleWatch);

exports.cssHandle = cssHandleNoClean;

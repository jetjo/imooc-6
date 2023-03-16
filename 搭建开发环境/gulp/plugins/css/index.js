const { src, dest, watch, series } = require('gulp');

const { clean } = require('../clean');
const { sassCompiler } = require('./sass编译');
const { cssAutoPrefix } = require('./css厂商前缀');
const { cssMin } = require('./css压缩');

const rename = require('gulp-rename');

const isDev = process.env.GULP_ENV?.startsWith('dev');

async function cssHandle(cb)
{
  await clean(cb, [isDev ? 'dev/css' : 'dist/css']);
  return cssHandleNoClean(cb);
}

function cssHandleNoClean(cb)
{
  // console.log({ sassCompiler, cssAutoPrefix, cssMin });
  return src(['src/**/*.{scss,sass}', '!src/**/_*.{scss,sass}'])
    .sassCompiler()
    .pipe(src('src/**/*.css'))
    .cssAutoPrefix()
    .cssMin()
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
    .pipe(dest(isDev ? 'dev' : 'dist'));
}

function cssHandleWatch()
{
  watch('src/**/*.{css,sass,scss}', cssHandle);
  // watch('src/**/*.{css,sass,scss,less,styl}', cssHandle);
}

exports.cssHandleWatch = series(cssHandle, cssHandleWatch);

exports.cssHandle = cssHandle;

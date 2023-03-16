const { src, dest, watch, series } = require('gulp');
const { clean } = require('../clean');
const { complierJS } = require('./js-complier');
const { concatJs } = require('./js-concat');
const { renameJs } = require('./js-rename');
const { uglifyJs } = require('./js-uglify');

const isDev = process.env.GULP_ENV?.startsWith('dev');

async function jsHandle(cb)
{
  await clean(cb, [isDev ? 'dev/js' : 'dist/js']);
  return jsHandleNoClean(cb);
}

function jsHandleNoClean(cb)
{
  // console.log({ sassCompiler, cssAutoPrefix, cssMin });
  return src(['src/**/*.{js,cjs}', '!src/**/vendor/**'])
    .complierJS()
    .uglifyJs()
    .pipe(src('src/**/vendor/**/*.{js,cjs}'))
    .renameJs((streamPath) =>
    {
      console.log({ streamPath });
      return {
        ...streamPath,
        dirname: 'js'
        // // dirname: streamPath.extname ? streamPath.dirname + '/newPath/' : streamPath.dirname
      }
    })
    .pipe(dest(isDev ? 'dev' : 'dist'));
}

function jsHandleWatch()
{
  watch('src/**/*.{js,cjs}', jsHandle);
}

exports.jsHandleWatch = series(jsHandle, jsHandleWatch);

exports.jsHandle = jsHandle;

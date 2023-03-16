const { src, dest, watch, series } = require('gulp');
const { clean } = require('../clean');
const { complierJS } = require('./js-complier');
const { concatJs } = require('./js-concat');
const { renameJs } = require('./js-rename');
const { uglifyJs } = require('./js-uglify');

async function jsHandle(cb)
{
  await clean(cb, ['dev/js']);
  return jsHandleNoClean(cb);
}

function jsHandleNoClean(cb)
{
  // console.log({ sassCompiler, cssAutoPrefix, cssMin });
  return src(['src/**/*.{js,cjs}', '!src/**/vendor/**'])
    .complierJS()
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
    .pipe(dest('dev'));
}

function jsHandleWatch()
{
  watch('src/**/*.{js,cjs}', jsHandle);
}

exports.jsHandleWatch = series(jsHandle, jsHandleWatch);

exports.jsHandle = jsHandleNoClean;

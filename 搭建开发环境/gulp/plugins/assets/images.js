const { src, dest, watch, series } = require('gulp');
const { clean } = require('../clean');

const isDev = process.env.GULP_ENV?.startsWith('dev');

async function imageHandle(cb)
{
  await clean(cb, [isDev ? 'dev/images' : 'dist/images']);
  return imagesHandleNoClean(cb);
}

function imagesHandleNoClean(cb)
{
  // console.log({ sassCompiler, cssAutoPrefix, cssMin });
  return src(['src/**/*.{jpg,jpeg,png}'])
    // .renameJs((streamPath) =>
    // {
    //   console.log({ streamPath });
    //   return {
    //     ...streamPath,
    //     dirname: 'images'
    //     // // dirname: streamPath.extname ? streamPath.dirname + '/newPath/' : streamPath.dirname
    //   }
    // })
    .pipe(dest(isDev ? 'dev' : 'dist'));
}

function imagesHandleWatch()
{
  watch('src/**/*.{jpg,jpeg,png}', imageHandle);
}

exports.imagesHandleWatch = series(imageHandle, imagesHandleWatch);

exports.imagesHandle = imageHandle;

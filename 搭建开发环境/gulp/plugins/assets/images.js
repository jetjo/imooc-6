const { src, dest, watch, series } = require('gulp');
const { clean } = require('../clean');

async function imageHandle(cb)
{
  await clean(cb, ['dev/images']);
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
    .pipe(dest('dev'));
}

function imagesHandleWatch()
{
  watch('src/**/*.{jpg,jpeg,png}', imageHandle);
}

exports.imagesHandleWatch = series(imageHandle, imagesHandleWatch);

exports.imagesHandle = imagesHandleNoClean;

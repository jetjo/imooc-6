const { src, dest, series, watch } = require('gulp')
const _htmlInclude = require('gulp-file-include');
const { wrapper } = require('../../utils/wrapper')

const includeOpt = {
  //自定义标识符
  prefix: '@@',
  // include文件的基准路径
  basepath: './src/pages'
}

function htmlInclude(cb, stream, noEmit)
{
  stream ||= src('src/**/*.{html,htm}');
  const res = stream
    .pipe(
      _htmlInclude({
        ...includeOpt
      })
    )
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/pages/'))
}

exports.htmlInclude = wrapper(htmlInclude, null, () => includeOpt);

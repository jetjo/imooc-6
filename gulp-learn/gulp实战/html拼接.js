const { src, dest, series, watch } = require('gulp')
const _htmlInclude = require('gulp-file-include');

const { htmlClean: clean } = require('./html压缩');

const includeOpt = {
  //自定义标识符
  prefix: '@@',
  // include文件的基准路径
  basepath: './src/pages'
}

async function htmlInclude(cb)
{
  await clean(cb);
  return htmlIncludeNoClean(cb);
}

function htmlIncludeNoClean(cb, stream, noEmit)
{
  stream ||= src('src/pages/*.{html,htm}');
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

function htmlIncludeWatch()
{
  watch('src/pages/**/*.{html,htm}', htmlInclude)
}

exports._htmlIncludeWatch = series(htmlInclude, htmlIncludeWatch);

exports.htmlInclude = htmlIncludeNoClean;

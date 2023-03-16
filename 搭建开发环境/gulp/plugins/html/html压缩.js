const { src, dest, series, watch } = require('gulp');

const html_min = require('gulp-htmlmin');

const { wrapper } = require('../../utils/wrapper')

//NOTE: {htm,html}花括号里面html前面千万不能有空格！！！
const glob = ['src/**/*.{htm,html}']//'src/**/*.html';//['src/pages/*.{htm, html}'];

const htmlMinOpt = {
  // 压缩多余空白
  collapseWhitespace: true,
  // 移除注释
  removeComments: true,
  // 移除空白属性
  removeEmptyAttributes: true,
  // 压缩布尔属性
  collapseBooleanAttributes: true,
  // 移除属性的引号
  removeAttributeQuotes: true,
  // 压缩 style 标签中的 CSS
  minifyCSS: true,
  // 压缩 script 标签中的 JS
  minifyJS: true,
  // 移除 style 和 link 标签上的 type 属性
  removeStyleLinkTypeAttributes: true,
  // 移除 script 标签上的 type 属性
  removeScriptTypeAttributes: true
}

function htmlMin(cb, stream, noEmit)
{
  stream ||= src(glob);
  if (process.env?.GULP_ENV === 'dev') return stream;
  // await clean(cb);
  // cb();
  // return;
  const res = stream
    // return src('src/**/*.html')
    .pipe(
      html_min({
        ...htmlMinOpt
      })
    )
  if (noEmit)
  {
    return res;
  }
  // .pipe(dest('dist/'))
  return res.pipe(dest('dist/pages/'))
}


exports.htmlMin = wrapper(htmlMin, null, () => htmlMinOpt);

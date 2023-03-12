const { src, dest, series, watch } = require('gulp');

const html_min = require('gulp-htmlmin');

const { wrapper } = require('../utils/wrapper')

//NOTE: {htm,html}花括号里面html前面千万不能有空格！！！
const glob = ['src/pages/*.{htm,html}']//'src/**/*.html';//['src/pages/*.{htm, html}'];

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

async function htmlMin(cb)
{
  await clean(cb);
  // cb();
  // return;
  return htmlMinNoClean(cb);
}

function htmlMinNoClean(cb, stream, noEmit)
{
  stream ||= src(glob);
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

function htmlMinWatch()
{
  watch(glob, htmlMin)
}

async function clean(cb, glob)
{
  //NOTE: 不要忘记加await
  await require('../Gulp能干啥/eg-1-clean任务').clean(cb, glob || ['dist/pages']);
}

exports._htmlMinWatch = series(htmlMin, htmlMinWatch);

// exports.htmlMin = htmlMinNoClean;
exports.htmlClean = clean;

exports.htmlMin = wrapper(htmlMinNoClean, null, () => htmlMinOpt);

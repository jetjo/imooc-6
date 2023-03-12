const { src, dest, series, watch } = require('gulp')

const { htmlClean, htmlMin: { _name: htmlMin } } = require('./html压缩');

const { htmlInclude: { _name: htmlInclude } } = require('./html拼接');

async function htmlIncludeMin(cb)
{
  await htmlClean(cb, ['dist/pages']);
  return htmlIncludeMinNoClean(cb);
}

// const _name = 'yangBing_' + htmlInclude.name;

function htmlIncludeMinNoClean(cb)
{
  // // console.log('htmlInclude:', htmlInclude);
  // // return htmlInclude(cb, htmlMin(cb, null, true), false);
  // const stream = htmlMin(cb, null, true);
  // // return stream.htmlInclude().pipe(dest('dist/pages/'));
  // // console.log('查看函数名称：', _name);
  // // return stream[_name]().pipe(dest('dist/pages/'));
  console.log('查看函数名称：', htmlMin, htmlInclude);
  // return stream[htmlInclude]().pipe(dest('dist/pages/'));
  const stream = src(['src/pages/*.{htm,html}'])
  // console.log(stream.__proto__);
  const pipe_stream = stream
  [htmlMin]();
  // console.log(pipe_stream.__proto__);
  const res = pipe_stream
  [htmlInclude]({ prefix: '##', basepath: './src/pages' })//试过了，只能是@@、##， %%、@%都不行
    .pipe(dest('dist/pages/'));

  // console.log(res.__proto__);

  return res;
}

function htmlIncludeMinWatch()
{
  watch('src/pages/**/*.{html,htm}', htmlIncludeMin);
}

exports.htmlIncludeMinWatch = series(htmlIncludeMin, htmlIncludeMinWatch);

exports.htmlIncludeMin = htmlIncludeMinNoClean;

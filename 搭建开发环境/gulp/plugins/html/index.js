const { src, dest, series, watch } = require('gulp')

const { clean } = require('../clean');

const { htmlMin } = require('./html压缩');
const { htmlInclude } = require('./html拼接');

async function htmlIncludeMin(cb)
{
  await clean(cb, ['dev/pages']);
  return htmlIncludeMinNoClean(cb);
}

function htmlIncludeMinNoClean(cb)
{
  return src(['src/**/*.{htm,html}', '!src/**/include/*.{html,htm}'])
    // .htmlMin()
    .htmlInclude({ prefix: '@@', basepath: './src/pages/include' })//试过了，只能是@@、##， %%、@%都不行
    .pipe(dest('dev/'));
}

function htmlIncludeMinWatch()
{
  watch('src/**/*.{html,htm}', htmlIncludeMin);
}

exports.htmlIncludeMinWatch = series(htmlIncludeMin, htmlIncludeMinWatch);

exports.htmlIncludeMin = htmlIncludeMinNoClean;

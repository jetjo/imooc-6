const { src, dest, series, watch } = require('gulp')

const { htmlClean, htmlMin } = require('./html压缩');

const { htmlInclude } = require('./html拼接');

async function htmlIncludeMin(cb)
{
  await htmlClean(cb);
  return htmlIncludeMinNoClean(cb);
}

function htmlIncludeMinNoClean(cb)
{
  return htmlInclude(cb, htmlMin(cb, null, true), false);
}

function htmlIncludeMinWatch()
{
  watch('src/pages/**/*.{html,htm}', htmlIncludeMin);
}

exports._htmlIncludeMinWatch = series(htmlIncludeMin, htmlIncludeMinWatch);

exports.htmlIncludeMin = htmlIncludeMinNoClean;

// eg - 5 - js - rename.js
const { src, dest, series } = require('gulp');

const rename = require('gulp-rename');
const { wrapper } = require('../../utils/wrapper');

const opt = {
  extname: '.min.js'
}
const optGetterRef = {
  value: null
}

const renameJs = function (cb, stream, noEmit)
{
  stream ||= src(['src/**/*.js', '!src/**/vendor/**']);
  const res = stream
    .pipe(
      rename(optGetterRef.value || opt)
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/'));
}

exports.renameJs = wrapper(renameJs, (_opt) =>
{
  if (_opt instanceof Function)
  {
    optGetterRef.value = _opt;
  }
  else if (_opt && typeof _opt === 'object')//约定，应该不用担心cbOrOpt是个回调函数，只排除null和undefined
  {
    Object.assign(opt, _opt);
    console.log('合并后应该生效的gulp-plugin选项：', opt);
  }
})

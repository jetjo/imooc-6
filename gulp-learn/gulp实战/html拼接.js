const { src, dest, series, watch } = require('gulp')
const _htmlInclude = require('gulp-file-include');
const { wrapper } = require('../utils/wrapper')

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
  console.log('生效的gulp-file-include选项：', includeOpt);
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

function wrap(cbOrFileIncludeOpt, stream, noEmit)
{
  console.log('this是NodeJS.ReadWriteStream的实例？', this instanceof Stream, this);
  console.log('this是process？', this === process);
  console.log('this是谁的实例？？？', this.__proto__.constructor.name);
  console.log('this是谁的实例？？？', this.constructor.name);
  console.log('this是谁的实例？？？', this.constructor);
  if (this instanceof Stream)
  {
    const fileIncludeOpt = cbOrFileIncludeOpt;
    cbOrFileIncludeOpt = null;
    stream = this;
    noEmit = true;
    console.log('第1个参数fileIncludeOpt的类型：', typeof fileIncludeOpt, fileIncludeOpt);
    if (fileIncludeOpt && typeof fileIncludeOpt === 'object')//约定，应该不用担心cbOrFileIncludeOpt是个回调函数，只排除null和undefined
    {
      Object.assign(includeOpt, fileIncludeOpt);
      console.log('合并后应该生效的gulp-file-include选项：', includeOpt);
    }
  }
  const cb = cbOrFileIncludeOpt;
  // if (!(this instanceof NodeJS.ReadWriteStream)) 
  //   throw new Error('this 不是 NodeJS.ReadWriteStream类型实例！')
  return htmlIncludeNoClean(cb, stream, noEmit);
}

exports._htmlIncludeWatch = series(htmlInclude, htmlIncludeWatch);

const _ = wrapper(htmlIncludeNoClean, null, () => includeOpt)//wrap//htmlIncludeNoClean;
exports.htmlInclude = _//_[_._name]

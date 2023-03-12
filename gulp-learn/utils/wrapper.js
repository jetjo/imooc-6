// wrapper.js
// const { Stream } = require('readable-stream');
const { src, dest } = require('gulp');
// // console.log({ __filename }, src(__filename).__proto__);
// // console.log({ __filename }, src(__filename).__proto__.__proto__);
// console.log({ __filename }, src(__filename).__proto__.__proto__.__proto__);
// // console.log({ __filename }, src(__filename).__proto__.__proto__.__proto__.__proto__);
// // console.log({ __filename }, src(__filename).__proto__.__proto__.__proto__.__proto__.__proto__);
// console.log({ __filename }, src(__filename).pipe(dest('tmp/a1')).__proto__);
// console.log({ __filename }, src(__filename).pipe(dest('tmp/a11')).__proto__.__proto__);
// console.log({ __filename }, src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__);
// console.log({ __filename }, src(__filename).pipe(dest('tmp/a1111')).__proto__.__proto__.__proto__.__proto__);
// console.log({ __filename }, src(__filename).pipe(dest('tmp/a1111')).__proto__.__proto__.__proto__.__proto__.__proto__);

// console.log(src(__filename).__proto__.__proto__.__proto__ === src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__);
// console.log(src(__filename).__proto__.__proto__.__proto__, src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__);

// console.log('????', src(__filename).__proto__.__proto__.__proto__.__proto__ === src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__.__proto__);
// console.log('????', src(__filename).__proto__.__proto__.__proto__.__proto__, src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__.__proto__);
// console.log(':::::', src(__filename).__proto__.__proto__.__proto__.__proto__.__proto__, src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__.__proto__.__proto__);

// console.log(':::::?????', src(__filename).__proto__.__proto__.__proto__.__proto__.__proto__ === src(__filename).pipe(dest('tmp/a111')).__proto__.__proto__.__proto__.__proto__.__proto__);

// const __Transform = src(__filename).__proto__
// const __Duplexify = src(__filename).pipe(dest('tmp')).__proto__

// // const __Transform_Ctor = __Transform.constructor;
// // const __Duplexify_Ctor = __Duplexify.constructor;
const _ = src(__filename);
const __EventEmitter_Ctor = _.__proto__.__proto__.__proto__.__proto__.__proto__.constructor;
_.destroy();
// console.log({ __EventEmitter_Ctor, _ });
// // console.log({ __Transform, __Duplexify });
function wrap(pipeHandler, optMerger, optGetter)
{
  // console.log('pipeHandler的名称：', pipeHandler.name);
  function _optMerger(opt)
  {
    if (optMerger)
    {
      optMerger(opt);
      return;
    }
    if (optGetter)
    {
      const _opt = opt;
      console.log('第1个参数_opt的类型：', typeof _opt);
      // console.log('第1个参数_opt的类型：', typeof _opt, _opt);
      if (_opt && typeof _opt === 'object')//约定，应该不用担心cbOrOpt是个回调函数，只排除null和undefined
      {
        Object.assign(optGetter(), _opt);
        console.log('合并后应该生效的gulp-plugin选项：', optGetter());
      }
    }
  }
  const _ = function (cbOrOpt, stream, noEmit)
  {
    // // console.log('this是NodeJS.ReadWriteStream的实例？', this instanceof Stream);
    // console.log('this是__Transform的实例？', this instanceof __Transform_Ctor);
    // console.log('this是__Duplexify的实例？', this instanceof __Duplexify_Ctor);
    // console.log('this是__EventEmitter_Ctor的实例？', this instanceof __EventEmitter_Ctor);
    // // console.log('this是NodeJS.ReadWriteStream的实例？', this instanceof Stream, this);
    // // console.log('this是process？', this === process);
    // // console.log('this是谁的实例？？？', this.__proto__.constructor.name);
    // // console.log('this是谁的实例？？？', this.constructor.name);
    // // console.log('this是谁的实例？？？', this.constructor);
    if (this instanceof __EventEmitter_Ctor)
    // if ((this instanceof __Transform_Ctor) || (this instanceof __Duplexify_Ctor))
    // if (this instanceof Stream)
    {
      stream = this;
      noEmit = true;
      _optMerger(cbOrOpt)
      cbOrOpt = null;
    }
    else if (this)
    {
      throw new Error('this 类型错误！')
    }
    const cb = cbOrOpt;
    // if (!(this instanceof NodeJS.ReadWriteStream)) 
    //   throw new Error('this 不是 NodeJS.ReadWriteStream类型实例！')
    return pipeHandler(cb, stream, noEmit);
  }

  const _transform = src(__filename);
  const _name = 'yangBing_' + pipeHandler.name;
  console.log({ _name });
  // if (_transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name])
  // {
  //   _transform.destroy();
  //   throw new Error(`成员名称:${ _name }冲突！`);
  // }
  // _transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name] = _;
  // _transform.destroy();
  // // return _;
  // // return _transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name];
  if (_transform.__proto__[_name])
  // if (_transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name])
  // if (_transform.__proto__[_name])
  {
    _transform.destroy();
    throw new Error(`成员名称:${ _name }冲突！`);
  }
  if (_transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name])
  // if (_transform.pipe(dest('tmp/')).__proto__[_name])
  {
    _transform.destroy();
    throw new Error(`成员名称:${ _name }冲突！`);
  }
  _transform.__proto__[_name] = _;
  _transform.__proto__.__proto__.__proto__.__proto__.__proto__[_name] = _;
  // console.log(_transform.__proto__.__proto__.__proto__.__proto__.__proto__, 'emitter??');
  // _transform.__proto__[_name] = _;
  // _transform.pipe(dest('tmp/')).__proto__[_name] = _;
  _transform.destroy();
  // return _;
  // return _transform.__proto__[_name];
  return { [_name]: _, _name };
}

exports.wrapper = wrap;

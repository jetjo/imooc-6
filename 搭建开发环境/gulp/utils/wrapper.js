// wrapper.js
const EventEmitter = require('node:events');

function wrap(pipeHandler, optMerger, optGetter)
{
  const _name = pipeHandler.name;

  if (EventEmitter.prototype[_name])
  {
    throw new Error(`成员名称:${ _name }冲突！`);
  }

  EventEmitter.prototype[_name] = function (cbOrOpt, stream, noEmit)
  {
    if (this instanceof EventEmitter)
    {
      function _optMerger(opt)
      {
        if (optMerger)
        {
          optMerger(opt);
        }
        else if (optGetter)
        {
          const _opt = opt;
          console.log('第1个参数_opt的类型：', typeof _opt);
          if (_opt && typeof _opt === 'object')//约定，应该不用担心cbOrOpt是个回调函数，只排除null和undefined
          {
            Object.assign(optGetter(), _opt);
            console.log('合并后应该生效的gulp-plugin选项：', optGetter());
          }
        }
      }
      stream = this;
      noEmit = true;
      _optMerger(cbOrOpt)
      cbOrOpt = null;
    }
    else if (this && !(cbOrOpt instanceof Function))
    {
      // console.log('???????', this, '---------', cbOrOpt, '???????');
      throw new Error('this 类型错误！')
    }
    const cb = cbOrOpt;
    return pipeHandler(cb, stream, noEmit);
  };
  return EventEmitter.prototype[_name];
}

exports.wrapper = wrap;

exports.s_task1 = function (cb)
{
  console.log('串行任务1开始...');
  setTimeout(() =>
  {
    console.log('串行任务1结束。');
    cb();
  }, 1000);
}
exports.s_task2 = function (cb)
{
  console.log('串行任务2开始...');
  setTimeout(() =>
  {
    console.log('串行任务2结束。');
    cb();
  }, 1000);
}
exports.s_task3 = function (cb)
{
  console.log('串行任务3开始...');
  setTimeout(() =>
  {
    console.log('串行任务3结束。');
    cb();
  }, 1000);
}

exports[`seriesTask1_${ Object.values(exports).length }`] = require('gulp').series(...Object.values(exports))//, exports.s_task3);

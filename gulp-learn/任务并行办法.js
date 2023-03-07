exports.p_task1 = function (cb)
{
  console.log('并行任务1开始...');
  setTimeout(() =>
  {
    console.log('并行任务1结束。');
    cb();
  }, 1000);
}
exports.p_task2 = function (cb)
{
  console.log('并行任务2开始...');
  setTimeout(() =>
  {
    console.log('并行任务2结束。');
    cb();
  }, 1000);
}
exports.p_task3 = function (cb)
{
  console.log('并行任务3开始...');
  setTimeout(() =>
  {
    console.log('并行任务3结束。');
    cb();
  }, 5000);
}

exports[`parallelTask1_${ Object.values(exports).length }`] = require('gulp').parallel(...Object.values(exports))//, exports.p_task3);

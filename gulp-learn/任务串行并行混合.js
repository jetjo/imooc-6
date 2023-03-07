const s_task1 = function (cb)
{
  console.log('串行任务1开始...');
  setTimeout(() =>
  {
    console.log('串行任务1结束。');
    cb();
  }, 1000);
}
const s_task2 = function (cb)
{
  console.log('串行任务2开始...');
  setTimeout(() =>
  {
    console.log('串行任务2结束。');
    cb();
  }, 1000);
}
const s_task3 = function (cb)
{
  console.log('串行任务3开始...');
  setTimeout(() =>
  {
    console.log('串行任务3结束。');
    cb();
  }, 1000);
}

const p_task1 = function (cb)
{
  console.log('并行任务1开始...');
  setTimeout(() =>
  {
    console.log('并行任务1结束。');
    cb();
  }, 1000);
}
const p_task2 = function (cb)
{
  console.log('并行任务2开始...');
  setTimeout(() =>
  {
    console.log('并行任务2结束。');
    cb();
  }, 1000);
}
const p_task3 = function (cb)
{
  console.log('并行任务3开始...');
  setTimeout(() =>
  {
    console.log('并行任务3结束。');
    cb();
  }, 5000);
}

const { series, parallel } = require('gulp');

exports.mult_task = series(s_task1, parallel(p_task1, series(s_task2, parallel(p_task2, p_task3), s_task3)));

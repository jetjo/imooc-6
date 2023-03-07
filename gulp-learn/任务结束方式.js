/**调用gulp传入的callback的方式结束任务 */
function taskEndMode1(cb)
{
  console.log('练习结束任务的第一种方式，开始...');
  setTimeout(() =>
  {
    console.log('练习结束任务的第一种方式，结束。');
    cb();
  }, 5000);
}

exports.taskEndMode1 = taskEndMode1;

/**返回Promise的方式结束任务 */
function taskEndMode2()
{
  console.log('练习结束任务的第二种方式，开始...');
  return new Promise(res =>
  {
    setTimeout(() =>
    {
      console.log('练习结束任务的第二种方式，结束。');
      res();
    }, 5000);
  })
}

exports.taskEndMode2 = taskEndMode2;


async function taskEndMode2_2()
{
  console.log('练习结束任务的第二种方式-2，开始...');
  await new Promise(res =>
  {
    setTimeout(() =>
    {
      res();
    }, 5000);
  })
  console.log('练习结束任务的第二种方式-2，结束。');
}

exports.taskEndMode2_2 = taskEndMode2_2;

const { src, dest } = require('gulp');
// const gulp = require('gulp');

/**返回流Stream的方式结束任务 */
function taskEndMode3()
{
  console.log('练习结束任务的第三种方式，开始...');
  return src('./test.js').pipe(dest('./test'));
  console.log('练习结束任务的第三种方式，结束。');
}

exports.taskEndMode3 = taskEndMode3;

async function taskEndMode3_2(cb)
{
  console.log('练习结束任务的第三种方式-2，开始...');
  // const stream = src('./test.js').pipe(dest('./test'));
  // stream.on("end", () =>
  // {
  //   console.log('练习结束任务的第三种方式-2，结束。');
  //   cb();
  // })
  src('./test.js').on("end", () =>
  {
    console.log('练习结束任务的第三种方式-2，结束。');
    cb();
  }).pipe(dest('./test'));
}

exports.taskEndMode3_2 = taskEndMode3_2;


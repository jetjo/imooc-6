const { task } = require( 'gulp' );
const gulp = require( 'gulp' );
// console.log(gulp)

// // 导入任务方式1:
// exports.taskEndMode = require('./任务结束方式');
// 命令行执行：gulp taskEndMode.taskEndMode1

// // 导入任务方式2:
// exports = require('./任务结束方式');

// // 导入任务方式3:
// exports = {
//   // ...exports,
//   ...require('./任务结束方式')
// };

// 以上方式都无法导入任务

// 导入任务方式4:
// const taskEndModes = require('./任务结束方式');
// Object.keys(taskEndModes).map(taskName => exports[taskName] = taskEndModes[taskName]);
// 导入任务方式4-2:
// Object.entries(taskEndModes).map(([taskName, task]) => exports[taskName] = task);

// 导入任务方式5:
// /* exports =  */Object.assign(exports, require('./任务结束方式'));

// // Object.assign(exports, require('./任务串行办法'));
// // Object.assign(exports, require('./任务并行办法'));
// // Object.assign(exports, require('./任务串行并行混合'));

// Object.assign(exports, require('./Gulp能干啥/eg-1-clean任务'));
// Object.assign(exports, require('./Gulp能干啥/eg-0-copy--test-glob'));

let taskIndex = 0;
// Object.entries(require('./Gulp能干啥/eg-1-clean任务')).map(([taskName, task]) => exports[taskName + taskIndex++] = task);
// Object.entries(require('./Gulp能干啥/eg-0-copy--test-glob')).map(([taskName, task]) => exports[taskName + taskIndex++] = task);
// Object.entries(require('./Gulp能干啥/eg-2-js-complier')).map(([taskName, task]) => exports[taskName + taskIndex++] = task);

function bindTask(path)
{
  Object.entries(require(path)).filter(e => e[0][0] != '_').map(([taskName, task]) => exports[taskName + taskIndex++] = task);
}

function bindTaskAsync ( path )
{
  require( path );
}

bindTask('./Gulp能干啥/eg-1-clean任务')
bindTask('./Gulp能干啥/eg-0-copy--test-glob')
bindTask('./Gulp能干啥/eg-2-js-complier')

bindTask('./Gulp能干啥/eg-3-js-uglify');
bindTask('./Gulp能干啥/eg-4-js-concat');

bindTask('./Gulp能干啥/eg-5-js-rename');
bindTask('./gulp文件监控.js');

bindTask('./gulp实战/html压缩');
bindTask('./gulp实战/html拼接');
bindTask('./gulp实战/html拼接压缩');

bindTask('./gulp实战/sass编译');
bindTask('./gulp实战/css厂商前缀');
bindTask('./gulp实战/css压缩');
bindTask( './gulp实战/css处理' );

bindTask( './任务参数.js' );

bindTaskAsync( "./gulp实战/gif2webp.js" );

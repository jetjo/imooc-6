// const { src, dest, watch, series, parallel } = require('gulp');
const { bindTask } = require('./gulp/utils/bind-task');

let taskIndex = 0;

Object.assign(exports, bindTask(require('./gulp/plugins/css/index'), taskIndex));
taskIndex = exports.taskIndex;
Object.assign(exports, bindTask(require('./gulp/plugins/html/index'), taskIndex));
taskIndex = exports.taskIndex;
Object.assign(exports, bindTask(require('./gulp/plugins/js/index'), taskIndex));
taskIndex = exports.taskIndex;
Object.assign(exports, bindTask(require('./gulp/plugins/assets/images'), taskIndex));
taskIndex = exports.taskIndex;
Object.assign(exports, bindTask(require('./gulp/dev'), taskIndex));
taskIndex = exports.taskIndex;


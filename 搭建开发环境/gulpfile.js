// const { src, dest, watch, series, parallel } = require('gulp');
const { bindTask } = require('./gulp/utils/bind-task');

let taskIndex = 0;

Object.assign(exports, bindTask(require('./gulp/plugins/css/css处理'), taskIndex++));

const { series, watch } = require('gulp');

const compiler = require('./Gulp能干啥/eg-2-js-complier').complierJS;

function compilerWatch()
{
  // watch(['src/*.js', 'src/js/*.js'], compiler)
  watch(['src/**/*.js', '!src/vendor/**'], compiler)//NOTE: compiler任务的逻辑更新后 需要重启监控
}

exports.compilerJsWatch = series(compiler, compilerWatch);

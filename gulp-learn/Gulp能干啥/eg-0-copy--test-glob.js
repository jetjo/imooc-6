// glob基本知识点
// 1、分隔符永远是“/”
// 2、星号*用于匹配单级(⚠️，不匹配子文件夹内部)目录下的一切文件和文件夹
// 3、双星号**用于匹配或者说跨越多级目录
// 4、叹号！，以叹号开头的glob用于跟随在前面的glob后，排除掉前面的glob已经匹配到的文件或目录

const { src, dest, series } = require('gulp');

function copy()
{
  // return src('./src/index.js').pipe(dest('./dist/'))
  // return src('./src/*').pipe(dest('./dist/'))
  // return src('./src/**').pipe(dest('./dist/'))
  // return src(['./src/**', '!./src/vendor']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/**', '!./src/vendor/']).pipe(dest('./dist/'))//NOTE: 不行
  return src(['./src/**', '!./src/vendor/**']).pipe(dest('./dist/'))//
  // return src('./src/**/*.ts').pipe(dest('./dist/'))
  // return src(['./src/**/*.ts', '!./src/**/*.1.ts']).pipe(dest('./dist/'))
}

// Object.assign(exports, require('./eg-1-clean任务'));

exports.copy = series(require('./eg-1-clean任务').clean, copy);

// glob基本知识点
// 1、分隔符永远是“/”
// 2、星号*用于匹配单级(⚠️，不匹配子文件夹内部)目录下的一切文件和文件夹
// 3、双星号**用于匹配或者说跨越多级目录
// 4、叹号！，以叹号开头的glob用于跟随在前面的glob后，排除掉前面的glob已经匹配到的文件或目录

const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');

function copy(cb)
{
  // return src('./src/index.js').pipe(dest('./dist/'))
  // return src('./src/*').pipe(dest('./dist/'))
  // return src('./src/**').pipe(dest('./dist/'))
  // return src(['./src/**', '!./src/vendor']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/**', '!./src/vendor/']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/*', '!./src/vendor/']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/*', '!./src/vendor']).pipe(dest('./dist/'))//NOTE: 
  // return src(['./src/*', '!./src/vendor', 'src/js']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/*', '!./src/vendor', 'src/js/']).pipe(dest('./dist/'))//NOTE: 不行
  // return src(['./src/*', '!./src/vendor', 'src/js/*']).pipe(dest('./dist/'))//NOTE: 
  // return src(['./src/*', '!./src/vendor', 'src/js/*']).pipe(dest('./dist/**/*'))//NOTE: 不行
  // return src(['./src/*', '!./src/vendor', '!src/js']).pipe(
  //   // return src(['./src/*', '!./src/vendor']).pipe(
  //   src('src/js/*').pipe(//内部pipe的结果可能会被覆盖
  //     rename((path) => ({
  //       ...path,
  //       dirname: path.dirname + '/js/'
  //     }))
  //   ).pipe(dest('dist/')).on('end', () => cb())//.pipe(dest('./dist/'))//.end()//NOTE: Error: write after end, 不能把以.pipe(dest('./dist/'))和以.end()结尾的流作为参数再传入pipe
  //   // ).pipe(dest('./dist/'))//NOTE:
  // ).end();//.pipe(dest('./dist/'))//NOTE:
  return src('src/js/*')
    .pipe(//NOTE: TypeError: Cannot read properties of undefined (reading 'on'), 不能传递undefined给pipe，必须是流
      rename((path) =>
      {
        console.warn({ path });
        return {
          ...path,
          dirname: path.dirname + '/js/'
        }
      }).on('end', function ()
      {
        console.log(arguments, '重命名任务完成～');
      })
      // rename((path) => ({
      //   ...path,
      //   dirname: path.dirname + '/js/'
      // }))
    )//NOTE: 如果后面src加入的文件和之前的文件重名，之前的文件会被覆盖，无论路径。。。
    .pipe(
      src(['./src/*', '!./src/vendor', '!src/js'])
    ).pipe(dest('./dist/'))//NOTE: 
  // return src(['./src/**', '!./src/vendor/**']).pipe(dest('./dist/'))//
  // return src('./src/**/*.ts').pipe(dest('./dist/'))
  // return src(['./src/**/*.ts', '!./src/**/*.1.ts']).pipe(dest('./dist/'))
}

// Object.assign(exports, require('./eg-1-clean任务'));

exports.copy = series(require('./eg-1-clean任务').clean, copy);

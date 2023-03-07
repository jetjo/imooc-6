// eg - 2 - js - complier.js
// 前提： 在工程目录下安装gulp-babel包(https://github.com/babel/gulp-babel)
// npm install --save-dev gulp-babel @babel/core @babel/preset-env

const { src, dest, series } = require('gulp');

const babel = require('gulp-babel');

const opt = {
  // "presets": ["@babel/preset-env"]
  "presets": ["@babel/env"]
};

/**
 * NOTE: 这个方法也不报错，但就是无法输出期望效果，和下一个正确的方法对比一下，错在哪了！！！！！！！！！
 * @returns 
 */
function complierJS__Error()
{
  return src('src/js/*.js').pipe(babel({
    ...opt
  }).pipe(dest('dist/js')))
  //NOTE: 与上面的代码等效。。。发现问题了吧！！！
  //NOTE: babel实际上输出了期望的结果，但是被覆盖了
  return src('src/js/*.js').pipe(
    babel({
      ...opt
    }).pipe(dest('dist/js'))
  )
}

function complierJS__Right()
{
  /*   return src('src/js/*.js').pipe(babel({
      ...opt
    })).pipe(dest('dist/js')) */
  //NOTE: 养成好习惯，避免括号位置搞错！！！
  // NOTE: pipe方法的括号一定要处于一行的开头或结尾，尤其调用链中间的pipe，避免出现complierJS__Error方法中的情况
  return src(['src/**/*.js', '!src/vendor/**/*.js']).pipe(
    babel({
      ...opt
    })
  ).pipe(dest('dist/'))
}

exports.complierJS = series(require('./eg-1-clean任务').clean, complierJS__Right);

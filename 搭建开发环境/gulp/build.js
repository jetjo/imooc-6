const { loadEnv } = require('./plugins/load-env');
loadEnv('.env')();
loadEnv('.env.build')();

console.log('查看环境变量：', process.env);

const { src, series, parallel, watch, dest } = require('gulp');
const { clean } = require('./plugins/clean');

if (process.env.IS_MODULE)
{
  const webpackConf = require('../webpack.config');
  const webpackStream = require('webpack-stream');
  const webpack = require('webpack');
  const named = require('vinyl-named');
  webpackConf.watch = true;
  webpackConf.mode = 'production';
  webpackConf.devtool = 'source-map';//NOTE

  async function build(cb)
  {
    await clean(cb, 'dist');
    //多入口
    // return gulp.src(['src/entry1.js', 'test/entry2.js'])
    //   .pipe(named())
    return src('./src/js/index.mjs')
      .pipe(webpackStream(webpackConf))//为webpack-stream插件指定一个非默认的webpack版本
      // .pipe(webpackStream(webpackConf, webpack))//为webpack-stream插件指定一个非默认的webpack版本
      .pipe(dest('dist'))
  }
  exports.build = series(loadEnv('.env.build'), build);
}
else
{
  const webserver = require('gulp-webserver');

  const { wrapper } = require('./utils/wrapper');
  const { htmlIncludeMin } = require('./plugins/html/index');
  const { imagesHandle } = require('./plugins/assets/images');
  const { cssHandle } = require('./plugins/css/index');
  const { jsHandle } = require('./plugins/js/index');

  exports.build = series(loadEnv('.env.build'), parallel(htmlIncludeMin, imagesHandle, cssHandle, jsHandle));

}

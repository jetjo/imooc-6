const { loadEnv } = require('./plugins/load-env');
loadEnv('.env.dev')();

// console.log('查看环境变量：', process.env);

const { src, series, parallel, watch } = require('gulp');
const webserver = require('gulp-webserver');

const { wrapper } = require('./utils/wrapper');
const { htmlIncludeMinWatch, htmlIncludeMin } = require('./plugins/html/index');
const { imagesHandleWatch, imagesHandle } = require('./plugins/assets/images');
const { cssHandleWatch, cssHandle } = require('./plugins/css/index');
const { jsHandleWatch, jsHandle } = require('./plugins/js/index');

const { delay } = require('./plugins/delay');

const opt = {
  // // reach the server from the network
  // host: '0.0.0.0',
  port: 3333,
  //html5Mode for single page app
  fallback: 'index.html',
  livereload: true,
  directoryListing: true,
  open: './pages/index.html',//true,
  // enable: true, // need this set to true to enable livereload
  // filter: function (fileName)
  // {
  //   if (fileName.match(/.map$/))
  //   { // exclude all source maps from livereload
  //     return false;
  //   } else
  //   {
  //     return true;
  //   }
  // }
}

function devServer(cb, stream)
{
  (stream || src('dev/'))
    .pipe(
      webserver({
        ...opt
      })
    )

  // stream.emit('kill');//kill devServer
}

exports.devServer = series(
  loadEnv('.env.dev'),
  parallel(htmlIncludeMin, imagesHandle, cssHandle, jsHandle),
  delay(5000),
  parallel(htmlIncludeMinWatch, jsHandleWatch, cssHandleWatch, imagesHandleWatch, wrapper(devServer, null, () => opt))
);

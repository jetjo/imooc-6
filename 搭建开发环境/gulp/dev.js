const { src, series, parallel, watch } = require('gulp');
const webserver = require('gulp-webserver');

const { wrapper } = require('./utils/wrapper');
const { htmlIncludeMinWatch } = require('./plugins/html/index');
const { imagesHandleWatch } = require('./plugins/assets/images');
const { cssHandleWatch } = require('./plugins/css/index');
const { jsHandleWatch } = require('./plugins/js/index');

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

exports.devServer = parallel(htmlIncludeMinWatch, jsHandleWatch, cssHandleWatch, imagesHandleWatch, wrapper(devServer, null, () => opt));

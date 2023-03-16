
delete process.env.VARIABLE
require('dotenv').config({
  path: '.env.build',
  override: true,
});

// console.log('查看环境变量：', process.env);

const { src, series, parallel, watch } = require('gulp');
const webserver = require('gulp-webserver');

const { wrapper } = require('./utils/wrapper');
const { htmlIncludeMin } = require('./plugins/html/index');
const { imagesHandle } = require('./plugins/assets/images');
const { cssHandle } = require('./plugins/css/index');
const { jsHandle } = require('./plugins/js/index');

exports.build = series((cb) =>
{
  delete process.env.VARIABLE
  require('dotenv').config({
    path: '.env.build',
    override: true
  });
  console.log('查看环境变量：', process.env);
  cb();
}, parallel(htmlIncludeMin, imagesHandle, cssHandle, jsHandle));

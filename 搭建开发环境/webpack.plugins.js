const path = require('path');

const webpack = require('webpack');

// const { VueLoaderPlugin } = require('vue-loader');

const htmlPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');

const copyPlugin = require('copy-webpack-plugin');


//+++++++++++++++++++++++++++++++++++++++++配置ElementPlus按需引入+++++++++++++++++++++++++++++++++++++++++++++++
// // import AutoImport from 'unplugin-auto-import/webpack'
// const AutoImport = require('unplugin-auto-import/webpack');
// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
//+++++++++++++++++++++++++++++++++++++++++配置ElementPlus按需引入+++++++++++++++++++++++++++++++++++++++++++++++


const plugins = [
  new copyPlugin({
    patterns: [
      // { from: './src/config.js', to: './' },
      // { from: './src/mode.csv', to: './mode1.csv' },
      // { from: './src/images/**', to: '/images' }//目的目录是/Users/images。。。
      {
        from: 'src/images/**',
        // to(args)
        to({ context, absoluteFilename })
        {
          // console.log(args);
          // console.log({ context, absoluteFilename });
          const path = absoluteFilename.replace(context + '/src/', '');
          // const path = absoluteFilename.replace(/\/src/, '');
          // console.log({ path });
          return path;
        },
      }
    ]
  }),
  new htmlPlugin({
    // inject: 'body'
    // scriptLoading: 'blocking',//如果是默认值‘defer’将导致document.write语句失效！！！
    template: './src/pages/index.ejs',
    filename: 'index.html'
  }),
  // new VueLoaderPlugin(),
  new miniCssExtractPlugin({
    filename: '[contenthash].css',
    chunkFilename: '[contenthash].css',
    ignoreOrder: true
  }),
  // AutoImport({
  //   resolvers: [ElementPlusResolver()],
  // }),
  // Components({
  //   resolvers: [ElementPlusResolver()],
  // }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    BASE_URL: JSON.stringify('./')
  }),
  // Work around for Buffer is undefined:
  // https://github.com/webpack/changelog-v5/issues/10
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
];

module.exports.plugins = plugins;

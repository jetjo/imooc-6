const path = require('path');

const isProd = process.env.GULP_ENV === 'build';

const { merge } = require('webpack-merge');

const rules = require('./webpack.rules').rules;
const plugins = require('./webpack.plugins').plugins;

const fallback = require('./webpack.fallback').fallback;

const webpackConf = {
  context: __dirname,
  entry: './src/js/index.mjs',//['core-js', './src/js/index.mjs'],
  output: {
    chunkFilename: '[contenthash]@[name].js',
    filename: '[contenthash]@[name].js',
    assetModuleFilename: '[contenthash]@[name][ext][query]'
  },
  // experiments: {
  //   // asset: true,
  //   topLevelAwait: true
  // },
  resolve: {
    // mainFields: ['main', 'module', '...'],
    extensions: ['.ts', '.vue', '.mjs', '...'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    fallback
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules
  },
  plugins
}

if (!isProd)
{
  module.exports = merge(webpackConf, {
    devtool: 'inline-source-map',//'eval';//'source-map';,
    devServer: {
      allowedHosts: 'all',
      // client: {
      //     webSocketURL: {
      //         hostname: '0.0.0.0',
      //         pathname: '/ws',
      //         port: 8080,
      //         protocol: 'ws',
      //     },
      // },
      port: 3333, // 端口号
      https: false,// HTTP/2

      // //配置多个代理
      // proxy: {
      //     "/mock": {
      //         target: "http://172.20.10.11:8089",
      //         changeOrigin: true,
      //         secure: false,
      //         pathRewrite: {
      //             "^/mock": "" // 去掉接口地址中的allFixedAssets字符串
      //         }
      //     },
      // }
    },
  })
}
else
{
  const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  module.exports = merge(webpackConf, {
    optimization: {
      // sideEffects: true,
      // usedExports: true,
      // splitChunks: {
      //     chunks: 'all',
      // },
      // runtimeChunk: 'multiple',
      minimizer: [
        `...`,
        new cssMinimizerPlugin()
      ]
    },
    // cache: {
    //     buildDependencies: {
    //         // This makes all dependencies of this file - build dependencies
    //         config: [__filename],
    //         // By default webpack and loaders are build dependencies
    //     },
    //     type: 'filesystem',
    //     allowCollectingMemory: false,
    //     compression: 'gzip',
    //     hashAlgorithm: 'md4',
    //     store: 'pack',
    //     version: 'v0.0.91',
    // },
    recordsPath: path.join(__dirname, 'records.json'),
  });
}

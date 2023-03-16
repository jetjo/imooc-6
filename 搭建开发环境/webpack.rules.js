const miniCssExtractPlugin = require('mini-css-extract-plugin');

const include = /src/;

const isProd = process.env.GULP_ENV === 'build';

const commonCssModuleLoader = [isProd ? miniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'];

const sassLoader = {
  test: /\.s(a|c)ss$/,
  use: [...commonCssModuleLoader, 'sass-loader'],
  include
};

const cssLoader = {
  use: [...commonCssModuleLoader],
  test: /\.css$/,
  exclude: /node_modules\/(?!(ant-design-vue|bootstrap|bootstrap-vue-3)\/).*/
};

const assetsLoader = {
  test: /\.(jpg|jpeg|png|webp|svg|gif|bmp)$/,
  type: 'asset',
  include
}

const tsLoader = {
  test: /\.(j|t)s$/,
  // test: /\.ts$/,
  use: ['babel-loader', {
    // loader: 'babel-loader!ts-loader',
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      happyPackMode: true,
      appendTsSuffixTo: [/TS\.vue$/]
    }
  }/* , {
        loader: 'babel-loader',
        options: {

        }
    } */],
  exclude: /node_modules\/(?!(ant-design-vue|bootstrap|bootstrap-vue-3)\/).*/
};


const esLoader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

module.exports.rules = [
  // vueLoader,
  cssLoader,
  // lessLoader,
  sassLoader,
  tsLoader,
  esLoader,
  assetsLoader,
  // mjsLoader
]

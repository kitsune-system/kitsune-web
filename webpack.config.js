'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const outputPath = process.cwd() + '/dist';

const prodConfig = config => {
  return Object.assign(config, {
    entry: './src/index.js',
    output: {
      path: outputPath,
      filename: 'app-[hash].js'
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
  });
};

const testConfig = config => {
  return Object.assign(config, {
    entry: './src/index.spec.js',
    output: {
      path: outputPath,
      filename: 'spec.js'
    },
    devtool: 'source-map'
  });
};

const devConfig = config => {
  config.devtool = 'source-map';
  config.devServer = {
    hot: true,
    port: 3000,
    overlay: true
  };
  config.entry = {
    app: ['react-hot-loader/patch', './src/index.js']
  };
  config.plugins = [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin()
  ];
  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader']
    },
    {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ];
  return config;
};

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

const nodeEnv = process.env.NODE_ENV || 'production';

let config;
switch(nodeEnv) {
  case 'production':
  default:
    config = prodConfig(baseConfig);
    break;
  case 'test':
    config = testConfig(baseConfig);
    break;
  case 'dev':
    const pConfig = prodConfig(baseConfig)
    config  = devConfig(pConfig);
    break;
}

config = Object.assign({}, baseConfig, config);
module.exports = config;

'use strict';

const _ = require('lodash');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const outputPath = process.cwd() + '/dist';

const rules = {
  eslint: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre'
  },
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  babelDev: {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['react-hot-loader/webpack', 'babel-loader']
  },
  scss: {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  },
  scssTest: {
    test: /\.scss$/,
    loaders: [
      'css-loader',
      'sass-loader'
    ]
  }
};

const useRules = function() {
  const ruleNames = arguments;
  return _.values(_.pick(rules, ruleNames));
};

const configs = {
  dev: {
    entry: {
      app: ['react-hot-loader/patch', './src/index.js']
    },
    output: {
      path: outputPath,
      filename: 'app-[hash].js'
    },

    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 3000,
      overlay: true
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: useRules('babelDev', 'eslint', 'scss')
    }
  },
  test: {
    entry: './src/index.spec.js',
    output: {
      path: outputPath,
      filename: 'spec.js'
    },

    devtool: 'source-map',

    module: {
      rules: useRules('babel', 'eslint', 'scssTest')
    }
  },
  production: {
    entry: './src/index.js',
    output: {
      path: outputPath,
      filename: 'app-[hash].js'
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    module: {
      rules: useRules('babel', 'eslint', 'scss')
    }
  }
};

const nodeEnv = process.env.NODE_ENV || 'production';

let config = configs[nodeEnv];
module.exports = config;

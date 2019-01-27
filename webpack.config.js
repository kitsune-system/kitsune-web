'use strict';

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
console.log(`Webpack ENV: ${env}`);

const config = {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],

  resolve: {
    alias: {
      env: path.resolve(__dirname, `src/env/${env}/`)
    }
  }
}

if(env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      overlay: true
    }
  });
}

if(env === 'test') {
  Object.assign(config, {
    mode: 'development',
    target: 'node',

    entry: './src/index.spec',
    output: {
      filename: 'spec.js'
    },

    devtool: 'source-map'
  });
}

module.exports = config;

'use strict';

var path = require('path');
var os = require('os');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({ });
var htmlWebpackPlugin = new HtmlWebpackPlugin({ title: 'Framework demo' });

module.exports = {
  context: path.join(__dirname, 'src'),

  entry: 'index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'framework.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['react', 'es2015'],
          cacheDirectory: true
        }
      }
    ]
  },

  resolve: {
    root: [
      path.join(__dirname, 'src')
    ],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    definePlugin,
    htmlWebpackPlugin
  ],

  cache: os.tmpdir()
};

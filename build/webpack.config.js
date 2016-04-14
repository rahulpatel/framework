'use strict';

var path = require('path');
var os = require('os');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEBUG__: (process.env.NODE_ENV === 'development'),

  process: {
    env: {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }
});

var config = {
  context: path.join(__dirname, '..', 'src'),

  output: {
    pathinfo: true,
    path: path.join(__dirname, '..', 'dist'),
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
          cacheDirectory: true,
          env: {
            development: {
              presets: ["react-hmre"]
            }
          }
        }
      }
    ]
  },

  resolve: {
    root: [
      path.join(__dirname, '..', 'src')
    ],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    definePlugin
  ],

  cache: os.tmpdir()
};

module.exports = config;

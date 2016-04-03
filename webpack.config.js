'use strict';

var path = require('path');
var os = require('os');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackPlugin = new HtmlWebpackPlugin({ title: 'Framework demo' });

var definePlugin = new webpack.DefinePlugin({
  __DEBUG__: (process.env.NODE_ENV === 'development'),

  process: {
    env: {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }
});

var config = {
  context: path.join(__dirname, 'src'),

  entry: path.join(__dirname, 'example', 'app.js'),

  output: {
    pathinfo: true,
    path: path.join(__dirname, 'dist'),
    filename: 'framework.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('react-hot-loader')
      },
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

switch (process.env.NODE_ENV) {
  case 'development':
    config.devtool = 'eval';

    break;
  case 'staging':

    break;
  case 'production':
    config.devtool = 'source-map';
    config.output.libraryTarget = 'commonjs2';

    var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        space_colon: false,
        comments: false
      }
    });
    var debugPlugin = new webpack.optimize.DedupePlugin();

    config.plugins.push(uglifyPlugin, debugPlugin);

    break;
}

module.exports = config;

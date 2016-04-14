'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  output: {
    space_colon: false,
    comments: false
  }
});
var dedupePlugin = new webpack.optimize.DedupePlugin();

config.devtool = 'source-map';

config.entry = path.join(__dirname, '..', 'src', 'index.js');

config.output.libraryTarget = 'commonjs2';

config.plugins.push(uglifyPlugin, dedupePlugin);

module.exports = config;

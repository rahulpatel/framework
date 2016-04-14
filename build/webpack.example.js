'use strict';

var path = require('path');
var config = require('./webpack.config');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackPlugin = new HtmlWebpackPlugin({ title: 'Framework demo' });

config.devtool = 'eval';

config.entry = path.join(__dirname, '..', 'example', 'app.js');

config.plugins.push(htmlWebpackPlugin);

module.exports = config;

/* 3rd party imports */
/* eslint-disable object-shorthand */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// creates our HTML serving the webpack bundles
const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Webpack custom configuration',
  template: './src/index.html',
});

/*
  Hot Module Replacement (HMR) exchanges, adds, or removes modules while an
  application is running, without a full reload. This can significantly
  speed up development in a few ways:

  Retain application state which is lost during a full reload. Save valuable
  development time by only updating what's changed.
  More info in: https://webpack.js.org/concepts/hot-module-replacement/
 */
const hotModulePlugin = new webpack.HotModuleReplacementPlugin({});

const cleanPlugin = new CleanWebpackPlugin();

const config = {
  entry: {
    app: './src/index.jsx',
    // print: './src/print.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  // enable devtool for better debugging experience
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        // process js files with babel loader to use modern javascript
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(csv|tsv)$/,
      //   use: ['csv-loader'],
      // },
      // {
      //   test: /\.xml$/,
      //   use: ['xml-loader'],
      // },
    ],
  },
  plugins: [htmlPlugin, hotModulePlugin, cleanPlugin],
};

module.exports = config;

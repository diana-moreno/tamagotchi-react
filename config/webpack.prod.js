/* 3rd party imports */
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

/* relative imports */
const common = require('./webpack.common.js');

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const uglifyPlugin = new UglifyJSPlugin({ sourceMap: true });

// CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  plugins: [
    uglifyPlugin,
    definePlugin,
    // sourcemap file name in css
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
    }),
  ],
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});

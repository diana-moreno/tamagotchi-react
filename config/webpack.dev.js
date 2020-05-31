/* 3rd party imports */
const merge = require('webpack-merge');
const path = require('path');

/* relative imports */
const common = require('./webpack.common.js');

// CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  plugins: [
    // sourcemap file name in css
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  // enable devtool for better debugging experience
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // A directory or URL to server HTML content from
    contentBase: path.resolve(__dirname, '../public'),
    // Fallback to /index.html for Single Page Applications
    historyApiFallback: true,
    // inline mode (set to false to disable including client scripts
    // like livereload)
    inline: true,
    // open default browser while launching
    open: true,
  },
  mode: 'development',
});

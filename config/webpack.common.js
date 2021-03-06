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

// CSS
// https://adamrackis.dev/css-modules/
// https://medium.com/better-programming/how-to-set-up-a-react-project-using-webpack-typescript-and-sass-74914421158a
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// PROGRESSIVE WEB APP
// Generate a service worker
// https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
const WorkboxPlugin = require('workbox-webpack-plugin');
// Create manifest
// https://codeburst.io/progressive-web-app-with-webpack-198b073f6c74
const WebpackPwaManifest = require('webpack-pwa-manifest');

const config = {
  entry: {
    app: './src/index.tsx',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  // enable devtool for better debugging experience
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
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
          loader: 'ts-loader',
          // with jsx:
          // loader: 'babel-loader',
          // options: {
          //   cacheDirectory: true,
          // },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]--[hash:base64:5]',
                  },
                },
              },
              'sass-loader',
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    hotModulePlugin,
    cleanPlugin,
    new WorkboxPlugin.GenerateSW(),
    new WebpackPwaManifest({
      name: 'Tamagotchi',
      short_name: 'Tamagotchi',
      description:
        "This is a custom version of a Tamagotchi, the handheld virtual pet of the 90's",
      background_color: '#1b242f',
      theme_color: '#151b22',
      'theme-color': '#01579b',
      start_url: '/',
      display: 'standalone',
      // cache_busting_mode: 'none',
      icons: [
        {
          src: path.resolve('src/favicon/icon.png'),
          sizes: [512, 384, 256, 192, 144, 96, 72, 48],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;

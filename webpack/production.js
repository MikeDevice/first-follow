const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, '..', 'index.html'),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({}),
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'build'),
  },
});

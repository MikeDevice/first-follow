const path = require('path');
const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {config, entry, sassLoader, templatePath} = require('./common');

const licenseFile = 'ThirdPartyNotices.txt';

module.exports = merge(config, {
  mode: 'production',
  entry,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', sassLoader],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: templatePath,
      filename: path.resolve(__dirname, '..', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new LicenseCheckerWebpackPlugin({outputFilename: licenseFile}),
    ...process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [],
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          // TODO: remove Date.now() when LicenseCheckerWebpackPlugin
          // will be able to use [contenthash]
          banner: `For license information please see ${licenseFile}?${Date.now()}`,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'build'),
  },
});

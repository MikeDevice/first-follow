const HtmlWebpackPlugin = require('html-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {merge} = require('webpack-merge');
const common = require('./common');

const licenseFile = 'ThirdPartyNotices.txt';

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "./src/variables.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
      new OptimizeCSSAssetsPlugin({}),
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

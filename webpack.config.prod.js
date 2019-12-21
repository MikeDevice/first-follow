const path = require('path');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const common = require('./webpack.config.common');

const licenseFile = 'ThirdPartyNotices.txt';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        extractComments: {
          // TODO: remove Date.now() when LicenseCheckerWebpackPlugin
          // will be able to use [contenthash]
          banner: `For license information please see ${licenseFile}?${Date.now()}`,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new LicenseCheckerWebpackPlugin({
      outputFilename: licenseFile,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '@import "variables";',
              sassOptions: {
                includePaths: [
                  path.join(__dirname, 'src/App'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
});

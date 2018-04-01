const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.common.js');
const saveLicense = require('uglify-save-license');

const extractTextPlugin = new ExtractTextPlugin('styles.[chunkhash].css');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "variables";',
                includePaths: [
                  path.join(__dirname, 'src/App'),
                ],
              },
            },
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: saveLicense },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    extractTextPlugin,
  ],
});

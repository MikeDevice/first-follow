const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

exports.entry = './src/index.jsx';

exports.output = {
  path: path.resolve(__dirname, '..', 'build'),
};

exports.sassLoader = {
  loader: 'sass-loader',
  options: {
    additionalData: '@import "./src/variables.scss";',
  },
};

exports.config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /(\.jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {cacheDirectory: true},
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, '..', 'index.html'),
    }),
  ],
};

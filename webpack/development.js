const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
});

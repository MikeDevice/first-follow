const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
});

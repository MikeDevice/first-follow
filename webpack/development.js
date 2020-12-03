const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {config, entry, sassLoader, templatePath} = require('./common');

module.exports = merge(config, {
  mode: 'development',
  entry: ['react-hot-loader/patch', entry],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', sassLoader],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: templatePath}),
  ],
});

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.jsx?)$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

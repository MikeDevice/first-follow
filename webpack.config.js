const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.dev.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      node_modules: path.resolve(__dirname, 'node_modules/'),
    },
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "styles/_variables";',
              includePaths: [
                path.join(__dirname, 'src/App'),
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

exports.entry = './src/index.jsx';
exports.templatePath = './src/index.html';

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
  ],
};

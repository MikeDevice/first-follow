const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
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
              sourceMap: true,
              prependData: '@import "variables";',
              sassOptions: {
                includePaths: [
                  path.join(__dirname, 'src/App'),
                ],
              }
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
});

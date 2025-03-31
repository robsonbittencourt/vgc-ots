const path = require('path');

module.exports = {
  entry: './src/scripts/content.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
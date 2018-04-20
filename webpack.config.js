const webpack = require('webpack');
const path = require('path');

const entries = {
  widgetCreate: './src/http/widget-create/index.ts',
  widgetGet: './src/http/widget-get/index.ts',
};

module.exports = {
  entry: entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(process.cwd(), '.webpack'),
    filename: 'lib/[name]/handler.js'
  },
  target: 'node',
  externals: [
    'aws-sdk'
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};

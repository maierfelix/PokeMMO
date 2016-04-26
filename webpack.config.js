var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/Game/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: path.join(__dirname, 'src'),
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0'],
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()/*,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true,
      compress: true
    })*/
  ],
  stats: {
    // Nice colored output
    colors: true
  }
};
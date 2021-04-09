module.exports = require('./webpack.base.config')({
  tsLoaders: [{ loader: 'babel-loader' }],
  mode: 'development',
  plugins: [],
});

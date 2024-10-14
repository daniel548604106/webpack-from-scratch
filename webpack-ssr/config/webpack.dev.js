const path = require('path');

module.exports = {
  entry: {
    main: ['./src/main.js'], // 這裡的相對路徑是看 webpack 在哪裡被執行的（就是 root)，可以使用 string or array
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    hot: true,
  },
  // new UglifyJSPlugin(),
  // new BrotliPlugin()
};

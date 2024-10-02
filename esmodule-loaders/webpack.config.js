const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['dynamic-import-webpack'],
        },
      },
      {
        // https://webpack.js.org/loaders/sass-loader/
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   // 把 sass-loader 放在首要處理 (第一步)
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      // },
    ],
  },
};

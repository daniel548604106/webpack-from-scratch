const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: isProduction
          ? [MiniCssExtractPlugin.loader, { loader: 'css-loader' }]
          : [
              { loader: 'style-loader' }, // Style loader 預設開啟 hmr
              { loader: 'css-loader' },
            ],
      },
      {
        test: /\.module\.css$/,
        use: isProduction
          ? [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: '[file]__[local]__[hash:6]',
                  },
                },
              },
            ]
          : [
              { loader: 'style-loader' }, // Style loader 預設開啟 hmr
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: '[file]__[local]__[hash:6]',
                  },
                },
              },
            ],
      },
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  devServer: {
    hot: !isProduction,
    compress: isProduction,
    port: 3000,
  },
};

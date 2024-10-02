const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Build 時就會產生 bundle analyzer

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    // filename: 'main.js',
    // filename: '[name].bundle.js',
    filename: '[name].[contenthash].js', // filename 設定 contenthash 可以方便後面使用 cache
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // 創建實例 (第二步) 配置 HTML 模板路徑與生成名稱
    new HtmlWebpackPlugin({
      inject: true, // 預設為 true
      hash: true,
      title: 'Webpack Example App',
      header: 'Webpack Example Title',
      metaDesc: 'Webpack Example Description',
      template: './public/index.html', // 每次 build 出來的 index.html 都是以這個當作基底
      filename: 'index.html',
      //   inject: 'body',
    }),
    new BundleAnalyzerPlugin(),
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    hot: !isProduction,
    compress: isProduction,
    port: 3000,
  },
};

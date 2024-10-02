// Optimization: https://www.youtube.com/watch?v=ydJK4ncfIqQ

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Minimize css
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Build 時就會產生 bundle analyzer
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  entry: {
    // 變成不同 group，原本只要 entry: './src/index.js'
    main: ['./src/index.js'],
  },
  output: {
    // filename: 'main.js',
    filename: '[name].[contenthash].js', // filename 設定 contenthash 可以方便後面使用 cache
    path: path.resolve(__dirname, 'dist'),
    // This ensures webpack will clean my dist folder before each build
    clean: true,
    assetModuleFilename: '[name].[ext]', // 保留檔案名稱 (laughing.svg)
  },
  devtool: 'source-map', // 產生 source-map
  plugins: [
    // Copy SW to dist
    new CopyWebpackPlugin({
      patterns: [{ from: 'sw.js', to: 'sw.js' }],
    }),
    // 新增 process.env
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version), // No `process.env`, just `VERSION`
    }),
    // 創建實例 (第二步) 配置 HTML 模板路徑與生成名稱
    new HtmlWebpackPlugin({
      template: './src/index.html', // 每次 build 出來的 index.html 都是以這個當作基底
      filename: 'index.html',
      inject: true, // 預設為 true
      hash: true,
      title: 'Webpack Example App',
      header: 'Webpack Example Title',
      metaDesc: 'Webpack Example Description',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  // Optimization
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial', // This means that only the initial chunks (those that are loaded at the start) will be considered for this cache group
          minChunks: 2, // This indicates that a module must be used in at least 2 different chunks before it is included in the vendor chunk. This helps to avoid duplicating code across different bundles
        },
      },
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // 'style-loader', // Style-loader 會把 css 放在 index.html 裡面變成 <style></style>
          // Best for Production: Use MiniCssExtractPlugin for better performance and caching.
          // Best for Development: Use style-loader for easier development with HMR.
          {
            loader: MiniCssExtractPlugin.loader, // 這時候 build 出來才有 dist/styles/main..css
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: true, // 啟用 CSS 模組功能
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpeg|gif|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不需要對 node_modules 做轉換，因為都是別人打包好的 code
        use: {
          loader: 'babel-loader', // 將 es6 以上轉換成瀏覽器看得懂的版本
          options: {
            presets: ['@babel/preset-env'],
            // plugins: ['dynamic-import-webpack'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};

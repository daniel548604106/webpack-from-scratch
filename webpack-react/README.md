webpack actually "transpiles" the code so that older browsers can also run it

- Install webpack & related

```
npm install webpack webpack-cli --save-dev
```

- 設定 devServer
  https://awdr74100.github.io/2020-03-26-webpack-webpackdevserver/

```
npm install --save-dev webpack-dev-server

```

```
 devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },

```

- 建立 /dist/index.html，同時引入 <script src="main.js">

- 執行 build
  實際上執行 npx webpack 就是使用 `./node_modules/.bin/webpack`，其實是一樣的，預設不用有 webpack.config.js 就會有一些基本的處理，想是 entry 他預設會找 src/ ， output 預設叫做 dist/

```
npx webpack
```

- 新增 webpack.config.js 客製化，同時要指定 config

```
npx webpack --config webpack.config.js
```

- 使用 loaders，因為 webpack 預設只知道 js , json，所以 css , scss, gif , svg 等等他都看不懂，這時就要使用 loader

```
npm install --save-dev style-loader css-loader
```

- 優化效能， minimize for production

https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

```

- Install React & React-DOM

```
npm i react react-dom
```

- Install Babel
  https://babeljs.io/docs/babel-preset-react
  https://babeljs.io/setup#installation

```
npm install --save-dev @babel/preset-react
npm install --save-dev babel-loader @babel/core

```

這時候就可以發現 react 有被 mount 在 index.html 上了! 成功，接著要加上 HMR

- Install React-router-dom

```
npm i react-router-dom
```

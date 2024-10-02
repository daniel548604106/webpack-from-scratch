webpack actually "transpiles" the code so that older browsers can also run it

- Install webpack & related

```
npm install webpack webpack-cli --save-dev
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

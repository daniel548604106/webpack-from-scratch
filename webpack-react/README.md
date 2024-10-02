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

嘗試使用 module.css 目前失敗
https://ithelp.ithome.com.tw/m/articles/10326458

- Dynamic import
  因為看到有寫 bundle size can impacty web performance ，所以想說來做 dynamic import，其實也很簡單， webpack 不用作其他事情，只需要動 react 加上 React.lazy ，同時因為他是 async 的，最外層要加上 Susepense 包住，不然會壞掉，打包出來就會分不同路徑有 42.main.js , 978.main.js 等等，原本的 main.js 變成 450kb 使用 webpack-bundle-analyzer 查看後發現真的都是 node_modules 內的 react-router-dom , react-dom ，這些大小蠻大的

嘗試想要解決 vendor bundle，加上以下這十會報錯，`Conflict: Multiple chunks emit assets to the same filename main.js (chunks 792 and 887)`，原因是 output 的 filename 都叫做 main.js，修改一下改成 [name].bundle.js，先看 build 出來會是什麼，會變成 887.bundle.js(原本的 node_modules 那一包) & main.bundle.js

https://blog.jakoblind.no/code-split-vendors-with-webpack-for-faster-load-speed/
https://medium.com/@AbbasPlusPlus/bundle-splitting-in-webpack-optimizing-for-performance-eb7f16803910
https://www.linkedin.com/pulse/webpack-vendor-caching-anshul-parmar/

通常分成 vendor bundle 就是因為 node_modules 內的檔案不會這麼常改變，很適合用來快取，因為有 contentHash 所以只要 node_modules 裡面沒有更動，他的 hash 應該就要是一樣的，放在 browser or cdn cache 就很適合

- During development, bundling vendor code separately can reduce the time it takes to re-bundle and deploy updates. Since vendor code rarely changes, the focus is on re-bundling the frequently changing application code.
- By moving third-party libraries to a separate bundle, the application bundle becomes smaller, resulting in faster downloads and shorter time-to-interactive (TTI). This is especially noticeable for large apps with many dependencies.
- Splitting allows the browser to download the vendor bundle and application bundle in parallel. This optimizes the use of network resources, reducing overall load time.

https://dev.to/pffigueiredo/splitting-and-caching-react-chunks-4c0c
https://medium.com/@chesterhow/code-splitting-and-browser-caching-with-webpack-2b2006841684

Next.js 預設已經做了這件事情
https://web.dev/articles/granular-chunking-nextjs?hl=zh-tw

```
optimization:{
 splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
}

```

```
 output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
```

Webpack 真的很聰明，打包成 vendors & main bundle 後，他在 html 內都會自己加上去

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.17.20"></script>
    <script
      defer="defer"
      src="vendors.85dc81109eb33e2cb29e.js?5ee7b22d3e38d4433c0e"
    ></script>
    <script
      defer="defer"
      src="main.1491be2e917e629cb0a7.js?5ee7b22d3e38d4433c0e"
    ></script>
  </head>
  <body>
    <div id="app" />
  </body>
</html>

```

有了 vendor bundle 就可以設定

1. Cache-control headers，讓瀏覽器進行快取

```
Cache-Control: public, max-age=31536000, immutable

```

- public: Indicates the response is cacheable by any cache.
- max-age=31536000: Instructs the browser to cache the file for one year (in seconds).
- immutable: Tells the browser that the file won't change during the cache duration, so no need to check for updates.

2. Service Workers

```
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('vendor-v1').then((cache) => {
      return cache.addAll(['/vendor.[contenthash].js']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


```

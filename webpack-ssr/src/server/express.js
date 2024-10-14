import express from 'express';
const server = express();
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev');
  const compiler = webpack(config); // returns the compiler

  require('webpack-mild-compile')(compiler);

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );
  const webpackHotMiddleware = require('webpack-hot-middleware')(
    compiler,
    config.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);

  console.log('Middleware enabled');
}

// const staticMiddleware = express.static('dist');
// server.use(staticMiddleware);

// 放在 server.get 上面，不然瀏覽器不知道裡面的靜態檔案等等
const expressStaticGzip = require('express-static-gzip');

server.use(
  expressStaticGzip('dist', {
    enableBrotli: true,
  })
);

server.get('*', (req, res) => {
  //   const html = ReactDOMServer.renderToString(<div>Hello</div>);
  //   res.send(html);

  res.send(`<html>
    <head>
        <link href="./main.css" rel="stylesheet"/>
    </head>
    <body>
    <div id="react-root">${'hello ssr'}</div>
    <script src="vendor-bundle.js"></script>
    <script src="main-bundle.js"></script>
    </body>
    </html>`);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
  );
});

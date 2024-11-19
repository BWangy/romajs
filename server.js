import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
/* const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config') */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const htmlFile = path.join(distDir, 'index.html')

const isDevelopment = process.env.NODE_ENV !== 'production'
const app = express()
const port = 3000

app.use('/fakeData', express.static('test/fakeData'))

async function startServer() {
  /* if (isDevelopment) { */
    const vite = await createViteServer({
      server: { middlewareMode: 'html' }
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      console.log("H")
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        )
        const { render } = await vite.ssrLoadModule('/src/entry-server.js');
        const appHtml = await render(url);
        const html = template.replace(`<!--ssr-outlet-->`, appHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  /* } else {
    app.use(express.static(distDir));
    app.get('*', (req, res) => {console.log("Here"); res.sendFile(path.join(distDir, 'index.html'))});
  } */

/* if (isDevelopment) {
  config.devtool = 'inline-source-map'
  config.entry.push('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
  app.get('*', (req, res) => {
    res.write(compiler.outputFileSystem.readFileSync(htmlFile))
    res.end()
  })
} else {
  app.use(express.static(distDir))
  app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')))
} */


  app.listen(port, function(error) {
    if (error) {
      console.error(error)
    } else {
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
  });
}

startServer();

const express = require('express');
const serveStatic = require('serve-static');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const os = require('node:os');
const QRCode = require('qrcode')

const PORT = 7007;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();
app.use(connectLiveReload());
app.use(serveStatic(__dirname));

var networkInterfaces = os.networkInterfaces();
const ipAddressList = Object.values(networkInterfaces)
  .flat()
  .filter(({ family, internal }) => family === "IPv4" && !internal)
  .map(({ address }) => address)

const ipAddress = ipAddressList[ipAddressList.length - 1];

let server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\x1b[36m%s\x1b[0m', `Server is running on http://localhost:${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', `Server is running on http://${ipAddress}:${PORT}`);
  QRCode.toString(`http://${ipAddress}:${PORT}`, { small:true,type: 'terminal' }, function (err, url) {
    console.log(url)
  })
});

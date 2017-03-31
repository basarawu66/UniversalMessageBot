const Koa = require('koa');
const koastatic = require('koa-static');
const path = require('path');
const router = require('./server/routes');
const logger = require('koa-logger');


const app = new Koa();
const port = process.env.PORT || '9090';
// const http = require('http');
let io
// let wechatConnector = new connector.WechatConnector({
//     appID: "wx06d325fdc8f777a0",
//     appSecret: "f2bc7b27184893a74d50e9b1e46bda08",
//     appToken: "12345678"
// });
// let bot = new builder.UniversalBot(wechatConnector);

console.log('here');

console.log(path.join(__dirname, "/dist"));
app.use(logger());

//app.get('/bot/wechat', c2k(wechatConnector.listen()));

app
  .use(router.routes())
  .use(router.allowedMethods());

// console.log('here1');
//app.use(koastatic(path.join(__dirname, "/dist")));
// app.use(koastatic(path.join(__dirname, "/test")));
app.use(koastatic(path.join(__dirname, "/dist")));

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
})

let server = app.listen(port, () => {
  console.log('started http://localhost:', port);
})

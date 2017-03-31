// app/routes/index.js
const fs = require('fs');
const path = require('path');
const koaRouter = require('koa-router');
const router = koaRouter();
console.log(__dirname);
fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] === 'js') && file !== 'index.js'
  )
  .forEach(file => {
    console.log(file);
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });
router.get('/api/A', (ctx, next) => {
  console.log('AAA');
  ctx.body = 'AA';
});
// 把根路由/放在最后，以免当其他路由后面带有/时匹配到根路由
// router.get('/', (ctx, next) => {
//     console.log("AAA");
//   ctx.body = 'home page';
// });

module.exports = router;

# UniversalMessageBot

可發訊息給  Wechat公眾號 

2017/03/31 由於web server使用的是 koa2,因botbuilder-wechat-connector 及其中使用到的wechat 、 wechat-api 是for express 用的,
所以koa2-connect做轉換,但會因為koa2 的 request object 與 express 還是有差異,所以須做一點修正,
將function handler 中加入一行ctx.req.query = ctx.query (此檔案在node_modules/koa2-connect/index.js中),
若不使用botbuilder-wechat-connector 可以直接安裝 co-wechat co-wechat-api 應可不需做任何修正!

function handler(ctx, connectMiddleware) {
    return new Promise(function (resolve, reject) {
        // let hasHandled = false;
        // (req, res)
        ctx.req.query = ctx.query; <===此處須改為這樣
        var args = [
            ctx.req,
            makeInjectedResponse(ctx, 
            // () => {
            //   // hasHandled = true;
            // },
            function () {
                resolve(false);
            })
        ];
        var assumeSync = true;
        // (req, res, next) or (err, req, res, next)
        if (connectMiddleware.length >= 3) {
            args.push(function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
            assumeSync = false;
        }
        // (err, req, res, next)
        if (connectMiddleware.length >= 4) {
            args.unshift(null);
        }
        connectMiddleware.apply(void 0, args);
        /**
         * If the middleware function does not declare receiving the `next` callback
         * assume that it's synchronous.
         */
        if (assumeSync /*&& !hasHandled*/) {
            resolve(true);
        }
    });
}



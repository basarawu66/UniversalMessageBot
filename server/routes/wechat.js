const builder = require('botbuilder');
const connector = require('botbuilder-wechat-connector');
const c2k = require('koa2-connect');
const koaRouter = require('koa-router');
const router = koaRouter();

let wechatConnector = new connector.WechatConnector({
    appID: '填入你的appID',
    appSecret: '填入你的secret',
    appToken: '填入你的token'
});
let bot = new builder.UniversalBot(wechatConnector);
router.get('/bot/wechat/CreateMenu', async function (ctx) {
    let menu = {
        "button": [
            {
                "type": "click",
                "name": "主頁",
                "key": "home"
            },
            {
                "name": "菜單",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "EIP",
                        "url": "https://asap.tci-bio.com"
                    },
                    {
                        "type": "scancode_push",
                        "name": "關於",
                        "key": "about"
                    }
                ]
            }
        ]
    };
    wechatConnector.wechatAPI.createMenu(menu, function (err, token) {
        if (err) {
            console.log(err);
        }
        console.log('follower=>', token);
    });
     ctx.body = 'OK';
});
router.get('/bot/wechat', c2k(wechatConnector.listen()));
router.post('/bot/wechat', c2k(wechatConnector.listen()));


bot.dialog('/', function (session) {
    console.log('Wechat message: ', session.message);
    session.send("Good");
});
wechatConnector.wechatAPI.getFollowers(function (err, token) {
    if (err) {
        console.log(err);
    }
    console.log('follower=>', token);
});
module.exports = router;

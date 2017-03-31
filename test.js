var express = require('express'),
    builder   = require('botbuilder'),
    connector = require('botbuilder-wechat-connector');
    
var wechatConnector = new connector.WechatConnector({
    appID: "wx06d325fdc8f777a0",
    appSecret: "f2bc7b27184893a74d50e9b1e46bda08",
    appToken: "12345678"
});

var bot = new builder.UniversalBot(wechatConnector);

bot.dialog('/', function (session) {
	console.log('Wechat message: ', session.message);
});

var app    = express();
app.use('/bot/wechat', wechatConnector.listen());
app.listen(9090);

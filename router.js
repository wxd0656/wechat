var express = require('express');

var wechat = require('./controller/wechatAll');

var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('hello world!');
});

router.all('/wechat', wechat.handler);

module.exports = router;
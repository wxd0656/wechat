var config = require('../config');
var crypto = require('crypto');

/**
 * sha1加密
 * @param  {[type]} str [源字符串]
 * @return {[type]}     [加密后16进制字符串]
 */
var sha1 = function(str) {
	var hash = crypto.createHash('sha1');
	hash.update(str);
	var result = hash.digest('hex');
	return result;
}

/**
 * 验证Token
 * @param  {[type]} signature [微信服务器发来的]
 * @param  {[type]} timestamp [微信服务器发来的]
 * @param  {[type]} nonce     [微信服务器发来的]
 * @return {[type]}           [验证是否通过]
 */
var verifyToken = function(signature, timestamp, nonce) {

	var arr = [timestamp, nonce, config.wechatConfig.token];
	arr.sort();
	var arrStr = arr.join('');
	var mySignature = sha1(arrStr);

	if (mySignature === signature) {
		return true;
	} else {
		return false;
	}
}

var handler = function(req, res, next) {
	if (req.method === 'GET') {
		// 验证toke
		if (verifyToken(req.query.signature, req.query.timestamp, req.query.nonce)) {
			res.writeHead(200);
			res.end(req.query.echostr);
		} else {
			res.writeHead(401);
	        res.end('Invalid signature');
		}
	} else if (req.method === 'POST') {
		// blablabla
	}
}

exports.handler = handler;
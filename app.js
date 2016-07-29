var express = require('express');
// var wechat = require('wechat');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./router');
var config = require('./config');
var log4js = require('./common/myLog4js');

var app = express();


// 请求日志
app.use(log4js.accessLogMid);

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/', routes);

// 404 处理
app.use(function(req, res, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});

// 500 处理
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	log4js.logger('normal').error(err);
	res.send(err.message);
});

app.set('port', process.env.PORT || config.port);

var server = http.createServer(app);

server.listen(config.port, function(){
  console.log(("wechat server listening on port " + app.get('port')));
});
server.on('error', function(err) {
	console.log(err);
})
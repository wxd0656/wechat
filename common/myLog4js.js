var log4js = require('log4js');
var path = require('path');

log4js.configure({
	appenders:[
		{type:'console'},
		{
			type:'dateFile', 
			filename:path.join(__dirname,'../log/'), 
			pattern: "yyyyMMdd.log", 
			alwaysIncludePattern: true, 
			category:'normal', 
			maxLogSize: 51200, 
			backups: 1000
		},
		{
			type:'dateFile', 
			filename:path.join(__dirname,'../log/'), 
			pattern: "yyyyMMdd_acce.log", 
			alwaysIncludePattern: true, 
			category:'accesslog', 
			maxLogSize: 51200, 
			backups: 1000
		}
	],
	replaceConsole: true
});



exports.logger = logger = function(name) {
	var logger = log4js.getLogger(name);
	logger.setLevel('INFO');
	return logger;
}

// 访问日志中间件
exports.accessLogMid = log4js.connectLogger(logger('accesslog'), {level:log4js.levels.INFO});
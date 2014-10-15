var express = require('express');
var app = express();
 
var lodash = require('lodash');


var config=require('./lib/config.json');


module.exports.setConfig=function(cfg) {
	
	
	lodash.merge(config, cfg);
	console.log('Override Configuration ',config)
}


module.exports.start=function() {


if (config.runApiServer) {
	
	var api=require("./lib/apiserver")(config.api || null);
	app.use(api);
	
}

if (config.runFileServer) {
	
	var fileserver=require("./lib/fileserver")(config.fileserver || null);
	app.use(fileserver);
	
}


app.use('/admiraljs', express.static(config.webappPath));


var server = app.listen(9999, function() {
    console.log('********************************************************');
    console.log('* AdmiralJS is now sailing on http://localhost:%d/admiraljs ', server.address().port);
    console.log('********************************************************');
});



}
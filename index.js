var express = require('express');
var app = express();
 
var lodash = require('lodash');


var config=require('./lib/config.json');




module.exports.setConfig=function(cfg) {
	
	
	lodash.merge(config, cfg);
	console.log('Override Configuration ',config)
}

module.exports.setExpress=function(newapp) {

	app=newapp;	
	
}

module.exports.init=function() {
	
	

	if (config.auth!=false && config.auth!=null ) {
		
		
		
	
		var authModule=require("./lib/security")(config.auth || null);
		app.use(authModule);
		
		
		
	
	}


if (config.api!=false && config.api!=null) {
	
	var api=require("./lib/apiserver")(config.api || null);
	app.use(api);
	
}

if (config.fileserver!=false && config.fileserver!=null) {
	
	var fileserver=require("./lib/fileserver")(config.fileserver || null);
	app.use(fileserver);
	
}

if (config.projectCustomPath!=null) {
	
	app.use('/admiraljs/custom', express.static(config.projectCustomPath));
	
}


if (config.webappPath=="") config.webappPath=__dirname+"/admiraljs";
app.use('/admiraljs', express.static(config.webappPath));




return app;

}


module.exports.serve=function() {
	var server = app.listen(config.port, function() {

		var url="http://localhost:%d/admiraljs";

	    console.log('********************************************************');
	    console.log('* AdmiralJS is now sailing on '+url, server.address().port);
	    console.log('********************************************************');
	});

	
}

module.exports.start=function() {
	this.init();
	this.serve();
}
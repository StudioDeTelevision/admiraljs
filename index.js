var express = require('express');
var app = express();
 
var lodash = require('lodash');


var config=require('./lib/config.json');




module.exports.setConfig=function(cfg) {
	
	
	lodash.merge(config, cfg);
	console.log('Override Configuration ',config)
}


module.exports.start=function() {
	
	

	if (config.auth!=false || config.auth!=null ) {
		
		
		
	
		var authModule=require("./lib/security")(config.auth || null);
		app.use(authModule);
		
		
		
	
	}


if (config.runApiServer==true) {
	
	var api=require("./lib/apiserver")(config.api || null);
	app.use(api);
	
}

if (config.runFileServer==true) {
	
	var fileserver=require("./lib/fileserver")(config.fileserver || null);
	app.use(fileserver);
	
}


if (config.webappPath=="") config.webappPath=__dirname+"/admiraljs";
app.use('/admiraljs', express.static(config.webappPath));



var server = app.listen(9999, function() {
    console.log('********************************************************');
    console.log('* AdmiralJS is now sailing on http://localhost:%d/admiraljs ', server.address().port);
    console.log('********************************************************');
});



}
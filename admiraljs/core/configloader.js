define(["jquery","backbone","lodash"], function ($,Backbone,lodash) {
	

	var Loader=Backbone.View.extend({initialize:function(options) {
		var that=this;
					var url=options.folder+"config.json";
		$.getJSON(url,function(config) {
			lodash.merge(AJS.config,config)
		//AJS.config=config;
			//
	// 	try {
	// 		AJS.config=JSON.parse(config)
	// 		console.log(AJS.config)
	// }
	// catch (e) {
	// 	alert('Error in json syntax in config file')
	// 	return;
	// }
		
		var idType=AJS.config.recordID;
		if (idType==null) alert('You must specify a recordID key to use for your models in config.json . ex: "recordID":"_id"')

		// SWITCH DEBUG MODE

		if (AJS.config.debug) {
			debug(AJS.config.debug);
		}
		else debug(false);

		// APPLY THEME
		var themeFolder="metroid";

		if (AJS.config.theme) {
			themeFolder=AJS.config.theme;
		}
		//,"css!./themes/default/style"

		var cssUrl = require.toUrl("./themes/"+themeFolder+"/style.css");

		$(document).ready(function(){

  
		           if (document.createStyleSheet){
		               document.createStyleSheet(cssUrl);
		           }
		           else {
		               $("head").append($("<link rel='stylesheet' href='"+cssUrl+"' type='text/css' media='screen' />"));
		           }
       
		   });
	
	that.trigger("success");
	
});

}
});

return Loader;

	
});
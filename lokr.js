var admiral=require('./index.js');

admiral.setConfig({
	"webappPath":"./admiraljs",
	"projectName":"lokremise",
	auth:true,
	api: false,
	fileserver: false
}
)


admiral.start();




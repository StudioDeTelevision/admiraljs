AdmiralJS 1.0
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

based on NODE.JS, written in Javascript.

## INSTALLATION



sudo npm install https://github.com/StudioDeTelevision/admiraljs/tarball/beta

create an app.js file with minimum:

var admiral=require('admiraljs');

admiral.setConfig({
	database:{"basename":"projects",
	host:"176.31.250.73"},
	port:7010,
	hello:7010,
fileserver:{port:7020},

}
)

// some schema (see the doc)
admiral.setSchema([
	{  "schemaName":"user",
		"model":"user",
		"label":"Utilisateurs",
		"create":"user/create",
		"update":"user/update",
		"find":"user/find",
		"destroy":"user/destroy",
		"listFields":["email"],
		"fields":[{"name":"email","type":"string","editor":"string","label":"Email"}]
	},{  "schemaName":"projects",
		"model":"projects",
		"label":"projects",
		"create":"projects/create",
		"update":"projects/update",
		"find":"projects/find",
		"destroy":"projects/destroy",
		"listFields":["name"],
		"fields":[{"name":"name","type":"string","editor":"string","label":"Name"}]
	}

	]
)

admiral.start();

That's it !

  
AdmiralJS is entirely written in javascript, with dependencies on bootstrap, jquery, backbone, underscore,
on a module logic with REQUIREJS  

AdmiralJS might be **PLUGGABLE** on any RESTFUL API  
ex: with codeigniter, symphony, expressjs, railsjs or whatever and as soon as you can provide http crud controllers http://myserver/todo/create http://myserver/todo/update http://myserver/todo/find http://myserver/todo/destroy  
  
easily **CONFIGURABLE**:  
  
**EXTENSIBLE** - define your own field editors  
  
Actually developped for a project based on SAILS.JS  
sails installation must have Access-Control-Allow-Origin   
setting allRoutes: true, in config/cors.js  



## DOCUMENTATION
check the wiki
https://github.com/StudioDeTelevision/admiraljs/wiki

contact: studiodetelevision@gmail.com  

any suggestions or contributions are welcome !!!!!   

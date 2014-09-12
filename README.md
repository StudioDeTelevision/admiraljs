AdmiralJS
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

based on NODE.JS, written in Javascript.

## INSTALLATION


npm install admiraljs

or

sudo npm install https://github.com/StudioDeTelevision/admiraljs/tarball/beta

create an app.js file with minimum:

var admiral=require('admiraljs');

admiral.setConfig({
	database:{"basename":" ** database name ** ",
		host:" ** your database host ** "},
			port:** your database host port **,
			fileserver:{port:7020},

}
)

// define some schema (see the docs)

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
		])

admiral.start();

That's it !

easily **CONFIGURABLE**:  
  
**EXTENSIBLE** - define your own field editors  

As AdmiralJS is a webapp, it might also be easily ported for any RESTFUL API.


## DOCUMENTATION
check the wiki
https://github.com/StudioDeTelevision/admiraljs/wiki

contact: studiodetelevision@gmail.com  

any suggestions or contributions are welcome !!!!!   

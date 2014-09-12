AdmiralJS
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

a web app for admin generation + a node server for api + file upload.

## INSTALLATION


npm install admiraljs

or

sudo npm install https://github.com/StudioDeTelevision/admiraljs/tarball/beta

create an app.js file with minimum:

var admiral=require('admiraljs');

admiral.setConfig({
	port:** the port you want admiraljs to run on **,
	database:{"basename":" ** database name ** ",
		      host:" ** your database host ** "},
	fileserver:{port: ** ex: 7020 ** },

}
)

// define some schema (see the docs)

admiral.setSchema([

	{  "schemaName":"user",
	    "model":"user",
		"label":"Utilisateurs",
		"listFields":["email"],
		"fields":[{"name":"email","editor":"string","label":"Email"}]
	},{  "schemaName":"projects",
		"model":"projects",
		"label":"projects",
		"listFields":["name"],
		"fields":[{"name":"name","editor":"string","label":"Name"}]
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

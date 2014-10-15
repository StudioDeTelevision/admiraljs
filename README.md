AdmiralJS
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

github page: https://github.com/StudioDeTelevision/admiraljs  

a web app for admin generation + a node server for api + file upload.
  
Customisable admin interface  
instant admin generation from a schema.json  
Written in javascript with requirejs / jquery / backbone  
Pluggable on any CRUD or RESTFUL API  
  
## USE WITH BUNDLED SERVER

npm install admiraljs  
admiral.setConfig({  
	"webappPath":"./admiraljs",  
	"defaultProject":"example",  
	"runApiServer":true,  
	"runFileServer":true  
	,  
	api: {"database":{host:"your host",  
		name:"test"}  
	},  
	fileserver: {  
		uploadDir:__dirname+"/public"  
	}  
}  
)  
  
admiral.start();

## USE AS A STANDALONE WEBAPP

Maybe used as a stand alone web app
(download latest and use admiraljs folder)
and configure for your own restful api server

## Complete documentation

Have a look at the wiki

https://github.com/StudioDeTelevision/admiraljs/wiki

contact: studiodetelevision@gmail.com  

any suggestions or contributions are welcome !!!!! 

	

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
  
## Use with bundled express/node server

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

## Use as a standalone webapp

AdmiralJS was developped as a clientside webapp.  
  
It also may be used standalone - independently from the express server  
- download latest and pick the app in the admiraljs folder
- configure for your own restful api server (see webapp configuration)


## Admiral Webapp Configuration

Configuration files must be set in the "Custom" folder  
which will be reserved to all your project settings and hooks
maintaining the core of the app as cleaner as possible :-)

- Let's choose a configuration name, "myproject"

- Create a folder named "myproject" in "custom"

- Create a subfolder named "config" in "myproject"

- Create 2 configurations files schema.json and config.json
( See the related sections for creating those or make a copy of the example project )

- 2 ways to activate your configuration: 
1. in main.js, replace AJS.path.customFolder="example";
by AJS.path.customFolder="myproject";
2. start the project with a config param: http://localhost:9999/admiraljs?config=myproject


## Complete documentation

Have a look at the wiki

https://github.com/StudioDeTelevision/admiraljs/wiki

contact: studiodetelevision@gmail.com  

any suggestions or contributions are welcome !!!!! 

## Contact

	

AdmiralJS 2.x
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

github page: https://github.com/StudioDeTelevision/admiraljs  

a web app for admin generation + a node server for api + file upload.

## About

The goal of this project is to allow a quick generation of and admin interface, letting you spend more interesting time on the design of the front end, and use your favorite framework for this other part.
  
Customisable admin interface  
instant admin generation from a schema.json  
Written in javascript with requirejs / jquery / backbone  
Pluggable on any CRUD or RESTFUL API  
  
## Use with bundled express/node server

Admiral can be easily plugged into a SAILSJS project, but in order to stay more flexible, it also comes as a nodejs module, offering a restful api server which can be used to manipulate your mongo database for your project.

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


### Server Configuration

** webappPath **

** defaultProject **

** runApiServer **

** runFileServer **

** api **

** fileserver **

## Use as a standalone webapp

AdmiralJS was developped as a clientside webapp.  
  
It also may be used standalone - independently from the express server  
- download latest and pick the app in the admiraljs folder
- configure for your own restful api server (see webapp configuration)


### Admiral Webapp Configuration

Configuration files must be set in the "Custom" folder  
which will be reserved to all your project settings and hooks
maintaining the core of the app as cleaner as possible :-)

- Let's choose a configuration name, "myproject"

- Create a folder named "myproject" in "custom"

- Create a subfolder named "config" in "myproject"

- Create 2 configurations files schema.json and config.json
( See the related sections for creating those or make a copy of the example project )

- 2 ways to activate your configuration: 
in main.js, replace AJS.path.customFolder="example"; by AJS.path.customFolder="myproject"; OR start admiraljs with a config param: http://localhost:9999/admiraljs?config=myproject


## Contributions



## Contact

Frédéric: studiodetelevision@gmail.com  
	

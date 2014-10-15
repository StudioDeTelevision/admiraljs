AdmiralJS 2.x
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

github page: https://github.com/StudioDeTelevision/admiraljs  

a web app for admin generation + a node server for api + file upload.

## About

The goal of this project is to allow a quick generation of an admin interface, letting you spend more interesting time on the design of the front end with your favorite framework.
  
- Customisable field editors for your models 
- Instant admin generation from a schema.json  
- Pluggable on any CRUD or RESTFUL API  (optimized for SailsJS)
- Written in javascript with requirejs / jquery / backbone  
- Usable with the bundled server or as a standalone webapp
  
## Use with bundled express/node server

Admiral can be easily plugged into a SAILSJS project, but in order to stay more flexible, it also comes as a nodejs module, offering a restful api server which can be used to manipulate your mongo database for your project.

npm install admiraljs  
  
  
var admiral=require('admiraljs');  
  
  
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

## Hook

The Custom folder is the place to add your own extensions data structure should be custom -> myproject -> editors custom -> myproject -> sidebar etc... to keep a clean code  
  
the myproject folder must contain a myproject.js file see custom/example/example.js  
  
this file will trigger all hooks  
  
will load custom editors definition in custom/myproject/editors/editors.js ex:   define(["./import/import","./datetimearray/datetimearray","./pictosrestaurant/pictosrestaurant","./pictoszugast/pictoszugast",'./gifupload/gifupload','./arrowselect/arrowselect','./imagekino/imagekino','./imagetheater/imagetheater','./logos/logos','./textareacounter/textareacounter'],function(Import,Datetimearray,Pictorestaurant,Pictozugast,GifUpload,ArrowSelect,ImageK,ImageT,Logos,TextAC) {
  
var MyClass=function() {  
  
AJS.fieldClasses["import"]=Import;  
AJS.fieldClasses["datetimearray"]=Datetimearray;  
AJS.fieldClasses["pictosrestaurant"]=Pictorestaurant;  
AJS.fieldClasses["pictoszugast"]=Pictozugast;  
AJS.fieldClasses["gifupload"]=GifUpload;  
AJS.fieldClasses["arrowselect"]=ArrowSelect;  
AJS.fieldClasses["imagekino"]=ImageK;  
AJS.fieldClasses["imagetheater"]=ImageT;  
AJS.fieldClasses["logos"]=Logos;  
AJS.fieldClasses["textareacounter"]=TextAC;  
}  
  
return MyClass;  
  
});  


## Field Editors

AdmiralJS provide some basic field editors but you can write and add your own by extending the core/editor module

### Basic Editors

Located in the editors folder, those editors are used to defined the fields'edition strategies in schemas.json

####collection

####collectionembed

####date

####datetime

####file

####image

####imagecropresize

####imagedropdown

####imagescollection

####select

####string

####stringmultilangotf

####textarea

####textareamultilangotf

####textareasimple

####yesno

## Contributions

Please contribute and share !

## Contact

Frédéric: studiodetelevision@gmail.com  
	

AdmiralJS 2.x
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

github page: https://github.com/StudioDeTelevision/admiraljs  

a web app for admin generation + a node server for api + file upload.

# About

AdmiralJS allows quick generation of an admin interface, letting you spend more interesting time on the design of the front end with your favorite framework.
  
- Customisable field editors for your models 
- Instant admin generation from a schema.json  
- That means you can change your models'structure on the fly ! (great for development)
- Pluggable on any CRUD or RESTFUL API  (optimized for SailsJS)
- Written in javascript with requirejs / jquery / backbone  
- Usable with the bundled server or as a standalone webapp
  
AdmiralJS was developped as a client-side webapp, to make it as much as possible independant from frameworks and platforms.  
  
It can be used with its own api server developped with expressjs under node
It can easily be used with SAILSJS under node (see SailsJS Configuration)
It can also just be used as a standalone webapp, and you might provide your own api server, under node, or under apache with php or whatever.

# Use it with its bundled express/node server

It maybe the simplest way to start. AdmiralJS comes as a nodejs module, offering a restful api server which can be used to manipulate your mongo database for your project.  
  
  
## Installation

** Requirements: **  
** NodeJS   **  
** A mongo database to connect to   **  
   
npm install admiraljs   
  
  
var admiral=require('admiraljs');  
  
  
admiral.setConfig({   
  	"projectName":"example",  
  	api: {"database":{host:"your-host-address",  
    		name:"your-database-name"}  
  	},  
  	fileserver: {  
    		uploadDir:__dirname+"/public"  
  	}  
}  
)  
  
admiral.start();  
  
** Next Step ** configure the web application


## Server Configuration Options

- ** webappPath ** you might want to change your webapp path...  

- ** projectName ** must correspond to your configuration folder name inside the webapp // needed for security and overrides  

- ** api ** You must specify your database connection settings / if not set won't run the api, maybe you'll prefer to use yours ?  
> api:{database:{host:"",name:"",username:"",password:"",port:27017}}
- ** fileserver **  if not set won't run the fileserver, maybe you'll want to use yours ?  

- ** auth: ** false/true/{username:"AdminName",password:"whatever"}
> true will use default login: {username:"admin",password:"admiraljs"}
> if you use auth, you must set auth:{mode:"ajax"} in the webapp config.json (see further)

# Use it with SAILSJS

Why SailsJS ? Because it's a great nodejs framework, which let's you build restful apis on the fly and a lot of other great features.

## Sails server configuration

You'll have to generate some api under sails, to enable cors. For auth and fileupload, documentation is coming ... 

# Use it with any other server

The webapp itself is located in the admiraljs subfolder, it can be easily extracted and started on any server that can serve an index.html file :)  
See the configuration options below, to be able to plug it on any restful api.

# Admiral Webapp Configuration

Configuration files must be set in the "Custom" folder  
which will be reserved to all your project settings and hooks
maintaining the core of the app as cleaner as possible :-)

- Let's choose a configuration name, "myproject"

- Create a folder named "myproject" in "custom"

- Create a subfolder named "config" in "myproject"

- Create 2 configurations files schema.json and config.json
( See the related sections for creating those or make a copy of the example project )

- 2 ways to activate your configuration: 
in main.js, replace AJS.path.customFolder="example"; by AJS.path.customFolder="myproject";  
OR start admiraljs with a config param: http://localhost:9999/admiraljs?config=myproject



## Config.json
>admiraljs/custom/myproject/config/config.json

  
It's just a JSON object that MUST BE SET, minimum with a "title" parameter

- **title:** project title displayed in the top bar

- **debug(optionnal):** true/false

- **recordID(optionnal):** depending on your database can be "_id" or "id" or ... 

- **api(optionnal):** default configuration targets the bundled api on "http://localhost:9999/" , you might target yours

- **"fileUploadUrl(optionnal)":** url for file upload, defaults to "http://localhost:9999/upload" 

- **"fileDir(optionnal)":**  url for file reading, defaults to "http://localhost:9999/files/",

- **"thumbDir(optionnal)":**  url for file thumbnails reading, defaults to "http://localhost:9999/files/thumbnail/",

- **"login(optionnal)":** {"mode":"ajax"} or {"mode":"fake"} , defaults to "fake" (fake mode will provide a fake login, with "admin/admin" credentials)

## Schemas.json
>admiraljs/custom/myproject/config/schemas.json

It's just a Array of schema definition objects [{...},{....}] that MUST BE SET IN ORDER TO EDIT SOMETHING FROM THE DATABASE :)
  
### Schema Object Structure:
> **Example of a minimal "post" schema structure:  **
>    
>{"schemaName":"posts",  
>	 "model":"posts",  
>	"label":"My posts",  
>	"listFields":["title","published"],  
>	"fields":[{"name":"title","editor":"stringmultilangotf","label":"Title"},  
>	{"name":"content","editor":"textareamultilangotf","label":"Content"},  
>{"name":"published","editor":"yesno","label":"Published"}]  
>}



# Hooks and Customisation

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

# Themes


# Field Editors

AdmiralJS provide some basic field editors but you can write and add your own by extending the core/editor module

## Basic Editors

Located in the editors folder, those editors are used to defined the fields'edition strategies in schemas.json

###collection

###collectionembed

###date

###datetime

###file

###image

###imagecropresize

###imagedropdown

###imagescollection

###select

###string

###stringmultilangotf

###textarea

###textareamultilangotf

###textareasimple

###yesno

# Edition View Templates

For certains project you might want to design some specific edition views for your admin users. In such a case admiraljs offers a little templating system.  
  
Declare your template name for your model Schema, in the schemas.json  
  
in Your custom Folder, from the index.js file, add html templates to AJS.templates['YOURTEMPLATENAME]=templateHTML;  
  
the templateHTML is a text object (loaded via the requirejs text plugin for example) and that must contain place holders for your field. Place Holders must provide an "for" attribute with the name of your editable field. ex: <div for="title" ></div>   
  
Better Documentation upcoming ...  
  
# Security
  
AdmiralJS provides 2 approches  

1 For developement purpose, you can use a fake auth method. Set the server with auth:false and the webapp with auth:{mode:"fake"} 

2 For production, you might use our minimalist security implementation based on PassportJS. Set auth:{username:"AdminName",password:"whatever"} on server side and auth:{mode:"ajax"} on client side


# Issues, Contributions and Proposals

Please, post questions, proposals, bugs in the Issues on github.  
https://github.com/StudioDeTelevision/admiraljs  
  
Please contribute and share your own field editor, themes etc...  
  
# Contact & Support

Frédéric Jean: studiodetelevision@gmail.com  
http://www.studiodetelevision.com
	

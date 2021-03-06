AdmiralJS 2.x Beta
===========
**Lightweight plug and play admin interface**  
http://www.admiraljs.com

github page: https://github.com/StudioDeTelevision/admiraljs  

a web app for admin generation + a node server for api + file upload.
  
IRC: 
server:  irc.freenode.net  
channel: #admiraljs  

#ADMIRALJS is still in development. Any help is precious, please give feedback/bugs/requests at studiodetelevision@gmail.com

#NEW: EMBEDDED SCHEMA (see below)

# Demo
<iframe width="420" height="315" src="//www.youtube.com/embed/HWKXCGQDAC0" frameborder="0" allowfullscreen></iframe>
http://www.youtube.com/watch?v=HWKXCGQDAC0

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
   
sudo npm install admiraljs   
  
  
var admiral=require('admiraljs');  
  
  
admiral.setConfig(  
  	{"projectName":"example",  
  	api: {"database":{host:"your-mongodb-host-address",  
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

- ** projectCustomPath ** /local/path/to/custom defines your own client config file path  
> will avoid you to make changes in the /nodes_modules/admiraljs/custom folder

# Use it with SAILSJS

In order to correctly bind admiraljs model's relations with sails's (waterline), you need to use sail's restful api. Here's how to configure your sails project.

## Sails server configuration

- Add some blueprints override for pagination.  
http://www.admiraljs.com/blueprints.zip  
place it in your api folder api/blueprints  

- in config/cors.js set allRoutes: true and headers: 'content-type,Content-Disposition'

For auth and fileupload, documentation is coming ... 

- to override sails bodyparser, create config/express.js with:
>var express = require('sails/node_modules/express');
>
>module.exports.express = {
>   bodyParser: function() {
>    return function (req, res, next){
>      
>        if (!(req.path === '/upload' && req.method === 'POST')) {
>        return express.bodyParser()(req, res, next);
>      } else {
>        return next();
>      }
>    }
>   }
>}

## Start AdmiralJS

var admiral=require('admiraljs');  
admiral.start();  

## Configure AdmiralJS

in your custom/myproject/config/config.json :
{  
"title":"LOKREMISE",  
"recordID":"id",  
"api":"http://yoursailsserver:sailsport/",  
"fileUploadUrl":"http://yoursailsserver:sailsport/upload/",  
"fileDir":"http://yoursailsserver:sailsport/files/",  
"thumbDir":"http://yoursailsserver:sailsport/files/thumbnail/", 
"orm":"waterline",  
"login":{"mode":"fake"}  
}  

# Use it with any other server

The webapp itself is located in the admiraljs subfolder, it can be easily extracted and started on any server that can serve an index.html file :)  
See the configuration options below, to be able to plug it on any restful api.

If you want to develop your own api script, don't hesitate to contact me for mode details

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
  
  
### Live schema edition

You can edit your schemas.json file at runtime, using the params button in the bottom left corner.
Changes will be applied to the current admiraljs instance running, but won't change the original schemas.json file - this has to be done manually.  
  
  
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

- **schemaName** , a name for your schema to make it unique in the running instance

- **model** , the data model name to target 

- **label** , the name displayed in the sidebar

- **listFields** , a array containing the names of the fields you want to be displayed in the list view.

- **fields** , an array containing the description of your fields and their edition mode.

- **extends** , name of the schema to extend (its "schemaName") , will extends an existing schema configuration

- **findFilter** , default filter in the list view , can be a function if needed
>	"findFilter":function() { return {"sort":{ createdAt: 'asc'},"where":{"name":"kino","date_end":{'<': moment().format('YYYY-MM-DD HH:mm')}}} }
},

- **type** , for special schema types: multischema (see below) , abstract (see multischema paragraph) , normal (default)


- **You can also specify custom crud routes with: ** 
- **find** , url
- **create** , url
- **update** , url
- **destroy** , url
  
#### Multischema Document Structure  
  
Using the flexibility of mongo's document structure, you might want to use one data collection containing documents with different schema structure.  
This is the purpose of the Multischema Object Structure.    

##### Two different approach: SCHEMA DEFINED
  
- define some schemas and type them with "abstract". > ex:  {"schemaName":"pageabout",  
>"type":"abstract",    
>"fields" : [ {"name":"title","editor":"stringmultilangotf","label":"Titre"},    
>{"name":"content","editor":"textareamultilangotf","label":"Contenu"},    
>{"name" : "video","editor" : "string","label" : "Video Vimeo ID"}]}  
			
- define a schema with a "multischema" type and a "_schemaSchema" string field. > ex: {"schemaName":"mymultischema",  
>"type":"multischema",    
>"fields" : [ {"name":"_schemaSchema","editor":"string","label":"SchemaModel"}]}  
  
as soon as you will have give a valid abstract schema name in a "mymultischema" document,  
refresh the edit page and you'll be able to use your abstract schema for that document.  

##### Two different approach: EMBEDDED SCHEMA

- just add the option: "editor":true to a schema definition,
and a new field will appear in the edition page : SCHEMA - with its [edit] button.
This will give you the ability to add any kind of fields in the current document.


# Hooks and Customisation

The Custom folder is the place to add your own extensions data structure should be custom -> myproject -> editors custom -> myproject -> sidebar etc... to keep a clean code  
  
At startup the admiral will try to load a index.js file located in:  
custom/myproject/index.js  
  
this file will load and trigger all hooks  

it's a simple requirejs module  
define([],function() { 
	var Custom;   
	// init your hooks  
	return Custom; } )  
  
If you need to add custom editors, you could do:  
define(["./editors/editors"],function() { 
	var Custom;    
	 	new Editors();  
	return Custom;  } )  
	
Then define your editors in a custom/myproject/editors/ folder  
  
Ex:  custom/myproject/editors/editors.js  
    define(["./import/import","./datetimearray/datetimearray",'./textareacounter/textareacounter'],function(Import,Datetimearray,TextAC) {
  
var MyClass=function() {  
	
	/// HERE THE EDITORS.JS WILL DECLARE THE CUSTOM EDITORS FOR USE IN YOURS PROJECT
	/// THOSE MUST INHERIT FROM core/editor as a Backbone View: var View=EditorClass.extend({...
  
AJS.fieldClasses["import"]=Import;  
AJS.fieldClasses["datetimearray"]=Datetimearray;
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
{"name":"myfieldnameindatabase",editor:"collection",relatedModel:"mySchemaModelName",label:"MyCollection"]}

###collectionembed  
{"name" : "myfieldnameindatabase",  
	"type" : "collectionembed",  
	"schema" : {"listFields" : ["title"],  
	"fields" : [ {"name":"myfieldnameindatabase",editor:"string",label:"MyString"]},  
	{"name":"myfieldnameindatabase",editor:"string",label:"MyString"]}]},  
	"editor" : "collectionembed",  
	"label" : "MyCollection"  
	}
###date

###datetime

###file

###image

{"name":"src","editor":"image","label":"Image",
"formats":	{"normal": {"width": 400,"height": 300},"thumbnail": {"width": 84,"height": 84}}}  
  
will upload the original image in the root folder, and create 2 versions for the 2 differents formats provided here. they will be located in subfolders corresponding to the format name. (normal and thumbnail)  
  
###imagecropresize

{"name" : "myfieldnameindatabase",  
"editor" : "imagecropresize",  
"label" : "Image",  
size:{"width" : 400,"height" : 300}  // the final size
}

###imagedropdown

###imagescollection

###select
{"name":"myfieldnameindatabase",editor:"select",label:"myfieldname",options:["bananas","potatoes","parrots"]}

###selectincollection

###string
{"name":"myfieldnameindatabase",editor:"string",label:"MyString"]}

###stringmultilangotf

###textarea

###textareamultilangotf

###textareasimple

###yesno
{"name":"myfieldnameindatabase",editor:"yesno",label:"ActiveStuff"]}

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
https://github.com/StudioDeTelevision/admiraljs/issues   
  
Please contribute and share your own field editor, themes etc...  
  
# Contact & Support

Frédéric Jean: studiodetelevision@gmail.com  
http://www.studiodetelevision.com
  
Or send me a postcard here:   
http://postcardify.com/composer?to=studiodetelevision@gmail.com&name=Frédéric  
  
IRC: 
server:  irc.freenode.net  
channel: #admiraljs  	

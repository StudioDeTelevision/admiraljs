AdmiralJS
===========
**Lightweight, cross framework, plug and play admin interface**  
  
Entirely written in javascript, with dependencies on bootstrap, jquery, backbone, underscore,
on a module logic with REQUIREJS  
  
**PLUGGABLE** on any RESTFUL API  
ex: with codeigniter, symphony, expressjs, railsjs or whatever and as soon as you can provide http crud controllers http://myserver/todo/create http://myserver/todo/update http://myserver/todo/find http://myserver/todo/destroy  
  
easily **CONFIGURABLE**:  
config.json - define your project settings  
schemas.json - define your models  
  
**EXTENSIBLE** - define your own field editors  
  
Actually developped for a project based on SAILS.JS  
sails installation must have Access-Control-Allow-Origin   
setting allRoutes: true, in config/cors.js  

## SETUP

You must provide settings and data structure in 
config/config.json
config/schemas.json

see 
config/config.sample.json
config/schemas.sample.json

## STARTUP
put admiraljs folder in a http server
and open http://yourserverorlocalhost/admiraljs/index.html

edit baseUrl if needed in admiraljs/main.js
var configObj={
    baseUrl: 'admiraljs/',

connect with admin / admin

## CONFIG.JSON
A configuration object that will be loaded at startup.  
Attributes are:  
**title** the name of your project, will be displayed on top of the page  
**api** base url of your restful api (must end with /)   
**debug** debugging mode (true/false)
**fileUploadUrl** the url for file upload  
**fileDir** full url for reading files  
**customClass** relative path to your custom class ex: "./custom/example/example"
**dateTimeFormat** define your time format for fields like date or datetime (ex: "YYYY-MM-DD HH:mm:ss" )  
**tinymce** define tinymce toolbar for textarea

## SCHEMAS.JSON
An array of schema configuration 
Attributes are:  
**schemaName** a unique configuration name  
**model** your model name   
**label** the label displayed in left menu bar  
then define the right url for:  
**create** ex: "events/create" (will use the base url defined in config.json)  
**update**  
**find**  
**destroy**  
you may specify a find filter ex:  
"findFilter":{"where":{"space_id":"Pm4jPHmoakKcRAEo4"}},  
in case your schema  
TIP:  
you may use many schemas based on the same model  
you'll have to give them different schemaName  
and you may also provide different findFilter  
(this can be useful on nosql database, if you want to use a single collection for documents with differents schemas)  
**listFields** the fields displayed in a list view  
**fields** define your fields (see config/example/schemas.json for more explanations)  
  

## EDITORS 
they mostly inherit from core/editor  
a static method View.display is used to customize appearance in view list mode  

## CUSTOM CLASS, CUSTOM EDITORS
defined in config.json
points to a class in the 'custom' folder
permits to define your own field editors (custom string editors, custom images galleries etc )


## BEST PRACTICE, CONTRIBUTION AND SHARING...
Changes on ADMIRALJS should only occurs in CONFIG AND CUSTOM Folder.
You might of course also make propositions and fork on the core of the system.
Don't forget to share your own field editors if you think they might help others 

## START UP
launch index.html on a web server (can be node in a static public folder or apache or ...)  
login with admin / admin

## DOCUMENTATION
soon available ...  
you may ask me questions on studiodetelevision@gmail.com  
any help is welcome !!!!!   

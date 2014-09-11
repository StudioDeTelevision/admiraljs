AdmiralJS 1.0
===========
**Lightweight, cross framework, plug and play admin interface**  
http://www.admiraljs.com

based on NODE.JS, written in Javascript.

Installation 

sudo npm install https://github.com/StudioDeTelevision/admiraljs/tarball/beta

Then in app.js

var admiral=require('admiraljs');

admiral.mongoUrl( ** your mongodb url ** )

admiral.mongoPort(27017)

admiral.mongoBase( ** name of your database ** )

admiral.start();

That's it !
  
AdmiralJS is entirely written in javascript, with dependencies on bootstrap, jquery, backbone, underscore,
on a module logic with REQUIREJS  

AdmiralJS is 
**PLUGGABLE** on any RESTFUL API  
ex: with codeigniter, symphony, expressjs, railsjs or whatever and as soon as you can provide http crud controllers http://myserver/todo/create http://myserver/todo/update http://myserver/todo/find http://myserver/todo/destroy  
  
easily **CONFIGURABLE**:  
config.json - define your project settings  
schemas.json - define your models  
  
**EXTENSIBLE** - define your own field editors  
  
Actually developped for a project based on SAILS.JS  
sails installation must have Access-Control-Allow-Origin   
setting allRoutes: true, in config/cors.js  


## INSTALLATION

put admiraljs folder in a http server
and open http://yourserverorlocalhost/admiraljs/index.html

edit baseUrl if needed in admiraljs/main.js
var configObj={
    baseUrl: 'admiraljs/',
	
provide settings and data structure in 
config/config.json
config/schemas.json
(see the wiki for details)

TIPS: If you want to manage different projects, create a subfolder called myproject in the config folder and pass it as a "config" parameter when opening admiraljs, ex:
http://yourserverorlocalhost/admiraljs/index.html?config=myproject

connect with admin / admin


## DOCUMENTATION
check the wiki
https://github.com/StudioDeTelevision/admiraljs/wiki

contact: studiodetelevision@gmail.com  

any suggestions or contributions are welcome !!!!!   

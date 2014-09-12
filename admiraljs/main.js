AJS={};
AJS.config={};
AJS.tools={};
AJS.schemas=[];
AJS.Application={};
AJS.fieldClasses=[];
AJS.fieldClassesPathes=[];
AJS.templates=[];
AJS.ui={};


var consoleHolder = console;
function debug(bool){
    if(!bool){
        consoleHolder = console;
        console = {};
        console.log = function(){};
    }else
        console = consoleHolder;
}

function extractUrlParams() {
var t = location.search.substring(1).split('&');
var f = [];
for (var i=0; i<t.length; i++) {
var x = t[ i ].split('=');
f[x[0]]=x[1];
}
return f;
}

var params=extractUrlParams();

var configFolder="./config/";
console.log(params)
if (params["config"]) {
	
	configFolder=configFolder+params["config"]+"/";
}



var configObj={
    baseUrl: '/admiraljs/',
    paths: {
        "css": "./vendor/require/css",
        "text": "./vendor/require/text",
        "image": "./vendor/require/image",
        "ejs": "./vendor/ejs_production",
		"underscore": './vendor/underscore-min',
		"jquery": './vendor/jquery-2.1.0.min',
		"backbone": './vendor/backbone-min',
    "marionette" : './vendor/backbone.marionette.min',
    "backbone.paginator" : './vendor/backbone.paginator.min',
		'bootstrap': './vendor/bootstrap/js/bootstrap.min',
		'datetimepicker': './vendor/datetime/jquery.datetimepicker',
		  'backgrid': './vendor/backgrid.min',
		  'backgrid-paginator': './vendor/backgrid-paginator.min',
		  'moment': './vendor/moment.min',
		  'jquery.ui.widget': './vendor/fileupload/jquery.ui.widget',
		  'jquery.ui': './vendor/jquery-ui.min',
		  'jquery.iframe-transport': './vendor/fileupload/jquery.iframe-transport',
		  'jquery.fileupload': './vendor/fileupload/jquery.fileupload',
		  'moment':"./vendor/moment.min",
		  "tinymcelib":"./vendor/tinymce/tinymce.min",
		  "tinymce":"vendor/tinymce/jquery.tinymce.min",
		  "combodate":'./vendor/combodate',
		  'tools':'./core/tools',
		  'switchbutton':'./vendor/jquery.switchButton'
    },
        shim: {"./core/application": {
        deps:	['jquery','underscore','backbone','tools'],
        },
		'switchbutton': {
		deps:['jquery','jquery.ui','css!./vendor/jquery.switchButton.css']	
		},
		'moment': {
        exports: "moment"
    },'combodate': {
    	 deps: ['jquery'],
    },'tinymce': {
    	 deps: ['jquery','tinymcelib'],
    },'datetimepicker': {
    	deps: ['jquery','css!./vendor/datetime/jquery.datetimepicker.css'],
    },
            'backbone': {
                //These script dependencies should be loaded before loading
                //backbone.js
                deps: ['jquery','underscore'],
        exports: "Backbone"
    }, 'jquery': {
        exports: "$"
    },'jquery.ui':{
    	 deps: ['jquery']
    },

    'underscore': {
        exports: "_"
    },
    "marionette" : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    },
	"jquery.fileupload": {deps: ['jquery.ui','jquery.iframe-transport']},
	"bootstrap": {deps: ["jquery", 'css!./vendor/bootstrap/css/bootstrap.min', 'css!./vendor/bootstrap/css/bootstrap-theme.min']},
	backgrid: {
	            deps: ['jquery', 'backbone', 'underscore', 'css!./vendor/backgrid.min'],
	            exports: 'Backgrid'
	        }
}
	};
	


var editors=["string",
"textarea",
'textareasimple',
"yesno",
"date"
,"datetime",
"file",
"collection",
{name:"collectionembed",path:"collectionembed/collectionembed"},
{name:"imagedropdown",path:"imagedropdown/imagedropdown"},
"image",
"imagecropresize/imagecropresize",
"imagescollection",
"select",
"stringmultilangotf"
,"textareamultilangotf"];


var editorsPathesArray=new Array();
for (var i=0; i<editors.length; i++) {
	var editor=editors[i];
	if (typeof editor=="object") {
		console.log("PREPARE FIELD EDITOR DEF ",editor.name)
		
		//configObj.paths['editors/'+editor.name]="./editors/"+editor.path;
AJS.fieldClassesPathes[editor.name]="./editors/"+editor.path;
editorsPathesArray.push("./editors/"+editor.path)
	}
	if (typeof editor=="string") {
		console.log("PREPARE FIELD EDITOR DEF ",editor)
		//configObj.paths['editors/'+editor]="./editors/"+editor;
AJS.fieldClassesPathes[editor]="./editors/"+editor;
editorsPathesArray.push("./editors/"+editor)
	}
	
	

}
	
require.config(configObj);

var requirepathes=['require'].concat(["./core/application","./core/helpers/tools","text!"+configFolder+"config.json","text!"+configFolder+"schemas.json"]).concat(editorsPathesArray);

console.log('pathes',requirepathes)
  	
require(requirepathes, function(req) {
	
	
	var App=req("./core/application");
	AJS.tools=req("./core/helpers/tools");
	var config=req("text!"+configFolder+"config.json");
	var schemas=req("text!"+configFolder+"schemas.json");
	try {
		AJS.config=JSON.parse(config)
		console.log(AJS.config)
}
catch (e) {
	alert('Error in json syntax in config file')
	return;
}

var idType=AJS.config.recordID;
if (idType==null) alert('You must specify a recordID key to use for your models in config.json . ex: "recordID":"_id"')

// SWITCH DEBUG MODE

if (AJS.config.debug) {
	debug(AJS.config.debug);
}
else debug(false);

// APPLY THEME
var themeFolder="default";
if (AJS.config.theme) {
	themeFolder=AJS.config.theme;
}
//,"css!./themes/default/style"

var cssUrl = require.toUrl("./themes/"+themeFolder+"/style.css");

$(document).ready(function(){

  
           if (document.createStyleSheet){
               document.createStyleSheet(cssUrl);
           }
           else {
               $("head").append($("<link rel='stylesheet' href='"+cssUrl+"' type='text/css' media='screen' />"));
           }
       
   });


	// try {
// 		schemas=JSON.parse(schemas)
// }
// catch (e) {
// 	alert('Error in json syntax in schema file')
// 	return;
// }
//schemas=eval(schemas);


schemas=eval('(' + schemas + ')');


for (var i=0; i<schemas.length; i++) {
	
	var schem = _.clone(schemas[i]);
	
	
	if (schem.extends!=null) {
		
		var parent=_.findWhere(schemas,{"schemaName":schem.extends});
		
		if (parent) {
			
			for (var p in parent) {
				
				if (schem[p]) {
					console.log("preserve attribute ",p)
				}
				else {
						console.log("copy attribute ",p)
					schem[p]=parent[p];
				}
				
				
				
			}
			
		}
		
		else {
		
			alert('extends undefined class (parent class must be defined before) '+schem.schemaName)
		}
		
		
	}
	
	// adds CRUD Urls if needed
	
	
	if (schem.create==null) schem.create=schem.model+"/create";
	if (schem.update==null) schem.update=schem.model+"/update";
	if (schem.find==null) schem.find=schem.model+"/find";
	if (schem.destroy==null) schem.destroy=schem.model+"/destroy";
	
	// Little loop to authorize use of Function in the schema definitions

	
	for (var p in schem) {
		(function(p,myschem){
	
	
		myschem["_"+p]=myschem[p];
		delete myschem[p];
		
		
		
		Object.defineProperty(myschem,p,{
		    get: function() { 
			
				if (typeof this["_"+p]=="function") {
					return this["_"+p]();
				}
				else return this["_"+p];
			 }
		  });
		  })(p,schem)
	}
	
	// End of Little loop to authorize use of Function in the schema definitions
		
		
		
	
	
	AJS.schemas[schem.schemaName]=schem;
	
}



		
	  	for (var c in AJS.fieldClassesPathes) {
	  		
			console.log('define fields',c,AJS.fieldClassesPathes[c])
	AJS.fieldClasses[c]=req(AJS.fieldClassesPathes[c])
		}
		
		new App();
		
		
		
		
		
		
		
	
		$(".page_title").html(AJS.config.title)
		


});




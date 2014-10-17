AJS={};
AJS.tools={};
AJS.schemas=[];
AJS.Application={};
AJS.fieldClasses=[];
AJS.fieldClassesPathes=[];
AJS.templates=[];
AJS.ui={};
AJS.path={};

// Define some default configuration
// will be overriden by custom/myproject/config/config.json

AJS.config={
"api":"http://localhost:9999/",
"fileUploadUrl":"http://localhost:9999/upload",
"fileDir":"http://localhost:9999/files/",
"thumbDir":"http://localhost:9999/files/thumbnail/",
"defaultLanguage":"fr",
"currentLanguage":"fr",
"recordID":"_id",
"login":{"mode":"fake"},
"debug":false,
"dateTimeFormat":"YYYY-MM-DD HH:mm:ss",

"tinymce":{"plugins":"code,link,paste",
           "toolbar":"code | bold italic | alignleft aligncenter alignright alignjustify   | link unlink | pastetext | undo redo",
		   "theme": "modern",
		    "skin": "light"}
};


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

AJS.path.customFolder="example";




if (params["config"]) {
	
	AJS.path.customFolder=params["config"];
}

AJS.path.customFolderPath="./custom/"+AJS.path.customFolder+"/";


var configObj={
    baseUrl: './',
    paths: {
        "css": "./vendor/require/css",
        "text": "./vendor/require/text",
        "image": "./vendor/require/image",
        "ejs": "./vendor/ejs_production",
		"underscore": './vendor/underscore-min',
		"lodash": './vendor/lodash.compat.min',
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
	"bootstrap": {deps: ["jquery"]},
	backgrid: {
	            deps: ['jquery', 'backbone', 'underscore', 'css!./vendor/backgrid.min'],
	            exports: 'Backgrid'
	        }
}
	};
	


	
require.config(configObj);


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
	
AJS.fieldClassesPathes[editor.name]="./editors/"+editor.path;
editorsPathesArray.push("./editors/"+editor.path)
	}
	if (typeof editor=="string") {
		console.log("PREPARE FIELD EDITOR DEF ",editor)
		
AJS.fieldClassesPathes[editor]="./editors/"+editor;
	editorsPathesArray.push("./editors/"+editor)
	}
	
	

}



require(['require',"./core/helpers/tools","./core/approuter","./core/configloader",'./core/lib/session',"./core/application","./core/auth/index","./core/schemaloader"].concat(editorsPathesArray), function(req) {
	
	
	
	var AppRouter=req("./core/approuter");
	AJS.router=AppRouter;
	AJS.tools=req("./core/helpers/tools");
	var ConfigLoader=req("./core/configloader");
	var Session=req("./core/lib/session");
	var App=req("./core/application");
	var Authentification=req("./core/auth/index");
	var SchemaLoader=req("./core/schemaloader");
	
	
	
	
  	for (var c in AJS.fieldClassesPathes) {

AJS.fieldClasses[c]=req(AJS.fieldClassesPathes[c]);
	}
	
	
	
	
		$(document).ready(function() {
			$('body').empty()
			var launchApp=function() {
	  			
					
	  				var sl=new SchemaLoader({"folder":AJS.path.customFolderPath+"config/"});
	  				sl.on('success',function() {
					
	  					var app=new App({"folder":AJS.path.customFolderPath+"config/"});
	  					})
					
	  			
			}
		   
		   
  			var cl=new ConfigLoader({"folder":AJS.path.customFolderPath+"config/"});
  			cl.on('success',function() {
				    
		   var isAuth = Session.get('authenticated');
		 
		
		  
		  if (isAuth==false || isAuth==null || isAuth=="false"){
	  		var auth=new Authentification();
	  		$("body").append(auth.$el);
	  		auth.on('success',function() {
	  			this.$el.remove();
	  			
			launchApp();
			
	  			
				
			
	  		})
	   }
	   else {
		  
 			launchApp();
	   }
	   
	   
	   })
				
	 
	 
	 
	
		
		
		});
});






var express = require('express');
var fileserver = require('./lib/fileserver');
var app = express();

var lodash = require('lodash');

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var config={
	title:"Your project name",
	port:7000, /// admiraljs port 
	host:"localhost",
	database:{
		port:27017,
		host:"your mongodb host adress",
		basename:"your database name"
	},
	"recordID":"_id",
	"defaultLanguage":"fr",

	"currentLanguage":"fr",

	"debug":false,

	"theme":"default",

	"dateTimeFormat":"YYYY-MM-DD HH:mm:ss",

	"tinymce":{"plugins":"code,link,paste",
	           "toolbar":"code | bold italic | alignleft aligncenter alignright alignjustify   | link unlink | pastetext | undo redo",
			   "theme": "modern",
			    "skin": "light"}// ,
//
// 	"customClass":"./custom/example/example"
}


var schema=null;
module.exports.setSchema=function(sch) {
	schema=sch;
}
module.exports.setConfig=function(cfg) {
	if (cfg.fileserver) {
			fileserver.setConfig(cfg.fileserver)
		delete cfg.fileserver;
	}
	lodash.merge(config, cfg);
	console.log('Use Configuration ',config)
}


module.exports.start=function() {


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
	console.log('Try to connect to database ','mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.basename)
	MongoClient.connect('mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.basename, function(err, db) {
	    if(err) throw err;

	
   
	 var router = express.Router();
	 
	 router.param('model', function(req, res, next, model) {
	   // sample user, would actually fetch from DB, etc...
	   console.log(model)
	   req.model = model;
	   next();
	 });
	 
	 router.param('id', function(req, res, next, id) {
	   // sample user, would actually fetch from DB, etc...
	   console.log(id)
  	 var ObjectID = require('mongodb').ObjectID;
  var obj_id =ObjectID(id);
	   req.id = obj_id;
	   next();
	 });
	 
     router.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
       next();
      });
	  
	  app.get('/hello.txt', function(req, res){
	    res.send('Hello World');
	  });
	  
	  
	
	  
	  
	  router.route('/:model/find').all(function(req, res,next){
		  var model=req.model;
		
		    var collection = db.collection(model);
			
			var where=null;
			var whereParam=req.query.where ||  req.body.where;
			console.log('where param ', whereParam)
			console.log('where param type',typeof whereParam)
			if (whereParam!=null && typeof whereParam!=undefined ) {
				
				console.log('where param type',typeof whereParam)
				if (typeof whereParam=="string") {
					where=JSON.parse(whereParam);
				}
				if (typeof whereParam=="object") {
					where=whereParam;
					
				}
				
				if (where._id) {
			     	 var ObjectID = require('mongodb').ObjectID;
	 				if (typeof where._id=="string") {
	 					where._id=ObjectID(where._id);
	 				}
	 				else {
	 				
						var idArray=new Array();
					for (var i in where._id) {
						idArray.push(ObjectID(where._id[i]))
						
						
						
						
					}
					where._id={"$in": idArray};
					console.log(where)
					}
					
				}
				
				
			}
			console.log("where",where)
			
			var find=collection.find(where);
			
			
			find.count(function(err, count) {
				if (count>0) {
					
					
			
			var sortParam=req.query.sort ||  req.body.sort;
			if (sortParam!=null && typeof sortParam!=undefined ) {
				
				find=find.sort(sortParam)
			}
			console.log("pageParam",pageParam)
			var limitParam=req.query.limit || req.query.per_page || req.body.limit || req.body.per_page;
			if (limitParam!=null && typeof limitParam!=undefined ) {
				find=find.limit(parseInt(limitParam))
				
				
				var pageParam=req.query.page || req.body.page;
				if (pageParam!=null && typeof pageParam!=undefined ) {
					
				    find= find.skip(pageParam > 0 ? ((pageParam-1)*limitParam) : 0);
				   
				
				}
				
				
			}
			
			
			console.log("pageParam",pageParam)
			console.log("limitParam",limitParam)
			
  	   
		  
		res.set('total', count); 	
		res.set('page', pageParam);
	  	res.set('perPage', limitParam);
	      find.toArray(function(err, results) {
		 res.json(results);
	      });
		  
	  }
	  else {
	  	res.set('total', 0);
		res.set('page', 0);
	  	res.set('perPage', 0);
		 res.json([]);
		
	  }
		  
		  
	      });
		  
	  });
	  
	  router.route('/:model/find/:id').all(function(req, res,next){
		  var model=req.model;
		    console.log('model',req.id)
		    var collection = db.collection(model);
			
	     
		  
  	      collection.find({_id:req.id}).toArray(function(err, results) {
			  if (err) {
			  	res.send(err);
			  }
			  else {
			  	res.json(results[0]);
			  }
			 
  	      });
	  });
	  
	  router.route('/:model/update/:id').put(function(req, res, next) {
  // just an example of maybe updating the user

   var model=req.model;
 console.log('query',req.body)
  
  var data=req.body;
if (data._id) delete data._id;
  
   // var _id=req.params._id;
  console.log('id',req.id)
  console.log('data',data)
	 // console.log('ok',_id)
	
	
	 var collection = db.collection(model);
	

collection.findAndModify({_id: req.id},{}, {$set: data}, {}, function(err, object) {
      if (err) console.warn(err.message);
      else  res.json(object);
    });
  
 
}).options(function(req, res, next) {
		  console.log('options')
		 res.send("");
		 next();
	  }
	  )


/// DELETE 
	  router.route('/:model/destroy/:id').get(function(req, res, next) {
  // just an example of maybe updating the user

   var model=req.model;

   console.log('remove ',req.id)
	
	 var collection = db.collection(model);
	 


collection.findAndModify({_id: req.id},{}, {}, {remove:true}, function(err, object) {
      if (err) console.warn(err.message);
      else  res.json(object);
    });
  
 
})


/// END OF DELETE 


	 router.route('/:model/create').get(function(req, res,next){
		  var model=req.model;
		
		  
		  
		    var collection = db.collection(model);
			console.log('create model',model)
			collection.insert({createdAt:new Date()}, {w:1}, function(err, objects) {
			      if (err) console.warn(err.message);
			      if (err && err.message.indexOf('E11000 ') !== -1) {
					  console.warn(err.message)
			        // this _id was already inserted in the database
			      }
				   res.send(objects[0]);
			    });
				
				
		
				
				
	  });
   router.route('/admiraljs/config/schemas.json').get(function(req, res,next){
	   
	   if (!schema) {
   	    schema=require('./admiraljs/config/schemas.json')
	
	   }
	   
		
		
		
	   res.json(schema)
	   
	   
   });
	  
	   router.route('/admiraljs/config/config.json').get(function(req, res,next){
		 //  var configFile=require('./admiraljs/config/config.json')
		  // console.log('GOT CONFIG',configFile)
		   
		   
		   var fileserverOptions=fileserver.getConfig();
		   
		   // "api":"http://localhost:3000/",
		   //
		   // "fileUploadUrl":"http://localhost:4000/",
		   //
		   // "fileDir":"http://localhost:4000/files/",
		   //
		   // "thumbDir":"http://localhost:4000/files/thumbnail/",
		   
		   
		   config.api="http://"+config.host+":"+config.port+"/";
		   config.fileUploadUrl="http://"+config.host+":"+fileserverOptions.port+"/";
		   config.fileDir="http://"+config.host+":"+fileserverOptions.port+fileserverOptions.uploadDir+"/";
		   config.thumbDir="http://"+config.host+":"+fileserverOptions.port+fileserverOptions.uploadDir+"/thumbnail/";
		   
		   
		   delete config.database;
		   
		   
		   
		   
		  // lodash.merge(configFile, config);
		   
		   
		   
		   
		   res.json(config)
		   
		   
	   });
	  
	  
	  app.use( router);
	  
	  
	  app.use('/admiraljs', express.static(__dirname + '/admiraljs'));
	  
	  
	  var server = app.listen(config.port, function() {
	      console.log('********************************************************');
	      console.log('* AdmiralJS is now sailing on http://localhost:%d/admiraljs ', server.address().port);
	      console.log('********************************************************');
	  });
	  
	  fileserver.start();
	  
	  
	   })
	   
	   
	   	
		
		
	   }
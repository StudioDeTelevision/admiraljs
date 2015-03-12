var express = require('express');
var app = express();
var lodash = require('lodash');

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
	   

var config=require('./config.json');
	   

module.exports=function(configOverride) {
	
	if (configOverride) lodash.merge(config, configOverride);
	
	
	var MongoClient = require('mongodb').MongoClient
	    , format = require('util').format;
		var auth="";
		if (config.database.username) {
			auth=config.database.username+":"+config.database.password+"@";
		}
		console.log('Try to connect to database ','mongodb://'+auth+config.database.host+':'+config.database.port+'/'+config.database.name)
		MongoClient.connect('mongodb://'+auth+config.database.host+':'+config.database.port+'/'+config.database.name, function(err, db) {
		    if(err) {
				console.log('Error during connection to DataBase')
				throw err;
			}
			console.log('Connected to DataBase')
	
   
		 var router = express.Router();
	 
	 
	 
	 
		 router.param('model', function(req, res, next, model) {
		   console.log(model)
		   req.model = model;
		   next();
		 });
	 
		 router.param('id', function(req, res, next, id) {
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
	  
		 
	  
	
	  
	  
		  router.route(config.prefix+'/:model/find').all(function(req, res,next){
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
				else {
					where={};
				}
				console.log("where",where)
			
				var find=collection.find(where);
			
			
				find.count(function(err, count) {
					console.log("count",count)
					if (count>0) {
					
					
			
				var sortParam=req.query.sort ||  req.body.sort;
				
				if (sortParam!=null && typeof sortParam!=undefined ) {
				console.log("sortParam",sortParam)
				console.log("sortParam",typeof sortParam)
					if (typeof sortParam=="string") sortParam=JSON.parse(sortParam);
					for (var sp in sortParam) {
						if (sortParam[sp]=="asc") sortParam[sp]="1";
						if (sortParam[sp]=="desc") sortParam[sp]="-1"
					}
					console.log("sortParam",sortParam)
					console.log("sortParam",typeof sortParam)
					find=find.sort(sortParam)
				}
				
				var limitParam=req.query.limit || req.query.per_page || req.body.limit || req.body.per_page;
				if (limitParam!=null && typeof limitParam!=undefined ) {
					limitParam=parseInt(limitParam);
				
					//var pageParam=req.query.page || req.body.page;
					var skipParam=req.query.skip || req.body.skip;
					if (skipParam!=null && typeof skipParam!=undefined ) {
					console.log("skipParam",skipParam)
						skipParam=parseInt(skipParam);
					    find= find.skip(skipParam);
				   
				
					}
					
					find=find.limit(parseInt(limitParam))
					console.log("limitParam",limitParam)
				
				
				}
			
			
				var pageParam=Math.round(skipParam/limitParam)+1;
  	   
		  
			res.set('total', count); 	
			res.set('page',pageParam);
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
	  
		  router.route(config.prefix+'/:model/find/:id').all(function(req, res,next){
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
	  
		  router.route(config.prefix+'/:model/update/:id').put(function(req, res, next) {

	   var model=req.model;
  
	  var data=req.body;
	if (data._id) delete data._id;
  
	
	
		 var collection = db.collection(model);
	

	collection.findAndModify({_id: req.id},{}, {$set: data}, {new:true}, function(err, object) {
	      if (err) console.warn(err.message);
	      else  {
			 
			  res.json(object);
			  
		  }
	    });
  
 
	}).options(function(req, res, next) {
		
			 res.send("");
			 next();
		  }
		  )


	/// DELETE 
		  router.route(config.prefix+'/:model/destroy/:id').get(function(req, res, next) {
 

	   var model=req.model;

	   console.log('remove ',req.id)
	
		 var collection = db.collection(model);
	 


	collection.findAndModify({_id: req.id},{}, {}, {remove:true}, function(err, object) {
	      if (err) console.warn(err.message);
	      else  res.json(object);
	    });
  
 
	})


	/// END OF DELETE 


		 router.route(config.prefix+'/:model/create').get(function(req, res,next){
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
	  
	  
		
	
	   
	  
	  
	  
		  app.use( router);
	
	
	 })
	return app;
	
}
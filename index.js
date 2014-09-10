var express = require('express');
var fileserver = require('./server/fileserver');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var config={
	port:7000,
	mongoPort:27017,
	mongoHost:"176.31.250.73:27017",
	mongoBase:"hop",
}


module.exports.port=function(num) {
	config.port=num;
}

module.exports.mongoUrl=function(mmuu) {
	config.mongoUrl=mu;
}

module.exports.mongoHost=function(mu) {
	config.mongoHost=mu;
}
module.exports.mongoBase=function(mu) {
	config.mongoBase=mu;
}


module.exports.config=function(cfg) {
	config=config;
}


module.exports.start=function() {


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
	
	MongoClient.connect('mongodb://'+config.mongoHost+':'+config.mongoPort+'/'+config.mongoBase, function(err, db) {
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
var express = require('express');
var passport = require('passport');
var app = express();
var lodash = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var config=require('./config.json');
var session = require('express-session')






var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


app.use(session({ secret: 'admiraljs secret' }));
 app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

passport.use(new LocalStrategy(
  function(username, password, done) {
	  console.log('authenticate')
	  if (username===config.username && password===config.password  ) {
		  var user={user:username}
		return done(null, user);
	  }
	  else {
	  	return done(null, false);
	  }
	  
	  
    // User.findOne({ username: username }, function (err, user) {
 //      if (err) { return done(err); }
 //      if (!user) { return done(null, false); }
 //      if (!user.validPassword(password)) { return done(null, false); }
 //      return done(null, user);
 //    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports=function(configOverride) {
	
	if (configOverride) lodash.merge(config, configOverride);
	
	 var router = express.Router();
	
	// router.route('/login').all(passport.authenticate('local'),  function(req, res) {
	// 	console.log('ok')
	//     res.json(req.user);
	//   });
	//
  
  router.route('/login').post(function(req, res, next) {
	
    passport.authenticate('local', function(err, user, info) {
		 // console.log('yes',err, user, info)
      if (err) { return res.json({success:0,error:"Incorrect Username or Password"}); }
      if (!user) { return res.json({success:0,error:"Incorrect Username or Password"}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
	
        return  res.json({success:1,user:req.user});
      });
    })(req, res, next);
  });
  
  router.route('/logout').all(function(req, res){
    req.logout();
    res.json({success:1});
  });

	
	function ensureAuthenticated(req, res, next) {
		console.log('USER',req.user)
	  if (req.user) { return next(); }
	  res.send(403, { message: 'Not Authorized' });
	}

	app.all('*', function(req,res,next){
		//console.log('param',req.params[0])
		if (req.params[0] == '/' || req.params[0].substr(0,10)== '/admiraljs'  || req.params[0] == '/login')
		  next();
		  else
		  ensureAuthenticated(req,res,next);
	})
	
app.use(router)
	
	return app;
}
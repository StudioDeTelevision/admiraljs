define(['backbone','./lib/session','controllers/auth/auth','./ui/sidebar','./ui/topbar','controllers/listview/listview','controllers/editview','./ui/popup','core/approuter'],
    function(Backbone,Session,AuthView,SideBar,TopBar,ListView,EditView,Popup,AppRouter) {
      
	
		Backbone.Model.prototype._super =
		Backbone.View.prototype._super =
		Backbone.Router.prototype._super =
		Backbone.Collection.prototype._super = function(funcName){
			console.log("type of args",typeof arguments)
		  return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
		}
		
		
		
		
		var App=function() {
			var that=this;
			
			
			
			$.ajaxSetup({
			    statusCode: {
			        401: function(){
			            // Redirec the to the login page.
			            window.location.replace('/#login');
         
			        },
			        403: function() {
			            // 403 -- Access denied
			            window.location.replace('/#denied');
			        }
			    }
			});
			
			
		AJS.Data={};
			AJS.Data.Model=Backbone.Model.extend({idAttribute:AJS.config.recordID})
			AJS.Data.Collection=Backbone.Collection.extend({model:AJS.Data.Model})
		
		
			var sb=new SideBar();
			AJS.sidebar=sb;
			$("body").append(sb.$el)
			var screen=$('<div id="screen" />');
			AJS.screen=screen;
			$("body").append(screen)
			
			var tb=new TopBar();
			AJS.topbar=tb;
			$("body").append(tb.$el)
			
			
			if (AJS.config.customClass) {
			
				require([AJS.config.customClass], function (CustomApp) {
				    var custom = new CustomApp();
				   that.initialize();
				  });
			
			
			//
			
			}
			else {
			
			this.initialize();
			}
			
			
		}
		
		App.prototype.initialize=function() {
			
		
			
			
			
			
			
			
			
				
			
			
			
			
			
			
				AJS.ui.PopUp=Popup;
				AJS.ui.EditView=EditView;
				
				/////
				
				AppRouter.register( "edit/:schemaName/:id","Edition",function(schemaName,id) {
				 
  				  var v=new EditView({schemaName:schemaName,modelId:id});
				  
  				 AJS.screen.empty();
  				  AJS.screen.append(v.$el);
				  
  			 console.log('set edit view')
			
		  	});
				/////
				AppRouter.register("list/:model","list",function(schemaName) {
					
				
  				  AJS.currentSchema=schemaName;
  				  var v=new ListView({schemaName:schemaName});
				  
  				  AJS.screen.empty();
  				  AJS.screen.append(v.$el);
  				   console.log('set list view')
			
		  	});
					/////
		  	AppRouter.register("home","Home",function() {
  			  AJS.screen.empty();
  			  console.log('set home view');
		  	});
				
				/////
				AppRouter.register("logout","Logout", function() {
			   Session.set('authenticated',false);
			   Backbone.history.navigate('#login', { trigger : true });
			        
			     });
				 ///// 
				AppRouter.register("login","Login", function() {
					
				          var isAuth = Session.get('authenticated');
					
if (isAuth==false || isAuth==null || isAuth=="false"){
	
    AJS.screen.empty();
	
	AJS.topbar.hide();

	 AJS.sidebar.hide();
	
	var authView=new AuthView();
	
    AJS.screen.append(authView.$el);
	
	console.log('set auth view')
	
} else { 
	
	AJS.topbar.hide();

	 AJS.sidebar.hide();
	 
	Backbone.history.navigate('home', { trigger : true });
 
}
			

			     })
				 
				/////
		  	// AppRouter.register("*path","Home",function() {
 	//   			  AJS.screen.empty();
 	//   			  console.log('set home view');
 	// 		  	});
				 
				  Backbone.history.start(); 
				 
				 
				 
				  if(window.location.hash) {
				    // Fragment exists
				  } else {
				   Backbone.history.navigate('home', { trigger : true });
				  }  
				 /// END INTIALIZE
				
				//new Custom();
		}
			
		
        return App;
    }
);





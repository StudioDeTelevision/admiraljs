define(['backbone','./lib/session','./modules/index','./ui/sidebar','./ui/topbar','controllers/listview/listview','controllers/editview','./ui/popup','core/approuter'],
    function(Backbone,Session,Modules,SideBar,TopBar,ListView,EditView,Popup,AppRouter) {
      
	
		Backbone.Model.prototype._super =
		Backbone.View.prototype._super =
		Backbone.Router.prototype._super =
		Backbone.Collection.prototype._super = function(funcName){
			//console.log("type of args",typeof arguments)
		  return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
		}
		
		
		
		
		var App=function() {
			var that=this;
			
			
			
			$.ajaxSetup({
			    statusCode: {
			        401: function(){
			            // Redirec the to the login page.
			            //window.location.replace('#login');
         Backbone.history.navigate('logout', { trigger : true });
			        },
			        403: function() {
			            // 403 -- Access denied
			            Backbone.history.navigate('logout', { trigger : true });
						//window.location.replace('#denied');
						
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
			
			require([AJS.path.customFolderPath+"index"], function (CustomApp) {
				 
			    var custom = new CustomApp();
			   that.initialize();
			  },function() {
				 
				  that.initialize();
			  });
			

			
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
			 
			  var homeView=new Modules.DefaultHome();
			  	  AJS.screen.append(homeView.$el);
  			  console.log('set home view');
		  	});
			
			/////
  	AppRouter.register("denied","AdmiralJS Access Denied",function() {
	 AJS.screen.empty();
		//alert("Access denied")
		  AJS.screen.append("<h2>Access denied</h2><h3>Please connect or reconnect to perform this action <a href='/admiraljs' ></a></h3>");
	 
	  //Backbone.history.navigate('logout', { trigger : true });
	 
	 
  	});
			
			/////
  	AppRouter.register("builder","Schema Builder",function() {
	  AJS.screen.empty();
	  var view=new Modules.SchemaBuilder();
	  	  AJS.screen.append(view.$el);
  	});	
	
	/////
  	AppRouter.register("schema","Schema Editor",function() {
	  AJS.screen.empty();
	  var view=new Modules.SchemaEditor();
	  	  AJS.screen.append(view.$el);
	 // Modules.SchemaEditor.show();
	 // AJS.screen.append(Modules.SchemaEditor.$el);
	 // 	  AJS.screen.append(view.$el);
  	});
				
				/////
				AppRouter.register("logout","Logout", function() {
			   Session.set('authenticated',false);
			   if (!AJS.config.login) AJS.config.login={};
			   if (!AJS.config.login.logout) AJS.config.login.logout="logout";
	         
	           var url = AJS.config.api+AJS.config.login.logout;
	           $.ajax({
	               url:url,
	               type:'POST',
	               dataType:"json",
	               complete:function (data) {
	                  
           
						  
			 			   var loc = window.location.href,
			 			       index = loc.indexOf('#');

			 			   if (index > 0) {
			 			     window.location.href = loc.substring(0, index);
			 			   }
						   else {
						   	 window.location.href = loc;
						   }
	              
	               }
	           });
			   
			  
			 
			   
			     });

				  Backbone.history.start(); 
				 
				 
				  if(window.location.hash && window.location.hash!="#login" && window.location.hash!="#home") {
					
				    // Fragment exists
				  } else {
					 
				   Backbone.history.navigate('home', { trigger : true });
				  }  
				  
				  
				  AJS.trigger('ready')
				 /// END INTIALIZE
				
				//new Custom();
		}
			
		
        return App;
    }
);





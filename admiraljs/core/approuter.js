define([
  'jquery',
  'underscore',
  'backbone','./lib/session','./lib/routerextends'
], function ($, _, Backbone,Session) {
 
			var AppRouter = Backbone.Router.extend({
				
				requresAuth : ['/'],

				      // Routes that should not be accessible if user is authenticated
				      // for example, login, register, forgetpasword ...
				      preventAccessWhenAuth : ['#login'],

				      before : function(route, params){
				          //Checking if user is authenticated or not
				          //then check the path if the path requires authentication 
				          var isAuth = Session.get('authenticated');
						  
						  
						  if (route=="login") return;
						  
if (isAuth==false || isAuth==null || isAuth=="false" ){
	
	
	 if ( AJS.topbar) AJS.topbar.hide();

	if ( AJS.sidebar)  AJS.sidebar.hide();
	 
	 //console.log('trigger login view')
	//Backbone.history.navigate('login', { trigger : true });
	
	Backbone.history.loadUrl();
	
	return false;
	
} else {
 if ( AJS.topbar)  AJS.topbar.show();

if ( AJS.sidebar)   AJS.sidebar.show();
	
}
			
				      },

				      after : function(){
				          //empty
						
				      },
		      register: function (route, name, callback) {
		        var self = this;
				console.log('REGISTER ROUTE',route,name)
		        this.route(route, name, callback);
				
			}
			});
			
			//AJS.router=AppRouter;
			
			if (AJS.router) return AJS.router;
			
			else {
				console.log('##### CREATE ROUTER #####')
				AJS.router=new AppRouter();
				
		 	   // if (!Backbone.History.started) {
		 	             
		 	     //      }
				
				return AJS.router; 
				
			}
		
	 
 
			
});
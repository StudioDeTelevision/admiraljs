define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=Backbone.View.extend({
			tagName:"nav",
			id:"navbar",
			className:"navbar navbar-default navbar-fixed-top",
			initialize:function() {
				this.hide();
				this.$el.html('<div id="topbar" class="container-fluid"><a id="page_title" class="page_title" href="#home" >'+AJS.config.title+'</a><a class="logout" href="#logout" ></a></div>')
  
			},
			
			append:function(el) {
				this.$el.append(el)
			},hide:function() {
				this.$el.hide();
			},show:function() {
				this.$el.show();
			}
		})
		
        return View;
    }
);
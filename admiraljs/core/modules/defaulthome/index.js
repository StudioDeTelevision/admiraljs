define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./home.html'],
    function($, _, Backbone,templateHtml) {
       
		
		var View=Backbone.View.extend({
			
			initialize:function() {
				this.$el.html(templateHtml)
			}
		})
		
        return View;
    }
);
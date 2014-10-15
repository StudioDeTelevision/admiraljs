define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone) {
       
		
		var View=Backbone.View.extend({
			
			initialize:function() {
				alert(0)
			}
		})
		
        return View;
    }
);
define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','jquery',"tinymce"],
    function( _, Backbone,EditorClass,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<textarea class="input" />',
			initialize:function(options) {
				var that=this;
				
				this._super('initialize', options);
				
			
				
			}
		})
		
		View.display=function(val) {
			
			return $("<div/>").html(val).text();
			
		}
		
        return View;
    }
);
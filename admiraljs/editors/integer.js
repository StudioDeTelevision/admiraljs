define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor'],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<input class="input" type="text" />',
		setOnChange:function() {
			
				var that=this;
				this.input.on('change',function() {
					
					that.value=parseInt(that.input.val());
					that.trigger('change');
					console.log('change',typeof that.value)
				})
				
			}
			
			})
		
		
		
        return View;
    }
);
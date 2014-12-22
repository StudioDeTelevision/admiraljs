define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor'],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<input class="input" type="date" />',
			initialize:function(options) {
				
				this._super('initialize', options);
				
				
			},setValue:function(val) {
				
				this.value=moment(val).format('YYYY-MM-DD');
				this.displayValue();
			
				
			},getValue:function() {
				
				return moment(this.value).toDate();
				
				
			},displayValue:function() {
			
				
								
				 this.input.val(this.value)
							
				
			}
			
		})
		
		
		
        return View;
    }
);
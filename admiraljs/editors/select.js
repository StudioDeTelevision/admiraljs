define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor'],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			relatedModel:null,
			template:'<select class="input" />',
			initialize:function(options) {
				var that=this;
				
				
				this._super('initialize', options);
				
				
					

					
					 var opt=$('<option value=""  >select</option>');
					that.input.append(opt);
					
					for (var o in options.options ) {
						var opt=options.options[o];
					
						 var isselected=(that.value==opt) ? "selected" : "";
						 var opt=$('<option value="'+o+'" '+isselected+' >'+opt+'</option>');
						that.input.append(opt);
						
						
						
					 }
					
					if (that.value!=null) { 
						
						that.setValue(that.value) 
					}
			
				
			},
			setValue:function(val) {
				
				this.value=val;
				$("option[value=" + val + "]",this.input).attr('selected', 'selected');
			}
		})
		
		
		
        return View;
    }
);
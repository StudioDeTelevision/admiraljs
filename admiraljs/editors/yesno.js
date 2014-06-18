define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','switchbutton'],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<input class="input" type="hidden" /><input  class="display" type="checkbox" />',
			initialize:function(options) {
				var that=this;
				
				this._super('initialize', options);
				var displayer=this.$el.find('.display').first();
				setTimeout(function() {
				displayer.switchButton({show_labels:false,width:36,height:18,button_width:18});	
				},200)
			
				
			},
		setOnChange:function() {
				var that=this;
				var displayer=this.$el.find('.display').first();
				displayer.on('change',function() {
					
					that.value=$(this).is(':checked') ? 'yes' : 'no' ;
					
					// that.value=;
 					that.trigger('change');
// 					console.log(that.value)
				})
				//
			},
			displayValue:function() {
				//var checked=" checked ";
				if (this.value==0 || this.value==null || this.value=='no' || this.value=='false' || typeof this.value=="undefined") {
						this.$el.find('.display').first().attr('checked', false);	
					//checked="";
				} else 
				this.$el.find('.display').first().attr('checked', true);
				
				
				
			}
			
			})
		
			View.display=function(val,fieldname,model,schemaName) {
				
 				// var url=AJS.config.api+AJS.schemas[schemaName].update+"/"+model.id;
 				
				
					var disp=$('<input  onclick="if(event.stopPropagation){event.stopPropagation();}event.cancelBubble=true;" class="display" type="checkbox" />');
				if (val==0 || val==null || val=='no' || val=='false' || typeof val=="undefined") {
					//alert(0)
				//	disp.attr('checked', false);	
				//checked="";
			} else disp.attr('checked', true);
				
		disp.click(function(e) {
			e.cancelBubble = true;
			e.stopPropagation();
			
		})
		disp.mousedown(function(e) {
			e.cancelBubble = true;
			e.stopPropagation();
			
		})
		
		
		var wrapper=$("<div class='switchbutton' />")
			wrapper.append(disp)
			
			
		setTimeout(function() {
		
			// APPLY APPEARANCE
		disp.switchButton({show_labels:false,width:36,height:18,button_width:18});	
		
		// ADD CHANGE LISTENER
		
		disp.change(function(e) {
			
			var value=$(this).is(':checked') ? 'yes' : 'no' ;
			
			
			model.set(fieldname,value);
			
			
			
					model.save({}, {
    url: AJS.config.api+AJS.schemas[schemaName].update+"/"+model.id
})


/// CHANGE OPACITY OF LINE IN LIST VIEW 
$(".switchbutton").each(function() {
var ch=$(this).find('input[type="checkbox"]').is(':checked');
console.log('switch',ch)
if (ch=="false") {
$(this).parent().parent().css('opacity','0.4');
}
else {
	$(this).parent().parent().css('opacity','1');
}

});
			
		})


		/// CHANGE OPACITY OF LINE IN LIST VIEW 
		$(".switchbutton").each(function() {
		var ch=$(this).find('input[type="checkbox"]').is(':checked');
		if (ch==false) {
		$(this).parent().parent().css('opacity','0.4');
		}
else {
	$(this).parent().parent().css('opacity','1');
}

		});
		
		},200)
			

				return wrapper;
			
			}
			
	
			
			
		
        return View;
    }
);
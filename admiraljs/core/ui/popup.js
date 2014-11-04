define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./popup.html','jquery.ui'],
    function($, _, Backbone,htmlTemplate) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=Backbone.View.extend({
			className:"AJSpopup",
			events:{
			"click .closeme":"closeMe"	,

			"click .insert":"insertMe"	
			},
			
			initialize:function() {
				this.$el.html(htmlTemplate)
				$("body").append(this.$el)
				this.show();
				
				this.$el.draggable();
			},
			show:function() {
				$('.pagemask').show();
				this.$el.fadeIn();
			},
			closeMe:function() {
				
				this.$el.remove();
				$('.pagemask').hide();
			},insertMe:function() {
				
				$(this.$el).trigger('insertme')
			}
			,setContent:function(el) {
				console.log('set content',el)
				this.$el.find('.content').first().append(el)
			},
			addButton:function(el) {
				
				this.$el.find('.footer').first().append(el)
			}
		})
		
        return View;
    }
);
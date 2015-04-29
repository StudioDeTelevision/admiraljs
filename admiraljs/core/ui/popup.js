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
				
				// this.$el.draggable();
				// draggable is not compatible with imagecropresize editor
			},
			show:function() {
				var that=this;
				$('.pagemask').show();
				this.$el.fadeIn();
				this.$el.resizable({resize:function(event,ui) {
					that.$el.css('marginLeft',-that.$el.width()/2)
					that.$el.css('marginTop',-that.$el.height()/2)
				}});
				
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
				this.$el.width(this.$el.find('.contentWrapper').width()+40)
			},
			addButton:function(el) {
				
				this.$el.find('.footer').first().append(el)
			}
		})
		
        return View;
    }
);
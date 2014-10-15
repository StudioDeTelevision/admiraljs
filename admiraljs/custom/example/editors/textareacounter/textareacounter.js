define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','jquery',"tinymce",'css!./textareacounter.css'],
    function( _, Backbone,EditorClass,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<textarea class="input" /><div class="textareacounter_footer" ></div>',
			initialize:function(options) {
				var that=this;
				
				this._super('initialize', options);
				
				//alert(0)
				//alert(this.options)
				this.max=parseInt(options.max);
				
				this.input.on('keyup',function(){
					that.setCounter();
					
				} )
				setTimeout(function() {
					that.setCounter();
				},300)
				
			},setCounter:function() {
			
				var len=this.input.val().length;
				
				$('.textareacounter_footer',this.$el).html(len+"/"+this.max);
				if (len>=this.max) $('.textareacounter_footer',this.$el).addClass('over');
				else  $('.textareacounter_footer',this.$el).removeClass('over');
				
			}
		})
		
		View.display=function(val) {
			
			return $("<div/>").html(val).text();
			
		}
		
        return View;
    }
);
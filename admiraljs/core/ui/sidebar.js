define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','controllers/modellist'],
    function($, _, Backbone,ModelList) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=Backbone.View.extend({
			id:"sidebar",
			className:"sidebar",
			initialize:function() {
				this.hide();
				this.addModels();
			},
			addModels:function() {
				var ml=new ModelList();
				
				this.$el.append(ml.$el);	
			},
			append:function(el) {
				this.$el.append(el)
			},hide:function() {
				this.$el.hide();
			},show:function() {
				this.$el.show();
			}
		})
		
        return View;
    }
);
define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone) {
       
	   
	  AJS.on('ready',function() {
		  var icon=$("<a class='icon-params' href='#schema' ></a>")
	  $('body').append(icon);
	
	  })
		
		var View=Backbone.View.extend({
			className:"schemaEditor",
			events:{"click .update":"updateSchema"},
			initialize:function() {
				this.editor=$("<textarea/>");
				this.buttonUpdate=$("<button class='update' >Update</div>");
				this.$el.append(this.editor);
				this.$el.append(this.buttonUpdate);
				this.$el.append("<p>Update affects this current admiraljs'session but won't change your real schemas.json file. You'll have to save your changes manually.</p>");
				
					 
				
				this.editor.val(AJS.schemaString)
				
			},updateSchema:function () {
				AJS.schemaString=this.editor.val();
				
				$('body').trigger('schemaUpdate')
				
			}
		})
		
        return View;
    }
);
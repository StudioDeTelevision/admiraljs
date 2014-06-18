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
				
				
				setTimeout(function() {
					that.renderEditor(that);
				},500)
				
					
					
				
			},
			renderEditor:function(that) {
				
				
				$('textarea',this.$el).tinymce({
					menubar:false, statusbar: false, 
					plugins: AJS.config.tinymce.plugins,
					toolbar: AJS.config.tinymce.toolbar,
					theme: AJS.config.tinymce.theme,
					skin: AJS.config.tinymce.skin,
					width:420,
				
			               // Optional parameters
						   setup: function(editor) {
							   that.redactor=editor;
						           editor.on('blur', function(e) {
						              
							   		that.value=that.input.val();
							   		that.trigger("change");
									  
									  
						           });
						       }
			           });
					   
					// initCallback: function()
// 	{
// 		console.log(this.get());
// 	
// 	},syncBeforeCallback: function(html)
// 	{
// 		// your code
// 		return html;
// 	},changeCallback: function(html) {
// 						console.log("change",html);
// 					},blurCallback: function(e)
// 	{
// 		that.value=that.input.val();
// 		that.trigger("change");
// 		
// 		console.log("blur",this.get());
// 	}
// 					});
			}
		})
		
		View.display=function(val) {
			
			return $("<div/>").html(val).text();
			
		}
		
        return View;
    }
);
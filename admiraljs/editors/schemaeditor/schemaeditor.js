define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','jquery',"jsonlint","tinymce"],
    function( _, Backbone,EditorClass,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var SchemaEdit=Backbone.View.extend({
			className:"popupschemaedit",
			template:'<textarea class="input" /><div class="message" ></div>',
			initialize:function(options) {
				this.$el.html(this.template)
				this.input=this.$el.find('.input');
				this.message=this.$el.find('.message');
				this.input.val(options.value)
			}
		})
		
		var View=EditorClass.extend({
			template:'<button>Edit</button>',
			events:{'click button':"editMe"},
			initialize:function(options) {
				var that=this;
				this.options=options;
				this._super('initialize', options);
			
				
			},editMe:function () {
					var that=this;
				var popup=new AJS.ui.PopUp();
			   	var v=new SchemaEdit({value:this.options.value});
				popup.setContent(v.$el)
				
				var buttonInsert=$('<div class="button update" >Update</div>');
				popup.addButton(buttonInsert)
				buttonInsert.click(function() {
					var val=v.input.val();
					
		            try {
		              var result = jsonlint.parse(val);
		              if (result) {
						  
						  v.message.html( "JSON is valid!")
	  					that.value=val;
	  			   		that.trigger("change");
	  						popup.closeMe();
	  						setTimeout(function() {
	  							Backbone.history.loadUrl();
	  						},1000)
							v.input.val(JSON.stringify(result, null, "  "));
							
		              
		              }
		            } catch(e) {
						v.message.html(e);
		            }
					
					
				
				})
				
				popup.show();
			
		   	
				
			},displayValue:function() {
			
				
			}
		})
		
		
		
        return View;
    }
);
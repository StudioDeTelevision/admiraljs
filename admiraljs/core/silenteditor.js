define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','bootstrap'],
    function($, _, Backbone,template) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var SilentEditorView=Backbone.View.extend({
			tagName:"div",
			type:'text',
			value:null,
			input:null,
			template:null,
			className:"form-group",
			initialize:function(options) {
			//	console.log('editor init')
			
			
			// USED FOR CUSTOM ACTION FIELDS WITHOUT VALUE
			
			
				var that=this;
				
				for (var o in options) {
					this[o]=options[o];
				}
				
			
				
				this.name=options.name;
				
				
				this.label=$('<label/>');
				this.label.html(options.label)
				this.label.addClass("col-sm-2 control-label");
				
				this.$el.append(this.label)
				
				this.fieldContainer=$('<div/>');
					this.fieldContainer.addClass("col-sm-8 ");
					
					
				
				
				
				this.$el.append(this.fieldContainer)
				
			this.setContent(this.template)
				
			},
			setContent:function(el) {
				
				this.fieldContainer.append(el);
			},
			
			setValue:function(val) {
				
				
				//this.input.val(val)
				
			},getValue:function(val) {
			
				
			}
		})
		
		
		
        return SilentEditorView;
    }
);
define(['jquery',    
  'underscore', 
  'backbone','bootstrap'],
    function($, _, Backbone,template) {
       
		
		var View=Backbone.View.extend({
			tagName:"div",
			type:'text',
			value:null,
			input:null,
			template:null,
			className:"form-group",
			initialize:function(options) {
		
				var that=this;
				
				for (var o in options) {
					this[o]=options[o];
				}
				
				this.fieldOptions=options;
				
				this.name=options.name;
				
				
				this.label=$('<label/>');
				this.label.html(options.label)
				this.label.addClass("col-sm-2 control-label");
				
				this.$el.append(this.label)
				
				this.fieldContainer=$('<div/>');
					this.fieldContainer.addClass("col-sm-8 ");
					
					
				this.fieldContainer.append(this.template)
				
				
				this.$el.append(this.fieldContainer)
				
			
				this.input=this.$el.find('.input').first();
				
				
				this.input.attr('name',this.name)
				
			
				
				
				this.setOnChange();
				

				
				
			},displayValue:function() {
			
				if (  this.input[0].type != 'file') {
								
								  this.input.val(this.value)
							}
				
			},setValue:function(val) {
				
				
					this.value=val;
				if (typeof val=="undefined" && this.default) {
					this.value=this.default;
				}
				
			
				this.displayValue();
			
				
			},getValue:function(val) {
			return	this.value;
				
			},setOnChange:function() {
				var that=this;
				this.input.on('change',function() {
					that.value=that.input.val();
					that.trigger('change');
					console.log(that.input.val())
				})
			}
		})
		
		
		
        return View;
    }
);
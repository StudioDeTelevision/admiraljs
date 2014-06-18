define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','bootstrap'],
    function($, _, Backbone,template) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=Backbone.View.extend({
			tagName:"div",
			type:'text',
			value:null,
			input:null,
			template:null,
			className:"form-group",
			initialize:function(options) {
			//	console.log('editor init')
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
				
				//console.log('tempalte',this.$el.html())
				
				this.input=this.$el.find('.input').first();
				
				//console.log('input',this.input)
				this.input.attr('name',this.name)
				
				//console.log(this.input)
			//	if (  this.input[0].type != 'file') {
					//alert(options.value)
				//   this.input.val(options.value)
				//}
				
				
				this.setOnChange();
				

				
				
			},displayValue:function() {
				// console.log("input",this.input)
// 				this.input.val(this.value)
				if (  this.input[0].type != 'file') {
									//alert(options.value)
								  this.input.val(this.value)
							}
				
			},setValue:function(val) {
				
				this.value=val;
				this.displayValue();
				//this.input.val(val)
				
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
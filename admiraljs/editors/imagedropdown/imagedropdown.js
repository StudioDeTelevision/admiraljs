define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','./vendor/jquery.dd','css!./vendor/dd.css'],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			relatedModel:null,
			template:'<select class="input" />',
			initialize:function(options) {
				var that=this;
				
				
				this._super('initialize', options);
				
				
				this.collection=new Backbone.Collection();
					this.collection.modelName=options.relatedModel;
					
					console.log('OPTIONS',options)
					
				 this.collection.url = AJS.config.api+AJS.schemas[options.relatedModel].find;
				 console.log(options.relatedModel)
				 this.collection.fetch({success:function(col) {
					
					 var opt=$('<option value=""  >select</option>');
					that.input.append(opt);
					 col.forEach(function(item) {
						 var display_field=AJS.schemas[options.relatedModel].listFields[0];
						 var isselected=(that.value!=null) ? "selected" : "";
						 var opt=$('<option value="'+item.id+'" '+isselected+' >'+item.get(display_field)+'</option>');
						that.input.append(opt);
						
						
						
					 })
					 
					 try {
					that.input.msDropDown();
					 } catch(e) {
					 alert(e.message);
					 }
					
					if (that.value!=null) { 
						
						that.setValue(that.value) 
					}
				 }})
				
			},
			setValue:function(val) {
				
				this.value=val;
				$("option[value=" + val + "]",this.input).attr('selected', 'selected');
			}
		})
		
		
		
        return View;
    }
);
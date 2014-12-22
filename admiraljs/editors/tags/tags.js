define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',
'core/editor',
"tag-it","css!./tags.css"],
    function($, _, Backbone,EditorClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			template:'<input class="input" type="hidden" /><ul class="tagWrapper" ></ul><div class="propositions" ></div>',
			events:{"click .proposition":"propose"},
			initialize:function(options) {
				var that=this;
				var locked=true;
				
				this._super('initialize', options);
				
				this.tagWrapper=this.$el.find('.tagWrapper');
				
				if (options.options) {
					var propositions=this.$el.find('.propositions');
					_.each(options.options,function(opt) {
						
						propositions.append("<li class='proposition' >"+opt+"</li>")
						
					})
				
				}
				
			
				this.tagWrapper.tagit({
					availableTags:options.options || [],
					afterTagAdded:function(event,ui) {
						var tags=that.tagWrapper.tagit("assignedTags");
					//	console.log(tags)
						
						//that.setValue(tags);
						if (that.value.indexOf(ui.tag)!=-1) {
							
							
						} else {
							
							that.value=tags;
							that.trigger("change");
							
						}
					
						//alert(that.value.length)
					// if (!locked) {
	//
	// 					that.value=tags;
	// 					that.trigger("change");
	// 				}
					},afterTagRemoved:function(event,ui) {
						var tags=that.tagWrapper.tagit("assignedTags");
					
						
						that.value=tags;
						that.trigger("change");
					
					}
				});
				
				setTimeout(function() {
					locked=false;
				},3000)
				
			
				
			},propose:function(e) {
				var target=e.currentTarget;
				this.$el.find('.tagWrapper').tagit("createTag", $(target).text());
		
			},setValue:function(val) {
				var that=this;
				this.value=val || new Array();
				this.displayValue();
				
			},displayValue:function() {
				var that=this;
				var val=this.value;
				if (val) {
					_.each(val,function(tag) {
						that.$el.find('.tagWrapper').tagit("createTag", tag);
				
					})
				}
				
			}
		})
		
		
		
        return View;
    }
);
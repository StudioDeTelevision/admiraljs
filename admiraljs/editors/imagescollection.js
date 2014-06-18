define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','./collection'],
    function($, _, Backbone,CollectionClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var ImageItem=Backbone.View.extend({
			tagName:"a",
			className:"item",
			initialize:function(options) {
				var that=this;
				//alert(options.modelName)
  				
				///{"name":"picto","type":"number","editor":"imagescollection","imageField":"file","useThumbs":"false","relatedModel":"specialpictos","label":"picto"},
				  
				var img=$('<img/>');
				
				if (options.fieldOptions.imageField==null) {
					options.fieldOptions.imageField="src";
					console.log("image collection use "+options.fieldOptions.imageField+" as image Field")
					
				}
				
				var imageDir=AJS.config.thumbDir;
				
				if (options.fieldOptions.useThumbs=="false") {
					
						 imageDir=AJS.config.fileDir;
					
				}
				
				img.attr('src',imageDir+options.model[options.fieldOptions.imageField])
			that.$el.append(img)
			  
			var deleteButton=$("<div class='button-remove' ></div>");
			this.$el.append(deleteButton)
			deleteButton.click(function(e) {
				e.stopPropagation();
				that.trigger('delete',that.model.id);
			})
				
			}
			
		});
		
		var View=CollectionClass.extend({
			CollectionItem:ImageItem,
			className:"imagecollection",
			initialize:function(options) {
				var that=this;
				CollectionClass.prototype.initialize.call(this,options);
				
			
				
			}
		})
		
		
		
        return View;
    }
);
define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./recordslist.html'],
    function($, _, Backbone,htmlTemplate) {
		
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
	
		
		var View=Backbone.View.extend({
			tagName:"div",
			className:"",
			events:{
				"click .recorditem":"selectRecord"
			},
			
			initialize:function(options) {
				var that=this;
				this.schema=AJS.schemas[options.modelName];
				
				this.$el.html(_.template(htmlTemplate,options));
				
				this.container=$(".recordscontainer",this.$el);
				var ModelDynamic=Backbone.Model.extend({
					 idAttribute: AJS.config.recordID
				});
				var MyCollection = Backbone.Collection.extend({model:ModelDynamic});
			this.collection=new MyCollection();
				this.collection.modelName=options.modelName;
				
				
				var firstFieldName=this.schema.listFields[0];
				
			 this.collection.url = AJS.config.api+AJS.schemas[options.modelName].find+"?limit=50000&sort="+firstFieldName;
			 
			 /// TODO ADD PAGINATE
			 
			 
			 // var displayFieldName=this.schema.listFields[0];
 //
 //
 // 			var fieldDescription=_.findWhere(this.schema.fields,{"name":displayFieldName});
 //
 // 			 if (fieldDescription.editor!=null) {
 //
 // 				 var editor=fieldDescription.editor;
 //
 // 			   var fieldClass=AJS.fieldClasses[editor];
 // 			 }
			
		  // console.log(AJS.fieldClasses,"fieldClass",fieldClass)
		   
		
			 
			  this.collection.fetch({success:function(col) {
			  	
				  col.forEach(function(item) {
					  console.log('ITEM',item.id)
					
					  var displayLine=$("<div class='recorditem' />");
					  displayLine.attr('itemid',item.id)
					  
		  			_.each(that.schema.listFields,function(displayFieldName) {
						if (displayFieldName=="published") return;
		  				var fieldDescription=_.findWhere(that.schema.fields,{"name":displayFieldName});
		  				console.log("fieldDescription",fieldDescription)
		  				 if (fieldDescription.editor!=null) {
		  	   				 var editor=fieldDescription.editor;
		 
		  	   			   var displayLinefieldClass=AJS.fieldClasses[editor];
					 
		  				 }
				 
		  				  var raw=item.get(fieldDescription.name);
				 
		  				 var span=$("<span class='collectiondisplayvalue' ></span>");
		  	   		   if (displayLinefieldClass!=null) {
		  	   		    if (displayLinefieldClass.display!=null) {
		  					console.log("fieldDescription",raw)
		  					console.log("fieldDescription",displayLinefieldClass.display(raw))
					
		  					span.append(displayLinefieldClass.display(raw))
	   				
						
		  	   			}
		  	   			else 
		  					span.append(raw);
		
		  	   		}	else 
		  	   				span.append(raw);
			
		  			displayLine.append(span)
			
				
		  			})
					  
					  // var raw=item.get(displayFieldName);
  // 					   if (fieldClass!=null) {
  // 					    if (fieldClass.display!=null) {
  // 							i.html(fieldClass.display(raw))
  // 						}
  // 						else
  // 						i.html(raw)
  //
  // 					}	else
  // 						i.html(raw)
					  
					 
					
					  	that.container.append(displayLine)
					
				  })
				
				 
				
			  }})
		
			 
		 },selectRecord:function(e) {
			 var target=e.currentTarget;
			 this.trigger('selectitem',$(target).attr('itemid'))
			 
			
		 }
		  });
		  
		  return View;
		 
	 });
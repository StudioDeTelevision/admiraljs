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
				
			this.collection=new Backbone.Collection();
				this.collection.modelName=options.modelName;
			 this.collection.url = AJS.config.api+AJS.schemas[options.modelName].find;
			 
			 
			 var displayFieldName=this.schema.listFields[0];
			
			 
			var fieldDescription=_.findWhere(this.schema.fields,{"name":displayFieldName});
			 
			 if (fieldDescription.editor!=null) {
			 	
				 var editor=fieldDescription.editor;
			 
			   var fieldClass=AJS.fieldClasses[editor];
			 }
			
		  // console.log(AJS.fieldClasses,"fieldClass",fieldClass)
		   
    
			 
			  this.collection.fetch({success:function(col) {
			  	
				  col.forEach(function(item) {
				  	
					  console.log(item)
					  var i=$("<div class='recorditem' />");
					  i.attr('itemid',item.id)
					  var raw=item.get(displayFieldName);
					   if (fieldClass!=null) {
					    if (fieldClass.display!=null) {
							i.html(fieldClass.display(raw))
						}
						else 
						i.html(raw)
						
					}	else 
						i.html(raw)
					  
					 
					
					  	that.container.append(i)
					
				  })
				
				 
				
			  }})
		
			 
		 },selectRecord:function(e) {
			 var target=e.currentTarget;
			 this.trigger('selectitem',$(target).attr('itemid'))
			 
			
		 }
		  });
		  
		  return View;
		 
	 });
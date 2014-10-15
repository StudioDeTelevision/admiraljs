define( ['jquery','underscore','backbone'],function( $,_,Backbone ) {
		  
		
		
		var Form=Backbone.View.extend({
			tagName:"div",
			className:"editview" 
		});
		
		var Document = Backbone.Model.extend({
			schema:null,
			schemaName:null,
			modelId:null,
			idAttribute:AJS.config.recordID,
			initialize:function(options) {
			
				
				
			},
  urlRoot: function(){
		
	 
    if (this.isNew()){
		console.log('create model')
      return AJS.config.api+AJS.schemas[this.schemaName].create;
    } else {
      return AJS.config.api+AJS.schemas[this.schemaName].find;
    }
  },
fetch: function( fetchOptions ) {

 var fetchData={};
 				
 					if (this.schema.findFilter) {
 						for (var f in this.schema.findFilter) {
 							
 							fetchData[f]=this.schema.findFilter[f];
 						}
 					}
	
 	fetchOptions.data=	fetchData;			
 	fetchOptions.type="POST";
	
	 return Backbone.Collection.prototype.fetch.call(this, fetchOptions);
}
});
		
		var View=Backbone.View.extend({
			tagName:"div",
			className:"",
			templateName:null,
			initialize:function(options) {
				var that=this;
				this.schema=AJS.schemas[options.schemaName];
				this.schemaName=options.schemaName;
				this.form=new Form();
				this.form.$el.attr('role','form');
				this.form.$el.addClass('form-horizontal');
				
				this.$el.append(this.form.$el)
				this.model=new Document();
				this.model.schema=this.schema;
				console.log('schema',this.model.schema)
				this.model.schemaName=options.schemaName;
				if (this.schema.template) this.templateName=this.schema.template;
				this.model.id=options.modelId;
				this.model.fetch({success:function() {
					
					that.render();
				}});
				
				
			},render:function() {
				var that=this;
				
				var fields=this.schema.fields;
				
				if (this.model.attributes._schema) {
					
				
					
					var additionalFields=this.model.attributes._schema.fields;
					console.log("___ FIELDS EXTENSION")
					console.log(fields)
					console.log(additionalFields)
					//_.extend(fields, additionalFields);
					
					var fields = fields.concat(additionalFields);
					console.log("___ FIELDS EXTENSION DONE",fields)
				}
				
				
				var fieldsGrid=[];
	  		  var fieldClasses=AJS.fieldClasses;
		  
	  
				for (var f in fields ) {
					
					var fieldClass=fieldClasses[fields[f].editor];
					
					
					var options=fields[f];
					options.value=this.model.get(fields[f].name);
					var newfield=new fieldClass(options);
					console.log('fieldClass fieldClass',fields[f].editor,newfield)
				
					newfield.setValue(this.model.get(fields[f].name));
			
					
					newfield.bind('change',function() {
					
						that.model.set(this.name,this.getValue());
					
					
						
						that.model.save({}, {
        url: AJS.config.api+AJS.schemas[that.schemaName].update+'/'+that.model.id,
		success: function() { //
		console.log("MODEL WAS SUCCESS FULLY SAVED",that.model) 
		}
	})
	
						
					})
			
					newfield.$el.addClass('form-group');
					
					
					fieldsGrid[fields[f].name]=newfield.$el;
					
					
					
	   			
					
					
					
				}
			
				if (this.templateName && AJS.templates[this.templateName]) {
					
					 var templateRAW=AJS.templates[this.templateName];
					
					var template=$("<div>"+templateRAW+"</div>");
					for (var f in fieldsGrid ) {
				
						var block=template.find('[for="'+f+'"]').first();
					
						if (block.size()>0) {
					
							block.append(fieldsGrid[f])
							
						}
					}
					this.form.$el.append(template);
					
					
				}
				else {
					
					for (var f in fieldsGrid ) {
						
						this.form.$el.append(fieldsGrid[f])
					}
					
					
				}
				
				
				
   			 var deleteButton=$('<div type="button" class="button-edit-delete btn btn-danger" >Delete</div>');
			
   			 $(this.$el).append(deleteButton);
				
			 deleteButton.click(function() {
				 
				 if (!confirm('sure ?')) return
				 
				 var url=AJS.config.api+AJS.schemas[that.schemaName].destroy+"/"+that.model.id;
				 $.ajax({
				   dataType: "json",
				   url: url,
				   success: function(data) {
			   	
					
					   AJS.router.navigate("list/"+that.schema.schemaName, {trigger: true})
		
				
				   }
				 });
		   
	 
			 })
				
				
			}
		})
		
        return View;
    }
);
define( ['jquery','underscore','backbone'],function( $,_,Backbone ) {
		  
		
		
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var Form=Backbone.View.extend({
			tagName:"div",
			className:"editview" 
		});
		
		var Document = Backbone.Model.extend({
			schema:null,
			schemaName:null,
			modelId:null,
			initialize:function(options) {
			
				
				
			},
  urlRoot: function(){
				//console.log('fetch model',this.id)
	 
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
		//fetchOptions.reset=true;
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
					
					// Embedded schema exists 
					// For dynamic schema 
					
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
				//	console.log(fields[f].name+" - editor:"+fields[f].editor+" &class: "+fieldClass )
					var newfield=new fieldClass(options);
					newfield.setValue(this.model.get(fields[f].name));
				// if (fields[f].relatedModel!=null && typeof fields[f].relatedModel!="undefined" ) {
// 					
// 					newfield.relatedModel=fields[f].relatedModel;
// 					
// 				}
					
					newfield.bind('change',function() {
						//console.log('CHANGE ON #'+this.name+"#",this.getValue())
						//console.log(typeof this.getValue())
						//console.log("ACTUAL",that.model.get(this.name))
						that.model.set(this.name,this.getValue());
						//that.model.attributes[this.name]=this.getValue();
				console.log('CHECK CHANGE ON #'+this.name,that.model.get(this.name))
						//console.log("VALUEthat.model.get(this.name))
						//console.log('MODEL SAVE',that.model,AJS.config.api+AJS.schemas[that.schemaName].update+'/'+that.model.id)
						
						// var attrtochange={};
// 						attrtochange[this.name]=this.getValue();
						
						that.model.save({}, {
        url: AJS.config.api+AJS.schemas[that.schemaName].update+'/'+that.model.id,
		success: function() { //
		console.log("MODEL WAS SUCCESS FULLY SAVED",that.model) 
		}
	})
		//		   			console.log('MODEL SAVED',that.model)
						
					})
					//newfield.setValue(this.model.get(fields[f].name));
					newfield.$el.addClass('form-group');
					
					
					fieldsGrid[fields[f].name]=newfield.$el;
					
					
					
	   			
					
					
					
				}
			//	alert(AJS.templates["kunstTemplate"])
				//alert(this.templateName)
				if (this.templateName && AJS.templates[this.templateName]) {
					
					 var templateRAW=AJS.templates[this.templateName];
					//console.log('RAW TEMPLATE',templateRAW)
// 					var compiled=_.template(templateRAW);
// 					this.form.$el.html(compiled(fieldsGrid));
					var template=$("<div>"+templateRAW+"</div>");
					for (var f in fieldsGrid ) {
					//console.log('FIND','div[for="'+f+'"]')
						var block=template.find('[for="'+f+'"]').first();
						//	console.log('FIND',block)
						if (block.size()>0) {
						//	alert(f)
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
			 //$(this.$el).append("<hr/>");
   			 $(this.$el).append(deleteButton);
				
			 deleteButton.click(function() {
				 
				 if (!confirm('sure ?')) return
				 
				 var url=AJS.config.api+AJS.schemas[that.schemaName].destroy+"/"+that.model.id;
				 $.ajax({
				   dataType: "json",
				   url: url,
				   success: function(data) {
			   	
					   //AJS.currentModel=this.model;
					   AJS.router.navigate("list/"+that.schema.schemaName, {trigger: true})
		
				
				   }
				 });
		   
	 
			 })
				
				
			}
		})
		
        return View;
    }
);
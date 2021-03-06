define(['jquery',    
  'underscore', 
  'backbone','./listsearchview','./paginatedcollection','./paginatedview'],
    function($, _, Backbone,SearchView,PaginatedCollection,PaginatedView) {
		
		
		
		var ListHeaderView= Backbone.View.extend({
			tagName:"div",
			className:"list-header",
			initialize:function() {
				
				
			}
			
		});
	
		
		var View=Backbone.View.extend({
			tagName:"div",
			className:"",
			events: {
			"click .createButton":"createButtonClick"
			},
			initialize:function(options) {
				var that=this;
				
				this.schema=AJS.schemas[options.schemaName];
	
				var MyPaginated=PaginatedCollection.extend({
					baseUrl:AJS.config.api+this.schema.find,
					page: 1,
					model:AJS.Data.Model
				})
				
				this.collection=new MyPaginated()
				
		
				this.collection.modelName=this.schema.model;
				this.collection.schemaName=options.schemaName;
				this.collection.schema=this.schema;
				
				
   			 var columns = [];
			 
			 
			 
     			 for (var f in this.schema.listFields) {
   				 var fieldname=this.schema.listFields[f];
				 
   				var fieldDescription=_.findWhere(this.schema.fields,{"name":fieldname});
				if (typeof fieldDescription=="undefined") continue;
				 
				
				 
   				 var cell={
     				   editor: fieldDescription.editor,
     				   name: fieldDescription.name,
     				   label: fieldDescription.label
				  
     				 };
			
     				columns.push(cell);
				
     			 }
				
				
				var view=new PaginatedView({collection:this.collection,  columns: columns});
				
				
				
				var listHeader=new ListHeaderView();

				

				this.searchView=new SearchView({schemaName:that.collection.schemaName});
		
				listHeader.$el.append(this.searchView.$el);
			
				 $(this.$el).append(listHeader.el); 
				 
				 
	 			this.searchView.on('search',function() {
				
					var filters=this.filters;
					that.collection.page=1;
					that.collection.setFilters(filters);
					
					
				
	 			})
				 
				
				this.$el.append(view.$el);
				
				
				
   			 var createButton=$('<div type="button" class="btn btn-default createButton" >Create</div>');
   			  $(this.$el).append("<br/>");
   			 $(this.$el).append(createButton);
			 
   			 var createButton2=$('<button class="createButton list-header-element" >Create</button>');
   			 
			listHeader.$el.append(createButton2);
			 
   			
				
				this.collection.fetch();
				
				
				
				
				
				
				return;
				
	
			 
			 
			 
			},createButtonClick:function() {
				var that=this;
  				 var url=AJS.config.api+AJS.schemas[this.collection.schemaName].create;
			
  				 $.ajax({
  				   dataType: "json",
  				   url: url,
  				   success: function(data) {
  					   var id="";
  					   if (data.id != null) id=data.id;
  					   if (data._id != null) id=data._id;
  					   if (id=="")
  					   {
  						   alert('Error from api')
  						   					   return;
					
  					   } 
			   	
				  
  	AJS.router.navigate("edit/"+that.collection.schemaName+"/"+id, {trigger: true})
		
				
  				   }
  				 });
			}
		})
		
		
		
        return View;
    }
);
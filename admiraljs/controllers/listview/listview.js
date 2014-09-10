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
				
				
   			 var columns = [];
			 
			 
			 
     			 for (var f in this.schema.listFields) {
   				 var fieldname=this.schema.listFields[f];
				 
   				var fieldDescription=_.findWhere(this.schema.fields,{"name":fieldname});
				
				 
				
				 
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
					that.collection.setFilters(filters);
					
					
				
	 			})
				 
				
				this.$el.append(view.$el);
				
				
				
   			 var createButton=$('<div type="button" class="btn btn-default" >Create</div>');
   			  $(this.$el).append("<br/>");
   			 $(this.$el).append(createButton);
			 
   			 createButton.click(function() {
   				 var url=AJS.config.api+AJS.schemas[that.collection.schemaName].create;
				 
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
				 

			 });
				
				
				this.collection.fetch();
				
				
				
				
				
				
				return;
				
		//	 this.collection.url = AJS.config.api+this.schema.find;
			 //+"?limit=1"

			 // var format=function(options) {
 // 				 Backgrid.CellFormatter.apply(this, arguments);
 // 				 this.cell=options.cell;
 // 			 }
			 // format.prototype.fromRaw=function(rawData, model) {
 // 				 console.log('this',this)
 // 			 		return "hey";
 // 			 	}
 //
 //   			 format.prototype.toRaw=function( formattedData, model) {
 //   			 		return formattedData;
 //   			 	}
 
 
 
			
			 var APCell = Backgrid.Cell.extend({
			   render: function () {
			       APCell.__super__.render.apply(this, arguments);
				 
				   
			       if (this.column.attributes.editor!=null) {
					   
					   var fieldClass=AJS.fieldClasses[this.column.attributes.editor];
					 
					   
			      if (fieldClass.display!=null) {
					
					  var raw=this.model.attributes[this.column.attributes.name];
					
					 this.$el.html(fieldClass.display(raw,this.column.attributes.name,this.model,that.collection.schemaName))
					  return this;
			      }
			       }
			       return this;
			     }
			   
		   });
		   
		   
		   
		   
			 var columns = [];
			 
			 
			 
  			 for (var f in this.schema.listFields) {
				 var fieldname=this.schema.listFields[f];
				 
				var fieldDescription=_.findWhere(this.schema.fields,{"name":fieldname});
				
				 
				
				 
				 var cell={
  				   editor: fieldDescription.editor,
  				   name: fieldDescription.name,
  				   label: fieldDescription.label,
  				   cell: APCell,
  				   editable: false
				  
  				 };
			
  				columns.push(cell);
				
  			 }
			 
			 
			 var FocusableRow = Backgrid.Row.extend({
			   highlightColor: "lightYellow",
			   events: {
			     click: "rowClick",
			   },
			   rowClick:function() {
				  
				   AJS.currentModel=this.model;
				
				  
				   AJS.router.navigate("edit/"+this.model.collection.schemaName+"/"+this.model.id, {trigger: true})
			   }
			 });
			 
			 var DeleteCell = Backgrid.Cell.extend({
			     template: _.template("<div class='button-remove' ></div>"),
				 className:"cell-delete",
			     events: {
			       "click": "deleteRow"
			     },
			     deleteRow: function (e) {
					   e.preventDefault();
					   e.stopPropagation();
					   
					   if (!confirm('sure ?')) return
					   
					 var me=this;
			     
				   
  				 var url=AJS.config.api+AJS.schemas[that.collection.schemaName].destroy+"/"+me.model.id;
  				 $.ajax({
  				   dataType: "json",
  				   url: url,
  				   success: function(data) {
			   	
  					 me.model.collection.remove(me.model);
		
				
  				   }
  				 });
				   
			      
			     },
			     render: function () {
			       this.$el.html(this.template());
			       this.delegateEvents();
			       return this;
			     }
			 });
			 
			 columns.push({ name: "",
			     label: "", 
			     editable: false, 
			     cell:DeleteCell
			 	
			 });
			 
			 
			
			 var grid = new Backgrid.Grid({
			   columns: columns,
			   collection: this.collection,
			   row:FocusableRow
			 });
			 
			 
			
			$(this.$el).empty();
			
			var listHeader=new ListHeaderView();

			var searchFields=AJS.schemas[that.collection.schemaName].searchFields;
			
			if (typeof searchFields=="undefined") searchFields=[{label:"Search","name":"title","editor":"string"}];

			this.searchView=new SearchView({listView:this,fields:searchFields});
			
			listHeader.$el.append(this.searchView.$el);
			
			 $(this.$el).append(listHeader.el);
			
			 $(this.$el).append(grid.render().el);
			 
			
			 
			 
			 var createButton=$('<div type="button" class="btn btn-default" >Create</div>');
			  $(this.$el).append("<br/>");
			 $(this.$el).append(createButton);
			 
			 createButton.click(function() {
				 var url=AJS.config.api+AJS.schemas[that.collection.schemaName].create;
				 
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
			   
		 
			 })

			 this.fetch();
			 
			 
			 
			},fetch:function() {
				var that=this;
   		
   			 // var fetchOptions={};
 //   			 var fetchData={};
 //
 //   			 					if (that.schema.findFilter) {
 //   			 						for (var f in that.schema.findFilter) {
 //
 //   			 							fetchData[f]=that.schema.findFilter[f];
 //   			 						}
 // 								}
 //
 // 									var searchFilters=that.searchView.filters;
 //
 //
 // 									//	fetchData.limit=1;
 //
 //
 //
 // 										   			 						for (var f in searchFilters) {
 //
 // 										   			 							if (searchFilters[f]!="") {
 // 																					console.log(searchFilters[f])
 // 										   			 									if (fetchData.where==null) fetchData.where={};
 // 																					fetchData.where[f]=searchFilters[f];
 // 										   			 							}
 // 										   			 						}
 //
 //
 //
 //   									fetchOptions.reset=true;
 //   			 	fetchOptions.data=	fetchData;
 //
 //   			 	fetchOptions.type="POST";
 //
 //   				fetchOptions.error=function() {
 //
 //   					alert('connection broken, try again later')
 //
 //   				}
 //
 //   			 this.collection.fetch(fetchOptions)
				 this.collection.fetch({reset:true,type:"POST"})
			}
		})
		
		
		
        return View;
    }
);
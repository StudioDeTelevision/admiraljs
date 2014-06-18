define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','./listsearchview','backgrid'],
    function($, _, Backbone,SearchView,Backgrid) {
		
					
		
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
				
				
		
			this.collection=new Backbone.Collection;
				this.collection.modelName=this.schema.model;
				this.collection.schemaName=options.schemaName;
			 this.collection.url = AJS.config.api+this.schema.find;

			 var format=function(options) {
				 Backgrid.CellFormatter.apply(this, arguments);
				 this.cell=options.cell;
			 }
			 format.prototype.fromRaw=function(rawData, model) {
				 console.log('this',this)
			 		return "hey";
			 	}

   			 format.prototype.toRaw=function( formattedData, model) {
   			 		return formattedData;
   			 	}
			
			 var APCell = Backgrid.Cell.extend({
			   render: function () {
			       APCell.__super__.render.apply(this, arguments);
				   //console.log("ROW",this.column.attributes.editor)
				   
				  // that.schema.fields
				   
			       if (this.column.attributes.editor!=null) {
					   
					   var fieldClass=AJS.fieldClasses[this.column.attributes.editor];
					  // console.log(AJS.fieldClasses,"fieldClass",fieldClass)
					   
			      if (fieldClass.display!=null) {
					//  console.log("this",this)
					  var raw=this.model.attributes[this.column.attributes.name];
					 // fieldClass.display(this.)
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
				
				 
				
				 
				 
				// console.log("edti",this.schema.fields[f].editor)
				 var cell={
  				   editor: fieldDescription.editor,
  				   name: fieldDescription.name,
  				   label: fieldDescription.label,
  				   cell: APCell,
  				   editable: false
				  
  				 };
				 //console.log(cell)
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
			 
			 columns.push({ name: "", // The key of the model attribute
			     label: "", // The name to display in the header
			     editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
			     // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
			     cell:DeleteCell
			 	
			 });
			 
			 
			 // Initialize a new Grid instance
			 var grid = new Backgrid.Grid({
			   columns: columns,
			   collection: this.collection,
			   row:FocusableRow
			 });
			 
			 
			
			

			 // Render the grid and attach the root to your HTML document
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
				   	
					   //AJS.currentModel=this.model;
	AJS.router.navigate("edit/"+that.collection.schemaName+"/"+data.id, {trigger: true})
			
					
				   }
				 });
			   
		 
			 })

			 this.fetch();
			 
			 
			 
			},fetch:function() {
				var that=this;
   			 // Fetch some countries from the url
   			 var fetchOptions={};
   			 var fetchData={};
			 				
   			 					if (that.schema.findFilter) {
   			 						for (var f in that.schema.findFilter) {
			 							
   			 							fetchData[f]=that.schema.findFilter[f];
   			 						}
								}
									
									var searchFilters=that.searchView.filters;
									
									
										
									
									
									
										   			 						for (var f in searchFilters) {
			 							
										   			 							if (searchFilters[f]!="") {
																					console.log(searchFilters[f])
										   			 									if (fetchData.where==null) fetchData.where={};
																					fetchData.where[f]=searchFilters[f];
										   			 							} 
										   			 						}
										
									
   			 					
   									fetchOptions.reset=true;
   			 	fetchOptions.data=	fetchData;	
				console.log('QUERY DATA',fetchData)		
   			 	fetchOptions.type="POST";
				
   				fetchOptions.error=function() {
					
   					alert('connection broken, try again later')
					
   				}
				
   			 this.collection.fetch(fetchOptions)
				
			}
		})
		
		
		
        return View;
    }
);
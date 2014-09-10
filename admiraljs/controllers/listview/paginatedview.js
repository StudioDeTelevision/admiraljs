define(['jquery',    
  'underscore', 
  'backbone','text!./paginatedview.html'],
    function($, _, Backbone,htmlTemplate) {
		
		
		var PaginatedLineCell= Backbone.View.extend({
			tagName:"td",
			className:"cell"
		});	
		
var PaginatedLine= Backbone.View.extend({
			tagName:"tr",
	className:"line",
	events:{
	"click":"clickMe"	
	},
    initialize: function(options) {
		 var that=this;
		this.columns=options.columns;
		this.model=options.model;
		this.schemaName=options.schemaName;
	 // var cell={
 // 		   editor: fieldDescription.editor,
 // 		   name: fieldDescription.name,
 // 		   label: fieldDescription.label
 //
 // 		 };
		 
		 
		for (var c in this.columns) {
			var column= this.columns[c]

			console.log('display colmun',column)
			
	        if (column.editor!=null) {
		  
	 		   var fieldClass=AJS.fieldClasses[column.editor];
		    var raw=this.model.attributes[column.name];
		   var cell=new PaginatedLineCell();
	       if (fieldClass.display!=null) {
	
  		
			 cell.$el.html(fieldClass.display(raw,column.name,this.model,this.schemaName))
			
	 		
	 		 
	       }
		   else {
		   	 cell.$el.html(raw);
			
		   }
		   this.$el.append(cell.$el)
		   
	        }
			
		}
		
		
		
		
	 var ToolsCell = new PaginatedLineCell();
	 
	 var deleteButton=$("<div class='button-remove' ></div>");
	 deleteButton.on('click',function(e) {
	   e.preventDefault();
	   e.stopPropagation();
	   
	   if (!confirm('sure ?')) return
	   
	
   
   
 var url=AJS.config.api+AJS.schemas[that.collection.schemaName].destroy+"/"+that.model.id;
 $.ajax({
   dataType: "json",
   url: url,
   success: function(data) {
 	
	 that.model.collection.remove(that.model);


   }
 });
		
		
	 })
	 
	 
	 ToolsCell.$el.append(deleteButton)
	 
	  this.$el.append(ToolsCell.$el)
	 
	 

		
		
		
		
		
		
		
		
     
    }, clickMe: function() {
	   AJS.currentModel=this.model;
	
	  
	   AJS.router.navigate("edit/"+this.model.collection.schemaName+"/"+this.model.id, {trigger: true})
		
      
		
		
	}
	
});

var PaginatedView = Backbone.View.extend({
	columns:null,
	className:"listview",
  initialize: function(options) {
    _.bindAll(this, 'previous', 'next', 'render');
    this.collection.bind('fetched', this.render);
	this.columns=options.columns;
  },
  events: {
    'click .prev': 'previous',
    'click .next': 'next',
    'click .fprev': 'fprevious',
    'click .fnext': 'fnext'
  },
  render: function() {
	  var that=this;
	  console.log(that.columns)
	  this.$el.html(htmlTemplate)
	  this.$el.find('.pagination .current').html(this.collection.page+"/"+this.collection.pageInfo().pages)
	 
	  var tableHead=$('<thead/>');
	    var tr=$('<tr/>');
		tableHead.append(tr)
	  _.each(this.columns,function(hi) {
		  var td=$('<td/>');
		  td.html(hi.label)
		tr.append(td)
		  
		
		
	  })
	  
	  //tools header
	   var td=$('<td/>');
	tr.append(td)
	 
	 
	 that.$el.find('.tablelist').append(tableHead);
	 
	  this.collection.forEach(function(item) {
	  	
		//  alert('hey')
		var line=new PaginatedLine({model:item,columns:that.columns,schemaName:that.collection.schemaName})
		that.$el.find('.tablelist').append(line.$el);
		
		
	  })
	  
   // this.el.html(app.templates.pagination(this.collection.pageInfo()));
  },
 
  previous: function() {
	 
    this.collection.previousPage();
    return false;
  },
 
  next: function() {
    this.collection.nextPage();
    return false;
  },
 
  fprevious: function() {
	 
    this.collection.getPage(1);
    return false;
  },
 
  fnext: function() {
     this.collection.getLastPage();
    return false;
  }
});


return PaginatedView;

});
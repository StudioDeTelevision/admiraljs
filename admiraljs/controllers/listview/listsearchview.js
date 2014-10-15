define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',
  './querymaker'],
    function($, _, Backbone,QueryMaker) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var SearchView= Backbone.View.extend({
			tagName:"div",
			className:"list-search list-header-element",
			events:{
				"click .searchButton":"searchIt",
				"click .resetButton":"resetMe"
			},
			
			initialize:function(options) {
				this.filters=null;
		 this.fieldClasses=AJS.fieldClasses;
		 var that=this;
		 this.schema=AJS.schemas[options.schemaName];
		 var searchFields=this.schema.searchFields;
		
		if (typeof searchFields=="undefined" || searchFields==null) {
			searchFields=[];
			for (var f in this.schema.fields) { 
				searchFields.push(this.schema.fields[f].name);
			}
			
		}
		this.searchFields=searchFields;
		
		
		this.input=$('<input class="input" type="text" name="search" value="" />');
		this.input.on("keypress",function(e) {
			if(e.which == 13) {
				that.searchIt()
			    }
			
			
		})
		this.button=$('<button class="searchButton" >search</button>');
		this.rbutton=$('<button class="resetButton" >reset</button>');
		
		this.$el.append(this.input)
		this.$el.append(this.button)
		this.$el.append(this.rbutton)
		
	},resetMe:function() {
		this.input.val("");
		 this.filters=null;
		 this.trigger('search')
	},searchIt:function() {
		
	
	//	var criteria="$regex";
		
		var val=this.input.val();
		var searchFields=this.searchFields;
		
		if (val!="") {
this.filters={};

if (searchFields.length>0) {
	this.filters[QueryMaker.or]=new Array();
}
			for (var f in searchFields) { 
				
				
				var fieldName=searchFields[f];
				console.log(fieldName)
				
				var fieldDeclaration=_.findWhere(this.schema.fields, {"name":fieldName}) ;
				
				var editorName=fieldDeclaration.editor;
				console.log(editorName)
			
				
				
				
				if (editorName.indexOf("multilang")!=-1) {
				
									var langExt="."+AJS.config.defaultLanguage;
									
									var qObj={};
									qObj[fieldName+langExt]={};
								
									//qObj[fieldName+langExt][criteria]= ".*"+val+".*";
									
									QueryMaker.contains(qObj[fieldName+langExt],val);
									
									
									this.filters[QueryMaker.or].push(qObj)
									
					
				}
				else {
					console.log(editorName+"is multilang")
						
						
						var qObj={};
						qObj[fieldName]={};
						
						QueryMaker.contains(qObj[fieldName],val);
						
						
						this.filters[QueryMaker.or].push(qObj)
						
					
					
				}
				
				

			
			}
			
		}
		else {
			
			 this.filters=null;
		}
		
		
		
			
		
		this.trigger('search')


		
				}
	
		});
		
        return SearchView;
    }
);

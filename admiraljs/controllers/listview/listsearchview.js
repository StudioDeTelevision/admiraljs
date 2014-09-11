define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var SearchView= Backbone.View.extend({
			tagName:"div",
			className:"list-search",
			events:{
				"click .searchButton":"searchIt"
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
		
		
		this.input=$('<input type="text" name="search" value="" />');
		
		this.button=$('<button class="searchButton" >search</button>');
		
		this.$el.append(this.input)
		this.$el.append(this.button)
		
	},searchIt:function() {
		
	
		var criteria="$regex";
		
		var val=this.input.val();
		var searchFields=this.searchFields;
		console.log('sf',searchFields)
		if (val!="") {
this.filters={};
if (searchFields.length>0) {
	this.filters["$or"]=new Array();
}
			for (var f in searchFields) { 
				
				
				var fieldName=searchFields[f];
				console.log(fieldName)
				
				var fieldDeclaration=_.findWhere(this.schema.fields, {"name":fieldName}) ;
				//var fieldClass=this.fieldClasses[searchFields[f]];
				var editorName=fieldDeclaration.editor;
				console.log(editorName)
				//	this.filters[fieldName]={};
				if (editorName.indexOf("multilang")!=-1) {
				
									var langExt="."+AJS.config.defaultLanguage;
									//alert(langExt)
									var qObj={};
									qObj[fieldName+langExt]={};
								
									qObj[fieldName+langExt][criteria]= ".*"+val+".*";
									this.filters["$or"].push(qObj)
									// this.filters["$or"][fieldName+langExt]={};
		// 											this.filters["$or"][fieldName+langExt][criteria]= ".*"+val+".*";
					
				}
				else {
					console.log(editorName+"is multilang")
						//alert(langExt)
						
						var qObj={};
						qObj[fieldName]={};
						
						qObj[fieldName][criteria]= ".*"+val+".*";
						this.filters["$or"].push(qObj)
						
						// this.filters["$or"][fieldName]={};
	// 									this.filters["$or"][fieldName][criteria]= ".*"+val+".*";
					
				}
				
				

			
			}
			
		}
		else {
			
			 this.filters=null;
		}
		
		
		
			
		
		this.trigger('search')


		//this.listView=options.listView;

				// for (var f in searchFields) {
// 					var fieldClass=fieldClasses[searchFields[f].editor];
//
// 					var newfield=new fieldClass(searchFields[f]);
// 					this.$el.append(newfield.$el)
// 						newfield.bind('change',function() {
//
//
//
// 						var fieldName=this.name
// 						var val=this.getValue();
//
// 					    // criteria attribute can be = ['not', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual',
//    // 					      '<', '<=', '!', '>', '>=', 'startsWith', 'endsWith', 'contains', 'like'];
// 						var langExt="";
// 						if (this.multilang) {
//
// 							langExt="."+AJS.config.defaultLanguage;
//
// 						}
//
// 						if (val!="") {
//
// 							var criteria="contains";
//
// 							if (this.criteria) criteria=this.criteria
//
//
//
// 							that.filters[fieldName+langExt]={};
// 							that.filters[fieldName+langExt][criteria]=val;
// 						}
// 						else {
//
// 							delete that.filters[fieldName+langExt];
// 						}
//
//
// 						that.listView.fetch();
//
// 						});
// }
				}
	
		});
		
        return SearchView;
    }
);

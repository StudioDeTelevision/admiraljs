define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var SearchView= Backbone.View.extend({
			tagName:"div",
			className:"list-search",
			
			initialize:function(options) {
				this.filters={};
		 var fieldClasses=AJS.fieldClasses;
		 var that=this;
		 this.listView=options.listView;
		 
				for (var f in options.fields) {
					var fieldClass=fieldClasses[options.fields[f].editor];
				
					var newfield=new fieldClass(options.fields[f]);
					this.$el.append(newfield.$el)
						newfield.bind('change',function() {
							
							
						
						var fieldName=this.name
						var val=this.getValue();
						
					    // criteria attribute can be = ['not', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual',
   // 					      '<', '<=', '!', '>', '>=', 'startsWith', 'endsWith', 'contains', 'like'];
						var langExt="";
						if (this.multilang) {
							
							langExt="."+AJS.config.defaultLanguage;
							
						}
						
						if (val!="") {
							
							var criteria="contains";
							
							if (this.criteria) criteria=this.criteria 
							
							
							
						
							//fieldName+langExtalert(fieldName+langExt+" - "+criteria+" "+val)
							//that.filters[fieldName+langExt]={criteria:val};
							
							that.filters[fieldName+langExt]={};
							that.filters[fieldName+langExt][criteria]=val;
						}
						else {
							
							delete that.filters[fieldName+langExt];
						}
						
					
						that.listView.fetch();
							
						});
					
				}
		
		
			}
	
		});
		
        return SearchView;
    }
);

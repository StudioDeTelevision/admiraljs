define(["jquery","backbone"], function ($,Backbone) {
	

	var Loader=Backbone.View.extend({initialize:function(options) {
		var that=this;
		var url=options.folder+"schemas.json";
		
		
	    $.ajax({
	               url : url,
	               dataType: "text",
	               success : function (schemas) {
	                  
	            
			
			schemas=eval('(' + schemas + ')');


			for (var i=0; i<schemas.length; i++) {
	
				var schem = _.clone(schemas[i]);
	
	
				if (schem.extends!=null) {
		
					var parent=_.findWhere(schemas,{"schemaName":schem.extends});
		
					if (parent) {
			
						for (var p in parent) {
				
							if (schem[p]) {
								console.log("preserve attribute ",p)
							}
							else {
									console.log("copy attribute ",p)
								schem[p]=parent[p];
							}
				
				
				
						}
			
					}
		
					else {
		
						alert('extends undefined class (parent class must be defined before) '+schem.schemaName)
					}
		
		
				}
	
				// adds CRUD Urls if needed
	
	
				if (schem.create==null) schem.create=schem.model+"/create";
				if (schem.update==null) schem.update=schem.model+"/update";
				if (schem.find==null) schem.find=schem.model+"/find";
				if (schem.destroy==null) schem.destroy=schem.model+"/destroy";
	
				// Little loop to authorize use of Function in the schema definitions

	
				for (var p in schem) {
					(function(p,myschem){
	
	
					myschem["_"+p]=myschem[p];
					delete myschem[p];
		
		
		
					Object.defineProperty(myschem,p,{
					    get: function() { 
			
							if (typeof this["_"+p]=="function") {
								return this["_"+p]();
							}
							else return this["_"+p];
						 }
					  });
					  })(p,schem)
				}
	
				// End of Little loop to authorize use of Function in the schema definitions
		
		
		
	
	
				AJS.schemas[schem.schemaName]=schem;
	
			}



		
				 
					
				
					that.trigger('success');
			}
			
		})
		
		
	}
	
	})
	
	return Loader;

			
		
	
});
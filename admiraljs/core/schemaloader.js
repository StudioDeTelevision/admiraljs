define(["jquery","backbone","lodash","text!./defaultmodel.json"], function ($,Backbone,lodash,DefaultModel) {
	
	
		DefaultModel=eval('(' + DefaultModel + ')');
		console.log("DefaultModel",DefaultModel)

	var Loader=Backbone.View.extend({initialize:function(options) {
		var that=this;
		var url=options.folder+"schemas.json";
			
		
	    $.ajax({
	               url : url,
	               dataType: "text",
	               success : function (schemas) {
	                  
	            
			AJS.schemaString=schemas;
			that.build();
			that.trigger('success');
			}
			
		})
		$('body').bind('schemaUpdate',function() {
			that.build()
		})
		
	},build:function() {
			var that=this;
		schemas=eval('(' + AJS.schemaString + ')');


		for (var i=0; i<schemas.length; i++) {

			var clone = _.clone(schemas[i]);
			
			var schem = JSON.parse(JSON.stringify(DefaultModel));
			
			//var schem = $.extend(true, DefaultModel, schemas[i]);
		//	lodash.assign(DefaultModel,schem) 
			// MERGE DEFAULTS
			console.log("default model schema",schem)
			//lodash.merge(schem,clone);
			lodash.merge(schem,clone)


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



	
			 
				
			
				
		
	}
	
	})
	
	return Loader;

			
		
	
});
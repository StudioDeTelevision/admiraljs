define([],function() {
	var Static={};
	Static.generateUUID=function() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid;
	};
	
	Static.getFilePathFromSchema=function(val,name,schemaName,format) {
		
		
		if (schemaName) {
			var schema=AJS.schemas[schemaName];
			var fields=schema.fields;
			var fieldSchema=_.findWhere(fields,{"name":name});
			
		}
		
	
		var basePath=AJS.config.fileDir;
		
		
		if (fieldSchema) {
			
			if (fieldSchema.subfolder) {
				
				basePath=basePath+fieldSchema.subfolder;
				
			}
			
			
		}
		
		if (format) {
			if (format.substr(-1,1)!="/") format=format+"/";
			basePath=basePath+format;
		}
		
		
		
		return basePath+val;
		
	}
	
	Static.getFilePath=function(val,fieldSchema,format) {

		var basePath=AJS.config.fileDir;
		
		
		if (fieldSchema) {
			
			if (fieldSchema.subfolder) {
				
				basePath=basePath+fieldSchema.subfolder;
				
			}
			
			
		}
		
		if (format) {
			if (format.substr(-1,1)!="/") format=format+"/";
			basePath=basePath+format;
		}
		
		
		
		return basePath+val;
		
	}
	
	
	return Static;
})




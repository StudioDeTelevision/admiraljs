define([],function() {
	
	var Adapter;
	var MongoAdapter={
		or:"$or",
		criteria:"$regex",
		contains:function(obj,val) {
			
			obj[this.criteria]= ".*"+val+".*";
			obj["$options"]= "i";
		}
		
		
	}
	var WaterLineAdapter={
		or:"or",
		criteria:"contains",
		contains:function(obj,val) {
			
			obj[this.criteria]= val;
			
		}
		
		
	}
	
	if (AJS.config.orm=="native" || typeof AJS.config.orm=="undefined" ) Adapter= MongoAdapter ;
	if (AJS.config.orm=="waterline"  ) Adapter= WaterLineAdapter ;
	return Adapter;
	
	
	
	
})
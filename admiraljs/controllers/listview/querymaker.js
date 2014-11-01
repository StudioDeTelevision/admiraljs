define([],function() {
	
	var Adapter={};
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
	
	Adapter.get=function(orm) {
		
		if (orm=="native" || typeof orm=="undefined" ) return MongoAdapter ;
		if (orm=="waterline"  ) return WaterLineAdapter ;
		return MongoAdapter ;
	}
	
	
	
	
	return Adapter;
	
	
	
	
})
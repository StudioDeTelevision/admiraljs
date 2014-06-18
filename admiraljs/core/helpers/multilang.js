define(['jquery',     // lib/jquery/jquery
  'underscore'],
    function($, _) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var StaticClass=function () {};
		
		StaticClass.getValue=function (valueObject,lang) {
			
			console.log('get value',valueObject,lang)
			if (typeof rawvalue=="string") return rawvalue;
			
			else {
				
				return valueObject[lang];
				
				
			}
			
		}
		StaticClass.setValue=function (valueObject,value,lang) {
			
			if (typeof rawvalue=="string") return rawvalue;
			
			else {
				
				return valueObject[lang];
				
				
			}
			
		}
		
		StaticClass.parseLanguages=function(valueObject) {
			
			var langArray=new Array();
			if (typeof valueObject=="object") {
				for (var l in valueObject) {
				
					langArray.push(l);
				
				}
				
			} 
			
			console.log('languages',langArray)
			return langArray;
			
		}
		
        return StaticClass;
    }
);
define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','editors/file'],
    function($, _, Backbone,FileClass) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=FileClass.extend({
			
			initialize:function(options) {
				var that=this;
				var formats=null;
				if (options.formats==null ) {
					
					 formats={'thumbnail': {width: 80,height: 80}};
				
				
					
					}
					else formats=options.formats;
						
						var imageVersions=JSON.stringify(formats)	
						console.log('FORMATS ARE',imageVersions)
				this.formData={"imageVersions":imageVersions};
				
				
			FileClass.prototype.initialize.call(this,options);
			//AJS.config.fileDir
				
			},displayValue:function() {
				// console.log("input",this.input)
// 				this.input.val(this.value)
console.log('DISPLAY'+this.value)
			this.display.empty();
									//alert(options.value)
									var img=$('<img/>');
									img.attr('src',AJS.config.fileDir+"thumbnail/"+this.value)
								this.display.append(img)
							
				
			}
		})
		
		View.display=function(val) {
			
			
			var img=$('<img/>');
			img.attr('src',AJS.config.fileDir+"thumbnail/"+val)
			
			return img;
			//return $("<div/>").html(val).text();
			
		}
		
        return View;
    }
);
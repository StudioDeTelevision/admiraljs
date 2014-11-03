define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'],
    function($, _, Backbone,template) {
		
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var MyButton=Backbone.View.extend({
			tagName:"li",
			events:{
				"click":"clickME"
			},
			initialize:function(options) {
				this.$el.html('<a href="#list/'+options.model+'" model="'+options.model+'" url="'+options.find+'" >'+options.label+'</a>');
			},
			clickME:function() {
				
				$('#sidebar').find('a').removeClass('selected')
				this.$el.find('a').addClass('selected');
				
			},
			setSelected:function() {
				this.$el.find('a').addClass('selected');
			}
		})
		
		var View=Backbone.View.extend({
			tagName:"ul",
			className:"",
			
			initialize:function() {
				
				
				console.log("SCHEMASSSS",AJS.schemas)
				
				for (var i in  AJS.schemas) {
					
					if (AJS.schemas[i].hidden!=true && AJS.schemas[i].type!="abstract") {
						
						var b=new MyButton({label:AJS.schemas[i].label,
							model:i,
							find:AJS.schemas[i].find});
							
							var hash=window.location.hash;
							var hashArray=hash.split('/');
							if (hashArray.length>0) {
								var currentModel=hashArray[hashArray.length-1];
								
							//	alert(AJS.schemas[i].label)
								
								if (AJS.schemas[i].label.toLowerCase()==currentModel) {
									
									b.setSelected();
								}
							}
						
							this.$el.append(b.$el)
						
					}
					
				}
			}
		})
		
        return View;
    }
);
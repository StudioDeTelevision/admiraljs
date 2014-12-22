define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','../core/editor','moment','datetimepicker'],
    function($, _, Backbone,EditorClass,moment) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		//data-format="'+AJS.config.dateTimeFormat+'"
		if (typeof AJS.config.dateTimeFormat=="undefined") AJS.config.dateTimeFormat="YYYY-MM-DD HH:mm";
		var View=EditorClass.extend({
			template:'<input type="text" style="width:200px;padding: 0px 5px;" class="input"  value="" />',
			
						initialize:function(options) {
							var that=this;
				
							this._super('initialize', options);
				
							
							setTimeout(function() {
								console.log('DATE TIME INIT ok',that.value)
							
								that.input.datetimepicker({format: 'Y-m-d H:i',
								defaultDate:moment().format('YYYY-MM-DD HH:mm'),
								onChangeDateTime:function(dp,$input){
									
									that.value=moment().format(that.input.val());
									that.trigger('change');
									console.log(that.value)
									
									}});
								
							// var c=that.input.combodate();
						
						//that.input.combodate('setValue', moment.utc(that.value));
						
							},500)
						
					
			   
			},setValue:function(val) {
				
				this.value=moment(val).format('YYYY-MM-DD HH:mm');
				this.displayValue();
			
				
			},setOnChange:function() {
				var that=this;
				this.input.on('change',function() {
					that.value=moment().format(that.input.val());
					that.trigger('change');
					console.log("DATE CHANGED "+that.name,that.input.val())
				})
			}
		})
		
		View.display=function(val,name,model,schemaName) {
		
			return moment(val).format("L");
			
		}
		
		
        return View;
    }
);
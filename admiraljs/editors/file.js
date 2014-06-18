define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','text!./file.html',"jquery","jquery.fileupload"
  ],
    function( _, Backbone,EditorClass,htmlTemplate,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=EditorClass.extend({
			formData:{},
			initialize:function(options) {
				
				var that=this;
				//this.input=$('<input type="file" value="" />')
				this.template=htmlTemplate;
				//this.$el.html(htmlTemplate)
				
				//this.input=$('input',this.$el).first();
				
				EditorClass.prototype.initialize.call(this,options);
				
				
				
				this.display=this.$el.find('.display').first();
				console.log(this.display)
				//this.display=$('<div />');
				
				//this.$el.append(this.display)
			//	this.input.attr('data-url',"http://localhost:4000")
				//this.input.attr('data-sequential-uploads','true');
				
			//	data-sequential-uploads="true"
				//data-url="server/php/"
				
				this.input.fileupload({
					dropZone:null,
				        dataType: 'json',
						url:AJS.config.fileUploadUrl,
   					 sequentialUploads: true,
					 multipart:true,
					 formData:that.formData
                ,
						add:function(e,data) {
						    data.context = $('<p/>').text('Uploading...').appendTo(that.display);
						               data.submit();
						},
				        done: function (e, data) {
				        //    $.each(data.result.files, function (index, file) {
								var file=data.result.files[0];
								var filename = file.name.replace(/C:\\fakepath\\/i, '')
								// alert("hey"+file.name.replace(/C:\\fakepath\\/i, ''))
 								console.log(filename)
								
								that.value=filename;
								that.trigger('change')
								
								that.displayValue();
				               
								
								
				          //  });
				        },
						progressall: function (e, data) {
						        var progress = parseInt(data.loaded / data.total * 100, 10);
						        $('.progressbar .bar',that.$el).css(
 						            'width',
 						            progress + '%'
 						        );
 console.log(progress)
						    }
				    });
				
			},displayValue:function() {
				// console.log("input",this.input)
// 				this.input.val(this.value)
			 $('<p/>').text(this.value).appendTo(this.display);
									//alert(options.value)
								//this.display.html(this.value)
							
				
			},setOnChange:function() {
				// var that=this;
	// 		
	// 			this.input.on('change',function() {
	// 			
	// 				var val=that.input.val()
	// 			console.log("CAHNGES",val)
	// 				var filename = val.replace(/C:\\fakepath\\/i, '');
	// 				
	// 				that.value=filename;
	// 				that.trigger('change')
	// 			})
			}
		})
		
		
		
        return View;
    }
);
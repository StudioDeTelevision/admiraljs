define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./imagecropresize.html',"./canvas",'css!./imagecropresize.css',"jquery.fileupload"],
    function($, _, Backbone,htmlTemplate,CanvasImage) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var View=Backbone.View.extend({
			tagName:"div",
			value:null,
			className:"form-group imagecropresize",
			template:htmlTemplate,
			canvasImageClass:CanvasImage,
			initialize:function(options) {
				this.filesList=new Array();
				var that=this;
				this.value="";
				this.name=options.name;
				jQuery.event.props.push("dataTransfer");
				//alert(htmlTemplate)
				this.$el.html(_.template(htmlTemplate,options));
				//this.$el.append($(htmlTemplate))
				if (options.size) {
					
					
					}
					else {
						options.size={};
						options.size.width=400;
						options.size.height=400;
					}
					this.size=options.size;
					$('.edit',this.$el).width(options.size.width)
					$('.edit',this.$el).height(options.size.height)
					$('.display',this.$el).width(options.size.width)
					$('.display',this.$el).height(options.size.height)
					$('.displayWrapper',this.$el).width(options.size.width)
					$('.displayWrapper',this.$el).height(options.size.height)
				
					
			
				this.canvas=new this.canvasImageClass({width:options.size.width,height:options.size.height});
				this.$el.find('canvas').first().replaceWith(this.canvas.$el)
				
				$('.imageselect',this.$el).on('change',function(ev) {
					that.fileSelect(ev);
					
				});
					
					$('.dropzone',this.$el).on('dragover', function(evt) {
						
						that.dragOver(evt);
					});
					$('.dropzone',this.$el).on('drop',function(evt) {
						
						 that.dropfileSelect(evt);
					});
					$('.uploadButton',this.$el).on('click',function() {
						 that.uploadFile();
					});
					$('.zoomIn',this.$el).on('click',function() {
						 that.canvas.zoomIn();
					});
					$('.zoomOut',this.$el).on('click',function() {
						 that.canvas.zoomOut();
					});
					$('.removeButton',this.$el).on('click',function() {
						  that.removeFile();
					});
					that.$el.find('.removeButton').hide();
				// $('.imageselect',this.$el).on('change', this.fileSelect);
// 				
// 				var dropTarget = this.$el.find('.drop').first().
// 				
// 				
// 				
// 				dropTarget.on('dragover', this.dragOver, false);
// 				
// 				dropTarget.on('drop', this.dropfileSelect, false);

that.canvas.$el.bind('setImage',function(e,data) {
	
	that.removeFile();
	// $('.dropzone',that.$el).hide();
	// that.$el.find('.editbuttons').show();
	
	that.$el.find('.edit').show();
	$('.dropzone',that.$el).hide();
   that.$el.find('.editbuttons').show();
	
    that.canvas.setImage(data);
	
	
	
})


_.bindAll(this, 'render', 'dragOver','dropfileSelect','uploadFile','removeFile','fileSelect');
//		this.fileSelect = _.bind(this.fileSelect, this);		
			},
			dragOver:function(evt) {
					//console.log(evt)
			    evt.stopPropagation();
			    evt.preventDefault();
			   evt.dataTransfer.dropEffect = 'copy';
			},
			dropfileSelect:function(evt) {
				var that=this;
				evt.stopPropagation();
				    evt.preventDefault();
					if (window.File && window.FileReader && window.FileList && window.Blob) {
					        var files = evt.dataTransfer.files;
							
					        var result = '';
					        var file;
					        for (var i = 0; file = files[i]; i++) {
					            // if the file is not an image, continue
					            if (!file.type.match('image.*')) {
					                continue;
					            }
								that.filesList.push(file)

					            var myreader = new FileReader();
					            myreader.onload = (function (tFile) {
					                return function (evt) {
										$('.dropzone',that.$el).hide();
										that.$el.find('.editbuttons').show();
					                    that.canvas.setImage(evt.target.result);
										
					                };
					            }(file));
					            myreader.readAsDataURL(file);
					        }
					    } else {
					        alert('The File APIs are not fully supported in this browser.');
					    }
					},fileSelect:function(evt) {
				var that=this;
				console.log('THIS',this)
			    if (window.File && window.FileReader && window.FileList && window.Blob) {
			        var files = evt.target.files;

			        var result = '';
			        var file;
			        for (var i = 0; file = files[i]; i++) {
			            // if the file is not an image, continue
			            if (!file.type.match('image.*')) {
			                continue;
			            }

		
		
			            reader = new FileReader();
			            reader.onload = (function (tFile) {
			                return function (evt) {
								that.$el.find('.edit').show();
								$('.dropzone',that.$el).hide();
			                   that.$el.find('.editbuttons').show();
						
								   that.canvas.setImage(evt.target.result)
			                
			                };
			            }(file));
			            reader.readAsDataURL(file);
			        }
			    } else {
			        alert('The File APIs are not fully supported in this browser.');
			    }
			},
			uploadFile:function() {
				var that=this;
				
				
	// 			var imgObj=$('<img src="'+dataURL+'"/>');
	// 			this.$el.append(imgObj)
				
				var blob =that.canvas.getBlob();
				
			    // var urlCreator = window.URL || window.webkitURL;
   // 			      var imageUrl = urlCreator.createObjectURL( blob );
   // 			    ///  var img = document.querySelector( "#photo" );
   //   				var imgObj=$('<img src="'+imageUrl+'"/>');
   //   				this.$el.append(imgObj)
				// console.log(blob)
 				
// 				return;
// 

				
				$('.editbuttons',that.$el).hide();
				that.$el.find('.removeButton').show();
				
				
				
				//that.canvas.getBlob(function(blob) {
					that.value=AJS.tools.generateUUID()+".jpg";
					blob.name=that.value;
					that.trigger('change');
		           
					
					$(that.$el).fileupload();
					$(that.$el).fileupload('send',{
						maxChunkSize:10000000,
						limitConcurrentUploads:1,
						sequentialUploads:true,
						url:AJS.config.fileUploadUrl,
						files: blob})
					    .success(function (result, textStatus, jqXHR) {
							console.log("file upload ok")
						/* ... */})
					    .error(function (jqXHR, textStatus, errorThrown) {
							console.log("file upload error",errorThrown)/* ... */})
					    .complete(function (result, textStatus, jqXHR) {
							that.displayValue();
							console.log("file upload complete")/* ... */});	
						
						
			//	})
				
				
				
			},
			removeFile:function() {
				var that=this;
			this.value="";
				$('.imageselect',this.$el).val('');
				that.$el.find('.removeButton').hide();
				that.$el.find('.display').empty();
				that.$el.find('.display').hide();
				that.$el.find('.edit').show();
				$('.dropzone',that.$el).show();
				that.canvas=new this.canvasImageClass({width:that.size.width,height:that.size.height});
				that.$el.find('canvas').first().replaceWith(that.canvas.$el)
				
				
				that.value="";
				
				that.trigger('change');
				
			},
			displayValue:function() {
				var that=this;
				// console.log("input",this.input)
// 				this.input.val(this.value)
				// if (  this.input[0].type != 'file') {
// 									//alert(options.value)
// 								  this.input.val(this.value)
// 							}
if (this.value) {
	that.$el.find('.edit').hide();
	that.$el.find('.removeButton').show();
	var img=$('<img src="'+AJS.config.fileDir+this.value+'" />');
	
	that.$el.find('.display').append(img);
	that.$el.find('.display').show();
	that.$el.find('.editbuttons').hide();
}


				
			},setValue:function(val) {
				var that=this;
				this.value=val;
				this.displayValue();
				//this.input.val(val)
				
			},getValue:function(val) {
			return	this.value;
				
			},setOnChange:function() {
				var that=this;
				// this.input.on('change',function() {
// 					that.value=that.input.val();
// 					that.trigger('change');
// 					console.log(that.input.val())
// 				})
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

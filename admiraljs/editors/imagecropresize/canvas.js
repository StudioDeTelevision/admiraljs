define(['jquery','underscore','backbone','vendor/canvas-to-blob.min'],
    function($,_,Backbone) {
		
		var view=Backbone.View.extend({
			tagName:"canvas",
			initialize:function (options) {
			var that=this;
			this.canvas=this.$el[0];
			this.zoom=1;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
	
			this.x=0;
			this.y=0;
		
		
			
			this.image=null;
			
			
			this.context = this.canvas.getContext("2d");
			
			
			    that.canvasWidth=that.canvas.width;
			    that.canvasHeight=that.canvas.height;
			    that.isDragging=false;
				
		

		},zoomIn:function() {
			console.log('ZOOM IN')
			this.zoom=this.zoom+0.01;
			 this.drawImage();
			
	},zoomOut:function() {
			this.zoom=this.zoom-0.01;
			 this.drawImage();
			
		},	setListeners:function(){
			var that=this;
			that.$el.mousedown(function(e){
				that.handleMouseDown(e);
			});
			   that.$el.mousemove(function(e){that.handleMouseMove(e);});
			that.$el.mouseup(function(e){that.handleMouseUp(e);});
			   that.$el.mouseout(function(e){that.handleMouseOut(e);});
	_.bindAll(this, 'handleMouseDown', 'handleMouseMove','handleMouseUp','handleMouseOut');		
		},setImage:function(src){
			
			var adressStart=src.substr(0,4); 
		
			
			var that=this;
			
			that.image = new Image();
if (adressStart=="http") that.image.crossOrigin = "Anonymous";
			  that.image.onload = function(){
			 //that.context.drawImage(that.image,0,0);
			  that.drawImageInside();
			 that.setListeners();
			 
			 
			  };
			   that.image.src =src;
			
			    },handleMouseDown:function(e){
			var that=this;
					that.canvasOffset = this.canvas.getBoundingClientRect();
					
					that.offsetX=that.canvasOffset.left;
					    that.offsetY=that.canvasOffset.top;
					
			      that.canMouseXOrg=parseInt(e.clientX-that.offsetX);
			      that.canMouseYOrg=parseInt(e.clientY-that.offsetY);
			      // set the drag flag
			      that.isDragging=true;
			    },
				handleMouseUp:function(e){
			var that=this;
					      that.canMouseX=parseInt(e.clientX-that.offsetX);
					      that.canMouseY=parseInt(e.clientY-that.offsetY);
					      // clear the drag flag
					      that.isDragging=false;
					    },
						handleMouseOut:function(e){
			var that=this;
									      that.canMouseX=parseInt(e.clientX-that.offsetX);
									      that.canMouseY=parseInt(e.clientY-that.offsetY);
									      // user has left the canvas, so clear the drag flag
									      //isDragging=false;
									    },
										handleMouseMove:function(e){
			var that=this;
													      canMouseX=parseInt(e.clientX-that.offsetX);
													      canMouseY=parseInt(e.clientY-that.offsetY);
														  
												
												
													      // if the drag flag is set, clear the canvas and draw the image
													      if (that.isDragging){
															  
			  												var offX=that.canMouseXOrg-canMouseX;
			  												var offY=that.canMouseYOrg-canMouseY;	  
			  												that.x=that.x-offX; 
			  												that.y=that.y-offY;
			  												that.canMouseXOrg=canMouseX;
			  												that.canMouseYOrg=canMouseY;
															
															console.log(that.x,that.y,offX,offY)
															  
															 // console.log(canMouseX,canMouseY)
													          that.drawImage();
													      }
													    },drawImageInside:function() {
						this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
						
						this.zoom=this.canvasWidth/this.image.width;
												          this.context.drawImage(this.image,this.x,this.y,this.image.width*this.zoom,this.image.height*this.zoom);			
															
														},
														drawImage:function() {
												          this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
												          this.context.drawImage(this.image,this.x,this.y,this.image.width*this.zoom,this.image.height*this.zoom);			
															
														},
														getBlob:function(callback) {
			var that=this;
															
			function dataURItoBlob(dataURI) {
			    var binary = atob(dataURI.split(',')[1]);
			    var array = [];
			    for(var i = 0; i < binary.length; i++) {
			        array.push(binary.charCodeAt(i));
			    }
			    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
			}
			
			
			
			 var dataURL    = that.canvas.toDataURL("image/jpeg",0.95);
			 var blob = dataURItoBlob(dataURL);
			 
			 return blob;
															
															
														}
			
			
		})
		
		
		

			
		
		
		return view;
		
	});
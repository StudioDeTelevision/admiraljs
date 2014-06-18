define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor','text!./collectionembed.html','jquery','jquery.ui'],
    function( _, Backbone,EditorClass,htmlTemplate,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		
		var DefaultCollectionItem=Backbone.View.extend({
			tagName:"p",
			className:"item defaultitem",
			initialize:function(options) {
				var that=this;
				//alert(options.modelName)
				//alert(0)
  				
			
				//var first=this.model;
				var displayValue="";
				var firstValue="";
				var count=0;
				console.log('MODEL LIST',this.model)
				
			 this.schema=options.schema;
			 console.log('MODEL schema',this.schema)
			 
   			// var displayFieldName=this.schema.listFields[0];
			
			 
   			var fieldDescription=this.schema.fields[0];
			 
   			 if (fieldDescription.editor!=null) {
			 	
   				 var editor=fieldDescription.editor;
			 
   			   var fieldClass=AJS.fieldClasses[editor];
   			 }
			
		  var raw=this.model.get(fieldDescription.name);
		   if (fieldClass!=null) {
		    if (fieldClass.display!=null) {
				this.$el.append(fieldClass.display(raw))
			}
			else 
			this.$el.append(raw)
			
		}	else 
			this.$el.append(raw)
			
			
			var deleteButton=$("<div class='button-remove' ></div>");
			this.$el.append(deleteButton)
			deleteButton.click(function(e) {
				e.stopPropagation();
				that.trigger('delete',that.model.id);
			})
			
			
			this.$el.bind('sorted',function(event,index) {
				console.log('sorted',index)
				that.trigger('justsorted',{index:index})
				
				
			})
				
				// for (var a in this.model) {
// 					if (count==0) firstValue=a;
// 					if (typeof a=="string" && this.model[a].length>0  && a!="modelName") {
// 						displayValue=a;
// 					}
// 					
// 					count++;
// 					
// 				}
// 				if (displayValue=="") displayValue=firstValue;
// 				
// 				this.$el.append(this.model[displayValue])
// 				
// 				console.log(displayValue)
			
			
		   
				
			}
			
		});
		
		
		var VirtualEdit=Backbone.View.extend({
			initialize:function(options) {
				var that=this;
				if (options.model!=null) {
					this.model=options.model;
				}
				else {
					this.model=new Backbone.Model();
				}
				
				var fields=options.schema.fields;
				var fieldsGrid=[];
	  		  var fieldClasses=AJS.fieldClasses;
		  
	  
				for (var f in fields ) {
					
					var fieldClass=fieldClasses[fields[f].editor];
					var options=fields[f];
					options.value=this.model.get(fields[f].name);
					console.log(fields[f].name+" - editor:"+fields[f].editor+" &class: "+fieldClass )
					var newfield=new fieldClass(options);
					newfield.setValue(this.model.get(fields[f].name));
				// if (fields[f].relatedModel!=null && typeof fields[f].relatedModel!="undefined" ) {
// 					
// 					newfield.relatedModel=fields[f].relatedModel;
// 					
// 				}
					
					newfield.bind('change',function() {
						console.log('CHANGE ON ',this.name,this.getValue())
						that.model.set(this.name,this.getValue());
						console.log('MODEL',that.model)
					
				   			
						
					})
					//newfield.setValue(this.model.get(fields[f].name));
					newfield.$el.addClass('form-group');
					
					
					fieldsGrid[fields[f].name]=newfield.$el;
					
				}
				
				
				for (var f in fieldsGrid ) {
					
					this.$el.append(fieldsGrid[f])
				}
				
				
			}
		})
		
		var VirtualCollection=Backbone.Collection;
		
		var View=EditorClass.extend({
			template:htmlTemplate,
			CollectionItem:DefaultCollectionItem,
			initialize:function(options) {
				var that=this;
				this.collection=new VirtualCollection;
				
				//this.$el.html(_.template(htmlTemplate,options));
				
				EditorClass.prototype.initialize.call(this,options);
				
				this.fieldSchema=options.schema;
				
				if (this.value==null || typeof this.value=="undefined") {
			
					this.value=new Array();
			
				}
				
				
			
			// $(".add",this.$el).click(function() {
	// 			var popup=new AJS.ui.PopUp();
	// 			
	// 			
	// 			
	// 		});
			
		
				
				$(".add",this.$el).click(function() {
					var popup=new AJS.ui.PopUp();
					
					
					   
				   	var v=new VirtualEdit({schema:that.fieldSchema});
					
					
					
					
					
					popup.setContent(v.$el)
					
					var buttonInsert=$('<div class="button insert" >insert</div>');
					popup.addButton(buttonInsert)
					
					
					buttonInsert.bind('click',function() {
						console.log('insert click')
						
						var obj=v.model.attributes;
						
						
						console.log('popup close ')
						
						popup.closeMe();
						
						
						
						console.log('insert ',obj)
						
						// if (that.value==null || typeof that.value=="undefined") {
// 					
// 							that.value=new Array();
// 					
// 						}
						//alert(data.id)
						
						
						console.log('add new object',obj)
						
						that.collection.add(obj);
						
						that.trigger('change');
						
						that.displayValue();
					})
					
   					   //AJS.currentModel=this.model;
   	//AJS.router.navigate("edit/"+that.collection.modelName+"/"+data.id, {trigger: true})
			
				
					
					
					
				})
				
			}
			,setValue:function(val) {
				
							this.collection.set(val);
							this.displayValue();
							//this.input.val(val)
				
						},getValue:function(val) {
						return	this.collection.models;
				
						},setOnChange:function() {
							var that=this;
							this.input.on('change',function() {
								//that.value=that.input.val();
								that.trigger('change');
								//console.log(that.input.val())
							})
						},
			
			
			
			displayValue:function() {
				var that=this;
				
				
				$('.collection-container',this.$el).empty();
			
			
				
				// if (this.value==null || typeof this.value=="undefined") {
	// 		
	// 				this.value=new Array();
	// 		
	// 			}
				this.collection.forEach(function(model) {
					
					
					
   				   var CollectionItem=that.CollectionItem;
   			  var im=new CollectionItem({model:model,schema:that.fieldSchema});
			  
		   im.bind('delete',function(itemid) {
 // 			  	
 
 that.collection.remove(this.model);
 that.displayValue();
  			//	that.value.splice(that.value.indexOf(itemid), 1);
 				 // $(this.$el).remove();
				  that.trigger('change');
 // 				
 			  })
			  
			   im.bind('justsorted',function(data) {
				   
				   console.log('just sorted',data.index)
				 
				 
				 var model=that.collection.remove(this.model)
				 
				 that.collection.add(model,{at:data.index})
				 
				 				  // 
				  //  var models=that.collection.toJSON();
				  //   console.log('current models',models);
				  // var currentIndex= models.indexOf(this.model);
				  // 
				  // console.log('this model is',this.model)
				  // 
				  // var removed=models.splice(currentIndex, 1);
				  // 
				  // models.splice(newindex, 0, removed);
				  // 
				  // 
				  // that.collection.set(models)
				  
				  console.log('set at index',data.index)
				  
				  console.log('new order', that.collection)
				  
				   that.trigger('change');
				   
			   });
			  
			   $('.collection-container',that.$el).append(im.$el)
					
				})
				
			   // for (var i=0;i<this.collection.length;i++) {
   // 			   	
   //   				   var CollectionItem=that.CollectionItem;
   //   			  var im=new CollectionItem({model:new Backbone.Model(that.value[i]),schema:this.fieldSchema});
   // 			  
			  
  			 // im.$el.attr('itemid',modelItem.id)
			  
  			
					
				// }
 		
		  
		  $('.collection-container',that.$el).sortable({"stop":function(event,ui) {
			 
			  ui.item.trigger('sorted',ui.item.index())
			  var result = $(this).sortable('toArray', {attribute: 'itemid'});
			 // that.value=result;
			 
		  }});

							
				
			}
		})
		
		
		
        return View;
    }
);
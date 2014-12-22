define(['underscore','backbone','core/editor',"../components/recordslist",'text!./collection.html','jquery','jquery.ui'],function( _, Backbone,EditorClass,RecordList,htmlTemplate,$) {
     
		
		var DefaultCollectionItem=Backbone.View.extend({
			tagName:"p",
			className:"item defaultitem",
			initialize:function(options) {
				var that=this;
				
				var displayValue="";
				var firstValue="";
				var count=0;
				
				
			 this.schema=AJS.schemas[options.modelName];
   			
		
		if (this.schema.listFields) {
			
			var displayLine=$('<div></div>');
			
			_.each(this.schema.listFields,function(displayFieldName) {
				
				var fieldDescription=_.findWhere(that.schema.fields,{"name":displayFieldName});
				console.log("fieldDescription",fieldDescription)
				 if (fieldDescription.editor!=null) {
	   				 var editor=fieldDescription.editor;
		 
	   			   var displayLinefieldClass=AJS.fieldClasses[editor];
					 
				 }
				 
				  var raw=that.model.get(fieldDescription.name);
				 
				 var span=$("<span class='collectiondisplayvalue' ></span>");
	   		   if (displayLinefieldClass!=null) {
	   		    if (displayLinefieldClass.display!=null) {
					console.log("fieldDescription",raw)
					console.log("fieldDescription",displayLinefieldClass.display(raw))
					
					span.append(displayLinefieldClass.display(raw))
	   				
						
	   			}
	   			else 
					span.append(raw);
		
	   		}	else 
	   				span.append(raw);
			
			displayLine.append(span)
			
				
			})
			
				this.$el.append(displayLine)
		
		} else {
  			 var displayFieldName=this.schema.listFields[0];
		
		 
  			var fieldDescription=_.findWhere(this.schema.fields,{"name":displayFieldName});
		 
  			 if (fieldDescription.editor!=null) {
		 	
  				 var editor=fieldDescription.editor;
		 
  			   var fieldClass=AJS.fieldClasses[editor];
  			 }
			
	  var raw=this.model.get(displayFieldName);
	   if (fieldClass!=null) {
	    if (fieldClass.display!=null) {
			this.$el.append(fieldClass.display(raw))
		}
		else 
		this.$el.append(raw)
		
	}	else 
		this.$el.append(raw)
		}
			
			
			var deleteButton=$("<div class='button-remove' ></div>");
			this.$el.append(deleteButton)
			deleteButton.click(function(e) {
				e.stopPropagation();
				that.trigger('delete',that.model.id);
			})
				
			var editButton=$("<div class='button-edit' ></div>");
			this.$el.append(editButton)
			editButton.click(function(e) {
				e.stopPropagation();
				that.trigger('edit',that.model.id);
			})
		   
				
			}
			
		});
		
		var View=EditorClass.extend({
			template:htmlTemplate,
			CollectionItem:DefaultCollectionItem,
			initialize:function(options) {
				var that=this;
				
			
				
				EditorClass.prototype.initialize.call(this,options);
				
				if (this.value==null || typeof this.value=="undefined") {
			
					this.value=new Array();
			
				}
				
				
			that.relatedModel=options.relatedModel;
			
			
			
			$(".selectone",this.$el).click(function() {
				var popup=new AJS.ui.PopUp();
				var recordlist=new RecordList({modelName:options.relatedModel})
				popup.setContent(recordlist.$el)
				recordlist.bind('selectitem',function(itemdata) {
					popup.closeMe();
					console.log('insert ',that,that.value)
					console.log(' typeof that.value ', typeof that.value)
					
					if (that.value==null || typeof that.value=="undefined" || typeof that.value!="object") {
						
						that.value=new Array();
				
					}
				
					
					that.value.push(itemdata);
					console.log('new value ',that.value)
					that.trigger('change');
					
					that.displayValue();
				});
				
			});
				
				$(".add",this.$el).click(function() {
					var popup=new AJS.ui.PopUp();
					
					
					
   				 var url=AJS.config.api+AJS.schemas[options.relatedModel].create;
   				 $.ajax({
   				   dataType: "json",
   				   url: url,
   				   success: function(data) {
					   console.log("DATA ID",data[AJS.config.recordID])
					  var schemaName= AJS.schemas[options.relatedModel].schemaName;
				   	var v=new AJS.ui.EditView({schemaName:schemaName,modelId:data[AJS.config.recordID]});
					
					popup.setContent(v.$el)
					
					var buttonInsert=$('<div class="button insert" >insert</div>');
					popup.addButton(buttonInsert)
					
					
					buttonInsert.bind('click',function() {
						popup.closeMe();
						console.log('insert ',that,that.value)
						
						if (that.value==null || typeof that.value=="undefined") {
					
							that.value=new Array();
					
						}
					
						that.value.push(data[AJS.config.recordID]);
						
						that.trigger('change');
						
						that.displayValue();
					})
					
					
   				   }
   				 });
					
					
					
				})
				
			},setValue:function(val) {
				
				if (val && val.length>0) {
					
					if (val[0].id!=null && val[0].id!="undefined") {
						
						this.value=_.map(val, function(item){ return item.id; });
						
					}
					
					// clean and remove empty values
					
					this.value=_.filter(this.value,function(item) {
						return (item!="")
					})
					
				}
				
				else this.value=val;
				
				
				this.displayValue();
				
			},displayValue:function() {
				var that=this;
				
				
				$('.collection-container',this.$el).empty();
			
			
				
				if (this.value==null || typeof this.value=="undefined") {
			
					this.value=new Array();
			
				}
				console.log("COLLECTION VALUE",this.value)
			
				// this.value=_.filter(this.value,function(item) {
// 					return (item!="")
// 				})
			
				var whereQuery={};
				whereQuery[AJS.config.recordID]=this.value;
				
			
				
				var datax={'where':whereQuery};
				
				
				//console.log('datax',datax)
				
				
				var col=new AJS.Data.Collection()
				col.url=AJS.config.api+AJS.schemas[that.relatedModel].find+"?where="+JSON.stringify(whereQuery);
				col.fetch({'success':function(data) {
					// console.log('DATA',data)
	//
	// 			    console.log('REPONSE',data,that.value)
				


				  					   for (var i=0;i<that.value.length;i++) {
				  						   var whereQuery={}
				  						   whereQuery[AJS.config.recordID]=that.value[i];
										   
										   var modelItem=col.get(that.value[i]);
										   
										
				  		  				   var CollectionItem=that.CollectionItem;



				  		  			  var im=new CollectionItem({model:modelItem,modelName:that.relatedModel,fieldOptions:that.fieldOptions});


				  		  			  im.$el.attr('itemid',modelItem[AJS.config.recordID])
				  					  im.bind('delete',function(itemid) {

				  						that.value.splice(that.value.indexOf(itemid), 1);
				  						  $(this.$el).remove();
				  						  that.trigger('change');

				  					  })
									  
									  
									  
						      		   im.bind('edit',function(itemid) {
						   					
				  
					   					var popup=new AJS.ui.PopUp();
					
					
					
					
					
					      				 var url=AJS.config.api+AJS.schemas[that.relatedModel].find+"/"+itemid;
					      				 $.ajax({
					      				   dataType: "json",
					      				   url: url,
					      				   success: function(data) {
					   					   console.log("DATA ID",data[AJS.config.recordID])
					   					  var schemaName= AJS.schemas[that.relatedModel].schemaName;
					   				   	var v=new AJS.ui.EditView({schemaName:schemaName,modelId:data[AJS.config.recordID]});
					
					   					popup.setContent(v.$el)
					
					   					var buttonInsert=$('<div class="button insert" >update</div>');
					   					popup.addButton(buttonInsert)
					
					
					   					buttonInsert.bind('click',function() {
					   						popup.closeMe();
							setTimeout(function() {
									that.displayValue();
							},1000)
										
											
					   						// console.log('insert ',that,that.value)
//
// 					   						if (that.value==null || typeof that.value=="undefined") {
//
// 					   							that.value=new Array();
//
// 					   						}
//
// 					   						that.value.push(data[AJS.config.recordID]);
//
// 					   						that.trigger('change');
//
// 					   						that.displayValue();
					   					})
					
					
					      				   }
					      				 });
										 
										 
										 
				  
						   				  })
									  
									  
									  
				  		  			 $('.collection-container',that.$el).append(im.$el)

				  						 }


				  					  // }



				  		  $('.collection-container',that.$el).sortable({"stop":function(event,ui) {

				  			  var result = $(this).sortable('toArray', {attribute: 'itemid'});
				  			  that.value=result;
				  			  that.trigger('change');
				  		  }});


				  
				}})
				
 					
				
			}
		})
		
		
		
        return View;
    }
);
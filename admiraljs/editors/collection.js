define(['underscore','backbone','core/editor',"./components/recordslist",'text!./collection/collection.html','jquery','jquery.ui'],function( _, Backbone,EditorClass,RecordList,htmlTemplate,$) {
     
		
		var DefaultCollectionItem=Backbone.View.extend({
			tagName:"p",
			className:"item defaultitem",
			initialize:function(options) {
				var that=this;
				
				var displayValue="";
				var firstValue="";
				var count=0;
				
				
			 this.schema=AJS.schemas[options.modelName];
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
			
			
			var deleteButton=$("<div class='button-remove' ></div>");
			this.$el.append(deleteButton)
			deleteButton.click(function(e) {
				e.stopPropagation();
				that.trigger('delete',that.model.id);
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
			
			
			
				var whereQuery={};
				whereQuery[AJS.config.recordID]=this.value;
				var datax={'where':whereQuery};
				
				
				console.log('datax',datax)
				
				
				var col=new AJS.Data.Collection()
				col.url=AJS.config.api+AJS.schemas[that.relatedModel].find+"?where="+JSON.stringify(whereQuery);
				col.fetch({'success':function(data) {
					console.log('DATA',data)
					
				    console.log('REPONSE',data,that.value)
				


				  					   for (var i=0;i<that.value.length;i++) {
				  						   var whereQuery={}
				  						   whereQuery[AJS.config.recordID]=that.value[i];
										   
										   var modelItem=col.get(that.value[i]);
										   
										   console.log('MODEL',modelItem)
										   
										   
				  						 // var modelItemFind=_.where(data, whereQuery) ;
 // 				  						 if (modelItemFind.length<=0) {
 // 				  							   whereQuery[AJS.config.recordID]=Number(that.value[i]);
 // 				  						 	modelItemFind=_.where(data, whereQuery) ;
 // 				  						 }


				  						 // if (modelItemFind.length>0) {
 //
 //
 // 				  							 var modelItem=modelItemFind[0];
				  							 console.log('CREATE ITEM')
				  		  				   var CollectionItem=that.CollectionItem;

				  						  // alert(that.fieldOptions)



				  		  			  var im=new CollectionItem({model:modelItem,modelName:that.relatedModel,fieldOptions:that.fieldOptions});


				  		  			  im.$el.attr('itemid',modelItem[AJS.config.recordID])
				  					  im.bind('delete',function(itemid) {

				  						that.value.splice(that.value.indexOf(itemid), 1);
				  						  $(this.$el).remove();
				  						  that.trigger('change');

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
				
 				 // var url=AJS.config.api+AJS.schemas[that.relatedModel].find;
 // 				 $.ajax({
 // 				   dataType: "json",
 // 				   url: url,
 // 				   method: "POST",
 // 				   data:datax,
 // 				   success: function(data) {
 // 					   console.log('REPONSE',data,that.value)
 //
 //
 //
 // 					   for (var i=0;i<that.value.length;i++) {
 // 						   var whereQuery={}
 // 						   whereQuery[AJS.config.recordID]=that.value[i];
 // 						 var modelItemFind=_.where(data, whereQuery) ;
 // 						 if (modelItemFind.length<=0) {
 // 							   whereQuery[AJS.config.recordID]=Number(that.value[i]);
 // 						 	modelItemFind=_.where(data, whereQuery) ;
 // 						 }
 //
 //
 // 						 if (modelItemFind.length>0) {
 // 							 var modelItem=modelItemFind[0];
 // 							 console.log('CREATE ITEM')
 // 		  				   var CollectionItem=that.CollectionItem;
 //
 // 						  // alert(that.fieldOptions)
 //
 //
 //
 // 		  			  var im=new CollectionItem({model:modelItem,modelName:that.relatedModel,fieldOptions:that.fieldOptions});
 //
 //
 // 		  			  im.$el.attr('itemid',modelItem[AJS.config.recordID])
 // 					  im.bind('delete',function(itemid) {
 //
 // 						that.value.splice(that.value.indexOf(itemid), 1);
 // 						  $(this.$el).remove();
 // 						  that.trigger('change');
 //
 // 					  })
 // 		  			 $('.collection-container',that.$el).append(im.$el)
 //
 // 						 }
 //
 //
 // 					   }
 //
 //
 //
 // 		  $('.collection-container',that.$el).sortable({"stop":function(event,ui) {
 //
 // 			  var result = $(this).sortable('toArray', {attribute: 'itemid'});
 // 			  that.value=result;
 // 			  that.trigger('change');
 // 		  }});
 //
 //
 //
 // 		   }
 // 	   });
				
				//////// HERE			
				
			}
		})
		
		
		
        return View;
    }
);
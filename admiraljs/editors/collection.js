define([     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/editor',"./components/recordslist",'text!./collection/collection.html','jquery','jquery.ui'],
    function( _, Backbone,EditorClass,RecordList,htmlTemplate,$) {
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
				//console.log(options.modelName,'MODEL LIST',this.model)
				
			 this.schema=AJS.schemas[options.modelName];
   			 var displayFieldName=this.schema.listFields[0];
			
			 
   			var fieldDescription=_.findWhere(this.schema.fields,{"name":displayFieldName});
			 
   			 if (fieldDescription.editor!=null) {
			 	
   				 var editor=fieldDescription.editor;
			 
   			   var fieldClass=AJS.fieldClasses[editor];
   			 }
				
		  var raw=this.model[displayFieldName];
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
		
		var View=EditorClass.extend({
			template:htmlTemplate,
			CollectionItem:DefaultCollectionItem,
			initialize:function(options) {
				var that=this;
				
				//this.$el.html(_.template(htmlTemplate,options));
				
				EditorClass.prototype.initialize.call(this,options);
				
				if (this.value==null || typeof this.value=="undefined") {
			
					this.value=new Array();
			
				}
				
				
			that.relatedModel=options.relatedModel;
			
			// $(".add",this.$el).click(function() {
	// 			var popup=new AJS.ui.PopUp();
	// 			
	// 			
	// 			
	// 		});
			
			$(".selectone",this.$el).click(function() {
				var popup=new AJS.ui.PopUp();
				var recordlist=new RecordList({modelName:options.relatedModel})
				popup.setContent(recordlist.$el)
				recordlist.bind('selectitem',function(itemdata) {
					popup.closeMe();
					console.log('insert ',that,that.value)
					
					if (that.value==null || typeof that.value=="undefined" || typeof that.value!="Array") {
						
						that.value=new Array();
				
					}
					//alert(data.id)
					
					that.value.push(itemdata);
					
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
					   console.log("DATA ID",data.id)
					  var schemaName= AJS.schemas[options.relatedModel].schemaName;
				   	var v=new AJS.ui.EditView({schemaName:schemaName,modelId:data.id});
					
					popup.setContent(v.$el)
					
					var buttonInsert=$('<div class="button insert" >insert</div>');
					popup.addButton(buttonInsert)
					
					
					buttonInsert.bind('click',function() {
						popup.closeMe();
						console.log('insert ',that,that.value)
						
						if (that.value==null || typeof that.value=="undefined") {
					
							that.value=new Array();
					
						}
						//alert(data.id)
						that.value.push(data.id);
						
						that.trigger('change');
						
						that.displayValue();
					})
					
   					   //AJS.currentModel=this.model;
   	//AJS.router.navigate("edit/"+that.collection.modelName+"/"+data.id, {trigger: true})
			
					
   				   }
   				 });
					
					
					
				})
				
			},displayValue:function() {
				var that=this;
				
				
				$('.collection-container',this.$el).empty();
			
			
				
				if (this.value==null || typeof this.value=="undefined") {
			
					this.value=new Array();
			
				}
				console.log("COLLECTION VALUE",this.value)
				
				var datax={'where':{ id: this.value }};
				
				//alert(that.relatedModel)
				
 				 var url=AJS.config.api+AJS.schemas[that.relatedModel].find;
 				 $.ajax({
 				   dataType: "json",
 				   url: url,
				   method: "POST",
				   data:datax,
 				   success: function(data) {
					   console.log('REPONSE',data,that.value)
					   for (var i=0;i<that.value.length;i++) {
					   	
						 var modelItemFind=_.where(data, {"id":that.value[i]}) ;
						 if (modelItemFind.length<=0) {
						 	modelItemFind=_.where(data, {"id":Number(that.value[i])}) ;
						 }
						 
						 
						 if (modelItemFind.length>0) {
							 var modelItem=modelItemFind[0];
							 console.log('CREATE ITEM')
		  				   var CollectionItem=that.CollectionItem;
						   
						  // alert(that.fieldOptions)
						  
						  
						   
		  			  var im=new CollectionItem({model:modelItem,modelName:that.relatedModel,fieldOptions:that.fieldOptions});
					  
					  
		  			  im.$el.attr('itemid',modelItem.id)
					  im.bind('delete',function(itemid) {
					  	
						that.value.splice(that.value.indexOf(itemid), 1);
						  $(this.$el).remove();
						  that.trigger('change');
						
					  })
		  			 $('.collection-container',that.$el).append(im.$el)
							
						 }
						
						
					   }
					  
					   
					 //  console.log('RESOONSE',data)
			   // _.each(data,function(item) {
  // 				  
  // 		
  // 			  
  // 		  });
		  
		  $('.collection-container',that.$el).sortable({"stop":function(event,ui) {
			  
			  var result = $(this).sortable('toArray', {attribute: 'itemid'});
			  that.value=result;
			  that.trigger('change');
		  }});
			// var it=$('<p/>');
// 			
// 			it.html(data)
// 			
// 			// img.attr('src',AJS.config.fileDir+"thumbnail/"+data.src)
// 		that.$el.append(it)
		
		
		
		   }
	   });
							
				
			}
		})
		
		
		
        return View;
    }
);
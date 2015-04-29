		define([     // lib/jquery/jquery
		  'underscore', // lib/underscore/underscore
		  'backbone','text!./textareamultilangotf.html','core/helpers/multilang',
		  'jquery',"tinymce"],
		    function( _, Backbone,htmlTemplate,Multilang,$) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		var languageButton=Backbone.View.extend({
			tagName:"div",
			className:"languageButton ap-mini-button"
		})
		
		
		var View=Backbone.View.extend({
			value:new Object(),
			tagName:"div",
			className:"form-group stringmultilangotf",
			template:htmlTemplate,
			initialize:function(options) {
				var that=this;
				//EditorClass.prototype.initialize.call(this,options);
				
				for (var o in options) {
					this[o]=options[o];
				}
				this.redactor=null;
				this.$el.html(_.template(htmlTemplate,options));
				
				this.input=this.$el.find("textarea").first();
				this.langList=this.$el.find(".languagesList").first();
				this.addLang=this.$el.find('.addLangbutton').first();
			
				if (typeof this.value == "object" && Object.keys(this.value).length==0 ) {
				
					this.value=new Object();
					_.each(AJS.config.defaultLanguages,function(lang) {
						that.value[lang]="";
					})
				}
				if (typeof this.value == "string") {
					var temp=this.value;
					this.value=new Object();
					_.each(AJS.config.defaultLanguages,function(lang) {
						that.value[lang]="";
					})
					this.value[AJS.config.defaultLanguage]=temp;
				}
				
				if (typeof this.value == "undefined") {
					this.value=new Object();
					_.each(AJS.config.defaultLanguages,function(lang) {
						that.value[lang]="";
					})
				}
			
		
	
		
			if (options.options) {
				
			if (options.options.addlang==true || options.options.addlang==null ) {
				
			
			
			this.addLang.click(function(e) {
				
				
				var newlang=prompt('Entrez une nouvelle langue');
			
				if (newlang=="" || newlang==null || typeof newlang=="undefined") return;
			
				var newButton=that.addLangButton(newlang)
			
				that.value[that.currentLang]=that.input.val();
				
				that.currentLang=newlang;
				that.input.val("");
				that.langList.find('.languageButton').removeClass('selected')
				newButton.$el.addClass('selected')
			if (that.redactor) that.redactor.setContent("");
				
			})
			
		}
		else {
			this.addLang.hide();
		}
		
		}
			
				
				setTimeout(function() {
					that.renderEditor(that);
				},500)
				
					
					
				
			},
			renderEditor:function(that) {
				
			    $('textarea',this.$el).tinymce({
					menubar:false, statusbar: true, 
					plugins: AJS.config.tinymce.plugins,
					toolbar: AJS.config.tinymce.toolbar,
					theme: AJS.config.tinymce.theme,
					skin: AJS.config.tinymce.skin,
					resize: "both",
					width:420,
			               // Optional parameters
						   setup: function(editor) {
							   that.redactor=editor;
						           editor.on('blur', function(e) {
									 
				   					var val= that.input.val();
					
				   					var rawtext=$('<div/>').html(val).text();
				   					if (rawtext.length==0 && AJS.config.defaultLanguages.indexOf(that.currentLang)==-1) {
							//console.log('delete ',that.currentLang)
										
										// if (AJS.config.defaultLanguages.indexOf(that.currentLang)!=-1) {
	//
	// 									}
										
										
				    						$(".languageButton[lang='"+that.currentLang+"']",that.$el).remove();
										
											
											if (typeof that.value[that.currentLang]!="undefined") 	delete that.value[that.currentLang];
				   			
				   					}
				   					else {
										that.value[that.currentLang]=val;
				   						
				   					}
		
				   		that.trigger("change");
									  
									  
						           });
								   if (that.limit) {
									   editor.on('keydown',function(ed, e) {
									    //define local variables
									    var tinymax, tinylen, htmlcount;
									    //manually setting our max character limit
										tinymax = that.limit;
									  //  tinymax = editor.settings.charLimit;
									   //grabbing the length of the curent editors content
									    tinylen = editor.getContent().length;
									   //setting up the text string that will display in the path area
									    htmlcount =  tinylen + "/" + tinymax;
									    //if the user has exceeded the max turn the path bar red.
										console.log(htmlcount)
									    if (tinylen>tinymax){
										
									     htmlcount = "<span style='font-weight:bold; color: #f00;'>" + htmlcount + "</span>"
									    }
										
									    //enable to override the limit for various editors here
									    //tinyMCE.editors["mytextarea1"].settings.charLimit = 3000; 
									    //this line writes the html count into the path row of the active editor
that.$el.find('.textinfos').html('<span id="max_char_string">&nbsp;'+htmlcount+'</span>')
      
									   
									    });
								   }
								   
								   
								   
								   
						       }
			           });
					   return;
			
			
				
				},createlanguageButtons:function() {
						var that=this;
					this.langList.empty();
					
					
					if (AJS.config.defaultLanguages) {
						_.each(AJS.config.defaultLanguages,function(lang) {
							var newButton=that.addLangButton(lang);
							if (AJS.config.defaultLanguage==lang && newButton) newButton.$el.addClass('selected')
						})
							that.currentLang=AJS.config.defaultLanguages[0];
					}
					
					this.languages=Multilang.parseLanguages(this.value);
					
		
					_.each(this.languages,function(lang,index) {
			
						var newButton=that.addLangButton(lang)
						
							if (AJS.config.defaultLanguage==lang && newButton) {
								
								newButton.$el.addClass('selected')
								that.currentLang=lang;
							}
					
						
					})	
					
				},
				addLangButton:function(lang) {
				
				
				
					var that=this;
					
					if (this.langList.find('.languageButton[lang='+lang+']').size()>0) return null;
				
					
					var newB=new languageButton();
					newB.$el.html(lang);
					newB.$el.attr('lang',lang);
			
					this.langList.append(newB.$el);
				
				
				
					if (that.value[lang]==null) {
						
						that.value[lang]="";
						
					}
				
				
				
					newB.$el.click(function(e) {
						var thisButton=e.currentTarget;
						that.langList.find('.languageButton').removeClass('selected')
						$(e.currentTarget).addClass('selected');
				
					that.value[that.currentLang]=that.input.val();
				
				
						var l=$(this).attr('lang');
						that.currentLang=l;
						that.displayValue();
					
					})
					
					return newB;
				},
				setValue:function(val) {
			
					if (typeof this.value=="string") {
					
						var temp=this.value;
						this.value=new Object();
					
					}
				
					if (typeof val=='string') {
						//alert(0)
						this.value[this.currentLang]=val;
						console.log("VALUEE",this.value)
					}
				
					if (typeof val=='object') {
						//alert(val)
						if (Object.keys(val).length==0 ) {
			
											val=new Object();
											val[AJS.config.defaultLanguage]="";
										}
						
						this.value=val;
					}
					
					if (typeof val=="undefined" && this.default) {
						
						if (typeof this.default=='string') this.value[this.currentLang]=this.default;
						if (typeof this.default=='object') this.value=this.default;
					}
					this.createlanguageButtons();
					//alert(this.value)
					this.displayValue();
				},
				getValue:function() {
					console.log('get value',this.value)
					
					return	this.cleanValue(this.value);
				
				},
				cleanValue:function(val) {
					for (var p in val) {
						if (val[p]=="") delete val[p];
						
					}
					return val;
				},
				displayValue:function() {
				
					if (this.currentLang==null) {
						this.input.val(this.value)
						if (this.redactor) this.redactor.setContent(this.value);
					}
					else {
					
						//alert(this.value)
						console.log("LANGGGG",this.value)
						
					
					
					if (typeof this.value=="string") {
						if (this.redactor) this.redactor.setContent(this.value);
						this.input.val(this.value);
					}
					if (typeof this.value=="object") {
						
						if (this.redactor) this.redactor.setContent(this.value[this.currentLang]);
						this.input.val(this.value[this.currentLang]);
					}
						
					
						//this.input.val(Multilang.getValue(this.value,this.currentLang))
					}
				
				
				}
		})
		
		View.display=function(val) {
			
			if (typeof val == "string") {
				
				return $("<div/>").html(val).text().substr(0,50);
			}
			if (typeof val == "object") {
				
				var currentLang=AJS.config.defaultLanguage;
				
				return $("<div/>").html(val[currentLang]).text().substr(0,50);
				
			}
			
			return "";
			
		}
		
        return View;
    }
);
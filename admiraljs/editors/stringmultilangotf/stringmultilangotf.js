define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./stringmultilangotf.html','core/helpers/multilang'],
    function($, _, Backbone,htmlTemplate,Multilang) {
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
				
				this.$el.html(_.template(htmlTemplate,options));
				
				this.input=$("input",this.$el).first();
				this.langList=$(".languagesList",this.$el).first();
				
			
			
			
				this.input.keypress(function(e) {
    if(e.which == 13) {
		// that.setValue(that.input.val());
// 		that.trigger('change');
that.changed();
    }
});
				
				
				
				
				this.currentLang=AJS.config.defaultLanguage;
				
				//this.value=options.value;
				if (AJS.config.defaultLanguages) {
					_.each(AJS.config.defaultLanguages,function(lang) {
						var newButton=that.addLangButton(lang);
						if (AJS.config.defaultLanguage==lang && newButton) newButton.$el.addClass('selected')
					})
				}
			
				
			this.languages=Multilang.parseLanguages(this.value);
			
			
			_.each(this.languages,function(lang,index) {
				
				var newButton=that.addLangButton(lang)
				if (index==0) {
					if (AJS.config.defaultLanguage==lang && newButton) newButton.$el.addClass('selected')
					that.currentLang=lang;
					
				}
			})
			
			this.addLang=$('.addLangbutton',this.$el).first();
			if (options.options) {
			if (options.options.addlang==true || options.options.addlang==null ) {
				
			
			
			this.addLang.click(function(e) {
				
				
				var newlang=prompt('Entrez une nouvelle langue');
				
				if (newlang=="" || newlang==null || typeof newlang=="undefined") return;
				
				var newButton=that.addLangButton(newlang)
				that.langList.find('.languageButton').removeClass('selected')
				newButton.$el.addClass('selected')
				that.value[that.currentLang]=that.input.val();
				that.currentLang=newlang;
				that.input.val("");
				
			})
			
		}
		else {
			this.addLang.hide();
		}
		}
			
			//this.$el.append(this.addLang)
		
			this.setOnChange();
			
				
			},
			addLangButton:function(lang) {
				
				if (this.langList.find('.languageButton[lang='+lang+']').size()>0) return null;
				
				var that=this;
				var newB=new languageButton();
				newB.$el.html(lang);
				newB.$el.attr('lang',lang);
				
				
			
				this.langList.append(newB.$el);
				
				
				
				if (that.value[lang]==null) that.value[lang]="";
				
				
				
				newB.$el.click(function(e) {
					that.langList.find('.languageButton').removeClass('selected')
					$(e.currentTarget).addClass('selected');
				//	that.value=that.input.val();
				that.value[that.currentLang]=that.input.val();
				
				
					//that.value=Multilang.setValue(that.value,that.input.val(),that.currentLang)
					//console.log("VALUE",that.value)
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
					this.value=val;
				}
				
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
				}
				else {
					
					//alert(this.value)
					//console.log("LANGGGG",this.value)
					
					this.input.val(this.value[this.currentLang]);
					
					//this.input.val(Multilang.getValue(this.value,this.currentLang))
				}
				
				
			},setOnChange:function() {
				var that=this;
				
				this.input.on('change',function() {
					
					that.changed();
					//alert('save')
				})
			},
			changed:function() {
				var that=this;
					var val= that.input.val();
					
					
					if (val.length==0) {
						
						// alert(that.currentLang)
// 						console.log('delete ',that.currentLang)
 						$(".languageButton[lang='"+that.currentLang+"']",that.$el).remove();
						
						if (typeof that.value[that.currentLang]!="undefined") 	delete that.value[that.currentLang];
						//that.value[this.currentLang];
						
					}
					else {
						that.setValue(that.input.val());
					}
					
					
					that.trigger('change');
			}
		})
		
		// static display function
		
		View.display=function(val) {
			
			
			if (  typeof val!="undefined") {
				if (val[AJS.config.currentLanguage]!=null) {
					return val[AJS.config.currentLanguage];
				}
				
			}
			
			return val;
			
		}
		
        return View;
    }
);
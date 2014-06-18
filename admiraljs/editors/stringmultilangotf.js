define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','text!./stringmultilangotf/stringmultilangotf.html','core/helpers/multilang'],
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
					this.value[AJS.config.defaultLanguage]=temp;
				}
				
				
				if (typeof this.value == "undefined") {
					this.value=new Object();
					this.value[AJS.config.defaultLanguage]="";
				}
				
				this.$el.html(_.template(htmlTemplate,options));
				
				this.input=$("input",this.$el).first();
				this.langList=$(".languagesList",this.$el).first();
				this.addLang=$('.addLangbutton',this.$el).first();
			
			
			
				this.input.keypress(function(e) {
    if(e.which == 13) {
		// that.setValue(that.input.val());
// 		that.trigger('change');
that.changed();
    }
});
				
				
				
				
				this.currentLang=AJS.config.defaultLanguage;
				
				//this.value=options.value;
				
			this.languages=Multilang.parseLanguages(this.value);
			
			
			_.each(this.languages,function(lang,index) {
				
				that.addLangButton(lang)
				if (index==0) {
					
					that.currentLang=lang;
					
				}
			})
			
			
			this.addLang.click(function() {
				
				var newlang=prompt('Entrez une nouvelle langue');
				
				if (newlang=="" || newlang==null || typeof newlang=="undefined") return;
				
				that.addLangButton(newlang)
				
				that.value[that.currentLang]=that.input.val();
				that.currentLang=newlang;
				that.input.val("");
				
			})
			
			//this.$el.append(this.addLang)
		
			this.setOnChange();
			
				
			},
			addLangButton:function(lang) {
				
				
				
				var that=this;
				var newB=new languageButton();
				newB.$el.html(lang);
				newB.$el.attr('lang',lang);
			
				this.langList.append(newB.$el);
				
				
				
				if (that.value[lang]==null) that.value[lang]="";
				
				
				
				newB.$el.click(function() {
					
				//	that.value=that.input.val();
				that.value[that.currentLang]=that.input.val();
				
				
					//that.value=Multilang.setValue(that.value,that.input.val(),that.currentLang)
					//console.log("VALUE",that.value)
					var l=$(this).attr('lang');
					that.currentLang=l;
					that.displayValue();
					
				})
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
				return	this.value;
				
			},
			displayValue:function() {
				if (this.currentLang==null) {
					this.input.val(this.value)
				}
				else {
					
					//alert(this.value)
					console.log("LANGGGG",this.value)
					
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
						if (that.value[that.currentLang]) delete that.value[that.currentLang];
						
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
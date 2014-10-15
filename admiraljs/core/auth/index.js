define(['jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone','core/lib/session','text!./auth.html','css!./auth.css'],
    function($, _, Backbone,Session,htmlTemplate) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
		function sha1(str) {
		  //  discuss at: http://phpjs.org/functions/sha1/
		  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
		  // improved by: Michael White (http://getsprink.com)
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  //    input by: Brett Zamir (http://brett-zamir.me)
		  //   example 1: sha1('Kevin van Zonneveld');
		  //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

		  var rotate_left = function (n, s) {
		    var t4 = (n << s) | (n >>> (32 - s));
		    return t4;
		  };

		  /*var lsb_hex = function (val) {
		   // Not in use; needed?
		    var str="";
		    var i;
		    var vh;
		    var vl;

		    for ( i=0; i<=6; i+=2 ) {
		      vh = (val>>>(i*4+4))&0x0f;
		      vl = (val>>>(i*4))&0x0f;
		      str += vh.toString(16) + vl.toString(16);
		    }
		    return str;
		  };*/

		  var cvt_hex = function (val) {
		    var str = '';
		    var i;
		    var v;

		    for (i = 7; i >= 0; i--) {
		      v = (val >>> (i * 4)) & 0x0f;
		      str += v.toString(16);
		    }
		    return str;
		  };

		  var blockstart;
		  var i, j;
		  var W = new Array(80);
		  var H0 = 0x67452301;
		  var H1 = 0xEFCDAB89;
		  var H2 = 0x98BADCFE;
		  var H3 = 0x10325476;
		  var H4 = 0xC3D2E1F0;
		  var A, B, C, D, E;
		  var temp;

		  // utf8_encode
		  str = unescape(encodeURIComponent(str));
		  var str_len = str.length;

		  var word_array = [];
		  for (i = 0; i < str_len - 3; i += 4) {
		    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
		    word_array.push(j);
		  }

		  switch (str_len % 4) {
		  case 0:
		    i = 0x080000000;
		    break;
		  case 1:
		    i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
		    break;
		  case 2:
		    i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
		    break;
		  case 3:
		    i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
		      8 | 0x80;
		    break;
		  }

		  word_array.push(i);

		  while ((word_array.length % 16) != 14) {
		    word_array.push(0);
		  }

		  word_array.push(str_len >>> 29);
		  word_array.push((str_len << 3) & 0x0ffffffff);

		  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
		    for (i = 0; i < 16; i++) {
		      W[i] = word_array[blockstart + i];
		    }
		    for (i = 16; i <= 79; i++) {
		      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
		    }

		    A = H0;
		    B = H1;
		    C = H2;
		    D = H3;
		    E = H4;

		    for (i = 0; i <= 19; i++) {
		      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
		      E = D;
		      D = C;
		      C = rotate_left(B, 30);
		      B = A;
		      A = temp;
		    }

		    for (i = 20; i <= 39; i++) {
		      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
		      E = D;
		      D = C;
		      C = rotate_left(B, 30);
		      B = A;
		      A = temp;
		    }

		    for (i = 40; i <= 59; i++) {
		      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
		      E = D;
		      D = C;
		      C = rotate_left(B, 30);
		      B = A;
		      A = temp;
		    }

		    for (i = 60; i <= 79; i++) {
		      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
		      E = D;
		      D = C;
		      C = rotate_left(B, 30);
		      B = A;
		      A = temp;
		    }

		    H0 = (H0 + A) & 0x0ffffffff;
		    H1 = (H1 + B) & 0x0ffffffff;
		    H2 = (H2 + C) & 0x0ffffffff;
		    H3 = (H3 + D) & 0x0ffffffff;
		    H4 = (H4 + E) & 0x0ffffffff;
		  }

		  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
		  return temp.toLowerCase();
		}
		
		var View=Backbone.View.extend({
			template:_.template(htmlTemplate),
		    initialize:function () {
				$.ajaxSetup({xhrFields: {
				                withCredentials: true
				            }});
		           console.log('Initializing Login View, test screen',$('#screen').size());
				   this.render();
				   console.log('login view ',this.el)
		       },

		       events: {
		           "click #loginButton": "login"
		       },

		       render:function () {
		           this.$el.html(this.template);
		           return this;
		       },
			   throwError:function(text) {
			   	$('.alert-error').show();
				$('.alert-error').html(text)
			   },

		       login:function (event) {
				   var that=this;
				   
		           event.preventDefault(); // Don't let this button submit the form
				   if (!AJS.config.login) AJS.config.login={};
				   if (!AJS.config.login.url) AJS.config.login.url="login";
		           $('.alert-error').hide(); // Hide any errors on a new submit
		           var url = AJS.config.api+AJS.config.login.url;
		           var formValues = {
		               user: $('#inputEmail').val(),
		               password: $('#inputPassword').val()
		           };
				    console.log('Loggin in... ');
					
					
				   
				   if (!AJS.config.login.mode || AJS.config.login.mode=="fake") {
				   	
					   if (formValues.user=="admin" && sha1(formValues.password)=="d033e22ae348aeb5660fc2140aec35850c4da997") {
						   Session.set('authenticated',true);
						 //  Backbone.history.navigate('/home', { trigger : true });
						   that.trigger('success');
					   
					   }
					   else {
						   this.throwError("bad login")
					
					   }
				  
				 
						return;
					
				   }
		          
				   
				    if (AJS.config.login.mode=="ajax") {
				  
				   
		          

		           $.ajax({
		               url:url,
		               type:'POST',
		               dataType:"json",
		               data: formValues,
					  
		               success:function (data) {
		                   console.log(["Login request details: ", data]);
               
		                   if(data.error) {  // If there is an error, show the error messages
		                       that.throwError(data.error)
		                   }
		                   else { // If not, send them back to the home page
							    Session.set('authenticated',true);
								Session.set('user',data.user)
							
		                        that.trigger('success');
		                   }
		               }
		           }) 
				   
				return;
			
		   }
				   
				   
				   
		       }
		})
		
        return View;
    }
);
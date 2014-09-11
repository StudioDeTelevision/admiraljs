define(['jquery',    
  'underscore', 
  'backbone'],
    function($, _, Backbone) {


var PaginatedCollection = Backbone.Collection.extend({
	page:1,
	perPage:10,
	filters:null,
  initialize: function() {
    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
    typeof(options) != 'undefined' || (options = {});
 
   
  //  return Backbone.Collection.prototype.initialize.call(this, options);
  },
  fetch: function(options) {
    typeof(options) != 'undefined' || (options = {});
	options.type="POST";
    this.trigger("fetching");
    var self = this;
    
	var success = options.success;
	var data={page: this.page, per_page: this.perPage};
	
  if (this.filters) {
	  data.where=JSON.stringify(this.filters);
  }
  else {
  	
  }
	
	options.data=data;
	

    options.success = function(resp,j,q) {
		//.getAllResponseHeaders());
		//console.log('FETCH ');
		var reponseHeaders=q.xhr.getAllResponseHeaders();
		console.log('reponseHeaders ',typeof reponseHeaders)
		//alert(q.xhr.getResponseHeader('total'))
		 self.total = parseInt(q.xhr.getResponseHeader('total'));
		 self.page = parseInt(q.xhr.getResponseHeader('page'));
		 self.perPage = parseInt(q.xhr.getResponseHeader('perPage'));
		 console.log("TOTAL",self.total)
      self.trigger("fetched");
	  
      if(success) { success(self, resp); }
    };
    return Backbone.Collection.prototype.fetch.call(this, options);
  },
  setFilters:function(filters) {
	
	  this.filters=filters;
	  
	  this.fetch({reset:true})
	
  },
  parse: function(models) {
    //this.page = models.page;
    //this.perPage = models.perPage;
   // this.total = models.total;
    return models;
  },
  url: function() {
	
     return this.baseUrl;
  },
  pageInfo: function() {
    var info = {
      total: this.total,
      page: this.page,
      perPage: this.perPage,
      pages: Math.ceil(this.total / this.perPage) || 0,
      prev: false,
      next: false
    };

    var max = Math.min(this.total, this.page * this.perPage);

    if (this.total == this.pages * this.perPage) {
      max = this.total;
    }

    info.range = [(this.page - 1) * this.perPage + 1, max];

    if (this.page > 1) {
      info.prev = this.page - 1;
    }
	console.log(this.total ,this.page , info.pages)
    if (this.page < info.pages) {
      info.next = this.page + 1;
    }

    return info;
  },
  getPage: function(num) {
   
    this.page = parseInt(num);
    return this.fetch();
  },
  getLastPage: function(num) {
   
    this.page =this.pageInfo().pages;
    return this.fetch();
  },
  nextPage: function() {
    if (!this.pageInfo().next) {
      return false;
    }
    this.page = this.page + 1;
    return this.fetch();
  },
  previousPage: function() {
    if (!this.pageInfo().prev) {
      return false;
    }
    this.page = this.page - 1;
    return this.fetch();
  }

});


return PaginatedCollection;

});
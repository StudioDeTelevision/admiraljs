define(['jquery',    
  'underscore', 
  'lodash',
  'backbone'],
    function($, _,lodash, Backbone) {


var PaginatedCollection = Backbone.Collection.extend({
	page:1,
	perPage:30,
	skip:0,
	limit:10,
	sortBy:null,
	sortOrder:"asc",
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
	
	
	var data={skip: (this.page-1)*this.perPage, limit: this.perPage,where:{}};
	
    if (this.schema.findFilter) {
		
		var ff=this.schema.findFilter;
		
		
	
    lodash.merge(data,ff)
	
		
    }
	
  if (this.filters) {
	 // if (!data.where) data.where={};
	
	  console.log("FILTERS",typeof this.filters)
	  console.log("data.where",typeof data.where)
	  
	data.where=lodash.assign(data.where,this.filters)
	 
  }
 
  
		
			data.where=JSON.stringify(data.where);
			
			
			this.sortBy = this.sortBy || this.schema.sortBy || this.schema.listFields[0];
			
			//alert(this.schema.listFields[0])
			// data.sort=(this.sortBy) ? this.sortBy+":'"+this.sortOrder+"'" : (this.schema.listFields) ? this.schema.listFields[0]+":'"+this.sortOrder+"'" : null;
			if (AJS.config.orm=="waterline") {
				data.sort={};
				data.sort[this.sortBy]=this.sortOrder;
			} else {
				data.sort=new Array();
				data.sort.push([this.sortBy,this.sortOrder]);
				data.sort=JSON.stringify(data.sort);
			}
			
			//if (data.sort) data.sort=JSON.parse(data.sort);
  
 // alert(data.sort)
	
	options.data=data;
	

    options.success = function(resp,j,q) {
		//.getAllResponseHeaders());
		//console.log('FETCH ');
		var reponseHeaders=q.xhr.getAllResponseHeaders();
		console.log('reponseHeaders ',reponseHeaders)
		console.log('q.xhr ',q.xhr)
		console.log('q.xhr.getResponseHeader(Content-Type) ',q.xhr.getResponseHeader('Content-Type'))
		console.log('q.xhr.getResponseHeader(Content-Range) ',q.xhr.getResponseHeader('Content-Range'))
		//alert(q.xhr.getResponseHeader('total'))
		 self.total = parseInt(q.xhr.getResponseHeader('total'));
		 self.skip = parseInt(q.xhr.getResponseHeader('skip'));
		 self.limit = parseInt(q.xhr.getResponseHeader('limit'));
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
	  skip:this.skip,
	  limit:this.limit,
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
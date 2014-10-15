
  'use strict';
  var express = require('express');
  var app = express();
  var mkdirp = require('mkdirp');
  var path = require('path');

  var lodash = require('lodash');
   var fs = require('fs');
  
var     options =require('./config.js');


var _existsSync = fs.existsSync || path.existsSync,
formidable = require('formidable'),
imageMagick = require('imagemagick'),

utf8encode = function (str) {
    return unescape(encodeURIComponent(str));
},

nameCountRegexp = /(?:(?: \(([\d]+)\))?(\.[^.]+))?$/,
nameCountFunc = function (s, index, ext) {
    return ' (' + ((parseInt(index, 10) || 0) + 1) + ')' + (ext || '');
},
FileInfo = function (file) {
    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
    this.deleteType = 'DELETE';
},
UploadHandler = function (req, res, callback) {
    this.req = req;
    this.res = res;
    this.callback = callback;
};

FileInfo.prototype.validate = function () {
    if (options.minFileSize && options.minFileSize > this.size) {
        this.error = 'File is too small';
    } else if (options.maxFileSize && options.maxFileSize < this.size) {
        this.error = 'File is too big';
    } else if (!options.acceptFileTypes.test(this.name)) {
        this.error = 'Filetype not allowed';
    }
    return !this.error;
};
FileInfo.prototype.safeName = function () {
    // Prevent directory traversal and creating hidden system files:
    this.name = path.basename(this.name).replace(/^\.+/, '');
    // Prevent overwriting existing files:
    while (_existsSync(options.uploadDir+options.publicDir + '/' + this.name)) {
        this.name = this.name.replace(nameCountRegexp, nameCountFunc);
    }
};
FileInfo.prototype.initUrls = function (req) {
    if (!this.error) {
        var that = this,
            baseUrl = (options.ssl ? 'https:' : 'http:') +
                '//' + req.headers.host + options.uploadUrl;
        this.url = this.deleteUrl = baseUrl + encodeURIComponent(this.name);
        Object.keys(options.imageVersions).forEach(function (version) {
            if (_existsSync(
                    options.uploadDir+options.publicDir + '/' + version + '/' + that.name
                )) {
                that[version + 'Url'] = baseUrl + version + '/' +
                    encodeURIComponent(that.name);
            }
        });
    }
};
UploadHandler.prototype.get = function () {
    var handler = this,
        files = [];
    fs.readdir(options.uploadDir+options.publicDir, function (err, list) {
        list.forEach(function (name) {
            var stats = fs.statSync(options.uploadDir+options.publicDir + '/' + name),
                fileInfo;
            if (stats.isFile() && name[0] !== '.') {
                fileInfo = new FileInfo({
                    name: name,
                    size: stats.size
                });
                fileInfo.initUrls(handler.req);
                files.push(fileInfo);
            }
        });
        handler.callback({files: files});
    });
};
UploadHandler.prototype.post = function (req) {
	
    var handler = this;
	

//	console.log("handler.req",handler.req)
    var     form = new formidable.IncomingForm(),
		
        tmpFiles = [],
        files = [],
        map = {},
        counter = 1,
        redirect,
        finish = function () {
            counter -= 1;
			console.log('File finish',counter)
            if (!counter) {
                files.forEach(function (fileInfo) {
                    fileInfo.initUrls(handler.req);
                });
                handler.callback({files: files}, redirect);
            }
        };
		var util=require('util');
		
		
	
		
    form.uploadDir = options.uploadDir+options.tmpDir;

    form.on('fileBegin', function (name, file) {
		
		console.log("FILE BEGIN",file.path,new Date())
		
		 var fileInfo = map[path.basename(file.path)];
		
        tmpFiles.push(file.path);
        var fileInfo = new FileInfo(file, handler.req, true);
        fileInfo.safeName();
        map[path.basename(file.path)] = fileInfo;
        files.push(fileInfo);
    }).on('field', function (name, value) {
		console.log('Field',name,value)
		if (name=="imageVersions") {
		 var versions=JSON.parse(value);
		 console.log(versions)
	 	options.imageVersions=versions;
			
		}
        if (name === 'redirect') {
            redirect = value;
        }
    }).on('file', function (name, file) {
		console.log('ON FILE EVENT',name)
        var fileInfo = map[path.basename(file.path)];
        fileInfo.size = file.size;
        if (!fileInfo.validate()) {
            fs.unlink(file.path);
            return;
        }
		console.log("UPLOAD TO file.path",file.path)
		console.log("UPLOAD TO",options.publicDir + '/' + fileInfo.name,new Date())
        fs.renameSync(file.path, options.uploadDir+options.publicDir + '/' + fileInfo.name);
        if (options.imageTypes.test(fileInfo.name)) {
            Object.keys(options.imageVersions).forEach(function (version) {
                counter += 1;
                var opts = options.imageVersions[version];
				console.log("MAKE VERSION TO",options.publicDir + '/' + version + '/' +   fileInfo.name)
				fs.mkdir(options.uploadDir+options.publicDir + '/' + version,function() {
					
					
				});
				
                imageMagick.resize({
                    width: opts.width,
                    height: opts.height,
                    srcPath: options.uploadDir+options.publicDir + '/' + fileInfo.name,
                    dstPath: options.uploadDir+options.publicDir + '/' + version + '/' +  fileInfo.name
                }, finish);
            });
        }
    }).on('aborted', function () {
		console.log('ABORTED')
        tmpFiles.forEach(function (file) {
            fs.unlink(file);
        });
    }).on('error', function (e) {
        console.log(e);
    }).on('progress', function (bytesReceived, bytesExpected) {
        if (bytesReceived > options.maxPostSize) {
            handler.req.connection.destroy();
        }
    }).on('end', finish).parse(handler.req);
		console.log("form",form)
};
UploadHandler.prototype.destroy = function () {
    var handler = this,
        fileName;
    if (handler.req.url.slice(0, options.uploadUrl.length) === options.uploadUrl) {
        fileName = path.basename(decodeURIComponent(handler.req.url));
        if (fileName[0] !== '.') {
            fs.unlink(options.publicDir + '/' + fileName, function (ex) {
                Object.keys(options.imageVersions).forEach(function (version) {
                    fs.unlink(options.publicDir + '/' + version + '/' + fileName);
                });
                handler.callback({success: !ex});
            });
            return;
        }
    }
    handler.callback({success: false});
};


//// 


		


module.exports=function(configOverride) {

	if (configOverride) lodash.merge(options, configOverride);

 var router = express.Router();

     router.post('/upload', function(req, res, next) {
      
	  
	
	
	options.uploadUrl=options.publicDir+"/";
  
   
	
	
    mkdirp(options.tmpDir, function(err) { 

      // console.log('create temp dir in',err,options.tmpDir)

    });
    mkdirp(options.uploadDir, function(err) { 

      // console.log('create public dir in',options.uploadDir)

    });
    mkdirp(options.uploadDir+options.publicDir, function(err) { 

      // console.log('create public upload dir in',options.publicDir)

    });
	
	
	
    res.set(
        'Access-Control-Allow-Origin',
        options.accessControl.allowOrigin
    );
    res.set(
        'Access-Control-Allow-Methods',
        options.accessControl.allowMethods
    );
    res.set(
        'Access-Control-Allow-Headers',
        options.accessControl.allowHeaders
    );
   
        var handler = new UploadHandler(req, res, function(response) {
        	
			res.json(response)
			
        });
	
	
    handler.post(req);
	
	
    //next();
   });
   
   
   app.use(router);

   app.use(options.publicDir, express.static(options.uploadDir+options.publicDir));
   
   console.log('Fileserver running on same port, at /upload')
   console.log('Fileserver serving static folder on path '+options.publicDir+" :",options.uploadDir+options.publicDir)
   return app;
	
    
	
}
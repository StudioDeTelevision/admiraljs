module.exports={
	"port":7010,
            "tmpDir": '/tmp',
            "uploadDir": __dirname + '/../public',
            "publicDir": '/files',
			"renameFiles":true,
            "maxPostSize": 11000000000, // 11 GB
            "minFileSize": 1,
            "maxFileSize": 10000000000, // 10 GB
            "acceptFileTypes": /.+/i,
          
            "inlineFileTypes": /\.(gif|jpe?g|png)$/i,
            "imageTypes": /\.(gif|jpe?g|png)$/i,
            "imageVersions": {
                'thumbnail': {
                    width: 80,
                    height: 80
                }
            },
            "accessControl": {
                "allowOrigin": '*',
                "allowMethods": 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
                "allowHeaders": 'Content-Type, Content-Range, Content-Disposition'
            },
           
            "ssl": {
                key: null,
                cert: null
            }
}
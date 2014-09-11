var admiral=require(__dirname+'/index.js');

admiral.setConfig({
	database:{"basename":"projects",
	host:"176.31.250.73"},
	port:7010,
	hello:7010,
fileserver:{port:7020},

}
)
admiral.setSchema([
	{  "schemaName":"user",
		"model":"user",
		"label":"Utilisateurs",
		"create":"user/create",
		"update":"user/update",
		"find":"user/find",
		"destroy":"user/destroy",
		"listFields":["email"],
		"fields":[{"name":"email","type":"string","editor":"string","label":"Email"}]
	},{  "schemaName":"projects",
		"model":"projects",
		"label":"projects",
		"create":"projects/create",
		"update":"projects/update",
		"find":"projects/find",
		"destroy":"projects/destroy",
		"listFields":["name"],
		"fields":[{"name":"name","type":"string","editor":"string","label":"Name"}]
	}

	]
)

admiral.start();

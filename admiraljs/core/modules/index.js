define(['./defaulthome/index',
'./schemabuilder/index'],
    function(DefaultHome,
		SchemaBuilder) {
       
		
		var Modules={};
		
		Modules.DefaultHome=DefaultHome;
		Modules.SchemaBuilder=SchemaBuilder;
		
        return Modules;
    }
);
define(['./defaulthome/index',
'./schemabuilder/index',
'./schemaeditor/index'],
    function(DefaultHome,
		SchemaBuilder,
	SchemaEditor) {
       
		
		var Modules={};
		
		Modules.DefaultHome=DefaultHome;
		Modules.SchemaBuilder=SchemaBuilder;
		Modules.SchemaEditor=SchemaEditor;
		
		
        return Modules;
    }
);
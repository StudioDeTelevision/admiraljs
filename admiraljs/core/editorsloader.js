




var editors=["string",
"textarea",
'textareasimple',
"yesno",
"date"
,"datetime",
"file",
"collection",
{name:"collectionembed",path:"collectionembed/collectionembed"},
{name:"imagedropdown",path:"imagedropdown/imagedropdown"},
"image",
"imagecropresize/imagecropresize",
"imagescollection",
"select",
"stringmultilangotf"
,"textareamultilangotf"];


var editorsPathesArray=new Array();
for (var i=0; i<editors.length; i++) {
	var editor=editors[i];
	if (typeof editor=="object") {
		console.log("PREPARE FIELD EDITOR DEF ",editor.name)
		
		//configObj.paths['editors/'+editor.name]="./editors/"+editor.path;
AJS.fieldClassesPathes[editor.name]="../editors/"+editor.path;
editorsPathesArray.push("../editors/"+editor.path)
	}
	if (typeof editor=="string") {
		console.log("PREPARE FIELD EDITOR DEF ",editor)
		//configObj.paths['editors/'+editor]="./editors/"+editor;
AJS.fieldClassesPathes[editor]="../editors/"+editor;
editorsPathesArray.push("../editors/"+editor)
	}
	
	

}
console.log('AJS.fieldClassesPathes',AJS.fieldClassesPathes)

require(editorsPathesArray,function(req) {
alert(req[editorsPathesArray[0]])
		var Classes={};
	var counter=0;
  	for (var c in AJS.fieldClassesPathes) {

		console.log('define fields',c,AJS.fieldClassesPathes[c])
		console.log('type',typeof arguments[counter])
Classes[c]=arguments[counter];
	}
	
	return Classes;
	
})

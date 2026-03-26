---
sidebar_position: 9.5
---

# Tutorial 9b WebApp Layer Mesh Tile (Custom Dialog)

## Introduction  {#introduction}

In addition to the content of [Tutorial 9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9), we have customized the dialog box that appears when you click on a mesh.

To see the actual operation, click on [mesh2b.html](https://svgmap.org/examples/tutorials/mesh2b/mesh2b.html).

### Source Code {#source-code}

- [Source code directory](https://svgmap.org/examples/tutorials/mesh2b/)
- meshTileViewerB.html: A web app linked to a layer. In addition to the content of Tutorial 9, it customizes the dialog by setting a callback function that is triggered when an object is clicked.

## Tutorial {#tutorial}

In addition to [Tutorial 9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9), we will customize the dialog box that appears when you click on a mesh (specifically, a rect element).

The customized dialog searches for and displays the name of the local government based on the mesh code listed in the mesh's metada. At smaller scales, it displays the prefecture name; at larger scales, it displays the city/town/village name.

- [Click here](https://svgmap.org/devinfo/devkddi/tutorials/mesh2b/mesh2b.html) to see how it works.
- The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/mesh2b.zip).

The difference lies in the web app associated with the layer.

### [meshTileViewerB.html](https://svgmap.org/examples/tutorials/mesh2b/meshTileViewerB.html) , [meshTileViewerB.js](https://svgmap.org/examples/tutorials/mesh2b/meshTileViewerB.js) {#mesh-tile-viewr-b}

This explains the additions made to [meshTileViewer.html](https://svgmap.org/examples/tutorials/mesh2/meshTileViewer.html) , the WebApp from [Tutorial 9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9#meshTileViewer.html).

The added parts are the loading of data to create an associative array of city/town names using the city/town code as the key, and the setting of a callback function to display a custom dialog using that data.



- onload=async function()
	- [svgMap.setShowPoiProperty](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setShowPoiProperty)( customShowPoiProperty, layerID);
		- Specify a custom callback function (customShowPoiProperty) for the process that occurs when an object in the associated layer is hit.
		- Custom ShowPoiProperty
			- The name of the municipality is obtained by using the city/town code in the content attribute of the hit object as the key to look up the lgDictionary in the dictionary.
				- Note that in some cases, multiple municipalities may belong to a single grid.
			- svgMap.showModal(html,400,180); Passes the prepared HTML to the modal dialog of the SVGMap framework.
- async function loadLGdictionary() // Create a dictionary of local government names
	- lgDictionary={}; // Dictionary of municipality names using city/ward/town/village codes as keys
- function buildMeshTileSvg(meshs, sourceID)
	- rect.setAttribute("content",meshNumb+","+meshs[meshNumb].join(" "));
		- meshes[meshNumb] Municipal code

meshTileViewerB.js

```js
...
...
var lgDictCsv = meshCsvHd + "code_name.csv";

onload=async function(){
	document.addEventListener("zoomPanMap", updateLayer,false);
	svgMap.setShowPoiProperty( customShowPoiProperty, layerID);
	await loadLGdictionary();
	//console.log("lgDictionary:",lgDictionary);
	updateLayer();
}

...
...

function buildMeshTileSvg(meshs, sourceID){
	var tileGroup = svgImage.createElement("g");
	tileGroup.setAttribute("data-src",sourceID);
	
	for (var meshNumb in meshes){
		...
		rect.setAttribute("content",meshNumb+","+meshs[meshNumb].join(" "));
		...
	}
	...
}

async function loadLGdictionary(){ // Create a dictionary of local government names
	var lgCsv = await loadText(lgDictCsv);
	lgCsv = lgCsv.split(/[\r\n]+/);
	for ( var line of lgCsv){
		if (line.length > 1) {
			line = line.split(",");
			lgDictionary[line[0]]=line[2]+" "+line[3];
			lgDictionary[line[0].substring(0,2)]=line[2]; // Let's also create a prefecture code dictionary at the same time.
		}
	}
}

function customShowPoiProperty(target){
	var metaSchema = null;
	// metaSchema = target.ownerDocument.firstChild.getAttribute("property").split(","); // debug 2013.8.27
	console.log("POI target:",target);
	var content = (target.getAttribute("content")).split(",");
	
	var meshCode=content[0];
	var lgCodes=content[1].split(" ");
	var lgNames=[];
	for (var lgCode of lgCodes){
		lgNames.push(lgDictionary[lgCode]);
	}
	var html = "<ul><li>Name of municipality: <ul><li>"+lgNames.join("<li>")+"</ul><li>Mesh code:"+meshCode+"</ul>";
	svgMap.showModal(html,400,180);
	
}

...
...
```
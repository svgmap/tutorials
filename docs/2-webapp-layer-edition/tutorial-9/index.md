---
sidebar_position: 9
---

# Tutorial 9: WebApp Layer Mesh Tiles (Tiled Mesh Data)

## Introduction  {#introduction}

This tutorial demonstrates how to display tiled mesh data using asynchronous loading in a web application. The loaded mesh data is [Gridded XYZ data](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Gridded_XYZ) based on a regional standard mesh, and a simple tile pyramid is constructed using small-scale and large-scale data to implement [Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics)).

The sample data used for visualization is [the municipal code data for the third-level mesh system](https://www.stat.go.jp/data/mesh/m_itiran.html), published by the Statistics Bureau .

To actually use it, click on [mesh2.html](https://svgmap.org/examples/tutorials/mesh2/mesh2.html).

### Source Code {#source-code}

- [Source code directory](https://svgmap.org/examples/tutorials/mesh2/)
- The mesh data format used in this tutorial
- Container.svg: Specifies a clickable layer.
- meshTileViewer.svg: A layer to which webApps are linked; webApps are launched in a hidden state.
- meshTileViewer.html:
- meshTileViewer.js: Reads mesh data and visualizes each individual mesh as an SVG rect element.

## Tutorial {#tutorial}

This tutorial displays tiled mesh data. [Tutorial 8](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8), we will be using [Gridded XYZ type mesh data](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Gridded_XYZ).

Furthermore, we will be dealing with larger data (more mesh count, finer detail) than in [Tutorial 8](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8).Therefore, in addition to tiling, we will also construct a simple tile pyramid and implement a function ([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) that changes the data displayed at small and large scales.

- [Click here](https://svgmap.org/examples/tutorials/mesh2/mesh2.html) to see how it works.
- The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/mesh2.zip).

## Data to Display {#data-to-display}

### Grid rules to use {#grid-rules-to-use}

- [We will use data where regional standard meshes](https://ja.wikipedia.org/wiki/%E5%9C%B0%E5%9F%9F%E3%83%A1%E3%83%83%E3%82%B7%E3%83%A5) are used as the gridning rule.

### Data Contents {#data-contents}

- We will use the data published in the [Statistics Bureau's](https://www.stat.go.jp/data/mesh/m_itiran.html) list of municipal-level mesh codes.
- We will visualize which municipality each mesh belongs to.
- At a small scale, we will visualize at the prefectural level using a secondary mesh (a mesh of approximately 10 km square), and at a large scale, we will visualize at the municipal level using a tertiary mesh (a mesh of approximately 1 km square).

## Data preparation {#data-preparation}

### Preparing the original data {#preparing-the-original-data}

- We will retrieve the data using [this WebApp](https://www.svgmap.org/examples/lvl0.1/etcLayers/meshCoder/japanMesh_r3.html).
- This web application automatically retrieves all CSV files from [the Statistics Bureau's list of municipal mesh codes](https://www.stat.go.jp/data/mesh/m_itiran.html) and allows you to save CSV data at a specified mesh level. (All operations are performed within a browser.)
- How to operate
	- Access [japanMesh_r3.html](https://www.svgmap.org/examples/lvl0.1/etcLayers/meshCoder/japanMesh_r3.html)
		- Please wait a while until the CSV data collection is complete.
	- ```市区町村``` Menu
	- ```３次メッシュ``` Menu
	- ```集計実行``` Press
	- Selecting "Download CSV ```mesh.csv```" will save the CSV file.

### Construction of a tile pyramid {#construction-of-a-tile-pyramid}

This tutorial uses a [Jamstack](https://en.wikipedia.org/wiki/Jamstack) configuration that does not deploy a database or dynamic web services in the backend .

Static tile pyramid data (a set of CSV files) will be generated from the acquired raw data. The tool used for generation is [mesh2tileBasic.py](https://svgmap.org/examples/tutorials/mesh2/mesh2tileBasic.py), which is provided here .

- Save [mesh2tileBasic.py](https://svgmap.org/examples/tutorials/mesh2/mesh2tileBasic.py) to your local PC
- ```tiles``` Prepare a directory in the working directory.
- ```python mesh2tileBasic.py mesh.csv```　Execute (mesh.csv is the file path of the downloaded original data)
- ```tiles``` The directory contains the tiled mesh data.

### Explanation of tile pyramid data {#explination-of-tile-pyramid-data}

#### [top.csv](https://www.svgmap.org/examples/tutorials/mesh2/meshTiles/top.csv)

Data for small scale (data for the vertices of the tile pyramid)

- 1st line: Blank line
- From the second line onwards:
	- First digit: Local government code (prefecture code, 2 digits)
	- Second digit and beyond: Secondary mesh code, variable length
- Excerpt from actual data

```
01,634150,654560,664632,634260,...
02,604070,614010,614033,604054,...
03,594116,594163,594110,604115,...
...
...
```

#### [4-digit number].csv Example: [5339.csv](https://www.svgmap.org/examples/tutorials/mesh2/meshTiles/5339.csv)

Tile-divided data for large scale (divided at the primary mesh level).

- [Four-digit number] in the filename: Primary mesh code
- Line 1: Primary mesh code
- From the second line onwards:
	- First digit: Local government code (city/ward/town/village code, 5 digits)
	- Second digit and beyond: The last four characters of the tertiary mesh code (variable length)
		- By adding the primary mesh code from the first line to the beginning, the tertiary mesh code can be obtained (simple data compression).
		- The reason the first line of top.csv is blank is so that it can be processed using the same rules.
- Excerpts from actual data

```
5339
08211,7763,7764,7766,7767,7773,7774,...
08217,6799,7709
08224,6798,6799,7707,7708,7709,7716,...
...
...
```

#### Note

- The two types of files mentioned above correspond to [Gridded XYZ](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Gridded_XYZ) data. Although it may appear that there is no XY data, this is because the mesh code is information encoded from the gridded XY coordinates.
- Furthermore, the most common type of gridded XYZ data has one XYZ data point per row. However, the data presented here is　 ```Z,XY1,XY2,XY3.....XYn```　slightly unconventional, as it encodes multiple XY values ​​​​with a common Z value onto a single row using a variable-length encoding method (to reduce the data size).

#### code_name.csv

- [Data for Tutorial 9b](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9b). This is dictionary data between city/town/village codes and municipality names.
- First digit: City/ward/town/village code (5-digit number)
	- The prefectural government code can be obtained by taking the first two characters.
- Second digit: Country name
- Third digit: Prefecture name
- Second digit: City/ward/town/village name
- Excerpts from actual data

```
01101, Japan, Hokkaido, Sapporo City, Chuo Ward
01102, Japan, Hokkaido, Kita Ward, Sapporo City
01103, Japan, Hokkaido, Sapporo City, Higashi Ward
...
...
```

### Container.svg {#container-svg}

- The theme layer, which displays mesh data, and the background map (OpenStreetMap) are loaded using the animation element.
- Similar to [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6#Container.svg), a clickable layer is specified.
	- As described later, the `clickable` attribute is specified in the `class` attribute to visualize the mesh data as vector data and enable interactivity.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Load OpenStretMap background map as the display state -->
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap" visibility="visible"/>

<!-- Load the municipal code 3rd level mesh data layer as the display state -->
<animation xlink:href="meshTileViewer.svg" x="-3000" y="-3000" width="6000" height="6000" title="admCode" class="Mesh clickable" visibility="visible" opacity="0.6"/>
</svg>
```

### meshTileViewer.svg {#mesh-tile-viewer-svg}

- The `data-controller` attribute of the document root element (the `svg` element) specifies the [webApp that will operate this layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI).
	- ```data-controller="meshTileViewer.html#exec=hiddenOnLayerLoad```
	- ```exec=hiddenOnLayerLoad``` This setting causes the webApp window to hide when a layer is displayed. ([See here for details](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0))
- This is empty content with no data; the web app that manipulates the mentioned layer dynamically manipulates the DOM of this SVG content to make it visible.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-controller="meshTileViewer.html#exec=hiddenOnLayerLoad" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" property="Local government codes">

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />
</svg>
```

### meshTileViewer.html, meshTileViewer.js {#mesh-tile-viewer}

The mesh data, which has been divided and layered as a tile pyramid, is loaded according to the scale and display area, and the DOM of the above SVG content is manipulated to visualize each individual mesh as an SVG rect element.

- onload
	- ```document.addEventListener("zoomPanMap", updateLayer,false);``` Set up a handler for the event that SVGMap.js emits when scrolling to resize (to change the displayed content according to the resize scrolling).
	- ```updateLayer();``` Immediately after loading, the above handler is executed directly to create the initial display state.
- ```updateLayer()``` Download data and draw maps according to the scale and area.
	- ```svgMap.getGeoViewBox();``` The SVGMap.js API retrieves the geographic coordinates of the displayed area.
	- ```svgImageProps.scale``` SVGMap.js API: The current display scale of the SVGMap content associated with this WebApp.
	- ```getTileURLs()``` A function to list the filenames of tiles that should be displayed in the case of large-scale display (based on the displayed area).
	- ```maintainImages``` An associative array listing the filenames of tiles that were displayed one step before the scaling scroll and that should be retained in the current step.
		- The elements are grouped into tile units (SVG gelements), and management is performed on a tile-by-tile basis.
		- The `data-src` attribute of the corresponding tile is set to the filename of the tile, and this is used for identification.
- ```showTileMap()``` New data is loaded, the data for one tile to be displayed is constructed, and it is passed to the drawing routine (asynchronously).
	- ```meshData```: Variables used to temporarily construct mesh data (structured associative array)
		- meshData[mesh code][0..n]: Municipality code (Note that one mesh municipalities may contain within Fukusu)
- ```buildMeshTileSvg()```
	- ```svgImage``` The DOM object of the SVG content (meshTileViewer.svg) associated with this webApp.
	- ```g``` Group mesh data of tile content using SVG elements.
	- ```rect``` Visualize each mesh data using SVG elements.
		- ```data-src``` Set the source filename of the tile content in the attribute (for determining reuse in the next step).
	- ```getHue()``` A function that uses a suitable hash function to assign a suitable color (hue H value) to a local government code.
	- ```HSVtoRGB()```A function to calculate RGB values ​​​​from HSV values ​​​​(S and V are fixed at their maximum values).
	- ```blendColor()``` Additive color mixing function (because multiple municipalities (and their colors) may be assigned to a single mesh, color mixing is performed.)
	- ```svgMap.refreshScreen()``` Once DOM generation is complete, instruct the system to render.
		- Each time a tile is read, a redraw will occur (displayed progressively).
		- [reference](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```html
<!doctype html>
<html>
<head>
<title>Tiled UTM Grid Data visualizer</title>
</head>
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script>
<script src="meshTileViewer.js"></script>
<body>
<h3>Displays regional standard mesh data</h3>
</body>
</html>
```

```js
var meshCsvHd = "meshTiles/";
var topCsv = meshCsvHd+"top.csv";

var tileThScale = 8;

onload=function() {
	document.addEventListener("zoomPanMap", updateLayer,false);
	updateLayer();
}

function updateLayer(){
	// Download data and draw the map according to the scale and area.
	
	var tileURLs;
	var geoViewBox = svgMap.getGeoViewBox();
	
	// List the tiles to display based on scale and area.
	if ( svgImageProps.scale > tileThScale ){
		// Displays large-scale subdivided tile data
		tileURLs= getTileURLs(geoViewBox);
	else {
		// Display topCsv data at a small scale
		tileURLs=[topCsv];
	}
	
	var maintainImages={}; // Array to hold the tiles to be retained
	var prevImages = svgImage.getElementsByTagName("g"); // Tiles that have been drawn up to the previous step
	for ( var i = prevImages.length-1 ; i >=0 ; i-- ){ // Select what to keep and what to delete from the content of the previous step
		var dataSrc = prevImages[i].getAttribute("data-src");
		if (tileURLs.indexOf(dataSrc)>=0) { // Keep the content that is one step ahead in the content to be read.
			maintainImages[dataSrc]=true;
		} else { // Delete everything else
			prevImages[i].remove();
		}
	}
	
	// Load any tiles that were not loaded in the previous step, which should be loaded.
	for ( var i = 0 ; i < tileURLs.length ; i++ ){
		var durl = tileURLs[i];
		if (maintainImages[durl]) {
			// Skip loading
		else {
			showTileMap(durl);
		}
	}
}

function getTileURLs(geoViewBox){
	// Check the mesh within the display area and list the files.
	var tileURLs= getMeshArray(geoViewBox, 1);
	for ( var i = 0 ; i < tileURLs.length ; i++ ){
		tileURLs[i]=meshCsvHd + tileURLs[i] + ".csv";
	}
	return (tileURLs);
}

async function showTileMap(url){
	// Read and parse the tile data and pass it to the image generation routine.
	var txtData = await loadText(url);
	
	var rowData = txtData.split(/[\r\n]+/);
	// The first line is the tile mesh number
	var meshData = {}; // Construct mesh data as an associative array with mesh number as Key. Val is an array of municipality codes (an array because some belong to multiple municipalities).
	for ( var i = 1 ; i < rowData.length ; i++ ){
		var colData = rowData[i].split(",");
		// The first column is the municipality code, and from the second column onwards are fragments of the mesh number (the mesh number is obtained by adding the tile's mesh number).
		for ( var j = 1 ; j<colData.length ; j++){
			var meshNumb = rowData[0]+colData[j]; // Add the fragment to the tile's mesh number to generate a new mesh number
			if (meshData[meshNumb]){ // Mesh belonging to multiple municipalities
				meshData[meshNumb].push(colData[0]);
			else {
				meshData[meshNumb]=[colData[0]];
			}
		}
	}
	buildMeshTileSvg(meshData, url);
}

function buildMeshTileSvg(meshs, sourceID){
	var tileGroup = svgImage.createElement("g");
	tileGroup.setAttribute("data-src",sourceID);
	
	for (var meshNumb in meshes){
		var gxy = mesh2LatLng(meshNumb); // .latitude,.longitude,.latSpan,.lngSpan
		
		var rect = svgImage.createElement("rect");
		rect.setAttribute("x",gxy.longitude * 100);
		rect.setAttribute("y",(gxy.latitude + gxy.latSpan) * -100);
		rect.setAttribute("width",gxy.lngSpan * 100);
		rect.setAttribute("height",gxy.latSpan * 100);
		rect.setAttribute("content",meshs[meshNumb].join(" "));
// var fillHue = getHue(meshs[meshNumb][0]);
		var RGBs=[];
		for ( lgCode of meshes[meshNumb]){
			RGBs.push(HSVtoRGB(getHue(lgCode),255,255));
		}
		var fillColor = getColorString(blendColor(RGBs));
// var fillColor = getColorString(HSVtoRGB(fillHue,255,255));
		rect.setAttribute("fill",fillColor);
		//rect.setAttribute("fill","red");
		
		tileGroup.appendChild(rect);
	}
	svgImage.documentElement.appendChild(tileGroup);
	svgMap.refreshScreen();
}

function blendColor(colors){ // Additive color mixing
	var ans={r:0,g:0,b:0};
	for (color of colors) {
		ans.r += color.r;
		ans.g += color.g;
		ans.b += color.b;
	}
	ans.r = Math.floor(ans.r / colors.length);
	ans.g = Math.floor(ans.g / colors.length);
	ans.b = Math.floor(ans.b / colors.length);
	return ( ans );
}

async function loadText(url){ // Read text data using fetch
	var response = await fetch(url);
	var txt = await response.text();
	return ( txt );
}


// ===================================================================================
// The following is a regional standard mesh library

var m1LatSpan = 1/1.5, m1LngSpan = 1;
var m2LatSpan = m1LatSpan/8, m2LngSpan = m1LngSpan/8;
var m3LatSpan = m2LatSpan/10, m3LngSpan = m2LngSpan/10;
var m4LatSpan = m3LatSpan/2, m4LngSpan = m3LngSpan/2;

function mesh2LatLng( meshStr ){
	// The definition of mesh4 is questionable.
	var latitude,longitude; // south,east corne
	var latSpan,lngSpan;
	var m1Lat,m1Lng,m2Lat,m2Lng,m3Lat,m3Lng,m4;
	if (meshStr.length > 3){
		m1Lat = Number(meshStr.substring(0,2));
		m1Lng = Number(meshStr.substring(2,4));
		latitude = m1Lat / 1.5;
		longitude = 100 + m1Lng;
		latSpan = m1LatSpan;
		lngSpan = m1LngSpan;
		if ( !latitude || !longitude ){
			return {
				latitude: null,
				longitude: null
			}
		}
		if (meshStr.length > 5) {
			m2Lat = Number(meshStr.substring(4,5));
			m2Lng = Number(meshStr.substring(5,6));
			latitude += m2Lat * m2LatSpan;
			longitude += m2Lng * m2LngSpan;
			latSpan = m2LatSpan;
			lngSpan = m2LngSpan;
			if (meshStr.length > 7) {
				m3Lat = Number(meshStr.substring(6,7));
				m3Lng = Number(meshStr.substring(7,8));
				latitude += m3Lat * m3LatSpan;
				longitude += m3Lng * m3LngSpan;
				latSpan = m3LatSpan;
				lngSpan = m3LngSpan;
				if (meshStr.length == 9) {
					m4 = meshStr.substring(8);
					switch(m4){
					Case "1":
						// do nothing
						break;
					Case "2":
						longitude += m4LngSpan;
						break;
					Case "3":
						latitude += m4LatSpan;
						break;
					case "4":
						latitude += m4LatSpan;
						longitude += m4LngSpan;
						break;
					}
					latSpan = m4LatSpan;
					lngSpan = m4LngSpan;
				}
			}
		}
	}
	return {
		latitude: latitude,
		longitude: longitude,
		latSpan : latSpan,
		lngSpan : lngSpan
	}
}

function latLng2Mesh(lat,lng,meshLevel){
	lat = lat * 1.5;
	lng = lng - 100;
	var m1Lat = Math.floor(lat);
	var m1Lng = Math.floor(lng);
	
	if (meshLevel==1){
		return ( m1Lat.toString() + m1Lng.toString() );
	}
	
	lat = lat - m1Lat;
	lng = lng - m1Lng;
	
	lat = lat * 8;
	lng = lng * 8;
	
	var m2Lat = Math.floor(lat);
	var m2Lng = Math.floor(lng);
	
	if (meshLevel==2){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() );
	}
	
	lat = lat - m2Lat;
	lng = lng - m2Lng;
	
	lat = lat * 10;
	lng = lng * 10;

	var m3Lat = Math.floor(lat);
	var m3Lng = Math.floor(lng);
	
	if (meshLevel==3){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() + m3Lat.toString() + m3Lng.toString() );
	}
	
	lat = lat - m3Lat;
	lng = lng - m3Lng;
	
	lat = lat * 2;
	lng = lng * 2;

	var m4Lat = Math.floor(lat);
	var m4Lng = Math.floor(lng);
	var m4Num = 1;
	if ( m4Lat==1 ){
		m4Num += 2;
	}
	if ( m4Lng==1 ){
		m4Num += 1;
	}
	
	if (meshLevel==4){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() + m3Lat.toString() + m3Lng.toString() + m4Num.toString() );
	}
	
	return (null);
}



function getMeshArray(geoBbox, meshLevel){
	var latStep, lngStep;
	if (meshLevel == 1 ){
		latStep = m1LatSpan;
		lngStep = m1LngSpan;
	} else if (meshLevel == 2 ){
		latStep = m2LatSpan;
		lngStep = m2LngSpan;
	} else if ( meshLevel == 3 ){
		latStep = m3LatSpan;
		lngStep = m3LngSpan;
	} else if ( meshLevel == 4 ){
		latStep = m4LatSpan;
		lngStep = m4LngSpan;
	else {
		return ( null );
	}
		
	var ans = [];
	for ( var mx = geoBbox.x ; mx < geoBbox.x + geoBbox.width + lngStep ; mx += lngStep){
		if ( mx > geoBbox.x + geoBbox.width ){
			mx = geoBbox.x + geoBbox.width;
		}
	// Returns a list of the smallest mesh codes that contain geoBbox(.x,.y,.wjdth,.height).
		for ( var my = geoBbox.y ; my < geoBbox.y + geoBbox.height + latStep ; my += latStep){
			if ( my > geoBbox.y + geoBbox.height ){
				my = geoBbox.y + geoBbox.height;
			}
// console.log(mx,my);
			ans[latLng2Mesh(my,mx,meshLevel)]=true;
		}
	}
	
	var ans2=[];
	for ( mesh in ans ){
		ans2.push(mesh);
	}
	
	return ( ans2 );
}

// ===================================================================================


function getHue(str){ // Get an appropriate HUE value (0..359) from the string using the hash function (jenkinsOneAtATimeHash)
	return(jenkinsOneAtATimeHash(str)%360);
}

//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
//Credits (modified code): Bob Jenkins (http://www.burtleburtle.net/bob/hash/doobs.html)
//See also: https://en.wikipedia.org/wiki/Jenkins_hash_function
//Takes a string of any size and returns an avalanching hash string of 8 hex characters.
function jenkinsOneAtATimeHash(keyString){
	let hash = 0;
	for (charIndex = 0; charIndex < keyString.length; ++charIndex){
		hash += keyString.charCodeAt(charIndex);
		hash += hash << 10;
		hash ^= hash >> 6;
	}
	hash += hash << 3;
	hash ^= hash >> 11;
	//4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
	return (((hash + (hash << 15)) & 4294967295) >>> 0);
};

function HSVtoRGB (h, s, v) { // from http://d.hatena.ne.jp/ja9/20100903/1283504341
	var r, g, b; // 0..255
	while (h < 0) {
		h += 360;
	}
	h = h % 360;
	
	// Special case: saturation = 0
	if (s == 0) {
		// → RGB is equal to V
		v = Math.round(v);
		return {'r': v, 'g': v, 'b': v};
	}
	s = s / 255;
	
	var i = Math.floor(h / 60) % 6,
	f = (h / 60) - i,
	p = v * (1 - s),
	q = v * (1 - f * s),
	t = v * (1 - (1 - f) * s);

	switch (i) {
	case 0:
		r = v; g = t; b = p; break;
	Case 1:
		r = q; g = v; b = p; break;
	Case 2:
		r = p; g = v; b = t; break;
	Case 3:
		r = p; g = q; b = v; break;
	Case 4:
		r = t; g = p; b = v; break;
	Case 5:
		r = v; g = p; b = q; break;
	}
	return {'r': Math.round(r), 'g': Math.round(g), 'b': Math.round(b)};
}

function getColorString(rgb){
	return ("#"+ pad16(rgb.r) + pad16(rgb.g) + pad16(rgb.b));
}

function pad16( val ){
	var bv = "00" + val.toString(16);
	bv = bv.substr(bv.length - 2, 2);
	return ( bv );
}
```
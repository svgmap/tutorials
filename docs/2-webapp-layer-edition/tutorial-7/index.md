---
sidebar_position: 7
---

# Tutorial 7: WebApp Layer Vector Tiles

## Introduction  {#introduction}

This tutorial demonstrates how to load a tiled CSV Point geometry file into a web application using asynchronous loading, convert it to an SVGMap DOM using the SVGMap framework library, and then display it.

- To see the actual operation, click on [tiling1.html](https://svgmap.org/examples/tutorials/tiling1/tiling1.html).

### Source Code {#source-code}

- [Source code directory](https://svgmap.org/examples/tutorials/tiling1/)
- tiling1.html: Loading of related libraries (SVGMapGIS)
- Container.svg: Setting up clickable layering ( almost the same as [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6))
- simpleTiling.svg: Almost identical to webApp [tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6), which manipulates layers with a UI.
- simpleTiling.html:
- simpleTiling.js:
	- Reading GeoJSON is the same as in [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6).
	- Dynamically load GeoJSON based on the display area.
		- When displaying a small scale (wide area), if too many tiles need to be loaded, the loading process will stop and the tiles will not be displayed.

## Tutorial {#tutorial}

This approach avoids using dynamic mechanisms like a DBMS in the backend, instead tiling relatively large vector data (in this case, point geometry data) to create content that can be comfortably used as a WebMap/GIS. This type of design is called [vector tiling](https://en.wikipedia.org/wiki/Vector_tiles) in the GIS world, but it's more commonly known as a [Jamstack pattern](https://en.wikipedia.org/wiki/Jamstack).

- [Click here](https://svgmap.org/examples/tutorials/tiling1/tiling1.html) to see how it works .
- The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/tiling1.zip).

#### Note

Furthermore, SVGMap.js can implement tiling for larger datasets that are not possible with other frameworks, or that would normally require connecting to a DBMS to [achieve more efficient distribution](https://satakagi.github.io/mapsForWebWS2020-docs/QuadTreeCompositeTilingAndVectorTileStandard.html). For example, this can be easily achieved using [SVGMapTools](https://github.com/svgmap/svgMapTools/tree/master/tutorials). SVGMap possesses characteristics that allow for a wider application of the [Jamstack pattern](https://en.wikipedia.org/wiki/Jamstack).

### Format of Tiled CSV Data {#format-of-tiled-csv-data}

- Both latitude and longitude are divided into 1-degree x 1-degree tiles.
	- tile_[longitude]_[latitude].csv

#### Example data (tile_125_24.csv)

```
X,Y,P27_001,P27_002,P27_003,P27_004,P27_005,P27_006,P27_007,P27_008,P27_009 
125.317688,24.796933,47214,3,03002,03002,Miyakojima City Museum,1166-287 Higashi Nakasonezoe, Hirara,3,-99,1989 
125.282787,24.806925,47214,3,03003,03003,Miyakojima City Hirara Library North Branch,42 Higashi Nakasonezoe, Hirara,3,-99,9999 
125.393222,24.753839,47214,3,03003,03003,Miyakojima City Gusukube Library, 377-1,3,-99,9999 
Miyakojima City Hirara Library, 187,3,-99,9999 Hirara Library, 187,3,-99,9999 
Sarahama Sports Center, 248-1,3,3,9999 
125.195077,24.83307,47214,3,99999,03104,Irabu Sports Park, Irabu-aza Maezatozoe 945,4,3,9999 
125.325478,24.740085,47214,3,99999,03109,Ueno Gymnasium, Ueno-aza Miyakuni 1746-2,4,3,9999 
125.387054,24.756012,47214,3,99999,03129,Gusukube Training Center, Gusukube-aza Fukusato 579,4,3,9999 
125.299712,24.803737,47214,3,99999,03109,Miyakojima City General Gymnasium,676-1 Higashinakasone, Hirara,4,3,9999 
125.328061,24.758818,47214,3,99999,03104,Otake Castle Ruins Park Multipurpose Plaza,1190-134 Nohara, Ueno,4,3,9999 
125.405059,24.764564,47214,3,99999,03104,Gusukube Sports Park Multipurpose Plaza,245-1 Fukusato, Gusukube,4,3,9999 
125.407091,24.764468,47214,3,99999,03102, Gusukube Sports Park Multipurpose Field, 245-1 Fukusato, Gusukube, 4,3,9999 
125.404346,24.76409,47214,3,99999,03115, Gusukube Sports Park Multipurpose Field, 245-1 Fukusato, Gusukube, 4,3,9999 
125.281412,24.729776,47214,3,99999,03102, Shimoji Park (Multipurpose Field), 1590 Yonaha, Shimoji, 4,3,9999 
125.280271,24.730391,47214,3,99999,03104,Shimoji Park (Multipurpose Plaza),Shimoji Yonaha 1590,4,3,9999 
125.263557,24.735081,47214,3,99999,03104,Fureai no Maehama Plaza,Shimoji Yonaha 1199-1,4,3,9999 
125.299657,24.801104,47214,3,99999,03101,Miyakojima City Athletics Stadium,Hirara Higashi Nakasone 935-1,3,3,9999 
125.301632,24.805759,47214,3,99999,03102,Miyakojima City Citizens' Baseball Stadium, Hirara Aza Nishinakasone 1574-1,3,3,9999 
125.301437,24.804417,47214,3,99999,03104,Maefuku Multipurpose Indoor Gymnasium, Hirara Aza Nishinakasone 1574-7,3,3,9999 
125.302217,24.804102,47214,3,99999,03102,Multipurpose Maefuku Sports Ground, Hirara Aza Nishinakasone,3,3,9999 
125.302178,24.803613,47214,3,99999,03104,Multipurpose Maefuku Sports Ground, Hirara-aza Nishinakasone,3,3,9999 
125.389757,24.75579,47214,3,99999,03101,Gusukube Athletic Stadium, Gusukube-aza Fukusato 616,3,3,9999 
125.283694,24.729841,47214,3,99999,03101,Shimoji Athletic Stadium, Shimoji-aza Yonaha 1590,3,3,9999 
125.282256,24.729096,47214,3,99999,03109,Shimoji Gymnasium,Shimoji Yonaha 1590,3,3,9999 
125.326167,24.740636,47214,3,99999,03101,Ueno Athletic Stadium,Ueno Miyakuni 1746-2,3,3,9999 
125.162675,24.835657,47214,3,99999,03109,Irabu Workers' Gymnasium,Irabu Nagahama 1542-5,3,3,9999 
125.161233,24.835137,47214,3,99999,03109,Irabu B&G Marine Center,Irabu-aza Nagahama 1822-5,3,3,9999 
125.161328,24.834684,47214,3,99999,03106,Irabu B&G Marine Center,Irabu-aza Nagahama 1822-5,3,3,9999 
125.262975,24.734973,47214,3,99999,03148,Yonaha Maehama,Shimoji Yonaha 1199-1,3,3,9999 
125.271057,24.802628,47214,3,99999,03148,Painagama,Hirara Shimosato 338-3,3,3,9999 
125.443114,24.74628,47214,3,99999,03148,Aragusuku Coast,Shirobe Aza Aragusuku,3,3,9999 
125.447629,24.741724,47214,3,99999,03148,Yoshino Coast,Shirobe Bora,3,3,9999 
125.432329,24.729739,47214,3,99999,03148,Bora River Beach, Shirobe Bora 591-1,3,3,9999 
125.257704,24.797368,47214,3,99999,03148,Sunset Beach, Hirara Kugai 643-3,3,3,9999
125.156941,24.857008,47214,3,99999,03148,Sawada Beach,Irabu Sawada,3,3,9999 
125.181135,24.81205,47214,3,99999,03148,Wataguchi Beach,Irabu Town Irabu,3,3,9999
```

### Original data and splitting program {#original-data-and-splitting-program}

#### Download location for the original data

- Download and unzip the "Nationwide" section of the [National Land Numerical Information Cultural Facilities website](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P27.html#prefecture00).

#### Shapefile to CSV conversion

- Convert using OGR2OGR
	- command:　```ogr2ogr -lco GEOMETRY=AS_XY P27-13.csv P27-13.shp```
		- [Optional information](https://qiita.com/tohka383/items/d3d1bf80db2cfb416330#csv)

#### Notes

- OGR2OGR:
	- ogr2ogr is a vector data conversion tool included in [GDAL](https://gdal.org/), a well-known open-source GIS toolset.
	- For Windows, pre-compiled binaries are available at [gisinternals.com](https://www.gisinternals.com/), as described [here](https://gdal.org/download.html#windows).
		- Installation/Windows
			- [Stable Releases](https://www.gisinternals.com/release.php)　⇒ MSVC 2017 x64 (other compilation environments are also supported) ⇒ Generic installer for the GDAL core components (gdal-*-core.msi)
		- How to run ogr2ogr / Windows
			- Windows Menu ⇒ All Apps ⇒ GDAL ⇒ GDAL * Run in the command prompt launched via Command Prompt.
- CSV header row:
	- The header row of the National Land Numerical Information consists of mechanically assigned numbers (such as P27_001). It will be easier to understand if you refer to the explanation of the attribute information in the [National Land Numerical Information](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P27.html) and rewrite the CSV header row with feature names before tile division.

#### CSV Tiling

- [I've prepared a file called simpleTiling.py](https://svgmap.org/examples/tutorials/tiling1/simpleTiling.py), so we'll use that.
- tilesCreate a directory in the working directory.
- command:　```python simpleTiling.py P27-13.csv 0 1```
	- Reference: [Installing Python for Windows](https://www.python.jp/install/windows/install.html)

### tiling1.html {#tiling1-html}

- There are no significant differences from the HTML in [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6).

```html
<!DOCTYPE html> 
<html> 
<title>SVGMapLevel0.1-Rev14-Draft Tutorial2 Coastline & Air Port</title> 
<!-- Viewport: Definition that the display area is the entire screen --> 
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" /> 
<meta charset="UTF-8"> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 

<!-- Load the SVGMap core API --> 
<script type="module"> 
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js'; 
  window.svgMap=svgMap 
</script> 

<!-- Load the layer list UI stylesheet --> 
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css"> 

<body bgcolor="#ffffff" style="overflow:hidden;" > 
<!-- Loading a container file (Container.svg) containing multiple map SVG files (layers) --> 
 <div id="mapcanvas" data-src="Container.svg"></div> 
 <div id="gui"> 
<!-- Zoom up button --> 
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" /> 
<!-- Zoom down button --> 
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" /> 
<!-- GPS button --> 
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" /> 
<!-- Title displayed in the upper right corner of the screen --> 
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial2 Coastline & Air Port</font> 
<!-- Displayed in the lower right corner of the screen --> 
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font> 
<!-- Cross mark displayed in the center --> 
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/> 
<!-- Latitude and longitude of the crosshair displayed in the lower left corner of the screen (title) --> 
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font> 
<!-- Latitude and longitude displayed as a crosshair in the lower left corner of the screen (initial display of actual values) --> 
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font> 
<!-- Display of Layer List UI --> 
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div> 
 </div> 
</body> 
</html>
```

### Container.svg {#container-svg}

- There are no significant differences from the HTML in [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6).
	- Since GeoJSON data is vector tile data, the class attribute is specified as [clickable](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#class.E5.B1.9E.E6.80.A7.E3.81.AB.E3.82.88.E3.82.8B.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.AE.E3.82.B0.E3.83.AB.E3.83.BC.E3.83.94.E3.83.B3.E3.82.B0.E3.83.BB.E3.82.AF.E3.83.AA.E3.83.83.E3.82.AB.E3.83.96.E3.83.AB.E6.A9.9F.E8.83.BD.E3.81.AE.E6.8F.90.E4.BE.9B).

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" /> 

<!-- Load OpenStretMap background map as display state --> 
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap" visibility="visible"/> 

<!-- Imports tile data from a Point CSV file of Japanese public facility data as the display state --> 
<animation xlink:href="simpleTiling.svg" x="-3000" y="-3000" width="6000" height="6000" title="Cultural Facility" class="POI clickable" visibility="visible"/> 
</svg>
```

### simpleTiling.svg {#simple-tiling-svg}

- The icon is defined using the `defs` element.
- The actual data is not located here; it is dynamically generated in the web application.
- Within the group with id="mapTiles", a subgroup is created for each tile, and icons (Points) are placed within that subgroup.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" property="" data-controller="simpleTiling.html#exec=appearOnLayerLoad"> 
<defs> 
<g id="p0"> 
  <circle cx="0" cy="0" r="5" fill="blue"/> 
</g> 
</defs> 
<globalCoSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<g id="mapTiles"> 
</g> 
</svg>
```

### simpleTiling.html, simpleTiling.js {#simple-tiling}

- A web app that can be linked to simpleTiling.svg and [control its DOM](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI).
-  system dynamically loads GeoJSON data that has been tiled according to the display area. This is similar to [Tutorial 5](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB5).
- Since it doesn't have a pyramidal structure that scales down, this tutorial is simpler.
- Instead, because loading too much data would be required at a small scale (reduced display), the data is not loaded, the rendering is cleared, ```removeAllTiles()``` and a message prompting zooming in is displayed on the webApp window.
- ```addEventListener("zoomPanMap",zpmFunc)``` When scaling scroll occurs, call zpmFunc().
- ```zpmFunc()``` Selects and displays tiles to load based on the display area.
- ```svgMap.getGeoViewBox()``` Get geographical display area
- ```getTileList(geoViewBox)``` List the tiles to be displayed.
- ```delete tiles[tileKey]``` Delete groups of tiles that are outside the display area.
- ```await loadCSV()``` Load the tile data (CSV) to be displayed, excluding those already loaded.
- ```drawTiles()```: Displays the loaded CSV data
- Create a group to display tiles
- ```csv2geojson``` Generate geoJSON from the imported CSV file.
- ```svgMapGIStool.drawGeoJson()``` Generate an SVG DOM from geoJSON.
- ```svgMap.refreshScreen()``` If the DOM needs to be redrawn at a time other than during scaling/scrolling, you must [explicitly request a redraw](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen).
- [Reference information](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```html
<!doctype html> 
<html> 
<head> 
<title>Simple Tiling Tutorial</title> 
<meta charset="utf-8"></meta> 
</head> 
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script> 
<script src="simpleTiling.js"></script> 
<body> 
<h3>Displaying CSV Tile Data</h3> 
<div id="message">-</div> 
</body> 
</html>
```

```js
addEventListener("load",init); 
addEventListener("zoomPanMap",zpmFunc); 

var latCol=10; 
var lngCol=9; 
var tilesTh=8; // Threshold for the number of tiles that fit on the screen (prevents the system from becoming too slow when zooming out due to too many tiles being loaded) 

function init(){ 
	zpmFunc(); 
} 

function getTileList(geoViewBox){ 
	var tileNames={}; 
	for ( var ty = Math.floor(geoViewBox.y) ; ty<= Math.floor(geoViewBox.y+geoViewBox.height) ; ty++){ 
		for ( var tx = Math.floor(geoViewBox.x) ; tx <= Math.floor(geoViewBox.x+geoViewBox.width) ; tx++){ 
			var tile="tile_" + tx + "_" + ty; 
		} 
	} 
	return ( tileNames); 
			} 
var 
tiles={}; // Variable to store data (CSV as an array) for each tile 
async function zpmFunc(){ 
	var geoViewBox = svgMap.getGeoViewBox(); 
	var tileList=getTileList(geoViewBox); 
	if (Object.keys(tileList).length < tilesTh ){ 
		for ( var tileKey in tiles ){ // Delete unnecessary data 
			if ( !tileList[tileKey]){ 
				delete tiles[tileKey]; 
			} 
		} 
		for ( var tileKey in tileList ){ // Load missing data 
			if ( !tiles[tileKey] ){ 
				tiles[tileKey]=await loadCSV(`tiles/${tileKey}.csv`); // Template literal 
			} 
		} 
		message.innerText="-"; 
		drawTiles(tileList); 
	} else { 
		message.innerText="Too many tiles, Please zoom in."; 
		removeAllTiles(); 
	} 
} 
function removeAllTiles(){ 
	tiles={}; 
	var groups = svgImage.getElementById("mapTiles").children; 
	for ( var i = groups.length -1 ; i >= 0 ; i-- ){ 
		groups[i].remove(); 
	} 
	svgMap.refreshScreen(); 
} 
function drawTiles(tileList){ 
	// tileList: Associative array of tile keys (IDs) to display 
	var tileGroup = svgImage.getElementById("mapTiles"); 
	var groups = tileGroup.children; 
	for ( var i = groups.length -1 ; i >= 0 ; i-- ){ 
		var groupKey = groups[i].getAttribute("id"); 
		if ( !tileList[groupKey]){ 
			groups[i].remove(); // Remove groups that do not need to be displayed 
		} else { 
			delete tileList[groupKey]; // Remove from tileList as it has already been drawn 
		} 
	} 
	// tileList is now a list of tiles to be drawn 
	for ( var tileKey in tileList){ 
		var grp = svgImage.createElement("g"); 
		grp.setAttribute("id",tileKey); 
		tileGroup.appendChild(grp); 
		if ( tiles[tileKey] ){ 
			var geoJson = csv2geojson(tiles[tileKey], lngCol, latCol); 
			svgMapGIStool.drawGeoJson(geoJson, layerID, "",0, "", "p0", "poi", "", grp); 
		}


	


		
	} 
	svgMap.refreshScreen(); 
} 

var schema; 

async function loadCSV(url){ 
	var response = await fetch(url); 
	if ( response.ok ){ 
		var txt = await response.text(); 
		txt=txt.split("\n"); 
		var csv=[]; 
		var schemaLine = true; 
		for ( line of txt){ 
			line = line.trim(); 
			if ( schemaLine ){ 
				schema = line; 
				svgImage.documentElement.setAttribute("property",schema); 
			} else { 
				if ( line !=""){ 
					line=line.split(","); 
					csv.push(line); 
				} 
			} 
			schemaLine = false; 
		} 
		return ( csv ); 
	} else { 
		return ( null ); 
	} 
} 

function csv2geojson(csvArray, lngCol, latCol){ 
	var geoJson = {type: "FeatureCollection", features: []} 
	for ( var csvRecord of csvArray){ 
		var lng = Number(csvRecord[lngCol]); 
		var lat = Number(csvRecord[latCol]); 
		var feature = { type: "Feature", 
			geometry: { 
				type: "Point", 
				"coordinates": [lng, lat] 
			}, 
			"properties": { 
				"csvMetadata": csvRecord.toString() // This process is very rough. 
			} 
		} 
		geoJson.features.push(feature); 
	} 
	return(geoJson); 
}
```
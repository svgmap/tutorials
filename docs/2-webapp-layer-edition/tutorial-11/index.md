---
sidebar_position: 11
---

# Tutorial 11: WebApp Layer - Location-Specification UI Using Maps

## Introduction  {#introduction}

Based on [Tutorial 10](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB10), we will build an interactive application that allows you to specify a location on a map and calculates and displays the geoid elevation for that location.

To see the actual operation, click on [mesh3b.html](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html).

### Source Code {#source-code}

- [Source code directory](https://svgmap.org/examples/tutorials/mesh3b/)
- Calculation of values ​​​​at arbitrary positions using mesh data via bilinear interpolation
- Select any point on the map to display the geoid elevation at that location.

## Tutorial {#tutorial}

Based on [Tutorial 10](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB10), we will build an interactive application that calculates and displays the geoid elevation at a specified location on a map. The distinctive code is located in the webApp linked to the layer.

- [Click here](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html) to see how it works.
- The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/mesh3b.zip).

### [mesh3b.html](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html) {#mesh3b-html}

There aren't any major differences from before.

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial2 Coastline & Air Port</title>
<!-- Definition that the viewport display area is the entire screen -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading the SVGMap core API -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgmap=svgmap
</script>

<!-- Loading stylesheet for the layer list UI -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files (layers) -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- Zoom-up country -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS Country -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to be displayed in the upper right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial2 Coastline & Air Port</font>
<!-- Display in the lower right corner of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude displayed as a crosshair in the lower left corner of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- The crosshairs displayed in the lower left corner of the screen show the latitude and longitude (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- Display the layer list UI -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

### [Container.svg](https://svgmap.org/examples/tutorials/mesh3b/Container.svg) {#container-svg}

There are no significant differences from before.

### [rasterMeshI.svg](https://svgmap.org/examples/tutorials/mesh3b/rasterMeshI.svg) {#raster-meshi-svg}

There aren't any major differences from [Tutorial 10](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB10#Container.svg).

### [rasterMeshI.html](https://svgmap.org/examples/tutorials/mesh3b/rasterMeshI.html), [geoidCalc.js](https://svgmap.org/examples/tutorials/mesh3b/geoidCalc.js) {#raster-mesh-geoid-calc}

The code from [Tutorial 10](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB10#rasterMesh.html) now includes a UI for specifying a location on a map and a function to calculate the geoid height at that location.

- The UI for specifying locations on the map uses an additional library for SVGMap.js called SVGMapAuthoring.js.
- Geoid high-level calculation: Using [bilinear interpolation](https://en.wikipedia.org/wiki/Bilinear_interpolation), values ​​​​at arbitrary positions are calculated using grid data.
	- For bilinear interpolation, please refer to the documentation (**asc_instruction_sheet.pdf**) **included with the** geoid height data (TEXT data) package published by the Geospatial Information Authority of Japan on [this page](https://fgd.gsi.go.jp/download/geoid.php), as it contains the calculation formula. ( The function in this tutorial is based on the formula in that document.) ```getGeoidHeight(lng,lat)```
- ```initPOIUI``` Initialize the UI for specifying a location on the map when the page loads.
	- ```svgMapAuthoringTool.initPOIregistTool```
		- ```id="pointInputUI"``` In the div element,
		- This tool registers a UI element for placing point information on a map, which can be used with [svgMapAuthoringTool](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapAuthoringTool). ([initPOIregistTool](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#initPOIregistTool))
		- ```POIUIcbFunc``` This is a callback function that is called when the operation to set a point is performed. It obtains latitude and longitude information from the UI, (```getGeoidHeightpasses```) it to a function that calculates geoid height, and displays the answer.
- ```getGeoidHeight``` A function to calculate geoid height from grid data.
	- Bilinear interpolation is used to calculate the geoid height at any given latitude and longitude (within the range of grid data).

geoidCalc.js

```js
...
...
onload = async function(){
	initPOIUI();
	...
	...
}
...
...
function getGeoidHeight(lng,lat){
	// Bilinear interpolation is used to calculate the geoid height at any given latitude and longitude (real numbers) (World Geodetic System).
	var px = Math.floor((lng-dataProps.glomn)/dataProps.dglo);
	var py = Math.floor((lat-dataProps.glamn)/dataProps.dgla);
	
	if ( px < 0 || px > dataProps.nlo -1 || py < 0 || py > dataProps.nla ){
		return ( null );
	}
	
	var lng0 = dataProps.glomn + px * dataProps.dglo;
	var lat0 = dataProps.glamn + py * dataProps.dgla;
	var lng1 = lng0 + dataProps.dglo;
	var lat1 = lat0 + dataProps.dgla;
	
	var Z00 = geoidGrid[py][px];
	var Z10 = geoidGrid[py][px+1];
	var Z01 = geoidGrid[py+1][px];
	var Z11 = geoidGrid[py+1][px+1];
	
	
	if ( Z00 == 999 || Z10 == 999 || Z01 == 999 || Z11 == 999 ){
		return ( null );
	}
	
	var u = (lng - lng0)/(lng1 - lng0);
	var t = (lat - lat0)/(lat1 - lat0);
	var Z = (1 - t) * (1 - u) * Z00 + (1 - t) * u * Z10 + t * (1 - u) * Z01 + t * u * Z11;
	
	return ( Z );
}
...
...
var poiUI;
function initPOIUI() {
	poiUI=document.getElementById("pointInputUI");
	var getPointOnly = false;
	svgMapAuthoringTool.initPOIregistTool(poiUI,svgImageProps.rootLayer,"targetPoint","p0","targetPoint","",POIUIcbFunc,"cbFuncParam",getPointOnly);
}

function POIUIcbFunc(){
	var latlngs=(poiUI.getElementsByTagName("input")[2].value).split(",");
	console.log(latlngs);
	var lat = Number(latlngs[0]);
	var lng = Number(latlngs[1]);
	var geoidHeight = getGeoidHeight(lng,lat);
	messageDiv.innerText=geiodHeight+" m";
}
```
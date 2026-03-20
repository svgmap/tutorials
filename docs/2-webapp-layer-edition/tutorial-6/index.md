---
sidebar_position: 6
---

# Tutorial 6: WebApp Layer geoJSON

## Introduction  {#introduction}

This tutorial shows how to load [GeoJSON](https://ja.wikipedia.org/wiki/GeoJSON) data asynchronously in a web application , convert it into an SVGMap DOM using the SVGMap framework library, and then display it.

To see the actual operation, click on [geojson1.html](https://svgmap.org/devinfo/devkddi/tutorials/geojson1/geojson1.html).

### File Structure {#file-structure}

- [Tutorial 6 directories](https://svgmap.org/devinfo/devkddi/tutorials/geojson1/)
- geojson1.html: Loading of related libraries (SVGMapGIS)
- Container.svg: Clickable layering settings
- geoJsonExample1.svg: How to specify a web app that manipulates a layer with a UI.
- geoJsonExample1.html:
- geoJsonExample1.js: Converting GeoJSON data into SVGMap content using svgMapGIStool

## Tutorial {#tutorial}

- [Click here](https://svgmap.org/devinfo/devkddi/tutorials/geojson1/geojson1.html) to see how it works.
The file used is a [ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/geojson1.zip).

### geojson1.html {#geojson1-html}

The only difference from the HTML in [Tutorial 2b](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b) is the [SVG content](https://svgmap.org/devinfo/devkddi/tutorials/geojson1/Container.svg) that is loaded.

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
<!-- Zoom-up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
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

### Container.svg {#container-svg}

- The [theme layer displaying GeoJSON](https://svgmap.org/devinfo/devkddi/tutorials/geojson1/geoJsonExample1.svg) and the background map (OpenStreetMap) are loaded using the animation element.
- Since GeoJSON data is vector data, the [`clickable`](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#class.E5.B1.9E.E6.80.A7.E3.81.AB.E3.82.88.E3.82.8B.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.AE.E3.82.B0.E3.83.AB.E3.83.BC.E3.83.94.E3.83.B3.E3.82.B0.E3.83.BB.E3.82.AF.E3.83.AA.E3.83.83.E3.82.AB.E3.83.96.E3.83.AB.E6.A9.9F.E8.83.BD.E3.81.AE.E6.8F.90.E4.BE.9B) attribute is specified in the `class` attribute.
- For everything else, I'm using layering techniques based on [these key points](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB1#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Load OpenStretMap background map as the display state -->
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap" visibility="visible"/>

<!-- Load various GeoJSON data (Point Feature) as display state -->
<animation xlink:href="geoJsonExample1.svg" x="-3000" y="-3000" width="6000" height="6000" title="GeoJson Layer" class="poi clickable" visibility="visible" opacity="0.7"/>
</svg>
```

### geoJsonExample1.svg {#geo-json-example1-svg}

- The `data-controller` attribute of the document root element (the `svg` element) specifies [the webApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) that will operate this layer .
	- ```data-controller="geoJsonExample1.html#exec=appearOnLayerLoad```
	- ```exec=appearOnLayerLoad``` This setting causes the webApp window to appear when the layer becomes visible. ([See here for details](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0))
- The `defs` element defines the markers (icons) used when visualizing point features in geoJSON.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  data-controller="geoJsonExample1.html#exec=appearOnLayerLoad"
  viewBox="12375.0 -4500.0 2250.0 2250.0"
  go:dataArea="12375.0 -4500.0 2250.0 2250.0"
  property="name,address,phone,url"
>

<defs>
<g id="p0">
<circle cx="0" cy="0" r="10" fill="blue" stroke="none"/>
</g>
</defs>

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100.0,0.0,0.0,-100.0,0.0,0.0)" />
<g id="mapContents"></g>
</svg>
```

### geoJsonExample1.html, geoJsonExample1.js {#geo-json-example1}

[This](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) is a webApp ( layer-specific UI ) linked to geoJsonExample1.svg . WebApps linked to layers allow you to use [their own APIs](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API).

#### geoJsonexample1.html

The HTML consists of a [common library](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI.E3.81.AE.E3.81.9F.E3.82.81.E3.81.AEhtml.E6.96.87.E6.9B.B8.28webApp.29.E3.81.AE.E6.A7.8B.E9.80.A0.E3.83.BB.E4.BD.9C.E6.B3.95) (svgMapLayerLib.js) for initializing the layer-specific UI , a script code section describing the layer-specific processing ```geoJsonExample1.js```, and the UI (HTML, CSS, etc.).

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>A sample demonstrating how to render geoJSON in the webApp layer of an SVGMap</title>
</head>
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script>
<script src="geoJsonExample1.js"></script>
<body>
<h3>area layer</h3>
<p>Visualizing geoJSON</p>
<select id="dataSelect" onchange="changeData()"></select>
</body>
</html>
```

#### geoJsonExample1.js

- [Layer-specific UI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API): As described in the extended API documentation, svgImage and svgMapGIStool objects are automatically incorporated into the window.
- A web app that is linked to geoJsonExample1.svg and can [control its DOM](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI).
- This app has a simple UI and ```dataPaths``` allows you to select from several geoJSON data sets that you have configured.
- ```loadJSON(url)``` Asynchronous loading of [GeoJSON](https://ja.wikipedia.org/wiki/GeoJSON) data using [await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function[) [fetch](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)
- This code uses functions from the [SVGMap GIS library (svgMapGIStool)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapGIStool..E3.81.A7.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.9B.E3.82.8BAPI) ```drawGeoJson``` to convert geoJSON to SVGMap content (its DOM).
	- The variable `layerID` is a built-in variable (see [the documentation #layerID](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#layerID)).
	- While it is certainly possible to convert geoJSON to SVGMap content DOM manually, Tutorial 6 uses a library.
	- ```drawGeoJson``` For details on the function, please refer to the [documentation #drawGeoJson](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#drawGeoJson).
- ```svgMap.refreshScreen()``` If the DOM needs to be redrawn at a time other than during scaling/scrolling, you must [explicitly request a redraw](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen).
	- [Reference information](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```js
var dataPaths = {
	"A34b-180316.geojson": "World Heritage Site Component Area Polygon (Representative Point)",
	"A34a-180316.geojson": "World Heritage Site Component Area Polygon Data",
	"A34d-180316.geojson": "World Heritage Site Component Boundary Line (Representative Point)",
	"A34c-180316.geojson": "World Heritage Site Component Boundary Line Data",
	"A34e-180316.geojson":"World Heritage Component",
	"A34f-180316.geojson": "World Heritage Buffer Zone Polygon Data",
	"A34g-180316.geojson":"World Heritage Buffer Zone Polygon (Representative Point)",
	"C28-20_Airport.geojson":"Airport Data Airport",
	"C28-20_AirportReferencePoint.geojson":"Airport data reference point",
	"C28-20_SurveyContent.geojson": "Airport Data Survey Content",
	"C28-20_TerminalBuilding.geojson":"Airport Data Terminal Building",
	"N02-20_RailroadSection.geojson":"Railway Data Railway",
	"N02-20_Station.geojson":"Railway data station"
};

addEventListener("load", function(){
	buildDataSelect();
	changeData();
});

function changeData(){
	var path = dataSelect.options[dataSelect.selectedIndex].value;
	loadAndDrawGeoJson(path);
}

async function loadAndDrawGeoJson(dataPath){
	var gjs = await loadJSON(dataPath);
	var parentElm = svgImage.getElementById("mapContents");
	removeChildren(parentElm);
	svgMapGIStool.drawGeoJson(gjs, layerID, "orange", 2, "orange", "p0", "poi", "", parentElm);
	svgMap.refreshScreen();
}

function buildDataSelect(){
	var first = true;
	for ( var dataPath in dataPaths){
		dataSelect.insertAdjacentHTML('beforeend', '<option value="' + dataPath +'" >'+dataPaths[dataPath]+'</option>');
	}
}

async function loadJSON(url){
	var dt = getDateStr(new Date(),10);
	var response = await fetch(url+"?time="+dt); // Add some dummy query part to always get the latest data. Bad Tips...
	// https://stackoverflow.com/questions/37204296/cache-invalidation-using-the-query-string-bad-practice
	// https://stackoverflow.com/questions/9692665/cache-busting-via-params
	var json = await response.json();
	return ( json );
}

function getDateStr(dateData , tStep){
	var mind = tStep * Math.floor( dateData.getUTCMinutes() / tStep );
	var ans = dateData.getUTCFullYear()+ pad(dateData.getUTCMonth() + 1) + pad(dateData.getUTCDate()) + pad(dateData.getUTCHours()) + pad(mind);
	return ( ans );
}
function pad( inp ){
	return (("0"+inp).slice(-2));
}

function removeChildren(element){
	while (element.firstChild) element.removeChild(element.firstChild);
}
```
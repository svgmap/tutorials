---
sidebar_position: 5
---

# Tutorial 5: WebApp Layer - Tile Pyramid

## Introduction  {#introduction}

This tutorial demonstrates how to create a layer using [OpenStreetMap's tile pyramid](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) that displays the appropriate map ([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) as it expands and scrolls, utilizing SVGMap's [WebApp Layer mechanism](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0).

[Click here](https://svgmap.org/devinfo/devkddi/tutorials/tutorial5/tutorial5.html) to see how it works .

### File Structure {#file-structure}

The file structure is as follows:

- [the tutorial5](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5) directory contains the following files.
  - [Tutorial5.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/tutorial5.html)
    - HTML for Tutorial 5. Same content as tutorial2b.html.
  - [Container.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/Container.svg)
    - Load dynamicOSM_r11.svg to display an external OpenStreetMap.
  - [dynamicOSM_r11.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/dynamicOSM_r11.svg)
    - A layer containing SVGMap content that displays an external OpenStreetMap (it's empty inside, and the underlying web application dynamically constructs the DOM).
  - [dynamicOSM_r11.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/dynamicOSM_r11.html)
    - The HTML of the web application associated with the above dynamicOSM_r11.svg
  - [dynamicOSM_r11.js](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/dynamicOSM_r11.js)
    - The JavaScript code for the web application linked to the above dynamicOSM_r11.svg file.

## Tutorial {#tutorial}

SVGMap.js allows layers to be more than just content (SVG files); they can also provide a WebApp that dynamically generates SVGMap content via JavaScript. ([Dynamic Layers by WebApp (WebApp Layer)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)) ([Layer-Specific UI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI))

As the name WebApp Layer suggests, it can associate not only with JavaScript code but also with UI elements (Window objects) created using HTML and CSS.

From Tutorial 5 onwards, we will primarily use this WebApp Layer functionality to implement features that display various data and provide a user interface specific to each layer.

Here, we'll use this feature to build a layer that uses OpenStreetMap's tile pyramid to quickly display the appropriate map as you zoom in and out.

Note that Tutorial 5 contains a fair amount of code, so if you want to try out the WebApp Layer's features with less code, [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6) might be easier.

[Click here](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5/tutorial5.html) to see how it works .
The file used is a [ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial5.zip).

### Tutorial5.html {#tutorial5-html}

- This loads the core SVGMap program file (SVGMapLv0.1_r18module.js) and makes the various SVGMap APIs available.
- The map display area is defined (using a DIV), and an SVG file (Containers.svg) containing the layers to be displayed is loaded into it (the layers that are automatically made visible by the SVGMap core program mentioned above will be displayed).
- Define the display and actions of the zoom up, zoom down, and GPS buttons (calling the respective APIs of the SVGMap core program).
  - Zoom-up button: Zooms in on the map by calling the svgMap.zoomup() API.
  - Zoom down button: Zooms down the map by calling the svgMap.zoomdown() API.
  - GPS button: Calls the svgMap.gps() API to zoom in and display the current location (PC or smartphone location, only if it can be identified).
- A cross symbol is displayed to indicate the center.
- The crosshairs above indicate the latitude and longitude displayed on the map (in reality, the latitude and longitude of the map's center are displayed when the map is moved).

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial5 DynamicContents</title>
<!-- Definition that the viewport display area is the entire screen -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading the SVGMap core API -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgmap=svgmap
</script>

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files (only 5 files in this tutorial) -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- Zoom-up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to be displayed in the upper right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial5 DynamicContents</font>
<!-- Display in the lower right corner of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude displayed as a crosshair in the lower left corner of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- The crosshairs displayed in the lower left corner of the screen show the latitude and longitude (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
 </div>
</body>
</html>
```

### Container.svg {#container-svg}

- Load the SVG files for each layer to be displayed (only dynamicOSM_r10.svg is loaded).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:go="http://purl.org/svgmap/profile" viewBox="12300 -4600 2200 2200" >

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100.0,0.0,0.0,-100.0,0.0,0.0)" />

<!-- Load the SVG file for OpenStreetMap as the display state -->
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="dynamicOSM_r11.svg" title="OpenStreetMap(Global)" class="basemap switch" visibility="visible"/>
</svg>
```

### dynamicOSM_r11.svg

An SVG map content layer file with a web application linked to display an external OpenStreetMap.

We will utilize [the WebApp Layer mechanism](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) provided by SVGMap.js .

- By referencing the web application (HTML content containing JavaScript code) in the data-controller attribute of the SVG content's document element (svg element), the web application is linked to the SVGMap content layer.
  - The #exec=hiddenOnLayerLoad hash will launch the web application in a hidden state. See [the documentation](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) for details on layer-specific UI.
- Because the DOM is generated directly in the web application, the content is mostly empty.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" data-controller="dynamicOSM_r11.html#exec=hiddenOnLayerLoad" >

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />

</svg>
```

### dynamicOSM_r11.html, dynamicOSM_r11.js {#dynamicosm-r11}

[This](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) is a webApp ( layer-specific UI ) linked to dynamicOSM_r11.svg . WebApps linked to layers allow the use of [their own APIs](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API).


[OpenStreetMap](https://www.openstreetmap.org/) (OSM) delivers a [pyramidal image](https://satakagi.github.io/mapsForWebWS2020-docs/imgs/tile_pyramid.png) divided into 256x256 pixel tiles according to the map scale . ([OSM Slippy map tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames),[OSM ZoomLevels](https://wiki.openstreetmap.org/wiki/Zoom_levels))

This will be used to implement a feature ([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) that dynamically retrieves and displays tiles appropriate to the display range and zoom level from the OpenStreetMap server .

*Note: The OpenStreetMap tiles used here are uniform mesh tiles on the so-called Web Mercator projection. On the other hand, the SVGMap content used in this tutorial uses the [azimuthal equidistant projection](https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%B7%9D%E5%86%86%E7%AD%92%E5%9B%B3%E6%B3%95) (Plate Caree: a projection that directly plots longitude and latitude on the X,Y plane, commonly used in business and technical fields). Therefore, projection conversion is necessary, but for simplicity, this tutorial only uses a linear conversion of the tiles. At small scales, such as the size of the Japanese archipelago, you may see some discrepancies due to the difference in projections. (SVGMap.js also supports [more accurate projection conversion](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.A1.E3.83.AB.E3.82.AB.E3.83.88.E3.83.AB.E5.9B.B3.E6.B3.95.E3.82.92.E5.90.AB.E3.82.80.E4.BB.BB.E6.84.8F.E3.81.AE.E5.9B.B3.E6.B3.95.E3.81.AE.E5.AE.9A.E7.BE.A9.E3.81.A8.E3.81.9D.E3.81.AE.E5.90.88.E6.88.90.E6.A9.9F.E8.83.BD.28.EF.BC.9Erev16.29).)*

#### dynamicOSM_r11.html

The HTML consists of a [common library](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI.E3.81.AE.E3.81.9F.E3.82.81.E3.81.AEhtml.E6.96.87.E6.9B.B8.28webApp.29.E3.81.AE.E6.A7.8B.E9.80.A0.E3.83.BB.E4.BD.9C.E6.B3.95) (svgMapLayerLib.js) for initializing the layer-specific UI , a script code section describing the layer-specific processing ```dynamicOSM_r11.js```, and the UI (HTML, CSS, etc.).

dynamicOSM_r11.html

```html
<!doctype html> 
<html> 
<head> 
<meta charset="utf-8"></meta> 
<title>OpenStreerMap Dynamic Layer</title> 
</head> 

<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script> 
<script src="dynamicOSM_r11.js"></script> 

<body> 
<h3>OpenStreerMap Dynamic Layer</h3> 
</body> 
</html>
```

#### dynamicOSM_r11.js

- ```onload``` Similar to a regular web application, this function is executed after the loading of the HTML-related resources is complete.
  - ```svgMap``` [Core Framework Instance](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMap)
    - ```svgMap.refreshScreen()``` If the DOM needs to be redrawn at a time other than during scaling/scrolling, you must [explicitly request a redraw](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen).
      - [Reference information](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)
- ```preRenderFunction()``` When this function is defined, it will be [executed immediately](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#preRenderFunction) before each screen redraw.
  - ```svgImagesProps``` [Various information](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImageProps) about SVG content linked to a web app.
    - [See explanatory manual](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImageProps), [see reference 2](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.83.91.E3.83.86.E3.82.A3.E3.83.AA.E3.82.B9.E3.83.88)
    - ```svgImageProps.scale``` The scale of the SVG content's coordinate system relative to the screen's coordinate system (Note: This is different from a geographic coordinate system) ([Reference Information](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.83.91.E3.83.86.E3.82.A3.E3.83.AA.E3.82.B9.E3.83.88))
  - ```svgMap.getGeoViewBox()``` Obtain the display area using [geographic coordinates](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getGeoViewBox).
  - ```getTileSet``` Obtain a list of tiles to display (associative array) (details below).
  - ```svgImage``` The DOM of the [linked SVGMap content](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImage)
    - OSM tiles are placed in the SVG DOM as SVG image elements. Additionally, the tile number (key in the associative array) of each tile obtained with getTileSet is set in the metadata attribute.
    - When this function (preRenderFunction) is called again after scrolling, it uses the value of this metadata to ensure that tiles that have already been drawn up to the previous step and should be drawn again after scrolling remain in place.
  - ```getTile``` Based on the information (ZoomLevel, X, Y) in the tile list's associative array, obtain the image element for the tile to be retrieved.
    - OSM bit image tiles are pasted as SVG image elements.
    - getURLA function that generates the URL of an actual OSM tile from ZoomLevel, X, and Y.
    - ```XY2latLng``` A function that obtains the geographic coordinate region of a tile from ZoomLevel, X, and Y.
- ```getTileSet```A function that lists the tiles to be displayed at the current zoom level and display area.
  - [This function](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels) retrieves the Zoom and [XY coordinates](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#X_and_Y) of an OSM Slippy Map Tile and returns an associative array using these coordinates as keys.
  - OSM Slippy Map Tiles are tile pyramids that are recursively divided into 2x2 sections on the [Web Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection#Web_Mercator).
    - The Web Mercator projection constructs a square map over a range of (longitude ±180 degrees, latitude ±85.05113 degrees).
  - ```latLng2XY``` This method calculates the coordinates of a specified latitude and longitude on a bit image, assuming the entire Earth is represented as a single large square bit image on the Web Mercator projection at a specified zoom level.
    - ```lvl2Res``` Calculate the width of the corresponding bit image of the entire Earth from the ZoomLevel (Level0: 256px)
  - ```XY2TileXY``` From the XY coordinates on a large square bit image of the Earth shown above, when it is tiled, the tile number (tile's X number, Y number) to which those coordinates belong can be obtained.

  dynamicOSM_r11.js

<details>
<summary>Click see full JS data</summary>

```js
// Dynamic OpenStreetMap Layer for SVGMap Sample for SVGMapLevel0 > r10 
// Programmed by Satoru Takagi 
// Copyright (C) 2013 by Satoru Takagi @ KDDI CORPORATION 
// 
// License: 
// This program is free software: you can redistribute it and/or modify 
// it under the terms of the GNU General Public License version 3 as 
// published by the Free Software Foundation. 
// 
// This program is distributed in the hope that it will be useful, 
// but WITHOUT ANY WARRANTY; without even the implied warranty of 
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
// GNU General Public License for more details. 
// 
// You should have received a copy of the GNU General Public License 
// along with this program. If not, see (http://www.gnu.org/licenses/). 

// Prototype of a dynamic layer intended for iframe implementation 
// (Allows you to place JavaScript imports in the SVG content.) 
// OpenStreetMap is used as the map data (it can be replaced with other data relatively easily) 
// 
// 
// In the environment in which this code operates, the following are set by default: 
// document: This document itself 
// svgImage: The SVGMap content associated with this document 
// svgMap.getGeoViewBox(): Geographic viewbox 
// svgImageProps: Various properties of the SVGMap content associated with this document 
// svgImageProps.scale: Scale (scale of the coordinates of this svg content relative to the screen coordinates) 
// 
// 2013/01/24: 1st ver. 
// 2022/01/31: Ported to WebApp layer // 
Onload = function () 

to be executed when this file is loaded { 
	// Immediately after this script is loaded, refreshScreen() is called, 
	// The following preRenderFunction is executed for the first time 
	svgMap.refreshScreen(); 
}; 
function preRenderFunction() { // Callback function 
	var level 
	that is executed just before redrawing = 8; 
	// Calculate zoom level (3 to 18) 
	var level = Math.floor(Math.LOG2E * Math.log(svgImageProps.scale) + 7.5); 
	if (level > 18) { 
		level = 18; 
	} else if (level < 3) { 
		level = 3; 
	} 
	// Get the XY coordinates and HashKey of the tile to be displayed in the viewBox in the geographic coordinates of this map 
	var tileSet = getTileSet(svgMap.getGeoViewBox(), level); 
	// Get the element with the tag name "image" (image for each map tile) that is currently loaded 
	console.log("tileSet:", tileSet); 
	var currentTiles = svgImage.getElementsByTagName("image"); 
	// Repeat the following for each tile obtained, reusing those that have already been loaded and deleting those that are outside the display range 
	for (var i = currentTiles.length - 1; i >= 0; i--) { 
		var oneTile = currentTiles[i]; 
		var qkey = oneTile.getAttribute("metadata"); 
		if (tileSet[qkey]) { 
			// Set a flag to skip as it already exists. 
			tileSet[qkey].exist = true; 
		} else { 
			// Since it doesn't exist, remove it 
			oneTile.parentNode.removeChild(oneTile); 
		}




	} 

	// Repeat the following for the number of tiles to be displayed, and add any unloaded files to the loaded element 
	for (var tkey in tileSet) { 
		if (!tileSet[tkey].exist) { 
			var addTile = getTile(tileSet[tkey].x, tileSet[tkey].y, level, this.CRS); 
			svgImage.getElementsByTagName("svg")[0].appendChild(addTile); 
		} 
	} 
} 

// Get the tile (divided map image) at the specified location 
function getTile(tileX, tileY, level, crs) { 
	// Get the URL of the tile with coordinates tileX, tileY and zoom level. 
	var tileURL = getURL(tileX, tileY, level); 

	// Get bbox in SVG of tile 
	var tLatLng = XY2latLng(tileX * tilePix, tileY * tilePix, level); 
	var tSvg = svgMap.transform(tLatLng.lng, tLatLng.lat, crs); 
	var tLatLngBR = //
		​
		​
		​
	​
	​ 
	​Inefficient...improvement postponed 
	tSvg.height = tSvgBR.y - tSvg.y; 

	// Create the tile element to be retrieved and set its attributes. 
	var cl = svgImage.createElement("image"); 
	cl.setAttribute("x", tSvg.x); 
	cl.setAttribute("y", tSvg.y); 
	cl.setAttribute("width", tSvg.width); 
	cl.setAttribute("height", tSvg.height); 
	cl.setAttribute("xlink:href", tileURL.URL); 
	cl.setAttribute("metadata", tileURL.Key); 

	return cl; 
} 

// A function that returns the XY set of tiles required when displaying a map at level zoom level in a geoViewBox with the specified map coordinates. 
getTileSet(geoViewBox, level) { 
	var TileSet = new Object(); 
	if (geoViewBox.y + geoViewBox.height > 85.05113) { 
		geoViewBox.height = 85.05113 - geoViewBox.y; 
	} 

	if (geoViewBox.y < -85.05113) { 
		} 
	// 

	Returns the XY coordinates and HashKey of the tile in the specified area 
	var tlxy = latLng2XY(geoViewBox.y + geoViewBox.height, geoViewBox.x, level); 
	var tileTLxy = XY2TileXY(tlxy); 
	var brxy = latLng2XY(geoViewBox.y, geoViewBox.x + geoViewBox.width, level); 
	var tileBRxy = XY2TileXY(brxy); 

	// Repeat the following for the number of tiles equal to the required height and width 
	for (var i = tileTLxy.y; i <= tileBRxy.y; i++) { 
		for (var j = tileTLxy.x; j <= tileBRxy.x; j++) { 
			// Get the HashKey from the tile's XY coordinates and zoom level 
			var qkey = getKey(j, i, level); 
			// Set the necessary tile information for each HashKey obtained above. 
			TileSet[qkey] = new Object(); 
			TileSet[qkey].x = j; 
			TileSet[qkey].y = i; 
		} 
	} 
	return TileSet; 
} 

// Convert latitude and longitude to XY 
function latLng2XY(lat, lng, lvl) { 
	var size = lvl2Res(lvl);
	var sinLat = Math.sin((lat * Math.PI) / 180.0); 
	var pixelX = ((lng + 180.0) / 360.0) * size; 
	var pixelY = 
		(0.5 - Math.log((1 + sinLat) / (1.0 - sinLat)) / (4 * Math.PI)) * size; 
	return { 
		x: pixelX, 
		y: pixelY, 
	}; 
} 

// Convert from XY to tile's XY 
function XY2TileXY(xy) { 
	var tileX = Math.floor(xy.x / tilePix); 
	var tileY = Math.floor(xy.y / tilePix); 
	return { 
		x: tileX, 
		y: tileY, 
	}; 
} 

var tilePix = 256; 
// Return the size of a tile piece from the zoom level 
function lvl2Res(lvl) { 
	var j = 1; 
	for (var i = 0; i < lvl; i++) { 
		j = j * 2; 
	} 
	return 
	j * tilePix; 
} // Convert 
	from 

XY to latitude/ 
	longitude 
function 
	var lat = 90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI; 
	var lng = 360 * x; 
	return { 
		lat: lat, 
		lng: lng, 
	}; 
} 
var sva = new Array("a", "b", "c"); 
var svNumb = 0; 
var culture = "en-US"; 
var bingRoadSearchPart = ".jpeg?g=849&mkt=" + culture + "&shading=hill"; // 
function getURL(tx, ty, lvl) that 
returns a URL from the tile's XY and zoom level { 
	// Get a HashKey from the XY and zoom level 
	var tile_ans = getKey(tx, ty, lvl); 
	// Assemble an OpenStreetMap URL 
	var mapServerURL = 
		"http://" + 
		sva[svNumb] + 
		".tile.openstreetmap.org/" + 
		lvl + 
		"/" + 
		tx + 
		"/" + 
		ty + 
		".png"; 
	// Load balancing is performed when acquiring map images by sequentially switching between multiple similar servers. 
	++svNumb; 
	if (svNumb > 2) { 
		svNumb = 0; 
	} 
	return { 
		URL: mapServerURL, 
		Key: tile_ans, 
	}; 
} // 
function getKey(tx, ty, lvl) 
that generates and returns a HashKey { 
	return tx + "_" + ty + "_" + lvl; 
}
```

</details>
# Tutorial 3: Displaying a tiled coastline map

## Introduction  

This tutorial splits the content of Tutorial 1 into multiple tiles and displays them. [Click here](https://svgmap.org/devinfo/devkddi/tutorials/tutorial3/tutorial3.html) to see it in action.

### File Structure

The file structure is as follows:

- [The tutorial3 directory](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/) contains the following files.
  - [tutorial3.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/tutorial3.html)
    - HTML for Tutorial 3. Same content as tutrial1.html.
  - [Container.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/Container.svg)
  - [Coastline.svg](https://www.svgmap.org//devinfo/devkddi/tutorials/tutorial3/Coastline.svg)
    - An SVG that bundles the following 4x4 (total 16) split files.
    - For information on tiling, see [the SVGMap tiling architecture](https://www.slideshare.net/totipalmate/tiling-51301496).
  - [0_0.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/0_0.svg)
  - [0_1.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/0_1.svg)
  - [0_2.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/0_2.svg)
  - [0_3.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/0_3.svg)
  - [1_0.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/1_0.svg)
  - [1_1.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/1_1.svg)
  - [1_2.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/1_2.svg)
  - [1_3.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/1_3.svg)
  - [2_0.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/2_0.svg)
  - [2_1.svg](https://www.svgmap.org//devinfo/devkddi/tutorials/tutorial3/2_1.svg)
  - [2_2.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/2_2.svg)
  - [2_3.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/2_3.svg)
  - [3_0.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/3_0.svg)
  - [3_1.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/3_1.svg)
  - [3_2.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/3_2.svg)
  - [3_3.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3/3_3.svg)

## Tutorial

### Files Used

- [ZIP archive](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3.zip) file of used files

### Essential differences from existing frameworks

SVGMap tiling is fundamentally different from other frameworks (openlayers, leaflet, googlemaps, etc.). Therefore, developers who are used to existing frameworks may be confused by the differences in the mechanism, so I would like to explain it here.

Other map frameworks assume pre-defined tiling rules (such as [TMS](https://ja.wikipedia.org/wiki/%E3%82%BF%E3%82%A4%E3%83%AB%E3%83%9E%E3%83%83%E3%83%97%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)) **and these rules are hard-coded into the framework**. The system is designed to only specify parameters for accessing a server built based on those rules. While it is easy to introduce tiled content by simply setting parameters, there are issues with flexibility.

On the other hand, SVGMap tiling is more primitive and does not have built-in tiling rules (although this can easily be implemented as a WebApp Layer, as explained in [Tutorial 5](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB5)), but instead provides the more basic functionality needed to make tiling work, allowing for a wide variety of tiling strategies to be achieved.

In this chapter, we will demonstrate the most basic static tiling using this function. Static tiling is achieved by preparing an SVG file with inline layout information for the tiled data, and the viewer matching the viewport with its container to obtain the necessary tiles.

[For](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-in-english) an illustration of how this works, see [pages 14](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-for-web-mapping-in-japanese/14) to [20](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-for-web-mapping-in-japanese/20) of [this more advanced guide](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-for-web-mapping-in-japanese).

One of the reasons for this structure of SVGMap is to allow it to be extended and implemented with more advanced and efficient tiling methods, such as those described in the above [reference material](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-for-web-mapping-in-japanese).

### Content Structure

```plaintext
tutorial1.html
 |
 +-img/zoomup.png, img/zoomdown.png, img/gps.png, img/Xcursor.png (images of map operation UI)
 |
 +-js/SVGMapLv0.1_r17.js, js/SVGMapLv0.1_LayerUI2_r4.js (Javascript library for displaying SVGMap)
   |
   +-Contaiber.svg (Loads an SVG file that serves as a bundle of various data (layers))
     |
     +-Coastline.svg (Coastline layer: bundles tiled coastline content)
       |
       +-0_0.svg (actual tiled coastline content)
       +-0_1.svg (actual tiled coastline content)
       +-0_2.svg (actual tiled coastline content)
       +-0_3.svg (actual tiled coastline content)
       +-1_0.svg (actual tiled coastline content)
       +-1_1.svg (actual tiled coastline content)
       +-1_2.svg (actual tiled coastline content)
       +-1_3.svg (actual tiled coastline content)
       +-2_0.svg (actual tiled coastline content)
       +-2_1.svg (actual tiled coastline content)
       +-2_2.svg (actual tiled coastline content)
       +-2_3.svg (actual tiled coastline content)
       +-3_0.svg (actual tiled coastline content)
       +-3_1.svg (actual tiled coastline content)
       +-3_2.svg (actual tiled coastline content)
       +-3_3.svg (actual tiled coastline content)
```
### tutorial3.html

Basically the same as tutorial1.html used in Tutorial 1.

- Loads the SVGMap core program file (SVGMapLv0.1_r18module.js) and makes various SVGMap APIs available.
- Define the map display area (using a DIV) and load an SVG file (Containers.svg) that contains the layers to be displayed there (layers that are automatically made visible in the SVGMap core program above will be displayed).
- Defines the display of the zoom up, zoom down, and GPS buttons and their behavior when clicked (calling the respective APIs of the SVGMap core program).
  - Zoom up button: Zooms up the map by calling the svgMap.zoomup() API.
  - Zoom down button: Zooms down the map by calling the svgMap.zoomdown() API.
  - GPS button: Calls the svgMap.gps() API to zoom in on the current location (the location of your PC or smartphone, if it can be determined).
- A cross mark indicating the center is displayed.
- Displays the latitude and longitude on the map indicated by the cross mark above (actually, displays the latitude and longitude of the center of the map when moving the map).

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial3 Coastline Tiling</title>
<!-- viewport defines the map display area as the entire screen -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading SVGMap's core API -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgMap=svgMap
</script>

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files (only one file in this tutorial) -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- Zoom up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to display in the top right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial3 Coastline Tiling</font>
<!-- Display at the bottom right of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude of the cross mark displayed in the bottom left of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- Latitude and longitude of the cross mark displayed at the bottom left of the screen (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
 </div>
</body>
</html>
```

### Container.svg

- Load an SVG file for each layer you want to display (only Coastline.svg is loaded).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Load the SVG file of Japan's coastline data as a display state -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="editable" visibility="visible"/>

</svg>
```

### Coastline

#### Tiling

This is an example of tiling using [the animation element](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB1#animation.E8.A6.81.E7.B4.A0) of SVGMap content .

Tiling consists of tile content, where the actual data is stored, and container content (this file) that integrates it.

- In this example, the container content integrates each SVGMap file divided into 4x4 (16) tiles.
- Referencing all 16 tiles using the animation element
  - Write the link to the tile content in the xlink:href attribute
  - Describe the area where the tile exists in the x, y, width, and height attributes
    - Tiles are loaded as needed based on this area information (the tiles are automatically loaded when their area is within the area displayed on the screen).
    - Note: ∴Unlike layering, the x, y, width, and height attributes are important in tiling.

#### Placement of each tile

**Coastline.svg**
| + | X coordinate small, Small Longitude | .. | .. | X coordinate large, Large Longitude
|---|---|---|---|---|
| Small Y coordinate, large latitude | 0_0.svg | 1_0.svg | 2_0.svg | 3_0.svg
| .. | 	0_1.svg | 1_1.svg | 2_1.svg | 3_1.svg
| .. | 0_2.svg | 1_2.svg | 2_2.svg | 3_2.svg
| Large Y coordinate, small latitude | 0_3.svg | 1_2.svg | 2_2.svg | 3_2.svg

- Width and height of each tile: width,height attribute values: width="659.2878" height="631.5991"
- Origin of each tile (coordinates of the upper left corner of the tile): x, y attribute values
  - x：12078.24557, 12737.53337, 13396.82117, 14056.10897
  - y: -4750.342539, -4118.743422, -3487.144305, -2855.545188
- Note: The Y coordinate is the opposite of the geographic coordinate (latitude and longitude coordinate), and the origin is at the top (north).
  - See the relationship between SVG coordinates and geographic coordinates (latitude and longitude coordinates) using [the globalCoordinateSystem element](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB1#.E5.BF.85.E9.A0.88.E3.81.AE.E6.8B.A1.E5.BC.B5_:_globalCoordinateSystem.E8.A6.81.E7.B4.A0).

#### About svpMap Tools

[svgMapTools](https://github.com/svgmap/svgMapTools/tree/master/tutorials) has the ability to generate tiled SVGMap content from large geographical data (such as shapefiles), but also supports more advanced (highly efficient) tiling (Quad Tree Composite Tiling).

#### Source code

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg viewBox="12078.24557, -4750.342539, 2637.1512, 2526.396468" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:go="http://purl.org/svgmap/profile" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 

 <animation xlink:href="0_0.svg" x="12078.24557" y="-4750.342539" width="659.2878" height="631.5991"/> 
 <animation xlink:href="0_1.svg" x="12078.24557" y="-4118.743422" width="659.2878" height="631.5991"/ 
 > xlink:href="0_2.svg" x="12078.24557" y="-3487.144305" width="659.2878" height="631.5991"/> 
 <animation xlink:href="0_3.svg" x="12078.24557" y="-2855.545188" width="659.2878" height="631.5991"/> 

 <animation xlink:href="1_0.svg" x="12737.53337" y="-4750.342539" width="659.2878" height="631.5991"/> 
 <animation xlink:href="1_1.svg" x="12737.53337" y="-4118.743422" width="659.2878" height="631.5991"/> 
 <animation xlink:href="1_2.svg" x="12737.53337" y="-3487.144305" width="659.2878" height="631.5991"/> 
 <animation xlink:href="1_3.svg" x="12737.53337" y="-2855.545188" width="659.2878" height="631.5991"/> 

 <animation xlink:href="2_0.svg" x="13396.82117" y="-4750.342539" width="659.2878" height="631.5991"/> 
 <animation xlink:href="2_1.svg" x="13396.82117" y="-4118.743422" width="659.2878" height="631.5991"/> 
 <animation xlink:href="2_2.svg" x="13396.82117" y="-3487.144305" width="659.2878" height="631.5991"/> 
 <animation xlink:href="2_3.svg" x="13396.82117" y="-2855.545188" width="659.2878" height="631.5991"/ 

 > xlink:href="3_0.svg" x="14056.10897" y="-4750.342539" width="659.2878" height="631.5991"/> 
 <animation xlink:href="3_1.svg" x="14056.10897" y="-4118.743422" width="659.2878" height="631.5991"/> 
 <animation xlink:href="3_2.svg" x="14056.10897" y="-3487.144305" width="659.2878" height="631.5991"/> 
 <animation xlink:href="3_3.svg" x="14056.10897" y="-2855.545188" width="659.2878" height="631.5991"/> 

</svg>
```

### Split SVG files

- 0_0.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -4750.342539, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 0_1.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -4118.743422, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 0_2.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -3487.144305, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 0_3.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -2855.545188, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 12455.548,-2592.186 0.03,0.01" /> 
  <path d="m 12455.548,-2592.186 v 0" /> 
  <path d="m 12368.14,-2591.8533 v 0" /> 
  <path d="m 12346,-2573.4068 v 0" /> 
  <path d="m 12354.12,-2572.48 v 0" /> 
  <path d="m 12355.36,-2571.9933 v 0" /> 
  <path d="m 12720.77,-2657.4266 v 0" /> 
  <path d="m 12709.9,-2638.1332 v 0" /> 
  <path d="m 12714.51,-2634.7799 v 0" /> 
  <path d="m 12675.53,-2638.6801 -2.985,4.0743" /> 
  <path d="m 12672.545,-2634.6058 v 0" /> 
  <path d="m 12688.59,-2634.4133 v 0" /> 
  <path d="m 12686.16,-2633.88 v 0" /> 
  <path d="m 12684.14,-2633.6533 v 0" /> 
  <path d="m 12685.14,-2633.6533 v 0" /> 
  <path d="m 12682.5,-2633.5133 v 0" /> 
  <path d="m 12672.545,-2634.6058 3.825,1.3857" /> 
  <path d="m 12676.37,-2633.2201 -0.84,-5.46" /> 
  <path d="m 12736.59,-2622.3267 v 0" /> 
  <path d="m 12730.37,-2621.8533 v 0" /> 
  <path d="m 12728.66,-2621.6 v 0" /> 
  <path d="m 12724.19,-2620.7666 v 0" /> 
  <path d="m 12731.21,-2619.7533 v 0" /> 
  <path d="m 12737.67,-2619.6066 v 0" /> 
  <path d="m 12727.51,-2618.5934 v 0" /> 
  <path d="m 12728.57,-2617.5266 v 0" /> 
  <path d="m 12724.01,-2616.2001 v 0" /> 
  <path d="m 12729.11,-2616.0067 v 0" /> 
  <path d="m 12733.69,-2615.8535 v 0" /> 
  <path d="m 12728.9,-2615.5466 v 0" /> 
  <path d="m 12727.19,-2615.5001 v 0" /> 
  <path d="m 12734.76,-2614.5134 v 0" /> 
  <path d="m 12734.09,-2613.8533 v 0" /> 
  <path d="m 14034.2,-2979.2601 v 0" /> 
  <path d="m 14210.95,-2771.5334 v 0" /> 
  <path d="m 14210.271,-2771.52 v 0" /> 
  <path d="m 14212.64,-2767.7334 v 0" /> 
  <path d="m 14214.61,-2766.9867 v 0" /> 
  <path d="m 14215.9,-2765.4467 v 0" /> 
  <path d="m 14218.57,-2761.8999 v 0" />
  <path d="m 14221.28,-2748.8867 v 0" /> 
  <path d="m 14220.67,-2748.6 v 0" /> 
  <path d="m 14087.669,-2724.3534 v 0" /> 
  <path d="m 14219.51,-2719.1933 v 0" /> 
  <path d="m 14218.88,-2714.4001 v 0" /> 
  <path d="m 14218.201,-2712.6333 v 0" /> 
  <path d="m 14216.38,-2711.2135 v 0" /> 
  <path d="m 14222,-2710.8133 v 0" /> 
  <path d="m 14224.68,-2708.9468 v 0" /> 
  <path d="m 14218.39,-2708.5333 v 0" /> 
  <path d="m 14217.825,-2704.4218 v 0" /> 
  <path d="m 14217.566,-2704.1681 v 0" /> 
  <path d="m 14222.07,-2703.5267 v 0" /> 
  <path d="m 14217.641,-2703.0666 v 0" /> 
  <path d="m 14212.18,-2671.4733 v 0" /> 
  <path d="m 14216.231,-2666.9867 h -1.811" /> 
  <path d="m 14214.42,-2666.9867 h 1.811" /> 
  <path d="m 14212.871,-2659.4267 v 0" /> 
  <path d="m 14214.79,-2658.1066 v 0" /> 
  <path d="m 14222.8,-2656.2735 v 0" /> 
  <path d="m 14220.19,-2655.2 v 0" /> 
  <path d="m 14215.63,-2654.2334 v 0" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 12469.97,-2474.6468 v 0" /> 
  <path d="m 12469.06,-2463.9666 v 0" /> 
  <path d="m 12382.29,-2446.7199 v 0" /> 
  <path d="m 12414.63,-2445.0533 v 0" /> 
  <path d="m 12299.68,-2446.7533 v 2.9199" /> 
  <path d="m 12299.68,-2443.8334 v -2.9199" /> 
  <path d="m 12371.71,-2436.4399 v 0" /> 
  <path d="m 12399.68,-2436.5667 v 0.5268" /> 
  <path d="m 12399.68,-2436.0399 v -0.5268" /> 
  <path d="m 12373.94,-2434.4933 v 0" /> 
  <path d="m 12392.94,-2434.0866 v 0" /> 
  <path d="m 12433.552,-2460.2715 -26.172,15.1515 7.05,11.4667" /> 
  <path d="m 12414.34,-2432.8333 v 0" /> 
  <path d="m 12414.43,-2433.6533 19.122,-26.6182" /> 
  <path d="m 12398.88,-2432.2933 v 0" /> 
  <path d="m 12408.05,-2430.9668 v 0" /> 
  <path d="m 12387.18,-2425.44 6.6,-10.9865 -15.71,-7.2201 -12.05,12.9398 21.16,5.2668" /> 
  <path d="m 12393.52,-2422.4068 v 0" /> 
  <path d="m 12401.07,-2421.9868 v 0" /> 
  <path d="m 12392.7,-2420.8733 v 0" /> 
  <path d="m 12355.379,-2419.1401 v 0" /> 
  <path d="m 12379.08,-2404.4733 v 0" /> 
  <path d="m 12524.651,-2491.9867 v 0" /> 
  <path d="m 12530.58,-2491.2533 v 0" /> 
  <path d="m 12515.331,-2483.12 -1.651,-0.5335" /> 
  <path d="m 12518.12,-2481.1268 -2.687,-2.4843" /> 
  <path d="m 12515.331,-2483.12 2.789,1.9932" /> 
  <path d="m 12518.12,-2481.1268 -2.687,-2.4843" /> 
  <path d="m 12513.68,-2483.6535 4.44,2.5267" />
  <path d="m 12535.26,-2478.8601 -5.63,-8.9065 -4.34,-3.2134 2.33,13.9533" /> 
  <path d="m 12534.9,-2472.1533 11.83,0.2667 -11.47,-6.9735" /> 
  <path d="m 12527.62,-2477.0267 2.12,5.3134" /> 
  <path d="m 12524.68,-2471.2667 v 0" /> 
  <path d="m 12529.74,-2471.7133 5.16,-0.44" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 1_0.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12737.53337, -4750.342539, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 1_1.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12737.53337, -4118.743422, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 13332.66,-3630.92 -7.01,-1.8467" /> 
  <path d="m 13337.32,-3627.7599 -4.66,-3.1601" /> 
  <path d="m 13325.65,-3632.7667 -7.52,6.7001" /> 
  <path d="m 13326.61,-3616.8064 10.71,-10.9535" /> 
  <path d="m 13326.61,-3616.8064 -8.48,-9.2602" /> 
  <path d="m 13312.18,-3614.6999 v 0" /> 
  <path d="m 13316.98,-3613.3667 v 0" /> 
  <path d="m 13316.56,-3610.0067 v 0" /> 
  <path d="m 13299.68,-3609.0668 v -2.3731" /> 
  <path d="m 13299.68,-3604.5933 v -4.4735" /> 
  <path d="m 13299.68,-3611.4399 v 7.5398" /> 
  <path d="m 13299.68,-3603.9001 v -0.6932" /> 
  <path d="m 13306.77,-3603.5133 v 0" /> 
  <path d="m 13301.37,-3600.3201 h 1.34" /> 
  <path d="m 13303.061,-3600.3201 h 0.409" /> 
  <path d="m 13303.76,-3600.3201 h 1.91" /> 
  <path d="m 13306.58,-3600.3201 h -5.84" /> 
  <path d="m 13300.74,-3600.3201 h 0.63" /> 
  <path d="m 13303.47,-3600.3201 h 0.29" /> 
  <path d="m 13302.71,-3600.3201 h 0.351" /> 
  <path d="m 13303.999,-3599.4934 v 0" /> 
  <path d="m 13305.67,-3600.3201 h 0.91" /> 
  <path d="m 13305.031,-3599.3401 v 0" /> 
  <path d="m 13307.71,-3599.3198 v 0" /> 
  <path d="m 13312.511,-3558.82 v 0" /> 
  <path d="m 13324.24,-3557.9201 v 0" /> 
  <path d="m 13305.13,-3556.48 v 0" /> 
  <path d="m 13312.08,-3557.8732 -9.44,2.52" /> 
  <path d="m 13324.409,-3554.9133 -12.329,-2.9599" /> 
  <path d="m 13302.64,-3555.3532 -2.96,1.1132" /> 
  <path d="m 13399.68,-3552.4334 -3.209,0.1335" /> 
  <path d="m 13360.7,-3552.2266 -6.409,0.067" /> 
  <path d="m 13295.129,-3551.82 4.551,-2.42" /> 
  <path d="m 13295.129,-3551.82 -4.879,0.6065" /> 
  <path d="m 13396.471,-3552.2999 -6.16,1.2665" /> 
  <path d="m 13366.569,-3550.7465 -5.869,-1.4801" /> 
  <path d="m 13385.5,-3550.5066 4.811,-0.5268" />
  <path d="m 13371.69,-3550.4131 -5.121,-0.3334" /> 
  <path d="m 13385.5,-3550.5066 -6.501,0.4131" /> 
  <path d="m 13378.999,-3550.0935 -7.309,-0.3196" /> 
  <path d="m 13326.15,-3550.0668 -1.741,-4.8465" /> 
  <path d="m 13354.291,-3552.1599 -8.501,2.3335" /> 
  <path d="m 13345.79,-3549.8264 -2.92,2.8263" /> 
  <path d="m 13337.36,-3545.6932 -11.21,-4.3736" /> 
  <path d="m 13339.101,-3545.3999 -1.741,-0.2933" /> 
  <path d="m 13339.32,-3545.3533 3.55,-1.6468" /> 
  <path d="m 13339.32,-3545.3533 -0.219,-0.047" /> 
  <path d="m 13290.25,-3551.2135 -19.7,6.9935" /> 
  <path d="m 13270.55,-3544.22 -3.17,6.7269" /> 
  <path d="m 13267.38,-3537.4931 -0.65,2.9731" /> 
  <path d="m 13266.73,-3534.52 -0.299,0.8667" /> 
  <path d="m 13266.431,-3533.6533 -1.882,3.1266" /> 
  <path d="m 13264.549,-3530.5267 -7.019,3.2669" /> 
  <path d="m 13257.53,-3527.2598 -15.941,9.56" /> 
  <path d="m 13239.69,-3516.9868 v 0" /> 
  <path d="m 13239.999,-3516.9067 v 0" /> 
  <path d="m 13239.76,-3516.8533 v 0" /> 
  <path d="m 13241.589,-3517.6998 -1.806,2.1515" /> 
  <path d="m 13239.76,-3515.4266 0.02,-0.1217" /> 
  <path d="m 13239.783,-3515.5483 -2.823,3.1551" /> 
  <path d="m 13236.96,-3512.3932 -5.679,5.9265" /> 
  <path d="m 13231.281,-3506.4667 -12.067,6.4667" /> 
  <path d="m 13219.214,-3500 -4.843,3.6133" /> 
  <path d="m 13204.48,-3490.2 v 0" /> 
  <path d="m 13206.081,-3489.7934 v 0" /> 
  <path d="m 13214.371,-3496.3867 -14.691,12.1532" /> 
  <path d="m 13199.68,-3484.2335 -1.799,1.8669" /> 
  <path d="m 13991.75,-3188.5868v 0" /> 
  <path d="m 14005.17,-3143.7267 v 0" /> 
  <path d="m 14029.86,-3047.2334 v 0" /> 
  <path d="m 14034.2,-2979.2601 v 0" /> 
  <path d="m 14210.95,-2771.5334 v 0" /> 
  <path d="m 14210.271,-2771.52 v 0" /> 
  <path d="m 14212.64,-2767.7334 v 0" /> 
  <path d="m 14214.61,-2766.9867 v 0" /> 
  <path d="m 14215.9,-2765.4467 v 0" /> 
  <path d="m 14218.57,-2761.8999 v 0" /> 
  <path d="m 14221.28,-2748.8867 v 0" /> 
  <path d="m 14220.67,-2748.6 v 0" /> 
  <path d="m 14087.669,-2724.3534 v 0" /> 
  <path d="m 14219.51,-2719.1933 v 0" /> 
  <path d="m 14218.88,-2714.4001 v 0" /> 
  <path d="m 14218.201,-2712.6333 v 0" /> 
  <path d="m 14216.38,-2711.2135 v 0" /> 
  <path d="m 14222,-2710.8133 v 0" /> 
  <path d="m 14224.68,-2708.9468 v 0" /> 
  <path d="m 14218.39,-2708.5333 v 0" /> 
  <path d="m 14217.825,-2704.4218 v 0" />
  <path d="m 14217.566,-2704.1681 v 0" /> 
  <path d="m 14222.07,-2703.5267 v 0" /> 
  <path d="m 14217.641,-2703.0666 v 0" /> 
  <path d="m 14212.18,-2671.4733 v 0" /> 
  <path d="m 14216.231,-2666.9867 h -1.811" /> 
  <path d="m 14214.42,-2666.9867 h 1.811" /> 
  <path d="m 14212.871,-2659.4267 v 0" /> 
  <path d="m 14214.79,-2658.1066 v 0" /> 
  <path d="m 14222.8,-2656.2735 v 0" /> 
  <path d="m 14220.19,-2655.2 v 0" /> 
  <path d="m 14215.63,-2654.2334 v 0" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 1_2.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12737.53337, -3487.144305, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 12943.291,-3470.3732 v 0" /> 
  <path d="m 12947.89,-3467.9935 v 0" /> 
  <path d="m 12940.759,-3467.6468 -0.819,0.66" /> 
  <path d="m 12940.179,-3466.9868 h 0.132" /> 
  <path d="m 12948.441,-3466.9868 -7.682,-0.66" /> 
  <path d="m 12939.94,-3466.9868 h 0.239" /> 
  <path d="m 12942.02,-3449.7398 6.421,-17.247" /> 
  <path d="m 12940.311,-3466.9868 -11.112,17.6467" /> 
  <path d="m 12929.199,-3449.3401 -0.07,4.8401" /> 
  <path d="m 12926.39,-3442.6933 v 0" /> 
  <path d="m 12936.38,-3443.4067 5.64,-6.3331" /> 
  <path d="m 12926.544,-3442.2222 v 0" /> 
  <path d="m 12926.82,-3441.7473 v 0" /> 
  <path d="m 12937.469,-3438.1802 -1.089,-5.2265" /> 
  <path d="m 12933.89,-3435.1398 v 0" /> 
  <path d="m 12940.63,-3435.0533 v 0" /> 
  <path d="m 12934.171,-3434.5264 v 0" /> 
  <path d="m 12933.31,-3433.9931 v 0" /> 
  <path d="m 12929.131,-3444.5 -6.312,8.6399 10.871,-2.2064" /> 
  <path d="m 12934.05,-3433.5667 v 0" /> 
  <path d="m 12939.661,-3433.4267 v 0" /> 
  <path d="m 12939.56,-3431.1733 v 0" /> 
  <path d="m 12933.279,-3430.4268 v 0" /> 
  <path d="m 12932.1,-3429.9534 v 0" /> 
  <path d="m 12933.69,-3438.0665 3.779,-0.1137" /> 
  <path d="m 12935.921,-3427.1198 v 0" /> 
  <path d="m 12932.48,-3422.6002 -12.959,-6.7863" /> 
  <path d="m 12924.2,-3409.6333 v 0" /> 
  <path d="m 12919.521,-3429.3865 -2.75,19.1932 15.709,-12.4069" /> 
  <path d="m 12969.83,-3386.4868 v 0" /> 
  <path d="m 12967.709,-3386.2534 v 0" /> 
  <path d="m 12968.851,-3386.1332 v 0" /> 
  <path d="m 12966.11,-3382.8667 v 0" /> 
  <path d="m 12972.42,-3385.0136 -4.93,5.3204" /> 
  <path d="m 12976.5,-3376.7067 -4.08,-8.3069" /> 
  <path d="m 12964.41,-3375.3201 v 0" /> 
  <path d="m 12986.44,-3374.0734 v 0" />
  <path d="m 12973.12,-3373.3601 3.38,-3.3466" /> 
  <path d="m 12963.049,-3373.2265 v 0" /> 
  <path d="m 12975.749,-3372.9935 v 0" /> 
  <path d="m 12962.75,-3372.2733 v 0" /> 
  <path d="m 12964.7,-3371.8132 v 0" /> 
  <path d="m 12967.49,-3379.6932 5.63,6.3331" /> 
  <path d="m 12962.399,-3369.8666 v 0" /> 
  <path d="m 12955.26,-3360.4 v 0" /> 
  <path d="m 12989.329,-3359.3201 v 0" /> 
  <path d="m 12986.22,-3358.7532 v 0" /> 
  <path d="m 12983.679,-3358.3733 v 0" /> 
  <path d="m 12975.7,-3356.34 v 0" /> 
  <path d="m 12987.41,-3354.38 v 0" /> 
  <path d="m 12991.13,-3354.2999 -0.12,-0.08" /> 
  <path d="m 12991.609,-3354.1866 -0.479,-0.1133" /> 
  <path d="m 12996.739,-3352.7134 v 0" /> 
  <path d="m 12991.01,-3354.38 -2.739,1.7467" /> 
  <path d="m 12988.271,-3352.6333 -2.701,1.5" /> 
  <path d="m 12998.86,-3347.2069 v 0" /> 
  <path d="m 12955.28,-3346.9334 v 0" /> 
  <path d="m 12972.659,-3345.1401 v 0" /> 
  <path d="m 12985.57,-3351.1333 -0.51,6.4201" /> 
  <path d="m 12999.68,-3344.6735 -8.071,-9.5131" /> 
  <path d="m 13000,-3344.6201 -0.32,-0.053" /> 
  <path d="m 12950.861,-3342.4202 v 0" /> 
  <path d="m 12953.36,-3342.1268 v 0" /> 
  <path d="m 12971.111,-3341.9868 v 0" /> 
  <path d="m 12968.401,-3340.5869 v 0" /> 
  <path d="m 12973.221,-3340.5666 v 0" /> 
  <path d="m 12985.629,-3340.2134 v 0" /> 
  <path d="m 12986.009,-3339.9467 v 0" /> 
  <path d="m 12977.969,-3339.3002 v 0" /> 
  <path d="m 12985.06,-3344.7132 1.331,5.4066" /> 
  <path d="m 12977.86,-3338.9801 v 0" /> 
  <path d="m 12960.37,-3338.0402 v 0" /> 
  <path d="m 12941.56,-3335.1002 v 0" /> 
  <path d="m 12981.219,-3334.8534 v 0" /> 
  <path d="m 12978.99,-3334.0332 -15.77,-2.1935" /> 
  <path d="m 12954.19,-3333.6533 h -10.24" /> 
  <path d="m 12963.22,-3336.2267 -6.109,2.5734" /> 
  <path d="m 12979.309,-3333.6533 -0.319,-0.3799" /> 
  <path d="m 12983.38,-3333.6533 h -0.61" /> 
  <path d="m 12986.391,-3339.3066 -2.681,5.6533" /> 
  <path d="m 12983.71,-3333.6533 h -0.33" /> 
  <path d="m 12983.53,-3331.8932 v 0" /> 
  <path d="m 12960.73,-3331.48 1.421,0.46" /> 
  <path d="m 12957.111,-3333.6533 3.619,2.1733" /> 
  <path d="m 12957.88,-3330.3467 v 0" /> 
  <path d="m 12957.25,-3328.7601 v 0" /> 
  <path d="m 12956.25,-3328.6934 v 0" /> 
  <path d="m 12982.77,-3333.6533 h -3.461" /> 
  <path d="m 12957.15,-3327.6665 v 0" />
  <path d="m 12956.41,-3327.0931 v 0" /> 
  <path d="m 12955.09,-3326.1868 v 0" /> 
  <path d="m 12956.461,-3326.1532 v 0" /> 
  <path d="m 12955.83,-3325.9197 v 0" /> 
  <path d="m 12955.93,-3325.3201 v 0" /> 
  <path d="m 12955.521,-3325.3067 v 0" /> 
  <path d="m 12906.49,-3325.2335 v 0" /> 
  <path d="m 12956.18,-3325.0401 v 0" /> 
  <path d="m 12933.74,-3324.8333 v 0" /> 
  <path d="m 12911.79,-3324.5602 v 0" /> 
  <path d="m 12907.01,-3324.4469 v 0" /> 
  <path d="m 12962.151,-3331.02 -5.481,6.7799" /> 
  <path d="m 12955.389,-3322.6334 v 0" /> 
  <path d="m 12913.12,-3322.02 v 0" /> 
  <path d="m 12956.01,-3321.88 h -0.14" /> 
  <path d="m 12956.67,-3324.2401 -0.8,2.3628" /> 
  <path d="m 12906.78,-3321.7667 v 0" /> 
  <path d="m 12956.841,-3321.2399 v 0" /> 
  <path d="m 12935.06,-3320.8065 v 0" /> 
  <path d="m 12957.59,-3320.7535 v 0" /> 
  <path d="m 12963.631,-3322.5067 1.249,1.7403" /> 
  <path d="m 12955.87,-3321.8773 6.481,1.4641" /> 
  <path d="m 12959.02,-3320.2068 v 0" /> 
  <path d="m 12959.65,-3320.1466 v 0" /> 
  <path d="m 12963.8,-3320.0867 -0.169,-2.42" /> 
  <path d="m 12963.5,-3319.9932 0.09,-0.04" /> 
  <path d="m 12902.15,-3319.9734 v 0" /> 
  <path d="m 12963.59,-3320.0333 0.21,-0.053" /> 
  <path d="m 12957.84,-3319.54 v 0" /> 
  <path d="m 12934.23,-3319.3001 v 0" /> 
  <path d="m 12959.779,-3319.0735 v 0" /> 
  <path d="m 12892.9,-3319.0399 v 0" /> 
  <path d="m 12961.02,-3318.9533 v 0" /> 
  <path d="m 12962.351,-3320.4132 1.149,0.42" /> 
  <path d="m 12897.9,-3318.4666 v 0" /> 
  <path d="m 12961.23,-3318.4265 v 0" /> 
  <path d="m 12904.961,-3318.3399 v 0" /> 
  <path d="m 12933.45,-3318.24 v 0" /> 
  <path d="m 12902.24,-3317.9466 v 0" /> 
  <path d="m 12901.14,-3317.8402 v 0" /> 
  <path d="m 12934.66,-3317.7734 v 0" /> 
  <path d="m 12905.28,-3317.7067 v 0" /> 
  <path d="m 12903.32,-3317.16 v 0" /> 
  <path d="m 12943.95,-3333.6533 -7.1,16.6668 17.34,-16.6668" /> 
  <path d="m 12952.361,-3316.7202 v 0" /> 
  <path d="m 12890.34,-3316.6466 v 0" /> 
  <path d="m 12902.251,-3316.4799 v 0" /> 
  <path d="m 12958.13,-3316.1068 v 0" /> 
  <path d="m 12913.15,-3315.9199 v 0" /> 
  <path d="m 12963.811,-3315.8333 v 0" /> 
  <path d="m 12967.371,-3315.7467 v 0" /> 
  <path d="m 12966.15,-3315.0398 v 0" /> 
  <path d="m 12889.79,-3314.9868 v 0" />
  <path d="m 12967.09,-3314.9734 v 0" /> 
  <path d="m 12965.27,-3314.0202 v 0" /> 
  <path d="m 12967.92,-3313.5399 v 0" /> 
  <path d="m 12966.341,-3313.1866 v 0" /> 
  <path d="m 12953.58,-3313.1599 v 0" /> 
  <path d="m 12913.249,-3313.1535 v 0" /> 
  <path d="m 12975.279,-3313.1535 v 0" /> 
  <path d="m 12978.41,-3306.5865 v 0" /> 
  <path d="m 12956.889,-3306.3267 v 0" /> 
  <path d="m 12964.88,-3320.7664 15.43,14.0731" /> 
  <path d="m 12981.63,-3304.8733 v 0" /> 
  <path d="m 12980.31,-3306.6933 7.28,0.2865" /> 
  <path d="m 12963.26,-3302.6669 v 0" /> 
  <path d="m 12960.87,-3302.2732 v 0" /> 
  <path d="m 12917.83,-3301.9867 v 0" /> 
  <path d="m 12943.691,-3301.6201 v 0" /> 
  <path d="m 12953.74,-3300.7599 v 0" /> 
  <path d="m 12919.08,-3300.6802 v 0" /> 
  <path d="m 12936.211,-3300.2666 v 0" /> 
  <path d="m 12900.861,-3300.1865 v 0" /> 
  <path d="m 12955.33,-3300.1133 v 0" /> 
  <path d="m 12956.16,-3300.0732 v 0" /> 
  <path d="m 12934.52,-3299.7532 v 0" /> 
  <path d="m 12974.5,-3299.6532 v 0" /> 
  <path d="m 12974.139,-3299.44 v 0" /> 
  <path d="m 12987.59,-3306.4068 7.23,7.3601" /> 
  <path d="m 12923.39,-3298.8934 v 0" /> 
  <path d="m 12964.7,-3298.8464 v 0" /> 
  <path d="m 12972.611,-3304.66 -7.511,6.0001" /> 
  <path d="m 12911.33,-3298.6198 v 0" /> 
  <path d="m 12908.701,-3298.4001 2.98,-10.2532 -0.29,-7.74 -3.341,12.6" /> 
  <path d="m 12902.42,-3297.5399 v 0" /> 
  <path d="m 12899.68,-3296.6599 v 0.2865" /> 
  <path d="m 12980.589,-3296.1868 -7.978,-8.4732" /> 
  <path d="m 12980.859,-3296.0266 -0.27,-0.1602" /> 
  <path d="m 12980.901,-3296.0266 h -0.04" /> 
  <path d="m 12981.371,-3295.8401 v 0" /> 
  <path d="m 12908.05,-3303.7933 -8.37,7.1334" /> 
  <path d="m 12899.68,-3296.3734 v 0.9735" /> 
  <path d="m 12899.68,-3295.3999 v 0.08" /> 
  <path d="m 12899.68,-3295.3201 v 0.3135" /> 
  <path d="m 12899.68,-3295.0066 v 0.1198" /> 
  <path d="m 12963.08,-3294.6133 v 0" /> 
  <path d="m 12899.68,-3294.8868 v 0.3334" /> 
  <path d="m 12898.261,-3294.4332 v 0" /> 
  <path d="m 12899.68,-3294.5534 v 0.4532" /> 
  <path d="m 12899.68,-3294.1002 4.02,0.4402" /> 
  <path d="m 12903.7,-3293.66 -0.56,0.3998" /> 
  <path d="m 12903.14,-3293.2602 -0.57,1.3668" /> 
  <path d="m 12918.719,-3291.7267 v 0" /> 
  <path d="m 12961.09,-3291.6199 v 0" /> 
  <path d="m 12904.7,-3291.5802 v 0" />
  <path d="m 12980.659,-3291.3532 v 0" /> 
  <path d="m 12896.159,-3290.48 v 0" /> 
  <path d="m 12991.8,-3290.3133 v 0" /> 
  <path d="m 12909.43,-3290.3069 -0.729,-8.0932" /> 
  <path d="m 12994.08,-3290.0269 v 0" /> 
  <path d="m 12899.68,-3292.7532 v 2.7466" /> 
  <path d="m 12899.68,-3290.0066 v 0.4066" /> 
  <path d="m 12894.62,-3289.5931 v 0" /> 
  <path d="m 12965.1,-3298.6599 1.7,9.1" /> 
  <path d="m 12899.68,-3289.6 v 0.28" /> 
  <path d="m 12983.639,-3288.9332 v 0" /> 
  <path d="m 12903.751,-3288.6799 v 0" /> 
  <path d="m 12890.97,-3288.5532 v 0" /> 
  <path d="m 12959.869,-3288.0066 v 0" /> 
  <path d="m 12899.68,-3289.32 v 0.7866" /> 
  <path d="m 12980.04,-3287.64 v 0" /> 
  <path d="m 12890.62,-3287.5801 v 0" /> 
  <path d="m 12954.939,-3287.4802 v 0" /> 
  <path d="m 12992.999,-3286.8599 v 0" /> 
  <path d="m 12903.47,-3286.8069 v 0" /> 
  <path d="m 12979.61,-3287.08 1.291,-8.9466" /> 
  <path d="m 12955.82,-3286.6268 v 0" /> 
  <path d="m 12980.76,-3286.6001 v 0" /> 
  <path d="m 12982.1,-3286.5002 v 0" /> 
  <path d="m 12904.5,-3286.3533 v 0" /> 
  <path d="m 12904.33,-3286.1599 v 0" /> 
  <path d="m 12903.261,-3286.0199 v 0" /> 
  <path d="m 12899.68,-3288.5334 v 1.7735" /> 
  <path d="m 12900.149,-3285.4401 v 0" /> 
  <path d="m 12994.82,-3299.0467 4.86,14.2067" /> 
  <path d="m 12999.68,-3284.84 0.32,0.097" /> 
  <path d="m 12899.68,-3286.7599 v -5.9933" /> 
  <path d="m 12988.95,-3287.0998 -3.8,1.0532" /> 
  <path d="m 12903.78,-3284.3601 v 0" /> 
  <path d="m 13000,-3283.7337 -0.32,0.034" /> 
  <path d="m 12999.68,-3283.7002 -0.56,0.1934" /> 
  <path d="m 12999.12,-3283.5068 -10.17,-3.593" /> 
  <path d="m 12985.15,-3286.0466 -5.54,-1.0334" /> 
  <path d="m 12966.8,-3289.5599 5.69,7.4798" /> 
  <path d="m 12902.57,-3291.8934 2.71,10.0132" /> 
  <path d="m 12905.28,-3281.8802 4.15,-8.4267" /> 
  <path d="m 12894.98,-3280.92 v 0" /> 
  <path d="m 12867.81,-3280.2334 v 0" /> 
  <path d="m 12894.02,-3279.9667 v 0" /> 
  <path d="m 12893.269,-3279.7932 v 0" /> 
  <path d="m 12975.501,-3278.9799 v 0" /> 
  <path d="m 12886.549,-3276.3535 v 0" /> 
  <path d="m 12896.49,-3276.1734 v 0" /> 
  <path d="m 12999.68,-3276.1932 0.32,0.1094" /> 
  <path d="m 12883.56,-3275.4539 -0.129,-0.013" /> 
  <path d="m 12880.75,-3275.4002 -1.889,-2.7397" /> 
  <path d="m 12998.68,-3275.8934 1,-0.2998" />
  <path d="m 12900.591,-3275.3201 v 0" /> 
  <path d="m 12999.68,-3275.2735 v -0.1465" /> 
  <path d="m 12999.68,-3275.42 v 0.1465" /> 
  <path d="m 12884.129,-3275.2666 v 0" /> 
  <path d="m 12880.81,-3275.1331 -0.06,-0.2671" /> 
  <path d="m 12899.68,-3275.0534 v -3.6865" /> 
  <path d="m 12883.56,-3275.4539 -2.75,0.3208" /> 
  <path d="m 12998.36,-3274.6201 v 0" /> 
  <path d="m 12899.68,-3278.7399 v 3.6865" /> 
  <path d="m 12887.26,-3273.8998 v 0" /> 
  <path d="m 12877.28,-3273.6935 v 0" /> 
  <path d="m 12878.861,-3278.1399 -8.941,4.2668" /> 
  <path d="m 12886.2,-3272.0066 v 0" /> 
  <path d="m 12885.44,-3271.9067 v 0" /> 
  <path d="m 12981.54,-3271.7667 v 0" /> 
  <path d="m 12859.85,-3271.1266 v 0" /> 
  <path d="m 12869.92,-3273.8731 -3.891,3.1597" /> 
  <path d="m 12889.661,-3269.4 v 0" /> 
  <path d="m 12977.89,-3268.9999 v 0" /> 
  <path d="m 12972.49,-3282.0801 9.73,12.8269" /> 
  <path d="m 12982.22,-3269.2532 -0.601,0.6264" /> 
  <path d="m 12863.339,-3266.9868 h -0.749" /> 
  <path d="m 12866.029,-3270.7134 1.361,3.7266" /> 
  <path d="m 12888.08,-3266.9868 -4.52,-8.4671" /> 
  <path d="m 12981.619,-3268.6268 0.04,1.64" /> 
  <path d="m 12989.799,-3266.9868 8.881,-8.9066" /> 
  <path d="m 12981.661,-3266.9868 -0.04,0.3601" /> 
  <path d="m 12975.369,-3264.9002 v 0" /> 
  <path d="m 12986.62,-3264.4333 3.179,-2.5535" /> 
  <path d="m 12862.59,-3266.9868 h 0.749" /> 
  <path d="m 12876.759,-3264.3002 11.321,-2.6866" /> 
  <path d="m 12981.619,-3266.6267 -2.169,3.2867" /> 
  <path d="m 12973.65,-3262.5801 v 0" /> 
  <path d="m 12877.75,-3261.9331 v 0" /> 
  <path d="m 12877.789,-3261.4799 v 0" /> 
  <path d="m 12982.069,-3260.5335 4.551,-3.8998" /> 
  <path d="m 12883.98,-3259.5798 v 0" /> 
  <path d="m 12891.989,-3259.1736 v 0" /> 
  <path d="m 12867.39,-3266.9868 -0.61,6.2469" /> 
  <path d="m 12890.331,-3258.5869 v 0" /> 
  <path d="m 12870.7,-3257.8869 v 0" /> 
  <path d="m 12866.78,-3260.7399 9.979,-3.5603" /> 
  <path d="m 12979.45,-3263.34 2.619,2.8065" /> 
  <path d="m 12890.179,-3256.0669 v 0" /> 
  <path d="m 12977.48,-3254.8935 v 0" /> 
  <path d="m 13000,-3240.778 v 0.4765" /> 
  <path d="m 13000,-3240.0948 -0.32,0.4815" /> 
  <path d="m 12999.68,-3239.6133 v 8.8733" /> 
  <path d="m 12999.68,-3230.74 0.32,0.1019" /> 
  <path d="m 13000,-3228.7434 -0.32,0.2365" /> 
  <path d="m 12999.68,-3228.5069 -1.89,2.2271" />
  <path d="m 12997.79,-3226.2798 1.89,0.9864" /> 
  <path d="m 12999.68,-3225.2934 v 1.3402" /> 
  <path d="m 12999.68,-3223.9532 0.32,0.4684" /> 
  <path d="m 13000,-3222.0276 -0.32,1.5209" /> 
  <path d="m 12996.97,-3220.0932 v 0" /> 
  <path d="m 12999.68,-3220.5067 v 0.9266" /> 
  <path d="m 12999.68,-3219.5801 0.32,0.5547" /> 
  <path d="m 12997.26,-3217.7269 v 0" /> 
  <path d="m 12997.38,-3214.4333 v 0" /> 
  <path d="m 12840.46,-3203.7132 v 0" /> 
  <path d="m 12837.801,-3203.0666 v 0" /> 
  <path d="m 12836.85,-3202.3399 v 0" /> 
  <path d="m 12836.119,-3200.8732 v 0" /> 
  <path d="m 12835.741,-3200.3201 h -1.311" /> 
  <path d="m 12834.43,-3200.3201 h 1.311" /> 
  <path d="m 12834.92,-3198.6532 v 0" /> 
  <path d="m 12993.069,-3186.6333 v 0" /> 
  <path d="m 12995.841,-3186.4468 v 0" /> 
  <path d="m 12997.639,-3186.06 v 0" /> 
  <path d="m 12984.05,-3182.04 v 0" /> 
  <path d="m 12989.11,-3181.18 -1.129,-4.7134" /> 
  <path d="m 12987.981,-3185.8934 1.129,4.7134" /> 
  <path d="m 12982.77,-3177.4668 v 0" /> 
  <path d="m 12977.56,-3172.9401 -2.72,-0.8266" /> 
  <path d="m 12974.84,-3173.7667 -8.341,10.3399 11.061,-9.5133" /> 
  <path d="m 12947.53,-3119.5133 v 0" /> 
  <path d="m 12943.41,-3117.5533 v 0" /> 
  <path d="m 12946.761,-3085.94 v 0" /> 
  <path d="m 12942.74,-3084.0532 v 0" /> 
  <path d="m 12942.77,-3083.7601 v 0" /> 
  <path d="m 12942.3,-3082.8466 v 0" /> 
  <path d="m 12992.99,-3081.18 v 0" /> 
  <path d="m 12991.65,-3000.3201 h -0.66" /> 
  <path d="m 12990.99,-3000.3201 -0.101,0.3201" /> 
  <path d="m 12991.757,-3000 -0.107,-0.3201" /> 
  <path d="m 13214.371,-3496.3867 -14.691,12.1532" /> 
  <path d="m 13184.081,-3483.3801 v 0" /> 
  <path d="m 13199.68,-3484.2335 -1.799,1.8669" /> 
  <path d="m 13197.881,-3482.3666 -8.541,6.12" /> 
  <path d="m 13113.75,-3475.8469 v 0" /> 
  <path d="m 13189.34,-3476.2466 -20.35,8.1466" /> 
  <path d="m 13168.99,-3468.1 -2.01,1.1132" /> 
  <path d="m 13166.98,-3466.9868 -4.72,0.4867" /> 
  <path d="m 13398.52,-3460.4534 v 0" /> 
  <path d="m 13162.26,-3466.5001 -6.55,6.1733" /> 
  <path d="m 13397.25,-3460.3134 5.93,-0.5867" /> 
  <path d="m 13396.79,-3459.9533 0.46,-0.3601" /> 
  <path d="m 13394.884,-3459.2865 1.906,-0.6668" /> 
  <path d="m 13395.52,-3458.6533 -0.636,-0.6332" /> 
  <path d="m 13403.349,-3457.3868 -7.829,-1.2665" /> 
  <path d="m 13147.929,-3457.2533 v 0" />
  <path d="m 13151.39,-3456.4198 v 0" /> 
  <path d="m 13369.08,-3454.0268 1.24,0.013" /> 
  <path d="m 13399.68,-3453.7533 3.669,-3.6335" /> 
  <path d="m 13399.68,-3453.7533 v 0.5333" /> 
  <path d="m 13399.68,-3452.8667 v -0.3533" /> 
  <path d="m 13399.68,-3452.8667 v 0.3398" /> 
  <path d="m 13138.55,-3451.26v 0" /> 
  <path d="m 13399.68,-3451.7532 v -0.7737" /> 
  <path d="m 13396.98,-3450.3933 v 0" /> 
  <path d="m 13397.459,-3449.9268 v 0" /> 
  <path d="m 13134.48,-3449.8798 v 0" /> 
  <path d="m 13402.341,-3450.6866 -1.651,0.8667" /> 
  <path d="m 13127.679,-3449.7002 v 0" /> 
  <path d="m 13360.319,-3449.4999 8.761,-4.5269" /> 
  <path d="m 13140.73,-3448.9735 v 0" /> 
  <path d="m 13398.109,-3448.7732 v 0" /> 
  <path d="m 13155.71,-3460.3268 -9.58,11.707" /> 
  <path d="m 13137.63,-3448.1667 v 0" /> 
  <path d="m 13398.88,-3447.9465 v 0" /> 
  <path d="m 13400.69,-3449.8199 1.651,-0.8667" /> 
  <path d="m 13397.23,-3447.3999 v 0" /> 
  <path d="m 13399.68,-3447.06 v -0.5135" /> 
  <path d="m 13399.68,-3447.5735 v 0.5135" /> 
  <path d="m 13395.81,-3446.8399 v 0" /> 
  <path d="m 13357.271,-3446.5866 3.048,-2.9133" /> 
  <path d="m 13137.691,-3446.1735 v 0" /> 
  <path d="m 13371.13,-3446.0934 v 0" /> 
  <path d="m 13400.101,-3446.0533 v 0" /> 
  <path d="m 13395.86,-3445.4468 v 0" /> 
  <path d="m 13374.68,-3445.3999 v 0" /> 
  <path d="m 13387.95,-3445.66 11.73,-6.0932" /> 
  <path d="m 13385.31,-3444.5732 v 0" /> 
  <path d="m 13399.68,-3444.5866 v -1.5335" /> 
  <path d="m 13399.68,-3446.1201 v 1.5335" /> 
  <path d="m 13344.63,-3448.0202 12.641,1.4336" /> 
  <path d="m 13400.661,-3443.56 v 0" /> 
  <path d="m 13349.84,-3443.1 v 0" /> 
  <path d="m 13370.32,-3454.0134 17.63,8.3534" /> 
  <path d="m 13131.92,-3442.6201 v 0" /> 
  <path d="m 13381.419,-3442.4934 v 0" /> 
  <path d="m 13349.95,-3442.3668 v 0" /> 
  <path d="m 13377.01,-3441.9266 v 0" /> 
  <path d="m 13392.47,-3441.8732 -0.53,0.027" /> 
  <path d="m 13383.2,-3441.74 v 0" /> 
  <path d="m 13391.94,-3441.8465 0.53,-0.027" /> 
  <path d="m 13324.39,-3442.3466 2.85,0.9999" /> 
  <path d="m 13380.659,-3441.28 v 0" /> 
  <path d="m 13377.87,-3441.2735 v 0" /> 
  <path d="m 13109.621,-3441.9865 -9.941,-1.0536" /> 
  <path d="m 13126.81,-3441.0267 v 0" /> 
  <path d="m 13381.07,-3440.4266 v 0" /> 
  <path d="m 13377.93,-3440.1733 v 0" />
  <path d="m 13119.65,-3439.8266 v 0" /> 
  <path d="m 13315.37,-3439.36 9.02,-2.9866" /> 
  <path d="m 13392.45,-3439.2265 v 0" /> 
  <path d="m 13351.28,-3438.9668 v 0" /> 
  <path d="m 13327.24,-3441.3467 1.24,2.5467" /> 
  <path d="m 13383.17,-3438.7333 v 0" /> 
  <path d="m 13099.68,-3443.0401 v 3.0869" /> 
  <path d="m 13382.17,-3438.2999 v 0" /> 
  <path d="m 13114.27,-3438.2732 -4.649,-3.7133" /> 
  <path d="m 13366.589,-3438.2465 v 0" /> 
  <path d="m 13349.68,-3438.1931 v 0" /> 
  <path d="m 13321.82,-3438.0402 -1.48,-2.4265" /> 
  <path d="m 13146.13,-3448.6198 -16.89,10.5934" /> 
  <path d="m 13339.85,-3437.7602 v 0" /> 
  <path d="m 13358.56,-3437.7468 v 0" /> 
  <path d="m 13365.221,-3437.3669 v 0" /> 
  <path d="m 13317.081,-3437.3466 v 0" /> 
  <path d="m 13120.81,-3437.2665 -6.54,-1.0067" /> 
  <path d="m 13385.449,-3437.1265 v 0" /> 
  <path d="m 13324.251,-3437.1132 v 0" /> 
  <path d="m 13129.24,-3438.0264 -8.43,0.7599" /> 
  <path d="m 13099.68,-3439.9532 v 2.7797" /> 
  <path d="m 13376.39,-3436.9068 v 0" /> 
  <path d="m 13335.519,-3436.8065 9.111,-11.2137" /> 
  <path d="m 13354.52,-3436.66 v 0" /> 
  <path d="m 13328.48,-3438.8 7.039,1.9935" /> 
  <path d="m 13251.691,-3436.5131 0.259,0.1331" /> 
  <path d="m 13099.68,-3437.1735 -1.709,0.8133" /> 
  <path d="m 13327.02,-3436.1198 v 0" /> 
  <path d="m 13313.55,-3435.9798 v 0" /> 
  <path d="m 13309.88,-3435.9665 v 0" /> 
  <path d="m 13251.95,-3436.38 0.51,0.5001" /> 
  <path d="m 13237.61,-3436.3533 4.37,0.4333" /> 
  <path d="m 13096.53,-3435.8269 v 0" /> 
  <path d="m 13252.37,-3435.8398 -0.541,0.047" /> 
  <path d="m 13377.389,-3435.68 v 0" /> 
  <path d="m 13320.34,-3440.4667 1.48,2.4265" /> 
  <path d="m 13252.46,-3435.8799 -0.09,0.04" /> 
  <path d="m 13236.784,-3435.4301 v 0" /> 
  <path d="m 13346.57,-3435.4134 v 0" /> 
  <path d="m 13248.88,-3435.3664 -0.6,-0.014" /> 
  <path d="m 13248.88,-3435.3664 2.811,-1.1467" /> 
  <path d="m 13251.829,-3435.7933 -0.869,0.4532" /> 
  <path d="m 13241.98,-3435.92 1.61,0.6268" /> 
  <path d="m 13236.784,-3435.4301 0.826,-0.9232" /> 
  <path d="m 13369.94,-3435.1665 v 0" /> 
  <path d="m 13314.14,-3435.1532 v 0" /> 
  <path d="m 13234.63,-3435.6533 2.154,0.2232" /> 
  <path d="m 13243.59,-3435.2932 5.29,-0.073" /> 
  <path d="m 13357.33,-3434.7866 v 0" /> 
  <path d="m 13411.951,-3435.92 -19.251,-3.0399" />
  <path d="m 13352.22,-3434.3132 v 0" /> 
  <path d="m 13330.299,-3434.28 v 0" /> 
  <path d="m 13084.64,-3434.1 v 0" /> 
  <path d="m 13246.271,-3434.0199 v 0" /> 
  <path d="m 13231.909,-3433.7734 0.08,-0.066" /> 
  <path d="m 13231.984,-3433.8394 2.646,-1.8139" /> 
  <path d="m 13344.591,-3433.58 v 0" /> 
  <path d="m 13350.78,-3433.5068 v 0" /> 
  <path d="m 13364.42,-3433.3801 v 0" /> 
  <path d="m 13326.17,-3433.2333 v 0" /> 
  <path d="m 13362.18,-3433.1001 v 0" /> 
  <path d="m 13248.08,-3433.0933 v 0" /> 
  <path d="m 13301,-3432.9132 14.37,-6.4468" /> 
  <path d="m 13382.05,-3433.7868 0.66,1.1734" /> 
  <path d="m 13392.7,-3438.9599 -10.65,5.1731" /> 
  <path d="m 13382.71,-3432.6134 0.15,0.3201" /> 
  <path d="m 13311.22,-3431.76 v 0" /> 
  <path d="m 13230.81,-3431.6666 1.174,-2.1728" /> 
  <path d="m 13246.4,-3431.0799 v 0" /> 
  <path d="m 13382.86,-3432.2933 -2.28,1.2333" /> 
  <path d="m 13346.12,-3431.0001 v 0" /> 
  <path d="m 13294.791,-3430.9265 v 0" /> 
  <path d="m 13367.661,-3430.5599 v 0" /> 
  <path d="m 13299.339,-3430.2799 v 0" /> 
  <path d="m 13307.75,-3430.1601 v 0" /> 
  <path d="m 13362.131,-3430.1067 v 0" /> 
  <path d="m 13353.36,-3429.8401 v 0" /> 
  <path d="m 13243.269,-3429.7333 v 0" /> 
  <path d="m 13250.96,-3435.3401 -0.279,5.6736" /> 
  <path d="m 13285.39,-3429.6532 15.61,-3.26" /> 
  <path d="m 13299.68,-3428.9799 -0.06,0.01" /> 
  <path d="m 13236.279,-3428.8601 v 0" /> 
  <path d="m 13281.41,-3428.7132 v 0" /> 
  <path d="m 13317.329,-3428.6533 v 0" /> 
  <path d="m 13316.361,-3428.5133 v 0" /> 
  <path d="m 13380.58,-3431.06 -4.201,2.6401" /> 
  <path d="m 13293.77,-3428.3398 v 0" /> 
  <path d="m 13291.631,-3428.0132 v 0" /> 
  <path d="m 13312.3,-3427.8 2.21,-2.8534" /> 
  <path d="m 13278.459,-3427.6867 6.931,-1.9665" /> 
  <path d="m 13288.47,-3427.5665 v 0" /> 
  <path d="m 13319.211,-3427.5066 v 0" /> 
  <path d="m 13236.44,-3427.3998 v 0" /> 
  <path d="m 13290.57,-3427.1 v 0" /> 
  <path d="m 13288.77,-3426.9135 v 0" /> 
  <path d="m 13280.26,-3426.8532 v 0" /> 
  <path d="m 13368.05,-3426.7399 v 0" /> 
  <path d="m 13277.029,-3426.4332 v 0" /> 
  <path d="m 13223.82,-3426.1398 6.99,-5.5268" /> 
  <path d="m 13277.86,-3425.7534 v 0" /> 
  <path d="m 13314.51,-3430.6534 -2.21,2.8534" /> 
  <path d="m 13317.841,-3425.6134 v 0" />
  <path d="m 13278.42,-3425.6065 v 0" /> 
  <path d="m 13362.18,-3425.5932 v 0" /> 
  <path d="m 13287.52,-3425.5135 v 0" /> 
  <path d="m 13286.481,-3425.3201 v 0" /> 
  <path d="m 13286.121,-3425.14 v 0" /> 
  <path d="m 13292.81,-3424.6735 -2.73,-0.1865" /> 
  <path d="m 13097.971,-3436.3602 -6.312,12.1003" /> 
  <path d="m 13294.91,-3424.1932 v 0" /> 
  <path d="m 13313.271,-3424.0932 v 0" /> 
  <path d="m 13376.379,-3428.4199 -5.56,4.3465" /> 
  <path d="m 13010.44,-3423.9399 v 0" /> 
  <path d="m 13272.76,-3423.9399 5.699,-3.7468" /> 
  <path d="m 13320.55,-3423.8602 v 0" /> 
  <path d="m 13235.719,-3423.6134 v 0" /> 
  <path d="m 13370.819,-3424.0734 -0.909,0.6267" /> 
  <path d="m 13315.21,-3423.2864 v 0" /> 
  <path d="m 13227.38,-3423.14 v 0" /> 
  <path d="m 13325.13,-3422.9332 v 0" /> 
  <path d="m 13318.069,-3422.6933 v 0" /> 
  <path d="m 13246.091,-3422.2534 -3.911,-3.3932" /> 
  <path d="m 13369.91,-3423.4467 -8.03,1.5" /> 
  <path d="m 13269.411,-3421.7266 v 0" /> 
  <path d="m 13314.861,-3421.5801 v 0" /> 
  <path d="m 13290.08,-3424.86 -5.06,3.5999" /> 
  <path d="m 13224.49,-3421.0667 -0.67,-5.0731" /> 
  <path d="m 13267.419,-3421.4466 5.341,-2.4933" /> 
  <path d="m 13301.621,-3421.0464 -1.941,-7.9335" /> 
  <path d="m 13247.23,-3420.8134 -1.139,-1.44" /> 
  <path d="m 13299.68,-3420.7333 1.941,-0.3131" /> 
  <path d="m 13285.02,-3421.2601 7.79,-3.4134" /> 
  <path d="m 13293.31,-3419.8933 v 0" /> 
  <path d="m 13223.7,-3419.6133 0.79,-1.4534" /> 
  <path d="m 13362.95,-3419.5999 v 0" /> 
  <path d="m 13231.77,-3419.54v 0" /> 
  <path d="m 13307.651,-3419.3802 v 0" /> 
  <path d="m 13250.681,-3429.6665 16.738,8.2199" /> 
  <path d="m 13247.481,-3419.5534 -0.251,-1.26" /> 
  <path d="m 13363.33,-3419.2265 v 0" /> 
  <path d="m 13251.06,-3419.2001 v 0" /> 
  <path d="m 13285.66,-3419.1132 v 0" /> 
  <path d="m 13299.62,-3428.9734 0.06,8.2401" /> 
  <path d="m 13311.02,-3419.1002 v 0" /> 
  <path d="m 13293.629,-3418.7599 v 0" /> 
  <path d="m 13280.92,-3418.6867 0.161,-0.8198" /> 
  <path d="m 13281.081,-3419.5065 -0.161,0.8198" /> 
  <path d="m 13289.81,-3418.5467 v 0" /> 
  <path d="m 13230.141,-3418.4467 v 0" /> 
  <path d="m 13293.289,-3418.2869v 0" /> 
  <path d="m 13326.88,-3418.2602 v 0" /> 
  <path d="m 13308.36,-3418.1999 v 0" /> 
  <path d="m 13089.72,-3417.6334 v 0" />
  <path d="m 13288.11,-3417.4801 v 0" /> 
  <path d="m 13242.18,-3425.6466 0.63,8.3531" /> 
  <path d="m 13242.81,-3417.2935 1.849,-1.0933" /> 
  <path d="m 13089.74,-3417.0532 v 0" /> 
  <path d="m 13331.65,-3417.02 v 0" /> 
  <path d="m 13266.26,-3416.9865 v 0" /> 
  <path d="m 13361.88,-3421.9467 2.691,5.5267" /> 
  <path d="m 13336.281,-3416.2868 v 0" /> 
  <path d="m 13277.2,-3416.0801 v 0" /> 
  <path d="m 13273.77,-3415.8001 v 0" /> 
  <path d="m 13257.269,-3415.5735 v 0" /> 
  <path d="m 13282.41,-3415.3534 -1.32,-2.66" /> 
  <path d="m 13345.55,-3415.2668 v 0" /> 
  <path d="m 13266.921,-3415.1001 v 0" /> 
  <path d="m 13281.09,-3418.0134 1.32,2.66" /> 
  <path d="m 13265.14,-3415.0665 v 0" /> 
  <path d="m 13275.97,-3414.8201 v 0" /> 
  <path d="m 13300.76,-3414.7533 v 0" /> 
  <path d="m 13242.99,-3414.6599 v 0" /> 
  <path d="m 13239.799,-3414.6534 v 0" /> 
  <path d="m 13252.11,-3415.5201 -1.49,0.9468" /> 
  <path d="m 13307.451,-3414.22 -4.21,-5.1999" /> 
  <path d="m 13244.659,-3418.3868 2.822,-1.1666" /> 
  <path d="m 13353.14,-3412.4599 v 0" /> 
  <path d="m 13297.36,-3412.2066 v 0" /> 
  <path d="m 13231.27,-3412.2066 0.464,0.2185" /> 
  <path d="m 13231.86,-3411.8866 -0.59,-0.32" /> 
  <path d="m 13231.734,-3411.9881 0.126,0.1015" /> 
  <path d="m 13091.659,-3424.2599 -5.209,12.3867" /> 
  <path d="m 13315.849,-3411.8069 v 0" /> 
  <path d="m 13318.069,-3411.5799 v 0" /> 
  <path d="m 13278.619,-3411.4067 v 0" /> 
  <path d="m 13299.11,-3411.2469 v 0" /> 
  <path d="m 13303.241,-3419.4199 4.21,5.1999" /> 
  <path d="m 13318.77,-3410.3535 v 0" /> 
  <path d="m 13363.58,-3410.3333 0.991,-6.0867" /> 
  <path d="m 13296.75,-3411.3132 -3.931,1.6666" /> 
  <path d="m 13079.559,-3409.2464 v 0" /> 
  <path d="m 13363.58,-3410.3333 0.09,1.4931" /> 
  <path d="m 13299.68,-3407.9533 -2.93,-3.3599" /> 
  <path d="m 13250.62,-3414.5733 1.49,-0.9468" /> 
  <path d="m 13292.052,-3407.2208 -0.241,-0.059" /> 
  <path d="m 13292.052,-3407.2208 0.767,-2.4258" /> 
  <path d="m 13255.27,-3406.8066 v 0" /> 
  <path d="m 13270.219,-3406.5933 v 0" /> 
  <path d="m 13311.22,-3406.02 v 0" /> 
  <path d="m 13288.65,-3405.9334 3.402,-1.2874" /> 
  <path d="m 13246.46,-3405.6934 v 0" /> 
  <path d="m 13310.44,-3405.6732 v 0" /> 
  <path d="m 13239.771,-3405.4001 v 0" /> 
  <path d="m 13221.12,-3405.1666 2.58,-14.4467" />
  <path d="m 13253.02,-3404.6532 v 0" /> 
  <path d="m 13171.831,-3405.7667 6.889,0.3002" /> 
  <path d="m 13167.29,-3404.3865 4.541,-1.3802" /> 
  <path d="m 13363.67,-3408.8402 -3.88,4.48" /> 
  <path d="m 13248.509,-3403.5267 v 0" /> 
  <path d="m 13242.34,-3403.2467 v 0" /> 
  <path d="m 13175.189,-3403.1399 -1.838,-0.6534" /> 
  <path d="m 13238.361,-3402.6665 v 0" /> 
  <path d="m 13258.8,-3402.4666 v 0" /> 
  <path d="m 13136.9,-3402.8332 4.7,0.7065" /> 
  <path d="m 13173.351,-3403.7933 1.838,0.6534" /> 
  <path d="m 13141.6,-3402.1267 -0.09,0.053" /> 
  <path d="m 13179.52,-3401.9531 v 0" /> 
  <path d="m 13309.441,-3401.8932 v 0" /> 
  <path d="m 13288.65,-3405.9334 -7.87,4.0535" /> 
  <path d="m 13242.05,-3401.1265 v 0" /> 
  <path d="m 13072.771,-3400.8469 v 0" /> 
  <path d="m 13080.94,-3400.3201 h -0.1" /> 
  <path d="m 13086.45,-3411.8732 4.77,11.5531" /> 
  <path d="m 13100.501,-3400.3201 6.199,-3.5667" /> 
  <path d="m 13102.161,-3400.3201 h -0.02" /> 
  <path d="m 13106.7,-3403.8868 5.37,3.5667" /> 
  <path d="m 13113.29,-3400.3201 1.45,-0.086" /> 
  <path d="m 13114.74,-3400.4066 0.23,0.086" /> 
  <path d="m 13137.27,-3400.3201 -0.37,-2.5131" /> 
  <path d="m 13141.51,-3402.0733 -1.311,1.7532" /> 
  <path d="m 13140.81,-3400.3201 0.38,-0.7133" /> 
  <path d="m 13141.19,-3401.0334 1.82,0.7133" /> 
  <path d="m 13145.419,-3400.3201 2.071,-3.4534" /> 
  <path d="m 13147.49,-3403.7735 4.05,3.4534" /> 
  <path d="m 13151.739,-3400.3201 h 0.791" /> 
  <path d="m 13154.23,-3400.3201 h 0.419" /> 
  <path d="m 13155.13,-3400.3201 12.16,-4.0664" /> 
  <path d="m 13159.21,-3400.3201 h -2.51" /> 
  <path d="m 13171.06,-3400.3201 h -0.911" /> 
  <path d="m 13178.72,-3405.4665 0.42,5.1464" /> 
  <path d="m 13182.75,-3400.3201 0.94,-0.6198" /> 
  <path d="m 13183.69,-3400.9399 2.51,0.6198" /> 
  <path d="m 13233.13,-3400.3201 h -0.189" /> 
  <path d="m 13243.03,-3400.3201 h -0.05" /> 
  <path d="m 13243.46,-3400.3201 h -0.08" /> 
  <path d="m 13264.02,-3400.3201 h -0.749" /> 
  <path d="m 13299.68,-3407.9533 5.74,7.6332" /> 
  <path d="m 13336.89,-3400.3201 h -1.7" /> 
  <path d="m 13355.18,-3400.3201 h -1.1" /> 
  <path d="m 13359.79,-3404.3602 -4.381,4.0401" /> 
  <path d="m 13080.84,-3400.3201 h 0.1" /> 
  <path d="m 13243.381,-3400.3201 h -0.351" /> 
  <path d="m 13151.54,-3400.3201 h 0.199" /> 
  <path d="m 13102.141,-3400.3201 h 0.02" />
  <path d="m 13242.979,-3400.3201 h 0.481" /> 
  <path d="m 13154.649,-3400.3201 h 0.481" /> 
  <path d="m 13071.69,-3400.1202 v 0" /> 
  <path d="m 13355.409,-3400.3201 0.101,0.2266" /> 
  <path d="m 13355.51,-3400.0935 -0.33,-0.2266" /> 
  <path d="m 13099.628,-3399.9187 0.873,-0.4014" /> 
  <path d="m 13152.53,-3400.3201 h 1.7" /> 
  <path d="m 13136.24,-3399.6933 1.03,-0.6268" /> 
  <path d="m 13102.589,-3399.4667 v 0" /> 
  <path d="m 13226.759,-3399.3999 v 0" /> 
  <path d="m 13112.07,-3400.3201 h 1.22" /> 
  <path d="m 13232.941,-3400.3201 h 0.189" /> 
  <path d="m 13335.19,-3400.3201 h 1.7" /> 
  <path d="m 13156.7,-3400.3201 h 2.51" /> 
  <path d="m 13235.001,-3398.6134 v 0" /> 
  <path d="m 13082.1,-3398.56 v 0" /> 
  <path d="m 13140.199,-3400.3201 h 0.611" /> 
  <path d="m 13143.01,-3400.3201 h 2.409" /> 
  <path d="m 13306.621,-3398.2601 -1.201,-2.06" /> 
  <path d="m 13219.81,-3398.04 1.31,-7.1266" /> 
  <path d="m 13170.149,-3400.3201 h 0.911" /> 
  <path d="m 13173.621,-3397.8733 v 0" /> 
  <path d="m 13186.2,-3400.3201 3.149,2.2534" /> 
  <path d="m 13347.16,-3397.3801 -8.34,-1.1932" /> 
  <path d="m 13276.331,-3397.2336 v 0" /> 
  <path d="m 13086,-3397.0066 v 0" /> 
  <path d="m 13354.08,-3400.3201 -6.92,2.94" /> 
  <path d="m 13179.14,-3400.3201 h 3.61" /> 
  <path d="m 13085.58,-3396.5668 v 0" /> 
  <path d="m 13268.71,-3396.5134 v 0" /> 
  <path d="m 13249.33,-3396.4802 v 0" /> 
  <path d="m 13235.08,-3396.22 v 0" /> 
  <path d="m 13254.08,-3396.1266 v 0" /> 
  <path d="m 13099.68,-3396.6667 -0.728,0.7614" /> 
  <path d="m 13213.969,-3395.62 5.841,-2.42" /> 
  <path d="m 13247.36,-3395.38 v 0" /> 
  <path d="m 13248.85,-3395.2934 v 0" /> 
  <path d="m 13338.82,-3398.5733 -15.45,3.4" /> 
  <path d="m 13265.671,-3395.1199 v 0" /> 
  <path d="m 13263.271,-3400.3201 h 0.749" /> 
  <path d="m 13235.229,-3393.94 v 0" /> 
  <path d="m 13215.77,-3393.7801 v 0" /> 
  <path d="m 13229.21,-3393.7534 -7.64,-2.7466" /> 
  <path d="m 13193.069,-3393.5932 v 0" /> 
  <path d="m 13169.53,-3393.5402 v 0" /> 
  <path d="m 13093.001,-3393.1469 v 0" /> 
  <path d="m 13114.97,-3400.3201 4.889,6.0532" /> 
  <path d="m 13182.021,-3393.0668v 0" /> 
  <path d="m 13082.159,-3393.0336 v 0" /> 
  <path d="m 13323.37,-3395.1733 -10.83,2.0333" /> 
  <path d="m 13252.879,-3392.5999 v 0" /> 
  <path d="m 13256.02,-3392.5602 v 0" />
  <path d="m 13312.54,-3393.14 -5.919,-5.1201" /> 
  <path d="m 13280.78,-3401.8799 -5.16,9.5265" /> 
  <path d="m 13119.859,-3394.2669 16.381,-5.4264" /> 
  <path d="m 13189.349,-3398.0667 10.331,6.2534" /> 
  <path d="m 13246.539,-3391.4803 v 0" /> 
  <path d="m 13091.22,-3400.3201 8.408,0.4014" /> 
  <path d="m 13099.68,-3390.6532 v -6.0135" /> 
  <path d="m 13232.26,-3390.6532 -3.05,-3.1002" /> 
  <path d="m 13202.44,-3390.1867 3.331,-2.2201" /> 
  <path d="m 13199.68,-3391.8133 2.76,1.6266" /> 
  <path d="m 13239.22,-3390.0665 v 0" /> 
  <path d="m 13098.952,-3395.9053 -7.532,6.3251" /> 
  <path d="m 13050.101,-3389.5267 v 0" /> 
  <path d="m 13099.68,-3389.2735 v -1.3797" /> 
  <path d="m 13091.42,-3389.5802 -6.41,-0.9197" /> 
  <path d="m 13042.619,-3388.7135 v 0" /> 
  <path d="m 13204.93,-3388.6734 v 0" /> 
  <path d="m 13264.101,-3388.6135 v 0" /> 
  <path d="m 13067.239,-3391.8667 -3.759,3.3268" /> 
  <path d="m 13085.01,-3390.4999 -4.41,2.0199" /> 
  <path d="m 13074.33,-3388.8199 -7.091,-3.0468" /> 
  <path d="m 13063.48,-3388.5399 -9.27,-0.3734" /> 
  <path d="m 13099.68,-3387.8399 v 0.4196" /> 
  <path d="m 13080.6,-3388.48 -2.451,0.6599" /> 
  <path d="m 13078.149,-3387.8201 -3.819,-0.9998" /> 
  <path d="m 13099.68,-3387.4203 v 0.067" /> 
  <path d="m 13099.68,-3387.3535 v -1.92" /> 
  <path d="m 13266.89,-3387.0533 v 0" /> 
  <path d="m 13224.451,-3387.4866 7.139,-1.8002" /> 
  <path d="m 13206.081,-3386.7001 v 0" /> 
  <path d="m 13099.68,-3386.5799 v -0.2468" /> 
  <path d="m 13099.68,-3386.8267 v -1.0132" /> 
  <path d="m 13231.02,-3386.2534 v 0" /> 
  <path d="m 13003.56,-3386.1935 v 0" /> 
  <path d="m 13046.88,-3385.9531 v 0" /> 
  <path d="m 13231.59,-3389.2868 5.57,3.0468 0.02,-4.8733 3.46,0.1198 1.5,-1.5667 1.94,-0.1865 3.03,-1.9135 -0.09,-0.3864 -14.76,4.3934" /> 
  <path d="m 13221.57,-3396.5 2.881,9.0134" /> 
  <path d="m 13202.21,-3385.2268 v 0" /> 
  <path d="m 13054.21,-3388.9133 -6.32,3.8467" /> 
  <path d="m 13236.769,-3384.7 v 0" /> 
  <path d="m 13253.059,-3384.4334 v 0" /> 
  <path d="m 13218.34,-3384.4067 v 0" /> 
  <path d="m 13215.199,-3384.3067 -1.23,-11.3133" /> 
  <path d="m 13097.659,-3384.4398 2.021,-2.1401" /> 
  <path d="m 13211.49,-3385.9001 3.709,1.5934" /> 
  <path d="m 13100.736,-3382.8442 v 0" /> 
  <path d="m 13097.659,-3382.8068 v 0" /> 
  <path d="m 13103.207,-3381.9649 v 0" />
  <path d="m 13211.839,-3381.1401 v 0" /> 
  <path d="m 13098.041,-3381.06 -0.382,-3.3798" /> 
  <path d="m 13099.68,-3381.4602 -1.639,0.4002" /> 
  <path d="m 13099.68,-3380.6999 v -0.227" /> 
  <path d="m 13099.68,-3380.9269 v -0.5333" /> 
  <path d="m 13225.2,-3380.64 v 0" /> 
  <path d="m 13275.62,-3392.3534 -6.98,11.8801" /> 
  <path d="m 13239.42,-3380.1666 v 0" /> 
  <path d="m 13099.68,-3380.08 v -0.6199" /> 
  <path d="m 13099.68,-3379.2202 v -0.4066" /> 
  <path d="m 13099.68,-3379.1134 v -0.1068" /> 
  <path d="m 13100.943,-3378.9906 v 0" /> 
  <path d="m 13193.84,-3378.7666 v 0" /> 
  <path d="m 13204.93,-3378.4668 v 0" /> 
  <path d="m 13099.68,-3379.6268 v -0.4532" /> 
  <path d="m 13239.27,-3377.7733 v 0" /> 
  <path d="m 13099.68,-3377.7065 v -1.4069" /> 
  <path d="m 13268.64,-3380.4733 1.14,2.8465" /> 
  <path d="m 13047.89,-3385.0666 -0.89,7.6797" /> 
  <path d="m 13099.68,-3377.3666 v -0.3399" /> 
  <path d="m 13205.13,-3377.2133v 0" /> 
  <path d="m 13196.35,-3376.86 v 0" /> 
  <path d="m 13225.641,-3376.6468 v 0" /> 
  <path d="m 13036.34,-3375.4932 v 0" /> 
  <path d="m 13047,-3377.3869 -0.349,2.0134" /> 
  <path d="m 13100.32,-3374.9802 -0.64,-2.3864" /> 
  <path d="m 13202.29,-3373.5199 v 0" /> 
  <path d="m 13247.44,-3373.2601 v 0" /> 
  <path d="m 13046.651,-3375.3735 -2.021,2.8737" /> 
  <path d="m 13163.26,-3371.6534 v 0" /> 
  <path d="m 13213.38,-3371.3135 v 0" /> 
  <path d="m 13044.63,-3372.4998 -2.92,1.2531" /> 
  <path d="m 13269.78,-3377.6268 -3.68,6.8668" /> 
  <path d="m 13104.5,-3368.8469 -4.18,-6.1333" /> 
  <path d="m 13023.37,-3368.2602 v 0" /> 
  <path d="m 13040.511,-3365.7833 v 0" /> 
  <path d="m 13167.78,-3364.4733 -13.39,-3.2002" /> 
  <path d="m 13154.39,-3367.6735 -5.89,2.8999" /> 
  <path d="m 13266.1,-3370.76 -13.041,7.0134" /> 
  <path d="m 13108.58,-3363.4132 -4.08,-5.4337" /> 
  <path d="m 13116.54,-3361.6867 -7.96,-1.7265" /> 
  <path d="m 13118.451,-3361.6199 -1.911,-0.067" /> 
  <path d="m 13030.18,-3360.7002 v 0" /> 
  <path d="m 13148.5,-3364.7736 -4.05,4.0734" /> 
  <path d="m 13127.82,-3358.0734 -9.369,-3.5465" /> 
  <path d="m 13019.69,-3363.9801 18.826,4.5788 -9.967,-8.4587 13.161,-3.3867" /> 
  <path d="m 13144.45,-3360.7002 -1.93,3.3668" /> 
  <path d="m 13142.52,-3357.3334 -14.7,-0.74" /> 
  <path d="m 13005.031,-3356.4735 v 0" /> 
  <path d="m 13253.059,-3363.7466 -10.6,8.5998" />
  <path d="m 13019.69,-3363.9801 -3.239,8.4" /> 
  <path d="m 13016.451,-3355.5801 -0.821,1.1734" /> 
  <path d="m 13372.031,-3353.7601 0.869,-0.047" /> 
  <path d="m 13372.9,-3353.8067 1.509,0.1465" /> 
  <path d="m 13368.13,-3353.3867 3.901,-0.3734" /> 
  <path d="m 13360.091,-3351.9199 8.039,-1.4668" /> 
  <path d="m 13242.459,-3355.1468 -6.808,3.5267" /> 
  <path d="m 13173.151,-3351.6068 -5.371,-12.8665" /> 
  <path d="m 13374.409,-3353.6602 2.541,2.1069" /> 
  <path d="m 13376.95,-3351.5533 5.01,0.04" /> 
  <path d="m 13353.571,-3348.3601 6.52,-3.5598" /> 
  <path d="m 13173.801,-3347.62 -0.65,-3.9868" /> 
  <path d="m 13235.651,-3351.6201 -8.56,3.9001" /> 
  <path d="m 13015.63,-3354.4067 -11.76,7.4333" /> 
  <path d="m 13237.129,-3346.9666 1.521,1.0067" /> 
  <path d="m 13347.861,-3345.8267 5.71,-2.5334" /> 
  <path d="m 13234.73,-3345.2599 v 0" /> 
  <path d="m 13171.8,-3344.7933 2.001,-2.8267" /> 
  <path d="m 13227.98,-3344.6934 9.149,-2.2732" /> 
  <path d="m 13003.87,-3346.9734 -1.931,2.3468" /> 
  <path d="m 13001.939,-3344.6266 -1.939,0.01" /> 
  <path d="m 13381.96,-3351.5133 13.59,6.9134" /> 
  <path d="m 13236.54,-3343.7866 v 0" /> 
  <path d="m 13343.17,-3343.6935 4.691,-2.1332" /> 
  <path d="m 13395.55,-3344.5999 3.69,1.8398" /> 
  <path d="m 13399.24,-3342.7601 0.44,0.1202" /> 
  <path d="m 13399.68,-3342.6399 1.39,0.4532" /> 
  <path d="m 13344.24,-3341.9266 -0.859,-0.88" /> 
  <path d="m 13227.091,-3347.72 -10.511,6.1734" /> 
  <path d="m 13343.381,-3342.8066 -0.211,-0.8869" /> 
  <path d="m 13217.239,-3340.3332 10.741,-4.3602" /> 
  <path d="m 13238.65,-3345.9599 -0.849,7.4997" /> 
  <path d="m 13234.11,-3338.0733 v 0" /> 
  <path d="m 13401.07,-3342.1867 2.25,4.3533" /> 
  <path d="m 13161.63,-3337.1933 10.17,-7.6" /> 
  <path d="m 13235.82,-3336.9133 v 0" /> 
  <path d="m 13330.2,-3335.7399 v 0" /> 
  <path d="m 13331.05,-3335.5934 v 0" /> 
  <path d="m 13332.19,-3334.7401 v 0" /> 
  <path d="m 13149.57,-3334.6134 12.06,-2.5799" /> 
  <path d="m 13216.58,-3341.5466 -4.55,-0.4402 -10.84,7.5668 16.049,-5.9132" /> 
  <path d="m 13326.331,-3334.0332 17.909,-7.8934" /> 
  <path d="m 13149.609,-3333.6533 -0.04,-0.9601" /> 
  <path d="m 13237.801,-3338.4602 -0.242,4.8069" /> 
  <path d="m 13325.729,-3333.6533 0.602,-0.3799" /> 
  <path d="m 13237.559,-3333.6533 -0.219,0.7199" /> 
  <path d="m 13237.34,-3332.9334 12.43,1.7601" />
  <path d="m 13194.55,-3327.0535 v 0" /> 
  <path d="m 13151.72,-3326.5202 -2.111,-7.1331" /> 
  <path d="m 13174.21,-3325.7 v 0" /> 
  <path d="m 13174.21,-3325.7 0.47,0.027" /> 
  <path d="m 13249.77,-3331.1733 2.99,5.8265" /> 
  <path d="m 13177.87,-3324.5533 -26.15,-1.9669" /> 
  <path d="m 13325.551,-3323.7667 0.178,-9.8866" /> 
  <path d="m 13189.36,-3323.5134 v 0" /> 
  <path d="m 13236.4,-3322.4133 v 0" /> 
  <path d="m 13251.93,-3321.7602 v 0" /> 
  <path d="m 13247.71,-3321.3799 v 0" /> 
  <path d="m 13024.721,-3320.2866 1.019,0.4933" /> 
  <path d="m 13021.48,-3319.68 1.66,-0.1065" /> 
  <path d="m 13023.14,-3319.7865 1.581,-0.5001" /> 
  <path d="m 13226.86,-3318.8267 v 0" /> 
  <path d="m 13184.84,-3318.8 -6.97,-5.7533" /> 
  <path d="m 13236.279,-3318.7935 v 0" /> 
  <path d="m 13227.091,-3318.5669 v 0" /> 
  <path d="m 13240.12,-3318.4799 v 0" /> 
  <path d="m 13236.909,-3318.1 v 0" /> 
  <path d="m 13239.771,-3318.0401 v 0" /> 
  <path d="m 13183.81,-3317.5602 v 0" /> 
  <path d="m 13025.74,-3319.7933 1.99,2.8801" /> 
  <path d="m 13252.76,-3325.3468 -9.66,8.4" /> 
  <path d="m 13198.041,-3316.3067 v 0" /> 
  <path d="m 13228.909,-3316.28 v 0" /> 
  <path d="m 13239.529,-3316.2735 v 0" /> 
  <path d="m 13197.34,-3315.5334 v 0" /> 
  <path d="m 13232.021,-3315.1066 v 0" /> 
  <path d="m 13019.69,-3315.0532 1.79,-4.6268" /> 
  <path d="m 13231.12,-3314.8132 v 0" /> 
  <path d="m 13027.73,-3316.9132 7.76,2.8732" /> 
  <path d="m 13185.95,-3313.9198 v 0" /> 
  <path d="m 13316.35,-3313.5132 9.201,-10.2535" /> 
  <path d="m 13016.83,-3312.9868 2.86,-2.0664" /> 
  <path d="m 13191.02,-3312.64 -6.18,-6.16" /> 
  <path d="m 13012.23,-3312.3135 4.6,-0.6733" /> 
  <path d="m 13242.54,-3311.1801 v 0" /> 
  <path d="m 13035.49,-3314.04 4.12,3.2402" /> 
  <path d="m 13241.24,-3310.2066 v 0" /> 
  <path d="m 13231.79,-3310.1734 v 0" /> 
  <path d="m 13189.18,-3310.0468 v 0" /> 
  <path d="m 13200.33,-3309.7198 v 0" /> 
  <path d="m 13199.68,-3308.7666 v -0.5466" /> 
  <path d="m 13039.61,-3310.7998 1.39,2.2064" /> 
  <path d="m 13199.68,-3307.7934 v -0.9732" /> 
  <path d="m 13041,-3308.5934 0.65,1.4202" /> 
  <path d="m 13200.18,-3306.9801 -0.5,-0.8133" /> 
  <path d="m 13199.68,-3309.3132 -8.66,-3.3268" /> 
  <path d="m 13199.68,-3305.6133 0.5,-1.3668" /> 
  <path d="m 13243.1,-3316.9468 0.07,11.6509" />
  <path d="m 13016.83,-3305.1666 -4.6,-7.1469" /> 
  <path d="m 13309.489,-3304.4399 6.861,-9.0733" /> 
  <path d="m 13192.191,-3302.6733 7.489,-2.94" /> 
  <path d="m 13243.167,-3305.2959 -5.397,3.0292" /> 
  <path d="m 13237.77,-3302.2667 12.421,1.4732" /> 
  <path d="m 13191.11,-3300.7332 v 0" /> 
  <path d="m 13041.65,-3307.1732 -0.331,6.8867" /> 
  <path d="m 13192.41,-3298.0267 v 0" /> 
  <path d="m 13299.77,-3298.0133 9.719,-6.4266" /> 
  <path d="m 13299.68,-3296.4802 0.09,-1.5331" /> 
  <path d="m 13195.41,-3296.4733 v 0" /> 
  <path d="m 13193.31,-3296.2601 -1.119,-6.4132" /> 
  <path d="m 13020.27,-3295.6932 -3.44,-9.4734" /> 
  <path d="m 13250.191,-3300.7935 -3.182,3.8136" /> 
  <path d="m 13207.28,-3295.3068 v 0" /> 
  <path d="m 13021.73,-3295.0535 v 0" /> 
  <path d="m 13199.68,-3294.9135 v -0.473" /> 
  <path d="m 13199.68,-3294.8334 v -0.08" /> 
  <path d="m 13299.68,-3294.6667 v -1.8135" /> 
  <path d="m 13299.68,-3294.2265 v -0.4402" /> 
  <path d="m 13041.319,-3300.2865 2.4,6.0799" /> 
  <path d="m 13199.68,-3294.0132 v -0.8202" /> 
  <path d="m 13243.601,-3293.9869 v 0" /> 
  <path d="m 13199.68,-3295.3865 -6.37,-0.8736" /> 
  <path d="m 13199.68,-3293.7466 v -0.2666" /> 
  <path d="m 13240.27,-3293.3468v 0" /> 
  <path d="m 13208.46,-3293.2735 -8.78,-0.4731" /> 
  <path d="m 13299.68,-3293.1202 v -1.1063" /> 
  <path d="m 13242.931,-3292.9066 v 0" /> 
  <path d="m 13299.68,-3292.9001 v -0.2201" /> 
  <path d="m 13299.68,-3292.6666 v -0.2335" /> 
  <path d="m 13299.68,-3292.5667 v -0.1" /> 
  <path d="m 13299.68,-3292.3599v -0.2068" /> 
  <path d="m 13270.46,-3291.9868 v 0" /> 
  <path d="m 13266.37,-3291.7065 v 0" /> 
  <path d="m 13300.624,-3291.6107 -0.944,-0.7492" /> 
  <path d="m 13265.68,-3291.4265 v 0" /> 
  <path d="m 13204.73,-3291.42 v 0" /> 
  <path d="m 13253.51,-3293.9533 11.95,1.4667" /> 
  <path d="m 13300.821,-3291.1732 -0.197,-0.4375" /> 
  <path d="m 13253.76,-3291.1469 v 0" /> 
  <path d="m 13256.32,-3291.0465 v 0" /> 
  <path d="m 13269.56,-3291.0069 v 0" /> 
  <path d="m 13015.93,-3290.6868 4.34,-5.0064" /> 
  <path d="m 13199.68,-3291.0133 8.78,-2.2602" /> 
  <path d="m 13043.719,-3294.2066 3.83,3.7201" /> 
  <path d="m 13247.009,-3296.9799 6.501,3.0266" /> 
  <path d="m 13201.48,-3289.0335 -1.8,-0.7465" /> 
  <path d="m 13199.68,-3289.78 v -1.2333" /> 
  <path d="m 13202.21,-3288.7798 v 0" />
  <path d="m 13047.549,-3290.4865 3.621,1.8131" /> 
  <path d="m 13203.45,-3288.0535 -0.459,-0.04" /> 
  <path d="m 13010.55,-3287.9131 5.38,-2.7737" /> 
  <path d="m 13202.991,-3288.0932 0.459,0.04" /> 
  <path d="m 13199.68,-3287.7998 1.8,-1.2337" /> 
  <path d="m 13265.46,-3292.4866 4.95,3.6866" /> 
  <path d="m 13299.68,-3287.1666 1.141,-4.0066" /> 
  <path d="m 13031.86,-3286.66 -5.96,-0.5001" /> 
  <path d="m 13025.9,-3287.1601 -5.43,1.9802" /> 
  <path d="m 13051.17,-3288.6734 1.709,3.6133" /> 
  <path d="m 13012.07,-3284.5531 -1.52,-3.36" /> 
  <path d="m 13000,-3284.7435 0.771,0.1102" /> 
  <path d="m 13015.53,-3284.2735 -0.599,-0.4463" /> 
  <path d="m 13052.879,-3285.0601 4.19,0.2003" /> 
  <path d="m 13014.931,-3284.7198 -2.861,0.1667" /> 
  <path d="m 13015.75,-3284.0801 -0.22,-0.1934" /> 
  <path d="m 13020.47,-3285.1799 -4.72,1.0998" /> 
  <path d="m 13000.771,-3284.6333 -0.771,0.8996" /> 
  <path d="m 13034.959,-3282.9132 -3.099,-3.7468" /> 
  <path d="m 13199.68,-3282.0534 v -1.7666" /> 
  <path d="m 13199.68,-3283.82 v -3.9798" /> 
  <path d="m 13248.16,-3279.6333 v 0" /> 
  <path d="m 13014.3,-3279.6066 2.601,0.2067" /> 
  <path d="m 13012.401,-3278.7933 1.899,-0.8133" /> 
  <path d="m 13299.68,-3278.6465 v -8.5201" /> 
  <path d="m 13005.589,-3278.1067 6.812,-0.6866" /> 
  <path d="m 13016.901,-3279.3999 1.908,2.3865" /> 
  <path d="m 13191.11,-3276.9268 v 0" /> 
  <path d="m 13261.79,-3276.58 v 0" /> 
  <path d="m 13037.18,-3276.0933 v 0" /> 
  <path d="m 13000,-3276.0838 5.589,-2.0229" /> 
  <path d="m 13270.41,-3288.8 -7.609,12.4267 15.779,0.7" /> 
  <path d="m 13000.63,-3275.1999 v 0" /> 
  <path d="m 13188.51,-3274.5667 11.17,-7.4867" /> 
  <path d="m 13260.201,-3274.4598 v 0" /> 
  <path d="m 13037.221,-3273.7267 -2.262,-9.1865" /> 
  <path d="m 13248.3,-3273.42 v 0" /> 
  <path d="m 13278.58,-3275.6733 21.1,3.0865" /> 
  <path d="m 13299.68,-3272.5868 v -6.0597" /> 
  <path d="m 13057.069,-3284.8598 3.731,13.3197" /> 
  <path d="m 13192.461,-3271.4935 v 0" /> 
  <path d="m 13034.47,-3270.8534 2.751,-2.8733" /> 
  <path d="m 13254.26,-3270.2267 v 0" /> 
  <path d="m 13018.809,-3277.0134 -1.739,7.7335" /> 
  <path d="m 13184.441,-3268.0935 v 0" /> 
  <path d="m 13034.36,-3267.1932 0.11,-3.6602" /> 
  <path d="m 13017.07,-3269.2799 -4.111,2.2931" /> 
  <path d="m 13033.27,-3266.9868 1.09,-0.2064" />
  <path d="m 13060.8,-3271.5401 -6.669,4.5533" /> 
  <path d="m 13179.1,-3266.9868 9.41,-7.5799" /> 
  <path d="m 13182.091,-3266.9868 h -1.322" /> 
  <path d="m 13179.01,-3266.2933 0.09,-0.6935" /> 
  <path d="m 13180.769,-3266.9868 h 1.322" /> 
  <path d="m 13012.959,-3266.9868 -0.149,1.4534" /> 
  <path d="m 13054.131,-3266.9868 -4.271,1.6136" /> 
  <path d="m 13182.17,-3265.3603 v 0" /> 
  <path d="m 13025.89,-3265.2534 0.54,0.027" /> 
  <path d="m 13030.1,-3265.1535 3.17,-1.8333" /> 
  <path d="m 13026.43,-3265.2267 3.67,0.073" /> 
  <path d="m 13058.659,-3262.2803 7.251,-0.9533" /> 
  <path d="m 13012.81,-3265.5334 4.091,4.0065" /> 
  <path d="m 13065.91,-3263.2336 -0.59,1.9402" /> 
  <path d="m 13065.32,-3261.2934 -2.37,-0.9602" /> 
  <path d="m 13049.86,-3265.3732 8.799,3.0929" /> 
  <path d="m 13020.72,-3260.4336 5.17,-4.8198" /> 
  <path d="m 13062.95,-3262.2536 0.25,2.0535" /> 
  <path d="m 13034.05,-3259.9201 v 0" /> 
  <path d="m 13044.89,-3259.4002 v 0" /> 
  <path d="m 13047.06,-3259.2934 v 0" /> 
  <path d="m 13016.901,-3261.5269 3.819,1.0933" /> 
  <path d="m 13038.22,-3257.9666 v 0" /> 
  <path d="m 13048.7,-3257.6267 v 0" /> 
  <path d="m 13063.2,-3260.2001 -4.31,3.0933" /> 
  <path d="m 13045.43,-3256.6868 v 0" /> 
  <path d="m 13010.431,-3254.9801 v 0" /> 
  <path d="m 13042.23,-3254.6066 v 0" /> 
  <path d="m 13038.91,-3254.2934 v 0" /> 
  <path d="m 13019.321,-3253.9867 v 0" /> 
  <path d="m 13046.381,-3253.9799 v 0" /> 
  <path d="m 13041.75,-3253.8334 v 0" /> 
  <path d="m 13040.14,-3253.5732 v 0" /> 
  <path d="m 13043.761,-3253.1666 v 0" /> 
  <path d="m 13043.34,-3252.8465 v 0" /> 
  <path d="m 13037.32,-3252.7332 v 0" /> 
  <path d="m 13042.61,-3252.0802 v 0" /> 
  <path d="m 13019.591,-3250.6332 -7.891,-3.7136" /> 
  <path d="m 13172.72,-3249.6468 6.29,-16.6465" /> 
  <path d="m 13044,-3249.0467 -5.02,-1.0933" /> 
  <path d="m 13048.95,-3248.3665 v 0" /> 
  <path d="m 13170.27,-3247.2935 v 0" /> 
  <path d="m 13038.98,-3250.14 -14.259,3.2997" /> 
  <path d="m 13166.55,-3246.4333 v 0" /> 
  <path d="m 13172.94,-3246.3135 v 0" /> 
  <path d="m 13164.96,-3245.7333 7.76,-3.9135" /> 
  <path d="m 13024.721,-3246.8403 -5.13,-3.7929" /> 
  <path d="m 13011.7,-3254.3468 -9.98,10.44" /> 
  <path d="m 13041,-3241.4333 3,-7.6134" /> 
  <path d="m 13058.89,-3257.1068 -5.19,16.0935" />
  <path d="m 13001.72,-3243.9068 -1.72,3.1288" /> 
  <path d="m 13022.909,-3240.3599 v 0" /> 
  <path d="m 13035.33,-3240.48 -0.31,0.2533" /> 
  <path d="m 13000,-3240.3015 v 0.2067" /> 
  <path d="m 13023.18,-3239.92 v 0" /> 
  <path d="m 13035.02,-3240.2267 -0.39,0.42" /> 
  <path d="m 13029.311,-3240.0066 6.019,-0.4734" /> 
  <path d="m 13025.169,-3238.7535 4.142,-1.2531" /> 
  <path d="m 13040.63,-3238.7135 v 0" /> 
  <path d="m 13032.66,-3238.5799 v 0" /> 
  <path d="m 13019.791,-3238.94 5.378,0.1865" /> 
  <path d="m 13033.63,-3238.3865 v 0" /> 
  <path d="m 13034.63,-3239.8067 6.37,-1.6266" /> 
  <path d="m 13031.889,-3237.0335 v 0" /> 
  <path d="m 13041.901,-3236.7268 v 0" /> 
  <path d="m 13030.47,-3236.6802 v 0" /> 
  <path d="m 13022.99,-3236.5532 v 0" /> 
  <path d="m 13034.74,-3236.0668 v 0" /> 
  <path d="m 13035.8,-3235.1067 v 0" /> 
  <path d="m 13030.91,-3233.9134 v 0" /> 
  <path d="m 13021.091,-3233.6533 v 0" /> 
  <path d="m 13028.74,-3233.6533 v 0" /> 
  <path d="m 13053.7,-3241.0133 -7.29,8.3866" /> 
  <path d="m 13029.93,-3232.2533 v 0" /> 
  <path d="m 13015.311,-3232.1667 4.48,-6.7733" /> 
  <path d="m 13159.19,-3230.6534 5.77,-15.0799" /> 
  <path d="m 13000,-3230.6381 1.01,-0.5154" /> 
  <path d="m 13030.17,-3230.3867 v 0" /> 
  <path d="m 13002.49,-3228.82 -0.47,-1.2936" /> 
  <path d="m 13002.02,-3230.1136 -2.02,1.3702" /> 
  <path d="m 13004.82,-3228.9268 -1.93,0.2403" /> 
  <path d="m 13005.83,-3227.8934 -1.01,-1.0334" /> 
  <path d="m 13001.01,-3231.1535 4.82,3.2601" /> 
  <path d="m 13046.41,-3232.6267 -0.11,4.9736" /> 
  <path d="m 13002.89,-3228.6865 -0.4,-0.1335" /> 
  <path d="m 13011.94,-3227.4265 3.371,-4.7402" /> 
  <path d="m 13013.57,-3226.2135 v 0" /> 
  <path d="m 13018.06,-3226.1799 v 0" /> 
  <path d="m 13021.42,-3225.0267 v 0" /> 
  <path d="m 13022.701,-3224.6399 v 0" /> 
  <path d="m 13018.14,-3224.0135 v 0" /> 
  <path d="m 13157.25,-3223.7667 1.94,-6.8867" /> 
  <path d="m 13046.3,-3227.6531 -3.04,4.7195" /> 
  <path d="m 13016.901,-3222.5735 v 0" /> 
  <path d="m 13017.86,-3222.5266 v 0" /> 
  <path d="m 13021.561,-3222.3934 v 0" /> 
  <path d="m 13000,-3223.4848 v 1.4572" /> 
  <path d="m 13020.38,-3220.4266v 0" /> 
  <path d="m 13036.24,-3219.4401 v 0" /> 
  <path d="m 13007.08,-3219.4 v 0" /> 
  <path d="m 13000,-3219.0254 11.94,-8.4011" />
  <path d="m 13001.289,-3218.2869 v 0" /> 
  <path d="m 13004.77,-3217.4065 v 0" /> 
  <path d="m 13043.26,-3222.9336 -7.26,6.1535" /> 
  <path d="m 13005.211,-3216.1999 v 0" /> 
  <path d="m 13154.291,-3215.7135 2.959,-8.0532" /> 
  <path d="m 13004.61,-3215.6666 v 0" /> 
  <path d="m 13004.469,-3215.3332 v 0" /> 
  <path d="m 13026.26,-3211.8801 -3.019,-0.8999" /> 
  <path d="m 13028.45,-3210.8665 -2.19,-1.0136" /> 
  <path d="m 13036,-3216.7801 -5.839,6.0135" /> 
  <path d="m 13030.161,-3210.7666 -1.711,-0.1" /> 
  <path d="m 13014.69,-3220.5002 0.29,10.6602" /> 
  <path d="m 13014.98,-3209.84 -0.29,-10.6602" /> 
  <path d="m 13151.939,-3208.6933 2.352,-7.0202" /> 
  <path d="m 13015.66,-3208.58 v 0" /> 
  <path d="m 13150.07,-3203.3932 1.869,-5.3001" /> 
  <path d="m 13016.08,-3203.22 v 0" /> 
  <path d="m 13016.451,-3202.1133 v 0" /> 
  <path d="m 13023.241,-3212.78 -5.532,12.4599" /> 
  <path d="m 13149.03,-3200.3201 1.04,-3.0731" /> 
  <path d="m 13148.3,-3198.0133 0.73,-2.3068" /> 
  <path d="m 13017.709,-3200.3201 4.21,7.4868" /> 
  <path d="m 13021.919,-3192.8333 -3.959,14.9532" /> 
  <path d="m 13147.25,-3173.7 v 0" /> 
  <path d="m 13146.741,-3172.0865 1.559,-25.9268" /> 
  <path d="m 13064.349,-3171.8534 2.771,-0.9133" /> 
  <path d="m 13067.12,-3172.7667 7.25,1.8868" /> 
  <path d="m 13071.32,-3169.8933 v 0" /> 
  <path d="m 13017.96,-3177.8801 10.369,8.4667" /> 
  <path d="m 13074.37,-3170.8799 5.4,2.1267" /> 
  <path d="m 13061.05,-3167.26 3.299,-4.5934" /> 
  <path d="m 13028.329,-3169.4134 3.141,3.5866" /> 
  <path d="m 13079.77,-3168.7532 0.24,5.5799" /> 
  <path d="m 13031.47,-3165.8268 1.6,4.1601" /> 
  <path d="m 13072.09,-3161.4267 v 0" /> 
  <path d="m 13068.15,-3162.4666 -7.04,5.6732" /> 
  <path d="m 13080.01,-3163.1733 -9.44,7.4865" /> 
  <path d="m 13070.57,-3155.6868 -2.42,-6.7798" /> 
  <path d="m 13033.07,-3161.6667 0.1,6.1466" /> 
  <path d="m 13138.13,-3154.5868 8.611,-17.4997" /> 
  <path d="m 13061.11,-3156.7934 8.63,1.2669" /> 
  <path d="m 13141.721,-3151.1801 v 0" /> 
  <path d="m 13051.759,-3150.3201 9.291,-16.9399" /> 
  <path d="m 13138.811,-3150.0933 v 0" /> 
  <path d="m 13138.24,-3149.3732 -0.11,-5.2136" /> 
  <path d="m 13033.17,-3155.5201 -1.96,6.4734" /> 
  <path d="m 13138.98,-3147.3267 v 0" /> 
  <path d="m 13107.39,-3145.54 8.56,-0.6199" /> 
  <path d="m 13137.72,-3144.8801 v 0" />
  <path d="m 13031.21,-3149.0467 -2.099,4.3066" /> 
  <path d="m 13106.05,-3144.5133 1.34,-1.0267" /> 
  <path d="m 13052.02,-3143.3933 -0.261,-6.9268" /> 
  <path d="m 13111.771,-3142.5266 v 0" /> 
  <path d="m 13069.74,-3155.5265 6.191,14.1532" /> 
  <path d="m 13029.111,-3144.7401 -5.622,3.7201" /> 
  <path d="m 13023.489,-3141.02 -2.369,0.5865" /> 
  <path d="m 13101.99,-3139.46 4.06,-5.0533" /> 
  <path d="m 13021.12,-3140.4335 -2.28,3.6736" /> 
  <path d="m 13103.45,-3136.7599 -0.999,0.4732" /> 
  <path d="m 13103.45,-3136.7599 -0.999,0.4732" /> 
  <path d="m 13115.95,-3146.1599 17.709,10.0866 4.581,-13.2999" /> 
  <path d="m 13101.469,-3135.8467 0.521,-3.6133" /> 
  <path d="m 13016.161,-3135.0334 v 0" /> 
  <path d="m 13018.84,-3136.7599 2.051,2.0732" /> 
  <path d="m 13020.891,-3134.6867 v 0.3134" /> 
  <path d="m 13020.891,-3134.3733 -0.351,0.72" /> 
  <path d="m 13055.91,-3133.6533 -3.89,-9.74" /> 
  <path d="m 13075.931,-3141.3733 4.249,7.72" /> 
  <path d="m 13108.119,-3133.6533 -6.65,-2.1934" /> 
  <path d="m 13109.11,-3133.4534 -0.991,-0.1999" /> 
  <path d="m 13058.321,-3130.4066 -2.411,-3.2467" /> 
  <path d="m 13080.18,-3133.6533 -0.959,4.1068" /> 
  <path d="m 13067.529,-3127.22 v 0" /> 
  <path d="m 13036.771,-3125.1667 4.219,-0.1133" /> 
  <path d="m 13020.54,-3133.6533 5.58,8.0599" /> 
  <path d="m 13026.12,-3125.5934 10.651,0.4267" /> 
  <path d="m 13079.221,-3129.5465 -2.53,7.0531" /> 
  <path d="m 13063.89,-3121.6 -5.569,-8.8066" /> 
  <path d="m 13040.99,-3125.28 9.761,3.9734" /> 
  <path d="m 13099.68,-3118.7067 9.43,-14.7467" /> 
  <path d="m 13050.751,-3121.3066 5.519,3.7466" /> 
  <path d="m 13056.27,-3117.56 7.62,-4.04" /> 
  <path d="m 13076.691,-3122.4934 -3.591,10.7468" /> 
  <path d="m 13090.021,-3111.2867 9.659,-7.42" /> 
  <path d="m 13067.21,-3099.5733 v 0" /> 
  <path d="m 13073.1,-3111.7466 -7.809,4.8067 0.769,7.5199 23.961,-11.8667" /> 
  <path d="m 13033.861,-3080.2401 v 0" /> 
  <path d="m 13044.2,-3080.0333 v 0" /> 
  <path d="m 13027.73,-3077.2266 v 0" /> 
  <path d="m 13085.08,-3072.5332 v 0" /> 
  <path d="m 13099.68,-3074.3532 -5.71,7.3665" /> 
  <path d="m 13105.51,-3066.9867 0.01,-16.92 -5.841,9.5535" /> 
  <path d="m 13093.97,-3066.9867 0.86,3.4666" /> 
  <path d="m 13103.2,-3058.7 2.31,-8.2867" /> 
  <path d="m 13099.68,-3054.4134 3.52,-4.2866" /> 
  <path d="m 13094.83,-3063.5201 -6.79,15.3933" />
  <path d="m 13096.24,-3045.22 3.44,-9.1934" /> 
  <path d="m 13020.95,-3042.1467 v 0" /> 
  <path d="m 13096.88,-3041.9867 v 0" /> 
  <path d="m 13088.04,-3048.1268 -0.909,13.6868 9.109,-10.78" /> 
  <path d="m 13066.971,-3037.2467 -17.291,-9.66 -9,16.58" /> 
  <path d="m 13040.68,-3030.3267 14.78,7.2533 11.511,-14.1733" /> 
  <path d="m 12990.889,-3000 h 0.868" /> 
  <path d="m 12954.25,-2989.2601 v 0" /> 
  <path d="m 12961.909,-2987.66 v 0" /> 
  <path d="m 12987.18,-2981.6067 v 0" /> 
  <path d="m 12953.529,-2967.5865 v 0" /> 
  <path d="m 12970.59,-2960.22 v 0" /> 
  <path d="m 12960.361,-2944.4532 v 0" /> 
  <path d="m 12934.261,-2922.44 v 0" /> 
  <path d="m 12932.6,-2921.7934 v 0" /> 
  <path d="m 12921.97,-2912.6734 v 0" /> 
  <path d="m 12900.04,-2882.72 v 0" /> 
  <path d="m 12899.68,-2879.1933 v -1.3933" /> 
  <path d="m 12899.68,-2880.5866 v 1.3933" /> 
  <path d="m 12963.271,-2840.5733 3.138,0.7999 5.381,-4.22 -3,-8.9866 -4.261,9.6401" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 1_3.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12737.53337, -2855.545188, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 12964.529,-2843.3399 -10.519,-2.5667" /> 
  <path d="m 12963.271,-2840.5733 3.138,0.7999 5.381,-4.22 -3,-8.9866 -4.261,9.6401" /> 
  <path d="m 12954.01,-2845.9066 -14.63,7.46" /> 
  <path d="m 13000,-2836.5114 -0.32,-0.082" /> 
  <path d="m 12956.97,-2834.4934 6.301,-6.0799" /> 
  <path d="m 12939.38,-2838.4466 -13.64,6.1132" /> 
  <path d="m 12999.68,-2831.6534 0.32,-0.6466" /> 
  <path d="m 12956.97,-2834.4934 -8.33,5.54" /> 
  <path d="m 12920.731,-2828.2135 v 0" /> 
  <path d="m 12999.68,-2836.5932 v 4.9398" /> 
  <path d="m 12925.74,-2832.3334 -12.34,6.9201" /> 
  <path d="m 12942.86,-2819.2867 5.78,-9.6667" /> 
  <path d="m 12916.93,-2819.1067 v 0" /> 
  <path d="m 12914.909,-2812.7001 v 0" /> 
  <path d="m 12926.242,-2812.8101 -6.842,-1.6966" /> 
  <path d="m 12942.86,-2819.2867 -29.46,-6.1266" /> 
  <path d="m 12917.31,-2810.9068 v 0" /> 
  <path d="m 12919.4,-2814.5067 6.842,1.6966" /> 
  <path d="m 12927.699,-2801.9135 v 0" /> 
  <path d="m 12914.81,-2801.3332 v 0" /> 
  <path d="m 12925.69,-2800.5068 v 0" /> 
  <path d="m 12925.371,-2800.0732 v 0" /> 
  <path d="m 12823.331,-2785.9867 v 0" /> 
  <path d="m 12899.68,-2780.16 -8.989,-9.0333" /> 
  <path d="m 12890.691,-2789.1933 -0.492,13.94" /> 
  <path d="m 12899.699,-2769.5133 -0.02,-10.6467" /> 
  <path d="m 12899.68,-2768.4866 0.02,-1.0267" /> 
  <path d="m 12890.199,-2775.2533 9.481,6.7667" /> 
  <path d="m 12862.27,-2736.1465 8.96,-7.2936 -13.601,3.3867" /> 
  <path d="m 12857.629,-2740.0534 -3.399,6.4001" /> 
  <path d="m 12859.151,-2733.6533 3.119,-2.4932" /> 
  <path d="m 12854.23,-2733.6533 h 4.921" /> 
  <path d="m 12799.68,-2706.7467 v -2.0733" /> 
  <path d="m 12799.68,-2706.1335 v -0.6132" /> 
  <path d="m 12799.68,-2705.8468 v -0.2867" />
  <path d="m 12844.26,-2701.86 v 0" /> 
  <path d="m 12799.68,-2708.82 v 2.9732" /> 
  <path d="m 12792,-2698.8934 v 0" /> 
  <path d="m 12794.92,-2697.2668 v 0" /> 
  <path d="m 12793.84,-2691.0601 v 0" /> 
  <path d="m 12792.95,-2689.1001 v 0" /> 
  <path d="m 12833.389,-2674.4734 v 0" /> 
  <path d="m 12780.61,-2670.54 v 0" /> 
  <path d="m 12801.97,-2669.4334 v 0" /> 
  <path d="m 12799.68,-2669.0067 -7.98,-1.1267" /> 
  <path d="m 12799.68,-2667.7334 v -1.2733" /> 
  <path d="m 12791.7,-2670.1334 -2.88,3.1467" /> 
  <path d="m 12799.15,-2666.9867 0.53,-0.7467" /> 
  <path d="m 12799.68,-2667.0067 -0.33,0.02" /> 
  <path d="m 12802.069,-2666.9867 -2.389,-0.02" /> 
  <path d="m 12815.34,-2671.66 -4.959,4.6733" /> 
  <path d="m 12810.62,-2666.9867 h 0.7" /> 
  <path d="m 12826.93,-2666.9867 -0.52,-20.2199 -11.07,15.5466" /> 
  <path d="m 12810.381,-2666.9867 h 0.239" /> 
  <path d="m 12826.331,-2666.7133 0.599,-0.2734" /> 
  <path d="m 12810.5,-2666.6065 h -0.01" /> 
  <path d="m 12810.49,-2666.6065 v 0" /> 
  <path d="m 12799.35,-2666.9867 0.33,1.4201" /> 
  <path d="m 12798.73,-2664.5933 0.42,-2.3934" /> 
  <path d="m 12811.32,-2666.9867 -3.39,2.4802" /> 
  <path d="m 12799.68,-2665.5666 2.389,-1.4201" /> 
  <path d="m 12781.73,-2664.3734 v 0" /> 
  <path d="m 12799.68,-2664.2733 -0.95,-0.32" /> 
  <path d="m 12803.03,-2663.4933 v 0" /> 
  <path d="m 12786.12,-2662.8933 v 0" /> 
  <path d="m 12807.93,-2664.5065 -8.25,0.2332" /> 
  <path d="m 12788.82,-2666.9867 1.07,6.4934" /> 
  <path d="m 12812.74,-2659.2001 13.591,-7.5132" /> 
  <path d="m 12789.89,-2660.4933 2.9,7.42" /> 
  <path d="m 12799.62,-2650.9001 0.06,0.02" /> 
  <path d="m 12799.68,-2650.8801 13.06,-8.32" /> 
  <path d="m 12799.68,-2649.4932 -0.06,-1.4069" /> 
  <path d="m 12799.68,-2648.06 v -1.4332" /> 
  <path d="m 12794.55,-2646.4001 5.13,-1.6599" /> 
  <path d="m 12784.17,-2643.66 10.38,-2.7401" /> 
  <path d="m 12784.25,-2643.1 -0.08,-0.56" /> 
  <path d="m 12792.79,-2653.0733 -18.73,10.9066" /> 
  <path d="m 12783.98,-2640.5134 0.27,-2.5866" /> 
  <path d="M 12799.68,-2638.2668 V -2639.9" /> 
  <path d="m 12799.68,-2639.9 v 1.6332" /> 
  <path d="m 12774.06,-2642.1667 -0.2,5.9667" /> 
  <path d="m 12788.15,-2634.66 -4.17,-5.8534" /> 
  <path d="m 12773.86,-2636.2 0.59,2.0068" /> 
  <path d="m 12793.21,-2633.1133 v 0" /> 
  <path d="m 12783.725,-2632.9517 0.584,-0.478" />
  <path d="m 12784.309,-2633.4297 1.241,0.8035" /> 
  <path d="m 12785.55,-2632.6262 -1.825,-0.3255" /> 
  <path d="m 12792.91,-2631.2468 v 0" /> 
  <path d="m 12791.79,-2631.0734 -3.64,-3.5866" /> 
  <path d="m 12795.87,-2630.8399 v 0" /> 
  <path d="m 12782.77,-2630.3267 1.475,-3.1459" /> 
  <path d="m 12799.02,-2629.7667 v 0" /> 
  <path d="m 12774.45,-2634.1932 1.12,4.7533" /> 
  <path d="m 12791.79,-2631.0734 -7.545,-2.3992" /> 
  <path d="m 12781.31,-2628.94 1.46,-1.3867" /> 
  <path d="m 12775.57,-2629.4399 -3.16,2.4265" /> 
  <path d="m 12754.159,-2626.3201 v 0" /> 
  <path d="m 12757.87,-2626.0134v 0" /> 
  <path d="m 12757.66,-2625.82 v 0" /> 
  <path d="m 12740.6,-2624.7267 v 0" /> 
  <path d="m 12767.37,-2624.5466 -0.61,-0.01" /> 
  <path d="m 12772.41,-2627.0134 -4.03,2.7933" /> 
  <path d="m 12768.38,-2624.2201 -1.01,-0.3265" /> 
  <path d="m 12794.17,-2624.1066 v 0" /> 
  <path d="m 12745.43,-2623.6935 v 0" /> 
  <path d="m 12778.62,-2623.1133 2.69,-5.8267" /> 
  <path d="m 12745.07,-2622.6267 v 0" /> 
  <path d="m 12776.598,-2620.8557 2.022,-2.2576" /> 
  <path d="m 12743.91,-2619.9667 v 0" /> 
  <path d="m 12776.598,-2620.8557 0.995,1.9947" /> 
  <path d="m 12766.76,-2624.5533 -1.64,7.0732" /> 
  <path d="m 12779.75,-2618.6199 -2.157,-0.2411" /> 
  <path d="m 12765.12,-2617.4801 1.62,2.24" /> 
  <path d="m 12788.35,-2615.1268 v 0" /> 
  <path d="m 12779.75,-2618.6199 0.55,3.8866" /> 
  <path d="m 12777.29,-2612.7068 v 0" /> 
  <path d="m 12776.08,-2612.5267 4.22,-2.2066" /> 
  <path d="m 12773.04,-2609.7532 3.04,-2.7735" /> 
  <path d="m 12766.74,-2615.2401 6.3,5.4869" /> 
  <path d="m 13000,-2832.3 v -4.2114" /> 
  <path d="m 13129.919,-2593.1067 v 0" /> 
  <path d="m 13122.43,-2581.5001 v 0" /> 
  <path d="m 14210.95,-2771.5334 v 0" /> 
  <path d="m 14210.271,-2771.52 v 0" /> 
  <path d="m 14212.64,-2767.7334 v 0" /> 
  <path d="m 14214.61,-2766.9867 v 0" /> 
  <path d="m 14215.9,-2765.4467 v 0" /> 
  <path d="m 14218.57,-2761.8999 v 0" /> 
  <path d="m 14221.28,-2748.8867 v 0" /> 
  <path d="m 14220.67,-2748.6 v 0" /> 
  <path d="m 14087.669,-2724.3534 v 0" /> 
  <path d="m 14219.51,-2719.1933 v 0" /> 
  <path d="m 14218.88,-2714.4001 v 0" /> 
  <path d="m 14218.201,-2712.6333 v 0" /> 
  <path d="m 14216.38,-2711.2135 v 0" /> 
  <path d="m 14222,-2710.8133 v 0" /> 
  <path d="m 14224.68,-2708.9468 v 0" />
  <path d="m 14218.39,-2708.5333 v 0" /> 
  <path d="m 14217.825,-2704.4218 v 0" /> 
  <path d="m 14217.566,-2704.1681 v 0" /> 
  <path d="m 14222.07,-2703.5267 v 0" /> 
  <path d="m 14217.641,-2703.0666 v 0" /> 
  <path d="m 14212.18,-2671.4733 v 0" /> 
  <path d="m 14216.231,-2666.9867 h -1.811" /> 
  <path d="m 14214.42,-2666.9867 h 1.811" /> 
  <path d="m 14212.871,-2659.4267 v 0" /> 
  <path d="m 14214.79,-2658.1066 v 0" /> 
  <path d="m 14222.8,-2656.2735 v 0" /> 
  <path d="m 14220.19,-2655.2 v 0" /> 
  <path d="m 14215.63,-2654.2334 v 0" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 12299.68,-2446.7533 v 2.9199" /> 
  <path d="m 12299.68,-2443.8334 v -2.9199" /> 
  <path d="m 13118.59,-2446.0667 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 2_0.svg

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13396.82117, -4750.342539, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 14054.88,-4333.6533 h -10.221" /> 
  <path d="m 14060.29,-4330.7331 v 0" /> 
  <path d="m 14063.04,-4329.5601 -8.16,-4.0932" /> 
  <path d="m 14044.659,-4333.6533 -10.969,5.3868" /> 
  <path d="m 14033.69,-4328.2665 10.87,16.3196" /> 
  <path d="m 14044.56,-4311.9469 8.341,9.0668" /> 
  <path d="m 14052.901,-4302.8801 -0.661,3.7132" /> 
  <path d="m 14052.24,-4299.1669 -14.12,8.5137" /> 
  <path d="m 14038.12,-4290.6532 -2.23,2.8133" /> 
  <path d="m 14035.89,-4287.8399 -18.53,7.1133" /> 
  <path d="m 14017.36,-4280.7266 -17.68,11.6733" /> 
  <path d="m 13999.68,-4269.0533 -11.8,2.0665" /> 
  <path d="m 13987.88,-4266.9868 -5.54,5.6068" /> 
  <path d="m 14053.74,-4258.82 18.851,1.5667" /> 
  <path d="m 13982.34,-4261.38 1.93,18.7935" /> 
  <path d="m 14029.511,-4237.5401 24.229,-21.2799" /> 
  <path d="m 13984.27,-4242.5865 -7.531,12.0933" /> 
  <path d="m 14045.7,-4217.7467 -16.189,-19.7934" /> 
  <path d="m 13940.601,-4217.5667 v 0" /> 
  <path d="m 13976.739,-4230.4932 15.461,16.8866" /> 
  <path d="m 13992.2,-4213.6066 7.48,1.1402" /> 
  <path d="m 14062.84,-4211.9801 -17.14,-5.7666" /> 
  <path d="m 13999.68,-4212.4664 7.42,6.393" /> 
  <path d="m 13945.03,-4205.2132 10.88,-20.1069 -10.88,20.1069" /> 
  <path d="m 14007.1,-4206.0734 4.96,5.7533" /> 
  <path d="m 14012.06,-4200.3201 1.23,5.0068" /> 
  <path d="m 14013.29,-4195.3133 -0.959,12.7201" /> 
  <path d="m 14055.591,-4172.34 15.41,-8.5865" /> 
  <path d="m 14043.491,-4165.9668 12.1,-6.3732" /> 
  <path d="m 14012.331,-4182.5932 -12.651,18.5597" /> 
  <path d="m 13999.68,-4164.0335 -0.3,0.9468" /> 
  <path d="m 13999.38,-4163.0867 0.3,8.9333" /> 
  <path d="m 14040.9,-4151.7265 2.591,-14.2403" /> 
  <path d="m 13934.081,-4149.5731 v 0" /> 
  <path d="m 14020.52,-4140.5399 20.38,-11.1866" />
  <path d="m 13999.68,-4154.1534 20.84,13.6135" /> 
  <path d="m 13979.97,-4135.3466 v 0" /> 
  <path d="m 14044.91,-4118.9331 -10.669,-6.0337" /> 
  <path d="m 14059.419,-4121.6999 -14.509,2.7668" /> 
  <path d="m 14034.241,-4124.9668 -3.63,14.2536" /> 
  <path d="m 14063.48,-4108.1467 -4.061,-13.5532" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```

- 2_1.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13396.82117, -4118.743422, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 14044.91,-4118.9331 -10.669,-6.0337" /> 
  <path d="m 14059.419,-4121.6999 -14.509,2.7668" /> 
  <path d="m 14034.241,-4124.9668 -3.63,14.2536" /> 
  <path d="m 14063.48,-4108.1467 -4.061,-13.5532" /> 
  <path d="m 14030.611,-4110.7132 1.259,10.6731" /> 
  <path d="m 14031.87,-4100.0401 -1.65,8.3001" /> 
  <path d="m 14030.22,-4091.74 -5.2,11.6333" /> 
  <path d="m 14025.02,-4080.1067 -10.55,4.8599" /> 
  <path d="m 14014.47,-4075.2468 -14.79,1.6537" /> 
  <path d="m 13994.07,-4066.9868 h -0.32" /> 
  <path d="m 13999.68,-4073.5931 -4.87,6.6063" /> 
  <path d="m 13994.81,-4066.9868 h -0.74" /> 
  <path d="m 13993.75,-4066.9868 -7.15,8.0402" /> 
  <path d="m 13986.6,-4058.9466 7.04,16.0801" /> 
  <path d="m 13993.64,-4042.8665 6.04,4.7729" /> 
  <path d="m 13999.68,-4038.0936 2.87,5.587" /> 
  <path d="m 14002.55,-4032.5066 -0.991,5.9464" /> 
  <path d="m 13999.68,-4021.32 v 0.2602" /> 
  <path d="m 14001.559,-4026.5602 -1.879,5.2402" /> 
  <path d="m 13999.68,-4021.0598 v 0.4932" /> 
  <path d="m 13999.68,-4020.5666 -2.41,7.9998" /> 
  <path d="m 13997.27,-4012.5668 -2.71,5.2136" /> 
  <path d="m 13969.89,-4001.3268 v 0" /> 
  <path d="m 13970.621,-4000.3201 h -0.691" /> 
  <path d="m 13994.56,-4007.3532 -5.7,7.0331" /> 
  <path d="m 13988.86,-4000.3201 -0.03,0.027" /> 
  <path d="m 13969.93,-4000.3201 -0.213,0.3201" /> 
  <path d="m 13970.825,-4000 -0.204,-0.3201" /> 
  <path d="m 13988.831,-4000.2934 -0.348,0.2934" /> 
  <path d="m 13500,-3569.2566 -0.32,0.09" /> 
  <path d="m 13467.05,-3566.1266 v 0" /> 
  <path d="m 13481.59,-3566.0332 -8.349,0.1999" /> 
  <path d="m 13499.68,-3569.1666 -4.67,3.5668" /> 
  <path d="m 13495.01,-3565.5998 -8.3,-0.2068" /> 
  <path d="m 13486.71,-3565.8066 -5.12,-0.2266" />
  <path d="m 13473.241,-3565.8333 -21.592,-0.8266" /> 
  <path d="m 13451.649,-3566.6599 -14.698,5.2002" /> 
  <path d="m 13436.951,-3561.4597 -9.221,4.1732" /> 
  <path d="m 13427.73,-3557.2865 -4.711,2.6066" /> 
  <path d="m 13423.019,-3554.6799 -12.889,2.0001" /> 
  <path d="m 13401.311,-3552.9266 -1.631,0.4932" /> 
  <path d="m 13399.68,-3552.4334 -3.209,0.1335" /> 
  <path d="m 13410.13,-3552.6798 -8.819,-0.2468" /> 
  <path d="m 13988.483,-4000 h -17.658" /> 
  <path d="m 13994.228,-3989.2906 0.979,0.4455" /> 
  <path d="m 13995.207,-3988.8451 1.573,0.8252" /> 
  <path d="m 13969.717,-4000 5.813,14.2864 18.698,-3.577" /> 
  <path d="m 13996.78,-3988.0199 2.9,2.3201" /> 
  <path d="m 13999.68,-3985.6998 0.32,0.3578" /> 
  <path d="m 14000,-3935.0166 -0.32,0.7698" /> 
  <path d="m 13999.68,-3934.2468 -0.35,0.5935" /> 
  <path d="m 13999.33,-3933.6533 -1.28,2.3068" /> 
  <path d="m 13998.05,-3931.3465 -6.369,3.7132" /> 
  <path d="m 13991.681,-3927.6333 -1.26,4.8466" /> 
  <path d="m 13954.41,-3918.1931 v 0" /> 
  <path d="m 13990.421,-3922.7867 -3.441,10.9268" /> 
  <path d="m 13986.98,-3911.8599 -2.939,13.3133" /> 
  <path d="m 13984.041,-3898.5466 -7.871,18.4933" /> 
  <path d="m 13976.17,-3880.0533 -14.68,12.5801" /> 
  <path d="m 13961.49,-3867.4732 -0.27,0.4864" /> 
  <path d="m 13961.22,-3866.9868 -6.4,11.647" /> 
  <path d="m 13922.24,-3843.6935 v 0" /> 
  <path d="m 13954.82,-3855.3398 -9.73,19.3397" /> 
  <path d="m 13848.48,-3833.2668 v 0" /> 
  <path d="m 13945.09,-3836.0001 -2.5,18.4868" /> 
  <path d="m 13942.59,-3817.5133 -1.559,2.2465" /> 
  <path d="m 13823.97,-3808.3733 v 0" /> 
  <path d="m 13941.031,-3815.2668 -9.651,10.3203" /> 
  <path d="m 13931.38,-3804.9465 -2.559,1.8398" /> 
  <path d="m 13843.98,-3827.2999 -20.629,26.9798" /> 
  <path d="m 13827.44,-3800.3201 h 3.67" /> 
  <path d="m 13853.9,-3800.3201 -9.92,-26.9798" /> 
  <path d="m 13928.821,-3803.1067 -5.38,2.7866" /> 
  <path d="m 13923.441,-3800.3201 -0.96,1.1136" /> 
  <path d="m 13826.27,-3798.5668 1.17,-1.7533" /> 
  <path d="m 13831.11,-3800.3201 2.92,2.5002" /> 
  <path d="m 13922.481,-3799.2065 -8.53,2.6886" /> 
  <path d="m 13823.351,-3800.3201 2.919,1.7533" /> 
  <path d="m 13913.951,-3796.5179 -1.065,0.2384" /> 
  <path d="m 13850.36,-3793.8332 3.54,-6.4869" /> 
  <path d="m 13912.886,-3796.2795 -13.206,5.6328" /> 
  <path d="m 13847.031,-3789.7064 3.329,-4.1268" />
  <path d="m 13834.03,-3797.8199 -5.36,9.5665" /> 
  <path d="m 13899.68,-3790.6467 -10.421,5.3001" /> 
  <path d="m 13828.67,-3788.2534 -1.45,3.0601" /> 
  <path d="m 13691.38,-3784.4666 v 0" /> 
  <path d="m 13835.49,-3782.98 11.541,-6.7264" /> 
  <path d="m 13828.909,-3782.1667 6.581,-0.8133" /> 
  <path d="m 13827.22,-3785.1933 1.689,3.0266" /> 
  <path d="m 13889.259,-3785.3466 -9.259,10.1665" /> 
  <path d="m 13880,-3775.1801 -1.449,4.4335" /> 
  <path d="m 13690.19,-3760.8868 v 0" /> 
  <path d="m 13685.541,-3758.72 v 0" /> 
  <path d="m 13687.711,-3758.6735 v 0" /> 
  <path d="m 13878.551,-3770.7466 -5.892,12.92" /> 
  <path d="m 13872.659,-3757.8266 -6.649,5.4535" /> 
  <path d="m 13866.01,-3752.3731 -3.29,3.7998" /> 
  <path d="m 13708.569,-3746.6267 -8.889,4.1134" /> 
  <path d="m 13723.88,-3737.3531 8.87,-15.6067 -24.181,6.3331" /> 
  <path d="m 13699.68,-3742.5133 -21.979,5.46" /> 
  <path d="m 13677.701,-3737.0533 -4.001,3.4" /> 
  <path d="m 13726.759,-3733.6533 -2.879,-3.6998" /> 
  <path d="m 13846.15,-3733.6533 h -0.11" /> 
  <path d="m 13862.72,-3748.5733 -15.889,14.92" /> 
  <path d="m 13846.831,-3733.6533 h -0.681" /> 
  <path d="m 13846.04,-3733.6533 -4.229,2.9866" /> 
  <path d="m 13721.61,-3729.6799 5.149,-3.9734" /> 
  <path d="m 13841.811,-3730.6667 -7.041,5.7266" /> 
  <path d="m 13708.321,-3724.8466 13.289,-4.8333" /> 
  <path d="m 13673.7,-3733.6533 -4.08,11.6734" /> 
  <path d="m 13834.77,-3724.9401 -5.141,3.78" /> 
  <path d="m 13699.68,-3719.4801 8.641,-5.3665" /> 
  <path d="m 13688.899,-3716.9132 10.781,-2.5669" /> 
  <path d="m 13810.17,-3717.44 19.459,-3.7201" /> 
  <path d="m 13810.17,-3717.44 -3.41,2.6001" /> 
  <path d="m 13799.68,-3711.3068 v -0.033" /> 
  <path d="m 13699.68,-3711.9732 v -2.0203" /> 
  <path d="m 13799.68,-3711.0268 v -0.28" /> 
  <path d="m 13806.76,-3714.8399 -7.08,3.8131" /> 
  <path d="m 13689.23,-3710.2001 v 0" /> 
  <path d="m 13699.68,-3713.9935 v 2.0203" /> 
  <path d="m 13799.68,-3711.34 -5.5,3.3734" /> 
  <path d="m 13685.91,-3707.6466 2.989,-9.2666" /> 
  <path d="m 13690.581,-3707.7267 -4.671,0.08" /> 
  <path d="m 13669.62,-3721.9799 2.54,15.5067" /> 
  <path d="m 13794.18,-3707.9666 -10.96,3.8532" /> 
  <path d="m 13783.22,-3704.1134 -19.73,6.0803" /> 
  <path d="m 13672.16,-3706.4732 4.66,10.0865" /> 
  <path d="m 13763.49,-3698.0331 -9.23,1.913" />
  <path d="m 13705.161,-3695.9534 0.579,-14.8597 -15.159,3.0864" /> 
  <path d="m 13754.26,-3696.1201 -11.68,3.867" /> 
  <path d="m 13699.68,-3688.5201 5.481,-7.4333" /> 
  <path d="m 13676.82,-3696.3867 -1.049,9.7465" /> 
  <path d="m 13742.58,-3692.2531 -1.641,6.1333" /> 
  <path d="m 13675.771,-3686.6402 -0.551,1.7136" /> 
  <path d="m 13699.68,-3684.6066 v -3.9135" /> 
  <path d="m 13701.649,-3682.9601 -1.969,-1.6465" /> 
  <path d="m 13740.939,-3686.1198 -2.729,6.06" /> 
  <path d="m 13706.77,-3679.4132 -5.121,-3.5469" /> 
  <path d="m 13675.22,-3684.9266 -2.809,5.92" /> 
  <path d="m 13706.77,-3679.4132 2.849,1.9398" /> 
  <path d="m 13709.23,-3677.2266 0.09,-0.06" /> 
  <path d="m 13709.32,-3677.2865 0.299,-0.1869" /> 
  <path d="m 13710.319,-3676.9936 -1.089,-0.233" /> 
  <path d="m 13738.21,-3680.0598 -6.62,4.1733" /> 
  <path d="m 13717.999,-3675.7732 -7.68,-1.2204" /> 
  <path d="m 13731.59,-3675.8865 -13.591,0.1133" /> 
  <path d="m 13672.411,-3679.0066 -2.24,3.78" /> 
  <path d="m 13670.171,-3675.2266 -2.611,4.1267" /> 
  <path d="m 13667.56,-3671.0999 -0.65,0.9732" /> 
  <path d="m 13666.91,-3670.1267 -2.3,3.1399" /> 
  <path d="m 13664.61,-3666.9868 -2.679,3.1734" /> 
  <path d="m 13661.931,-3663.8134 -6.272,7.0202" /> 
  <path d="m 13655.659,-3656.7932 -5.639,5.9196" /> 
  <path d="m 13650.02,-3650.8736 -3.549,3.6736" /> 
  <path d="m 13646.471,-3647.2 -3.832,4.1733" /> 
  <path d="m 13642.639,-3643.0267 -5.459,4.6402" /> 
  <path d="m 13637.18,-3638.3865 -12.81,8.8264" /> 
  <path d="m 13624.37,-3629.5601 -6.09,3.7735" /> 
  <path d="m 13611.729,-3625.0336 v 0" /> 
  <path d="m 13618.28,-3625.7866 -8.299,8.4866" /> 
  <path d="m 13609.981,-3617.3 -8.071,11.4132" /> 
  <path d="m 13601.91,-3605.8868 -2.23,3.96" /> 
  <path d="m 13599.68,-3601.9268 -2.39,1.6067" /> 
  <path d="m 13597.29,-3600.3201 -0.9,0.5536" /> 
  <path d="m 13596.39,-3599.7665 3.29,6.2133" /> 
  <path d="m 13599.68,-3593.5532 v 1.6198" /> 
  <path d="m 13599.68,-3591.9334 v 1.3401" /> 
  <path d="m 13599.68,-3590.5933 v 0.5268" /> 
  <path d="m 13599.68,-3590.0665 v 1.3599" /> 
  <path d="m 13599.68,-3588.7066 1.4,1.4668" /> 
  <path d="m 13601.08,-3587.2398 8.71,10.6998" /> 
  <path d="m 13599.68,-3574.9599 -3.249,1.9397" /> 
  <path d="m 13523.46,-3576.8665 -16.569,5.0464" /> 
  <path d="m 13506.891,-3571.8201 -6.891,2.5635" /> 
  <path d="m 13542.31,-3567.6464 v 0" />
  <path d="m 13996.271,-3568.0733 -0.38,0.7668" /> 
  <path d="m 13995.891,-3567.3065 0.49,0.08" /> 
  <path d="m 13996.381,-3567.2264 0.779,0.1263" /> 
  <path d="m 13997.16,-3567.1001 -0.889,-0.9732" /> 
  <path d="m 13999.68,-3566.5199 0.32,-0.033" /> 
  <path d="m 13996.33,-3568.1534 3.35,1.6335" /> 
  <path d="m 13527.181,-3566.6466 -3.721,-10.2199" /> 
  <path d="m 14000,-3565.9618 -0.32,0.01" /> 
  <path d="m 13609.79,-3576.54 -3.461,10.6869 -6.649,-9.1068" /> 
  <path d="m 13991.83,-3565.5468 4.5,-2.6066" /> 
  <path d="m 13999.68,-3565.9534 0.32,0.3524" /> 
  <path d="m 13976.45,-3565.6067 2.501,-0.087" /> 
  <path d="m 13984.11,-3564.3265 0.412,0.029" /> 
  <path d="m 13984.522,-3564.2979 0.448,0.031" /> 
  <path d="m 13987.18,-3563.9332 0.109,0.08" /> 
  <path d="m 13984.97,-3564.2666 2.21,0.3334" /> 
  <path d="m 13987.289,-3563.8535 0.191,0.1267" /> 
  <path d="m 13985.78,-3563.5799 v 0" /> 
  <path d="m 13982.12,-3563.4132 v 0" /> 
  <path d="m 13986.7,-3563.3598 v 0" /> 
  <path d="m 13580.27,-3563.0402 v 0" /> 
  <path d="m 13976.871,-3562.6465 1.32,-0.3467" /> 
  <path d="m 13975.04,-3562.4866 1.41,-3.1201" /> 
  <path d="m 13975.94,-3562.7998 -0.591,0.3933" /> 
  <path d="m 13984.11,-3564.3265 -5.159,-1.3668" /> 
  <path d="m 13975.349,-3562.4065 0.591,-0.3933" /> 
  <path d="m 13977.361,-3562.0266 -0.49,-0.6199" /> 
  <path d="m 13987.48,-3563.7268 4.35,-1.82" /> 
  <path d="m 13979.491,-3561.38 v 0" /> 
  <path d="m 13983.549,-3561.2465 v 0" /> 
  <path d="m 13596.431,-3573.0202 -15.001,8.7868" /> 
  <path d="m 13978.191,-3562.9932 -0.83,0.9666" /> 
  <path d="m 13979.15,-3559.3853 v 0" /> 
  <path d="m 13547.819,-3559.3201 v 0" /> 
  <path d="m 13981.32,-3558.9535 v 0" /> 
  <path d="m 13974.409,-3558.9401 0.631,-3.5465" /> 
  <path d="m 13977.28,-3559.56 -2.33,0.6733" /> 
  <path d="m 13980.595,-3558.5583v 0" /> 
  <path d="m 13976.672,-3557.7099 0.608,-1.8501" /> 
  <path d="m 13974.95,-3558.8867 1.722,1.1768" /> 
  <path d="m 13976.559,-3556.4865 v 0" /> 
  <path d="m 13581.43,-3564.2334 0.04,7.0801" /> 
  <path d="m 13979.46,-3553.1864 -5.051,-5.7537" /> 
  <path d="m 13978.979,-3552.6669 0.481,-0.5195" /> 
  <path d="m 13978.76,-3552.4399 0.219,-0.227" /> 
  <path d="m 13528.81,-3551.6266 -1.629,-15.02" /> 
  <path d="m 13533.89,-3549.3599 v 0" /> 
  <path d="m 13971.139,-3549.0601 7.621,-3.3798" />
  <path d="m 13560.611,-3549.0131 -0.391,-2.38" /> 
  <path d="m 13560.22,-3551.3931 -11.57,-4.4068" /> 
  <path d="m 13974.56,-3548.4932 v 0" /> 
  <path d="m 13560.451,-3548.2399 0.16,-0.7732" /> 
  <path d="m 13581.47,-3557.1533 -17,9.2731" /> 
  <path d="m 13564.47,-3547.8802 -4.019,-0.3597" /> 
  <path d="m 14000,-3547.5735 v 0.3907" /> 
  <path d="m 13972.54,-3546.9666 -1.08,-1.6201" /> 
  <path d="m 13967.081,-3547.8001 4.058,-1.26" /> 
  <path d="m 14000,-3546.6297 -0.32,-0.2834" /> 
  <path d="m 13963.28,-3546.6133 3.801,-1.1868" /> 
  <path d="m 13971.46,-3548.5867 1.08,1.6201" /> 
  <path d="m 13965.3,-3546.3467 v 0" /> 
  <path d="m 13999.68,-3546.9131 v 1.0063" /> 
  <path d="m 13999.68,-3545.9068 v 0.2403" /> 
  <path d="m 13963.271,-3545.2198 v -1.3935" /> 
  <path d="m 13548.65,-3555.7999 -19.84,4.1733" /> 
  <path d="m 13964.494,-3545.0958 v 0" /> 
  <path d="m 13969.56,-3544.96 v 0" /> 
  <path d="m 13999.68,-3545.6665 -4.821,1.4465" /> 
  <path d="m 13969.217,-3541.0004 0.294,0.2518" /> 
  <path d="m 13964.25,-3541.1533 2.565,0.8201" /> 
  <path d="m 13966.815,-3540.3332 -3.544,-4.8866" /> 
  <path d="m 13969.511,-3540.7486 v 0" /> 
  <path d="m 13969.217,-3541.0004 v 0" /> 
  <path d="m 13962.95,-3538.3801 1.3,-2.7732" /> 
  <path d="m 13994.859,-3544.22 -6.109,8.0666" /> 
  <path d="m 13988.75,-3536.1534 -3.53,1.2268" /> 
  <path d="m 13964.6,-3533.6533 h -0.361" /> 
  <path d="m 13985.22,-3534.9266 -1.4,1.2733" /> 
  <path d="m 13964.239,-3533.6533 h 0.361" /> 
  <path d="m 13963.181,-3532.5333 -0.231,-5.8468" /> 
  <path d="m 13963.831,-3532.6733 v 0.013" /> 
  <path d="m 13963.831,-3532.6599 -0.65,0.1266" /> 
  <path d="m 13937.39,-3531.4865 6.41,-0.4002" /> 
  <path d="m 13976.81,-3531.4335 v 0" /> 
  <path d="m 13933.009,-3531.2134 4.381,-0.2731" /> 
  <path d="m 13974.35,-3531.1268 v 0" /> 
  <path d="m 13948.86,-3530.7865 6.371,0.8465" /> 
  <path d="m 13943.8,-3531.8867 5.06,1.1002" /> 
  <path d="m 13926.93,-3529.7268 6.079,-1.4866" /> 
  <path d="m 13965.01,-3529.4201 v 0" /> 
  <path d="m 13923.41,-3528.6201 3.52,-1.1067" /> 
  <path d="m 13955.231,-3529.94 1.77,1.4599" /> 
  <path d="m 13957.001,-3528.4801 0.67,3.1867" /> 
  <path d="m 13966.499,-3519.2799 -2.668,-13.3934" /> 
  <path d="m 13957.671,-3525.2934 3.92,6.3069" /> 
  <path d="m 13913.73,-3517.8799 9.68,-10.7402" /> 
  <path d="m 13983.82,-3533.6533 -2.01,18.1668" />
  <path d="m 13911.15,-3514.1335 2.6,-0.7129" /> 
  <path d="m 13913.75,-3514.8464 -0.02,-3.0335" /> 
  <path d="m 13961.591,-3518.9865 4.908,-0.2934" /> 
  <path d="m 13962.95,-3512.8666 v 0" /> 
  <path d="m 13863.93,-3511.4933 11.32,-1.6201" /> 
  <path d="m 13857.37,-3511.0199 6.56,-0.4734" /> 
  <path d="m 13981.81,-3515.4865 1.801,5.5198" /> 
  <path d="m 13983.611,-3509.9667 -1.481,2.8733" /> 
  <path d="m 13854.15,-3506.7932 3.22,-4.2267" /> 
  <path d="m 13916.87,-3503.6469 v 0" /> 
  <path d="m 13674.91,-3503.6999 0.06,0.093" /> 
  <path d="m 13682.451,-3508.02 4.579,3.3932" /> 
  <path d="m 13674.22,-3503.389 0.69,-0.3109" /> 
  <path d="m 13674.969,-3503.6068 0.429,0.441" /> 
  <path d="m 13982.13,-3507.0934 1.18,3.8803" /> 
  <path d="m 13888.719,-3503.1399 v 0" /> 
  <path d="m 13909.85,-3503.1399 1.3,-10.9936" /> 
  <path d="m 13673.431,-3502.8172 0.789,-0.5718" /> 
  <path d="m 13999.68,-3502.5932 0.32,-0.2041" /> 
  <path d="m 13680.64,-3505.1533 1.811,-2.8667" /> 
  <path d="m 13672.128,-3502.5261 1.303,-0.2911" /> 
  <path d="m 13671.35,-3502.4532 0.778,-0.073" /> 
  <path d="m 13670.712,-3502.2865 0.638,-0.1667" /> 
  <path d="m 13670,-3502.1 0.712,-0.1865" /> 
  <path d="m 13675.398,-3503.1658 1.642,1.0258" /> 
  <path d="m 13677.04,-3502.14 3.6,-3.0133" /> 
  <path d="m 13875.25,-3513.1134 15.38,8.3267 -12.661,3.0468" /> 
  <path d="m 13998.151,-3501.1333 1.529,-1.4599" /> 
  <path d="m 13687.03,-3504.6268 -0.07,3.8002" /> 
  <path d="M 13667.371,-3500.6199 13670,-3502.1" /> 
  <path d="m 13665.901,-3500 1.47,-0.6199" /> 
  <path d="m 13666.533,-3500 h 0.89" /> 
  <path d="m 13680.595,-3500 h 0.905" /> 
  <path d="m 13686.96,-3500.8266 -1.737,0.8266" /> 
  <path d="m 13849.739,-3500 4.411,-6.7932" /> 
  <path d="m 13850.671,-3500 h 0.04" /> 
  <path d="m 13852.765,-3500 h -2.353" /> 
  <path d="m 13877.969,-3501.7399 -0.102,1.7399" /> 
  <path d="m 13908.433,-3500 1.417,-3.1399" /> 
  <path d="m 13983.31,-3503.2131 2.44,3.2131" /> 
  <path d="m 13997.479,-3500 0.672,-1.1333" /> 
  <path d="m 14000,-3985.342 3.42,4.8485" /> 
  <path d="m 14003.87,-3975.8598 v 0" /> 
  <path d="m 14003.42,-3980.4935 2.571,20.6802" /> 
  <path d="m 14005.991,-3959.8133 -1.261,8.4667" /> 
  <path d="m 14004.73,-3951.3466 -3.309,12.9131" /> 
  <path d="m 14001.421,-3938.4335 -1.421,3.4169" /> 
  <path d="m 14061.418,-3648.1586 -0.407,5.5095" />
  <path d="m 14061.011,-3642.6491 -1.522,9.0092" /> 
  <path d="m 14055.969,-3625.5798 3.52,-8.0601" /> 
  <path d="m 14057.201,-3618.4601 -1.232,-7.1197" /> 
  <path d="m 14058.62,-3614.2799 -1.419,-4.1802" /> 
  <path d="m 14061.23,-3608.2333 -2.61,-6.0466" /> 
  <path d="m 14000,-3566.5527 0.2,-0.021" /> 
  <path d="m 14060.651,-3566.0599 1.86,-1.1802" /> 
  <path d="m 14000.2,-3566.5733 -0.2,0.6115" /> 
  <path d="m 14000,-3565.601 1.981,0.3342" /> 
  <path d="m 14055.969,-3562.78 4.682,-3.2799" /> 
  <path d="m 14053.67,-3561.1065 2.299,-1.6735" /> 
  <path d="m 14052.55,-3560.2531 1.12,-0.8534" /> 
  <path d="m 14001.981,-3565.2668 7.879,4.6333" /> 
  <path d="m 14049.809,-3557.9067 2.741,-2.3464" /> 
  <path d="m 14009.86,-3560.6335 1.7,5.5802" /> 
  <path d="m 14046.98,-3554.7466 2.829,-3.1601" /> 
  <path d="m 14043.03,-3549.8264 3.95,-4.9202" /> 
  <path d="m 14041.569,-3547.1668 1.461,-2.6596" /> 
  <path d="m 14011.56,-3555.0533 -9.28,8.3069" /> 
  <path d="m 14002.28,-3546.7464 -2.28,-0.8271" /> 
  <path d="m 14000,-3547.1828 v 0.5531" /> 
  <path d="m 14039.72,-3541.8667 1.849,-5.3001" /> 
  <path d="m 14039.18,-3538.3133 0.54,-3.5534" /> 
  <path d="m 14039.5,-3533.6533 -0.32,-4.66" /> 
  <path d="m 14039.79,-3533.02 -0.29,-0.6333" /> 
  <path d="m 14040.35,-3528.1601 -0.56,-4.8599" /> 
  <path d="m 14038.5,-3519.22 1.85,-8.9401" /> 
  <path d="m 14034.68,-3517.5533 3.82,-1.6667" /> 
  <path d="m 14021.201,-3511.4334 13.479,-6.1199" /> 
  <path d="m 14013.62,-3512.1468 7.581,0.7134" /> 
  <path d="m 14003.81,-3505.1399 9.81,-7.0069" /> 
  <path d="m 14000,-3502.7973 3.81,-2.3426" /> 
  <path d="m 13850.412,-3500 h 0.259" /> 
  <path d="m 13997.38,-3499.7601 0.1,-0.2399" /> 
  <path d="m 13681.5,-3500 -0.309,0.3906" /> 
  <path d="m 13681.191,-3499.6094 -0.596,-0.3906" /> 
  <path d="m 13850.71,-3500 h -0.971" /> 
  <path d="m 13667.423,-3500 -0.854,2.7138" /> 
  <path d="m 13666.569,-3497.2862 -0.04,-2.7138" /> 
  <path d="m 13847.45,-3496.1735 5.315,-3.8265" /> 
  <path d="m 13698.261,-3495.9198 0.279,0.28" /> 
  <path d="m 13682.028,-3494.9764 v 0" /> 
  <path d="m 13685.223,-3500 -2.723,6.06" /> 
  <path d="m 13877.867,-3500 -0.287,6.1001" /> 
  <path d="m 13697.501,-3493.2068 0.76,-2.713" /> 
  <path d="m 13664.45,-3492.58 1.451,-7.42" /> 
  <path d="m 13993.15,-3491.2666 4.23,-8.4935" /> 
  <path d="m 13985.75,-3500 -3.31,8.8932" />
  <path d="m 13698.54,-3495.6398 -0.811,4.9065" /> 
  <path d="m 13664.21,-3490.0536 0.24,-2.5264" /> 
  <path d="m 13982.44,-3491.1068 10.71,-0.1598" /> 
  <path d="m 13834.83,-3489.8464 12.62,-6.3271" /> 
  <path d="m 13697.501,-3493.2068 -3.441,6.9401" /> 
  <path d="m 13877.58,-3493.8999 -0.88,8.0532" /> 
  <path d="m 13908.25,-3485.2135 0.183,-14.7865" /> 
  <path d="m 13680.861,-3483.9298 v 0" /> 
  <path d="m 13697.075,-3482.0679 0.654,-8.6654" /> 
  <path d="m 13876.7,-3485.8467 -1.531,3.9268" /> 
  <path d="m 13699.152,-3481.6013 -2.077,-0.4666" /> 
  <path d="m 13682.5,-3493.94 3.65,12.5401" /> 
  <path d="m 13694.06,-3486.2667 -2.069,4.9469" /> 
  <path d="m 13832.49,-3481.1932 2.34,-8.6532" /> 
  <path d="m 13657.01,-3480.4531 7.2,-9.6005" /> 
  <path d="m 13705,-3477.9736 -5.848,-3.6277" /> 
  <path d="m 13902.58,-3476.4069 5.67,-8.8066" /> 
  <path d="m 13875.169,-3481.9199 2.411,5.6733" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 2_2.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13396.82117, -3487.144305, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 12835.741,-3200.3201 h -1.311" /> 
  <path d="m 12834.43,-3200.3201 h 1.311" /> 
  <path d="m 13469.76,-3475.9869 v 0" /> 
  <path d="m 13457.001,-3476.0265 19.079,-0.1801" /> 
  <path d="m 13447.391,-3475.5199 9.61,-0.5066" /> 
  <path d="m 13445.03,-3475.3666 2.361,-0.1533" /> 
  <path d="m 13476.08,-3476.2066 4.74,2.9999" /> 
  <path d="m 13432.13,-3472.1802 12.9,-3.1864" /> 
  <path d="m 13420.911,-3471.9601 v 0" /> 
  <path d="m 13424.31,-3471.5267 7.82,-0.6535" /> 
  <path d="m 13422.76,-3471.46 1.55,-0.067" /> 
  <path d="m 13426.17,-3470.8267 v 0" /> 
  <path d="m 13480.82,-3473.2067 3.85,1.68" /> 
  <path d="m 13432.091,-3470.3068 v 0" /> 
  <path d="m 13484.67,-3471.5267 2.29,1.2199" /> 
  <path d="m 13486.88,-3470.1599 -0.12,0.2266" /> 
  <path d="m 13428.83,-3469.68 v 0" /> 
  <path d="m 13486.76,-3469.9333 -0.169,0.2865" /> 
  <path d="m 13485.3,-3469.4 v 0" /> 
  <path d="m 13425.751,-3469.0266 v 0" /> 
  <path d="m 13486.591,-3469.6468 -0.341,0.6401" /> 
  <path d="m 13486.25,-3469.0067 0.63,-1.1532" /> 
  <path d="m 13463.94,-3468.3334 v 0" /> 
  <path d="m 13429.601,-3468.0069 v 0" /> 
  <path d="m 13461.031,-3467.5732 v 0" /> 
  <path d="m 13426.17,-3467.4934 v 0" /> 
  <path d="m 13420.7,-3466.9868 2.06,-4.4732" /> 
  <path d="m 13421.06,-3466.9868 h -0.21" /> 
  <path d="m 13422.69,-3466.9868 h 0.5" /> 
  <path d="m 13423.36,-3466.9868 h -1.14" /> 
  <path d="m 13458.73,-3466.9868 h -0.31" /> 
  <path d="m 13486.96,-3470.3068 6.151,3.32" /> 
  <path d="m 13458.42,-3466.9868 h -0.223" /> 
  <path d="m 13458.197,-3466.9853 h -1.807" /> 
  <path d="m 13420.85,-3466.9868 h -0.15" /> 
  <path d="m 13423.19,-3466.9868 h 0.17" /> 
  <path d="m 13422.22,-3466.9868 h 0.47" />
  <path d="m 13454.19,-3465.8798 v 0" /> 
  <path d="m 13456.39,-3466.9868 h 2.34" /> 
  <path d="m 13443.359,-3464.7667 v 0" /> 
  <path d="m 13453.101,-3464.2467 v 0" /> 
  <path d="m 13499.68,-3464.2399 0.32,-0.024" /> 
  <path d="m 13493.111,-3466.9868 6.569,2.7469" /> 
  <path d="m 13446.77,-3464.08 v 0" /> 
  <path d="m 13417.31,-3463.9599 3.75,-3.0269" /> 
  <path d="m 13458.78,-3463.76 v 0" /> 
  <path d="m 13451.55,-3463.5864 v 0" /> 
  <path d="m 13449.68,-3462.9532 v 0" /> 
  <path d="m 13500,-3460.8543 -0.32,0.061" /> 
  <path d="m 13499.68,-3460.7933 -0.02,-0.01" /> 
  <path d="m 13403.18,-3460.9001 1.05,0.1335" /> 
  <path d="m 13420.07,-3460.7399 v 0" /> 
  <path d="m 13416.78,-3460.26 v 0" /> 
  <path d="m 13397.25,-3460.3134 5.93,-0.5867" /> 
  <path d="m 13415.739,-3459.7 v 0" /> 
  <path d="m 13419.35,-3459.5669 v 0" /> 
  <path d="m 13447.58,-3459.3136 v 0" /> 
  <path d="m 13411.169,-3458.8402 6.141,-5.1197" /> 
  <path d="m 13404.23,-3460.7666 6.939,1.9264" /> 
  <path d="m 13403.349,-3457.3868 -7.829,-1.2665" /> 
  <path d="m 13410.86,-3456.0867 v 0" /> 
  <path d="m 13409.73,-3455.9868 v 0" /> 
  <path d="m 13500,-3454.9435 v -0.1819" /> 
  <path d="m 13499.68,-3454.5399 0.32,-0.3746" /> 
  <path d="m 13399.68,-3453.7533 3.669,-3.6335" /> 
  <path d="m 13399.68,-3453.7533 v 0.5333" /> 
  <path d="m 13399.68,-3452.8667 v -0.3533" /> 
  <path d="m 13415.95,-3452.7599 v 0" /> 
  <path d="m 13399.68,-3452.8667 v 0.3398" /> 
  <path d="m 13415.581,-3451.7467 v 0" /> 
  <path d="m 13414.61,-3451.6335 v 0" /> 
  <path d="m 13499.66,-3460.8002 -12.729,9.4536" /> 
  <path d="m 13399.68,-3451.7532 v -0.7737" /> 
  <path d="m 13402.341,-3450.6866 -1.651,0.8667" /> 
  <path d="m 13495.41,-3448.3868 4.27,-6.1531" /> 
  <path d="m 13400.69,-3449.8199 1.651,-0.8667" /> 
  <path d="m 13411.71,-3447.2866 v 0" /> 
  <path d="m 13399.68,-3447.06 v -0.5135" /> 
  <path d="m 13399.68,-3447.5735 v 0.5135" /> 
  <path d="m 13418.51,-3446.7731 v 0" /> 
  <path d="m 13400.101,-3446.0533 v 0" /> 
  <path d="m 13433.2,-3456.3133 -13.29,8.0665" /> 
  <path d="m 13407.95,-3445.9801 v 0" /> 
  <path d="m 13387.95,-3445.66 11.73,-6.0932" /> 
  <path d="m 13432.31,-3444.5667v 0" /> 
  <path d="m 13399.68,-3444.5866 v -1.5335" /> 
  <path d="m 13399.68,-3446.1201 v 1.5335" /> 
  <path d="m 13434.9,-3443.7199 v 0" />
  <path d="m 13400.661,-3443.56 v 0" /> 
  <path d="m 13426.71,-3446.7468 6.49,-9.5665" /> 
  <path d="m 13486.931,-3451.3466 -8.222,8.6266" /> 
  <path d="m 13405.45,-3441.6267 v 0" /> 
  <path d="m 13412.241,-3441.6199 v 0" /> 
  <path d="m 13419.91,-3448.2468 6.8,1.5" /> 
  <path d="m 13412.18,-3441.0065 v 0" /> 
  <path d="m 13413.47,-3440.9599 v 0" /> 
  <path d="m 13410.22,-3440.06 v 0" /> 
  <path d="m 13489.43,-3439.8933 5.98,-8.4935" /> 
  <path d="m 13417.34,-3439.0598 v 0" /> 
  <path d="m 13403.9,-3437.9333 v 0" /> 
  <path d="m 13412.221,-3436.06 -0.27,0.14" /> 
  <path d="m 13415.961,-3435.4332 -3.74,-0.6268" /> 
  <path d="m 13474.02,-3435.2402 4.689,-7.4798" /> 
  <path d="m 13411.951,-3435.92 -19.251,-3.0399" /> 
  <path d="m 13416.501,-3432.5935 -0.54,-2.8397" /> 
  <path d="m 13426.581,-3433.5999 -10.08,1.0064" /> 
  <path d="m 13500,-3428.1094 v 0.2049" /> 
  <path d="m 13495.66,-3427.6466 v 0" /> 
  <path d="m 13428.77,-3427.5536 -2.189,-6.0463" /> 
  <path d="m 13434.48,-3425.3201 -5.71,-2.2335" /> 
  <path d="m 13439.32,-3425.1202 -4.84,-0.1999" /> 
  <path d="m 13474.02,-3435.2402 -8.25,11.1069" /> 
  <path d="m 13487.05,-3423.9799 2.38,-15.9134" /> 
  <path d="m 13459.14,-3421.4401 v 0" /> 
  <path d="m 13443.97,-3420.7867 -4.65,-4.3335" /> 
  <path d="m 13465.77,-3424.1333 21.28,0.1534" /> 
  <path d="m 13462.18,-3418.5799 v 0" /> 
  <path d="m 13481.16,-3415.6467 v 0" /> 
  <path d="m 13461.42,-3414.2799 -17.45,-6.5068" /> 
  <path d="m 13460.158,-3410.3226 1.262,-3.9573" /> 
  <path d="m 13460.46,-3410.1467 -0.302,-0.1759" /> 
  <path d="m 13460.01,-3401.8665 0.45,-8.2802" /> 
  <path d="m 13459.85,-3400.3201 0.16,-1.5464" /> 
  <path d="m 13464.27,-3400.3201 h -1.359" /> 
  <path d="m 13465.131,-3398.6401 -0.861,-1.68" /> 
  <path d="m 13462.911,-3400.3201 h -3.061" /> 
  <path d="m 13469.83,-3394.0468 -4.699,-4.5933" /> 
  <path d="m 13467.36,-3385.96 v 0" /> 
  <path d="m 13465.43,-3385.4336 v 0" /> 
  <path d="m 13470.99,-3385.2867 v 0" /> 
  <path d="m 13472.92,-3384.7401 v 0" /> 
  <path d="m 13479.851,-3384.24 v 0" /> 
  <path d="m 13480.971,-3384.0336 v 0" /> 
  <path d="m 13480.42,-3383.9268 v 0" /> 
  <path d="m 13467.85,-3380.4268 1.98,-13.62" /> 
  <path d="m 13456.65,-3373.2735 11.2,-7.1533" /> 
  <path d="m 13447.191,-3368.1469 9.459,-5.1266" /> 
  <path d="m 13438.95,-3365.0333 8.241,-3.1136" />
  <path d="m 13444.93,-3363.7402 v 0" /> 
  <path d="m 13449.68,-3363.0135 v 0" /> 
  <path d="m 13442.31,-3362.9002 v 0" /> 
  <path d="m 13436.121,-3359.5798 2.829,-5.4535" /> 
  <path d="m 13434.37,-3358.5201 1.751,-1.0597" /> 
  <path d="m 13430.521,-3354.8534 3.849,-3.6667" /> 
  <path d="m 13432.071,-3353.9734 v 0" /> 
  <path d="m 13429.68,-3353.7399 v 0" /> 
  <path d="m 13431.21,-3353.7132 v 0" /> 
  <path d="m 13423.469,-3344.2066 7.052,-10.6468" /> 
  <path d="m 13399.24,-3342.7601 0.44,0.1202" /> 
  <path d="m 13399.68,-3342.6399 1.39,0.4532" /> 
  <path d="m 13401.07,-3342.1867 2.25,4.3533" /> 
  <path d="m 13403.32,-3337.8334 4.97,4.1801" /> 
  <path d="m 13419.83,-3333.6533 3.639,-10.5533" /> 
  <path d="m 13408.29,-3333.6533 h 11.54" /> 
  <path d="m 13697.501,-3493.2068 -3.441,6.9401" /> 
  <path d="m 13877.58,-3493.8999 -0.88,8.0532" /> 
  <path d="m 13908.25,-3485.2135 0.183,-14.7865" /> 
  <path d="m 13680.861,-3483.9298 v 0" /> 
  <path d="m 13697.075,-3482.0679 0.654,-8.6654" /> 
  <path d="m 13876.7,-3485.8467 -1.531,3.9268" /> 
  <path d="m 13699.152,-3481.6013 -2.077,-0.4666" /> 
  <path d="m 13682.5,-3493.94 3.65,12.5401" /> 
  <path d="m 13694.06,-3486.2667 -2.069,4.9469" /> 
  <path d="m 13832.49,-3481.1932 2.34,-8.6532" /> 
  <path d="m 13657.01,-3480.4531 7.2,-9.6005" /> 
  <path d="m 13730.55,-3480.4001 v 0" /> 
  <path d="m 13729.79,-3481.0467 2.63,2.0401" /> 
  <path d="m 13723,-3478.6533 v 0" /> 
  <path d="m 13732.291,-3478.8933 -1.661,0.4265" /> 
  <path d="m 13709.85,-3478.3733 6.97,-0.3868" /> 
  <path d="m 13730.63,-3478.4668 1.661,-0.4265" /> 
  <path d="m 13705,-3477.9736 -5.848,-3.6277" /> 
  <path d="m 13705,-3477.9736 4.85,-0.3997" /> 
  <path d="m 13654.39,-3477.2999 2.62,-3.1532" /> 
  <path d="m 13829.491,-3476.6666 2.999,-4.5266" /> 
  <path d="m 13716.82,-3478.7601 12.97,-2.2866" /> 
  <path d="m 13709.77,-3476.4668 v 0" /> 
  <path d="m 13902.58,-3476.4069 5.67,-8.8066" /> 
  <path d="m 13875.169,-3481.9199 2.411,5.6733" /> 
  <path d="m 13686.15,-3481.3999 -1.011,6.5468" /> 
  <path d="m 13694.2,-3474.7334 -2.209,-6.5864" /> 
  <path d="m 13824.58,-3474.02 4.911,-2.6466" /> 
  <path d="m 13731.867,-3473.2948 v 0" /> 
  <path d="m 13899.68,-3472.9336 2.9,-3.4733" /> 
  <path d="m 13822.35,-3472.2 2.23,-1.82" /> 
  <path d="m 13734.2,-3472.0455 v 0" /> 
  <path d="m 13899.249,-3471.7602 0.431,-1.1734" />
  <path d="m 13704.924,-3471.5477 v 0" /> 
  <path d="m 13532.436,-3472.5925 -2.124,0.6961" /> 
  <path d="m 13724.982,-3471.0663 v 0" /> 
  <path d="m 13532.997,-3471.0232 v 0" /> 
  <path d="m 13699.68,-3470.5666 v 0.053" /> 
  <path d="m 13532.12,-3470.4823 v 0" /> 
  <path d="m 13529.405,-3470.4655 v 0" /> 
  <path d="m 13534.717,-3470.29 v 0" /> 
  <path d="m 13699.68,-3470.5135 v -0.053" /> 
  <path d="m 13877.58,-3476.2466 -3.511,6.2267" /> 
  <path d="m 13685.139,-3474.8531 9.061,0.1197" /> 
  <path d="m 13537.219,-3469.3729 -4.783,-3.2196" /> 
  <path d="m 13943.88,-3467.86 -7.849,-12.0201 7.849,12.0201" /> 
  <path d="m 13732.42,-3479.0066 -1.73,11.1664" /> 
  <path d="m 13723.608,-3468.7775 7.082,0.9373" /> 
  <path d="m 13525.479,-3467.7868 v 0" /> 
  <path d="m 13753.22,-3467.8066 6.53,0.02" /> 
  <path d="m 13540.72,-3469.7205 -3.501,0.3476" /> 
  <path d="m 13759.75,-3467.7868 2.95,0.2068" /> 
  <path d="m 13748.39,-3467.3801 4.83,-0.4265" /> 
  <path d="m 13655.591,-3466.9868 -1.201,-10.3131" /> 
  <path d="m 13700.52,-3466.9868 h -0.309" /> 
  <path d="m 13718.73,-3466.9868 h 0.16" /> 
  <path d="m 13719.9,-3466.9868 3.708,-1.7907" /> 
  <path d="m 13745.48,-3466.9868 2.91,-0.3933" /> 
  <path d="m 13762.7,-3467.58 5.121,0.5932" /> 
  <path d="m 13819.76,-3466.9868 2.59,-5.2132" /> 
  <path d="m 13874.069,-3470.0199 3.641,3.0331" /> 
  <path d="m 13894.879,-3466.9868 h 1.21" /> 
  <path d="m 13897.79,-3466.9868 1.459,-4.7734" /> 
  <path d="m 13719.9,-3466.9868 h -1.01" /> 
  <path d="m 13700.211,-3466.9868 h 0.309" /> 
  <path d="m 13718.73,-3466.9868 -0.439,0.4268" /> 
  <path d="m 13791.15,-3466.7 5.839,0.1599" /> 
  <path d="m 13654.84,-3466.3868 0.751,-0.6" /> 
  <path d="m 13796.989,-3466.5401 2.691,0.3799" /> 
  <path d="m 13540.971,-3465.9027 v 0" /> 
  <path d="m 13785.71,-3465.8798 5.44,-0.8202" /> 
  <path d="m 13784.711,-3465.6933 0.999,-0.1865" /> 
  <path d="m 13799.68,-3466.1602 3.05,0.6069" /> 
  <path d="m 13896.089,-3466.9868 h 1.701" /> 
  <path d="m 13709.46,-3465.16 v 0" /> 
  <path d="m 13521.732,-3465.0158 v 0" /> 
  <path d="m 13712.7,-3464.8998 v 0" /> 
  <path d="m 13734.11,-3464.7598 11.37,-2.227" /> 
  <path d="m 13779.86,-3464.4669 4.851,-1.2264" /> 
  <path d="m 13767.821,-3466.9868 12.039,2.5199" /> 
  <path d="m 13500,-3464.2639 1.829,-0.063" /> 
  <path d="m 13539.209,-3464.225 v 0" />
  <path d="m 13802.73,-3465.5533 5.081,1.3333" /> 
  <path d="m 13654.89,-3463.4666 -0.05,-2.9202" /> 
  <path d="m 13522.585,-3463.1145 v 0" /> 
  <path d="m 13521.237,-3462.9562 v 0" /> 
  <path d="m 13890.48,-3462.8868 4.399,-4.1" /> 
  <path d="m 13530.312,-3471.8964 -28.483,7.5695" /> 
  <path d="m 13725.169,-3462.3665 8.941,-2.3933" /> 
  <path d="m 13542.217,-3462.1918 v 0" /> 
  <path d="m 13820.599,-3462.0533 -0.839,-4.9335" /> 
  <path d="m 13821.899,-3461.8401 v 0" /> 
  <path d="m 13807.811,-3464.22 8.229,2.9399" /> 
  <path d="m 13652.921,-3461.1465 1.969,-2.3201" /> 
  <path d="m 13541.753,-3461.0836 v 0" /> 
  <path d="m 13543.75,-3460.8109 -3.03,-8.9096" /> 
  <path d="m 13877.71,-3466.9868 12.77,4.1" /> 
  <path d="m 13660.35,-3460.0933 -7.429,-1.0532" /> 
  <path d="m 13816.04,-3461.2801 4.559,-0.7732" /> 
  <path d="m 13714.97,-3459.2133 10.199,-3.1532" /> 
  <path d="m 13718.291,-3466.56 -16.751,8.6067 13.43,-1.26" /> 
  <path d="m 13666,-3456.6132 -5.65,-3.4801" /> 
  <path d="m 13501.559,-3456.2401 -1.559,-4.6142" /> 
  <path d="m 13500,-3455.1254 1.559,-1.1147" /> 
  <path d="m 13500,-3454.9145 v -0.029" /> 
  <path d="m 13540.527,-3454.7295 0.687,0.3785" /> 
  <path d="m 13542.625,-3454.705 1.012,0.4512" /> 
  <path d="m 13543.745,-3454.0733 v -6.7376" /> 
  <path d="m 13698.23,-3454.0733 v 0" /> 
  <path d="m 13691.09,-3454.0401 v 0" /> 
  <path d="m 13541.214,-3454.351 1.411,-0.354" /> 
  <path d="m 13539.374,-3453.138 0.738,0.3956" /> 
  <path d="m 13675.169,-3452.4666 -9.169,-4.1466" /> 
  <path d="m 13543.637,-3454.2538 -3.11,-0.4757" /> 
  <path d="m 13685.269,-3451.9402 v 0" /> 
  <path d="m 13541.815,-3451.9382 h 0.03" /> 
  <path d="m 13541.841,-3451.9352 1.904,-2.1381" /> 
  <path d="m 13540.112,-3452.7424 -0.738,-0.3956" /> 
  <path d="m 13684.039,-3451.5667 v 0" /> 
  <path d="m 13927.53,-3451.1135 v 0" /> 
  <path d="m 13685.86,-3450.6001 v 0" /> 
  <path d="m 13537.627,-3450.8675 4.188,-1.0707" /> 
  <path d="m 13683.6,-3450.2132 v 0" /> 
  <path d="m 13537.088,-3450.0141 0.539,-0.8534" /> 
  <path d="m 13681.709,-3448.8731 -6.54,-3.5935" /> 
  <path d="m 13681.57,-3448.5134 0.139,-0.3597" /> 
  <path d="m 13685.651,-3448.2533 v 0" /> 
  <path d="m 13688.631,-3447.6601 v 0" /> 
  <path d="m 13929.32,-3446.9666 v 0" /> 
  <path d="m 13535.93,-3445.9866 1.158,-4.0275" /> 
  <path d="m 13689.52,-3445.5868 v 0" />
  <path d="m 13688.89,-3445.0665 v 0" /> 
  <path d="m 13533.411,-3444.5732 v 0" /> 
  <path d="m 13535.93,-3445.9866 -2.851,2.7131" /> 
  <path d="m 13524.1,-3443.7267 -1.1,0.7465" /> 
  <path d="m 13525.149,-3442.9802 -1.049,-0.7465" /> 
  <path d="m 13523.99,-3442.2733 1.159,-0.7069" /> 
  <path d="m 13523.604,-3441.8148 0.386,-0.4585" /> 
  <path d="m 13523.604,-3441.8148 v 0" /> 
  <path d="m 13523,-3442.9802 0.604,1.1654" /> 
  <path d="m 13528.861,-3440.3465 4.218,-2.927" /> 
  <path d="m 13527.94,-3439.5267 0.921,-0.8198" /> 
  <path d="m 13525.04,-3437.6801 2.9,-1.8466" /> 
  <path d="m 13686.89,-3438.8535 -5.32,-9.6599" /> 
  <path d="m 13922.701,-3436.7199 v 0" /> 
  <path d="m 13687.311,-3435.7201 v 0" /> 
  <path d="m 13686.56,-3435.0399 0.33,-3.8136" /> 
  <path d="m 13921.069,-3433.6735 v 0" /> 
  <path d="m 13525.04,-3437.6801 -5.67,4.0402" /> 
  <path d="m 13671.39,-3433.3935 v 0" /> 
  <path d="m 13927.251,-3432.9933 1.849,-7.84 -1.25,-2.2602 -0.599,10.1002" /> 
  <path d="m 13927.831,-3432.4333 v 0" /> 
  <path d="m 13921.339,-3431.6269 v 0" /> 
  <path d="m 13519.37,-3433.6399 -10.059,2.4731" /> 
  <path d="m 13681.5,-3430.46 v 0" /> 
  <path d="m 13688.77,-3430.1334 -2.21,-4.9065" /> 
  <path d="m 13681.95,-3429.9267 v 0" /> 
  <path d="m 13681.27,-3429.9068 v 0" /> 
  <path d="m 13682.34,-3429.6001 v 0" /> 
  <path d="m 13681.551,-3429.5532 v 0" /> 
  <path d="m 13668.021,-3429.5067 v 0" /> 
  <path d="m 13504.46,-3429.2202 v 0" /> 
  <path d="m 13671.55,-3430.2002 8.27,-0.9197" /> 
  <path d="m 13682.21,-3428.8067 v 0" /> 
  <path d="m 13679.82,-3431.1199 6.591,2.0733" /> 
  <path d="m 13681.191,-3428.6999 v 0" /> 
  <path d="m 13682.539,-3428.4733 v 0" /> 
  <path d="m 13500.8,-3427.6268 -0.8,-0.4826" /> 
  <path d="m 13500,-3427.9045 0.8,0.2777" /> 
  <path d="m 13686.084,-3427.4311 0.107,-0.056" /> 
  <path d="m 13662.84,-3427.2667 8.71,-2.9335" /> 
  <path d="m 13686.411,-3429.0466 -0.327,1.6155" /> 
  <path d="m 13684.05,-3426.7132 v 0" /> 
  <path d="m 13686.084,-3427.4311 -0.194,0.898" /> 
  <path d="m 13688.77,-3430.1334 -2.669,3.8868" /> 
  <path d="m 13685.89,-3426.5331 -10.831,-0.4269 11.042,0.7134" /> 
  <path d="m 13654.82,-3424.2199v 0" /> 
  <path d="m 13643.05,-3421.9601 19.79,-5.3066" /> 
  <path d="m 13919.211,-3420.6532 v 0" /> 
  <path d="m 13637.421,-3419.7266 5.629,-2.2335" />
  <path d="m 13637.911,-3419.3401 v 0" /> 
  <path d="m 13640.285,-3419.1639 v 0" /> 
  <path d="m 13639.778,-3418.8557 v 0" /> 
  <path d="m 13912.9,-3418.5066 v 0" /> 
  <path d="m 13638.091,-3418.3468 v -0.066" /> 
  <path d="m 13638.091,-3418.4132 v 0.066" /> 
  <path d="m 13907.291,-3418.3067 v 0" /> 
  <path d="m 13630.46,-3416.9666 v 0" /> 
  <path d="m 13632.5,-3416.4402 v 0" /> 
  <path d="m 13630.1,-3415.6601 v 0" /> 
  <path d="m 13509.311,-3431.1668 9.83,15.2999" /> 
  <path d="m 13518.26,-3415.06 v 0" /> 
  <path d="m 13636.58,-3414.8335 v 0" /> 
  <path d="m 13628.61,-3414.8201 8.811,-4.9065" /> 
  <path d="m 13519.141,-3415.8669 -1.39,1.7937" /> 
  <path d="m 13507.93,-3410.9867 v 0" /> 
  <path d="m 13517.751,-3414.0732 -6.582,2.7931" /> 
  <path d="m 13510.181,-3410.8799 v 0" /> 
  <path d="m 13630.209,-3409.8667 -1.599,-4.9534" /> 
  <path d="m 13623.621,-3408.6666 1.779,-0.1335" /> 
  <path d="m 13625.4,-3408.8001 4.809,-1.0666" /> 
  <path d="m 13625.56,-3406.9199 v 0" /> 
  <path d="m 13626.17,-3405.7602 v 0" /> 
  <path d="m 13511.169,-3411.2801 2.681,5.6069" /> 
  <path d="m 13950.211,-3404.5399 v 0" /> 
  <path d="m 13513.85,-3405.6732 3.49,2.4864" /> 
  <path d="m 13512.18,-3401.54 v 0" /> 
  <path d="m 13509.131,-3400.3201 h -0.261" /> 
  <path d="m 13510.069,-3400.3201 h -0.898" /> 
  <path d="m 13517.34,-3403.1868 -3.349,2.8667" /> 
  <path d="m 13627.029,-3400.3201 -3.408,-8.3465" /> 
  <path d="m 13509.171,-3400.3201 h 0.898" /> 
  <path d="m 13508.87,-3400.3201 h 0.261" /> 
  <path d="m 13513.991,-3400.3201 -0.571,0.327" /> 
  <path d="m 13508.85,-3398.7602 v 0" /> 
  <path d="m 13513.42,-3399.9931 -3.18,4.573" /> 
  <path d="m 13507.39,-3394.7399 v 0" /> 
  <path d="m 13623.151,-3394.7399 3.878,-5.5802" /> 
  <path d="m 13881.551,-3394.6201 v 0" /> 
  <path d="m 13881.65,-3394.6133 v 0" /> 
  <path d="m 13881.69,-3394.3268 v 0" /> 
  <path d="m 13881.74,-3394.2669 v 0" /> 
  <path d="m 13510.24,-3395.4201 -4.52,7.4536" /> 
  <path d="m 13505.72,-3387.9665 9.47,0.4463" /> 
  <path d="m 13514.71,-3385.68 v 0" /> 
  <path d="m 13962.08,-3385.2001 v 0" /> 
  <path d="m 13606.57,-3384.0466 16.581,-10.6933" /> 
  <path d="m 13515.19,-3387.5202 4.691,6.2401" /> 
  <path d="m 13519.881,-3381.2801 6.689,3.0002" /> 
  <path d="m 13603.149,-3377.2068 3.421,-6.8398" /> 
  <path d="m 13531.52,-3374.9866 v 0" />
  <path d="m 13602.19,-3374.2268 0.959,-2.98" /> 
  <path d="m 13526.57,-3378.2799 7.021,3.74" /> 
  <path d="m 13601.131,-3372.3534 1.059,-1.8734" /> 
  <path d="m 13599.68,-3370.7802 1.451,-1.5732" /> 
  <path d="m 13536.36,-3369.4733 v 0" /> 
  <path d="m 13533.591,-3374.5399 4.638,5.4466" /> 
  <path d="m 13536.62,-3368.6203 v 0" /> 
  <path d="m 13597.211,-3367.0933 2.469,-3.6869" /> 
  <path d="m 13594.8,-3361.8732 v 0" /> 
  <path d="m 13593.581,-3361.7802 3.63,-5.3131" /> 
  <path d="m 13592.76,-3360.8868 0.821,-0.8934" /> 
  <path d="m 13592.889,-3359.9667 -0.129,-0.9201" /> 
  <path d="m 13538.229,-3369.0933 0.782,9.5466" /> 
  <path d="m 13593.961,-3357.7801 -1.072,-2.1866" /> 
  <path d="m 13539.011,-3359.5467 6.949,4.8466" /> 
  <path d="m 13589.88,-3354.5799 4.081,-3.2002" /> 
  <path d="m 13548.83,-3354.2599 v 0" /> 
  <path d="m 13556.01,-3351.1131 v 0" /> 
  <path d="m 13545.96,-3354.7001 17.55,4.0733" /> 
  <path d="m 13579.5,-3348.9265 10.38,-5.6534" /> 
  <path d="m 13583.18,-3344.9066 v 0" /> 
  <path d="m 13581.7,-3344.5866 v 0" /> 
  <path d="m 13563.51,-3350.6268 15.99,1.7003" /> 
  <path d="m 13969.94,-3311.5734 v 0" /> 
  <path d="m 13983.22,-3304.6066 -8.54,-10.9867 8.54,10.9867" /> 
  <path d="m 13976.92,-3244.2001 v 0" /> 
  <path d="m 13991.75,-3188.5868 v 0" /> 
  <path d="m 14005.17,-3143.7267 v 0" /> 
  <path d="m 14029.86,-3047.2334 v 0" /> 
  <path d="m 14034.2,-2979.2601 v 0" /> 
  <path d="m 14210.95,-2771.5334 v 0" /> 
  <path d="m 14210.271,-2771.52 v 0" /> 
  <path d="m 14212.64,-2767.7334 v 0" /> 
  <path d="m 14214.61,-2766.9867 v 0" /> 
  <path d="m 14215.9,-2765.4467 v 0" /> 
  <path d="m 14218.57,-2761.8999 v 0" /> 
  <path d="m 14221.28,-2748.8867 v 0" /> 
  <path d="m 14220.67,-2748.6 v 0" /> 
  <path d="m 14087.669,-2724.3534 v 0" /> 
  <path d="m 14219.51,-2719.1933 v 0" /> 
  <path d="m 14218.88,-2714.4001 v 0" /> 
  <path d="m 14218.201,-2712.6333 v 0" /> 
  <path d="m 14216.38,-2711.2135 v 0" /> 
  <path d="m 14222,-2710.8133 v 0" /> 
  <path d="m 14224.68,-2708.9468 v 0" /> 
  <path d="m 14218.39,-2708.5333 v 0" /> 
  <path d="m 14217.825,-2704.4218 v 0" /> 
  <path d="m 14217.566,-2704.1681 v 0" /> 
  <path d="m 14222.07,-2703.5267 v 0" /> 
  <path d="m 14217.641,-2703.0666 v 0" /> 
  <path d="m 14212.18,-2671.4733 v 0" /> 
  <path d="m 14216.231,-2666.9867 h -1.811" />
  <path d="m 14214.42,-2666.9867 h 1.811" /> 
  <path d="m 14212.871,-2659.4267 v 0" /> 
  <path d="m 14214.79,-2658.1066 v 0" /> 
  <path d="m 14222.8,-2656.2735 v 0" /> 
  <path d="m 14220.19,-2655.2 v 0" /> 
  <path d="m 14215.63,-2654.2334 v 0" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 2_3.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13396.82117, -2855.545188, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 3_0.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="14056.10897, -4750.342539, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 14096.49,-4547.62 v 0" /> 
  <path d="m 14205.09,-4540.3332 -5.41,-5.88" /> 
  <path d="m 14099.68,-4543.7065 v 7.7064" /> 
  <path d="m 14099.68,-4536.0001 0.77,2.3468" /> 
  <path d="m 14105.22,-4533.6533 -5.54,-10.0532" /> 
  <path d="m 14199.68,-4546.2132 -35.109,1.1467 v 11.4132" /> 
  <path d="m 14217.38,-4533.6533 -12.29,-6.6799" /> 
  <path d="m 14100.45,-4533.6533 h 4.77" /> 
  <path d="m 14164.571,-4533.6533 -6.661,15.9665" /> 
  <path d="m 14234.56,-4517.5735 -17.18,-16.0798" /> 
  <path d="m 14124.67,-4510.1665 7.14,-9.6802 -16.84,-2.7001" /> 
  <path d="m 14114.97,-4522.5468 9.7,12.3803" /> 
  <path d="m 14249.98,-4505.4401 -15.42,-12.1334" /> 
  <path d="m 14157.91,-4517.6868 8.499,14.4535" /> 
  <path d="m 14166.409,-4503.2333 1.815,3.2333" /> 
  <path d="m 14253.822,-4500 -3.842,-5.4401" /> 
  <path d="m 14799.68,-4534.3067 -14.08,0.6534" /> 
  <path d="m 14800.459,-4533.6533 -0.779,-0.6534" /> 
  <path d="M 14865.511,-4533.6533 H 14866" /> 
  <path d="m 14868.919,-4533.6533 h 0.551" /> 
  <path d="m 14870.779,-4533.6533 h 4.441" /> 
  <path d="m 14881.661,-4533.6533 7.879,-17.6532 -11.02,-4.4266 -36.69,22.0798" /> 
  <path d="m 14881.661,-4533.6533 7.879,-17.6532 -11.02,-4.4266 -36.69,22.0798" /> 
  <path d="m 14866,-4533.6533 h 2.919" /> 
  <path d="m 14869.47,-4533.6533 h 1.309" /> 
  <path d="m 14875.22,-4533.6533 h 6.441" /> 
  <path d="m 14841.83,-4533.6533 h -41.371" /> 
  <path d="m 14799.68,-4502.4467 65.831,-31.2066" /> 
  <path d="M 14785.6,-4533.6533 14751.779,-4500" /> 
  <path d="m 14767.108,-4500 h 5.771" /> 
  <path d="m 14797.122,-4500 2.558,-2.4467" /> 
  <path d="m 14168.224,-4500 5.586,12.1067" /> 
  <path d="m 14173.81,-4487.8933 2.55,7.0133" /> 
  <path d="M 14284.28,-4468.8068 14253.822,-4500" />
  <path d="m 14176.36,-4480.88 2.79,13.8932" /> 
  <path d="m 14286.639,-4466.9868 -2.359,-1.82" /> 
  <path d="m 14179.15,-4466.9868 0.1,2.6203" /> 
  <path d="m 14299.68,-4455.7865 -13.041,-11.2003" /> 
  <path d="m 14310.12,-4449.8734 -10.44,-5.9131" /> 
  <path d="m 14179.25,-4464.3665 -4.52,20.9667" /> 
  <path d="m 14142.41,-4442.8867 v 0" /> 
  <path d="m 14129.48,-4441.3799 v 0" /> 
  <path d="m 14327.679,-4440.1669 -17.559,-9.7065" /> 
  <path d="m 14174.73,-4443.3998 -6.329,8.5529" /> 
  <path d="m 14355.971,-4425.3334 -28.292,-14.8335" /> 
  <path d="m 14168.401,-4434.8469 -2.73,13.847" /> 
  <path d="m 14377.73,-4418.4799 -21.759,-6.8535" /> 
  <path d="m 14399.68,-4413.5601 -21.95,-4.9198" /> 
  <path d="m 14400,-4413.5162 -0.32,-0.044" /> 
  <path d="m 14165.671,-4420.9999 0.119,20.6798" /> 
  <path d="m 14165.79,-4400.3201 -0.63,0.8534" /> 
  <path d="m 14165.16,-4399.4667 -4.32,9.0733" /> 
  <path d="m 14160.84,-4390.3934 -27.049,16.5668" /> 
  <path d="m 14133.791,-4373.8266 5.389,25.9865" /> 
  <path d="m 14139.18,-4347.8401 3.149,14.1868" /> 
  <path d="m 14060.29,-4330.7331 v 0" /> 
  <path d="m 14063.04,-4329.5601 -8.16,-4.0932" /> 
  <path d="m 14142.329,-4333.6533 -4.478,5.6408" /> 
  <path d="m 14137.851,-4328.0125 -0.801,0.7794" /> 
  <path d="m 14070.07,-4325.1469 -7.03,-4.4132" /> 
  <path d="m 14126.45,-4320.2465 v 0" /> 
  <path d="m 14099.68,-4323.9933 -15.191,3.8601" /> 
  <path d="m 14137.05,-4327.2331 -8.189,7.4199" /> 
  <path d="m 14084.489,-4320.1332 -14.419,-5.0137" /> 
  <path d="m 14128.861,-4319.8132 -29.181,-4.1801" /> 
  <path d="m 14387,-4284.2999 13,-7.4962" /> 
  <path d="m 14369.141,-4271.3531 17.859,-12.9468" /> 
  <path d="m 14363.181,-4266.9868 5.96,-4.3663" /> 
  <path d="m 14179.939,-4260.2932 7.811,1.5598" /> 
  <path d="m 14141.859,-4257.5134 38.08,-2.7798" /> 
  <path d="m 14352.51,-4257.3864 10.671,-9.6004" /> 
  <path d="m 14053.74,-4258.82 18.851,1.5667" /> 
  <path d="m 14187.75,-4258.7334 8.86,5.88" /> 
  <path d="m 14072.591,-4257.2533 4.759,5.14" /> 
  <path d="m 14196.61,-4252.8534 3.07,1.8669" /> 
  <path d="m 14199.68,-4250.9865 7.901,3.7422" /> 
  <path d="m 14207.46,-4247.2534 0.121,0.01" /> 
  <path d="m 14118.98,-4245.3201 22.879,-12.1933" /> 
  <path d="m 14207.581,-4247.2443 14.689,4.9111" /> 
  <path d="m 14338.91,-4241.5798 13.6,-15.8066" /> 
  <path d="m 14077.35,-4252.1133 13.499,14.0934" />
  <path d="m 14105.49,-4235.2867 13.49,-10.0334" /> 
  <path d="m 14090.849,-4238.0199 8.831,2.9598" /> 
  <path d="m 14099.68,-4235.0601 v 0.4001" /> 
  <path d="m 14222.27,-4242.3332 11.22,7.7801" /> 
  <path d="m 14099.68,-4230.1998 v -0.053" /> 
  <path d="m 14099.68,-4230.2532 5.81,-5.0335" /> 
  <path d="m 14099.68,-4230.1731 v -0.027" /> 
  <path d="m 14099.68,-4234.66 v 4.4869" /> 
  <path d="m 14233.49,-4234.5531 17.439,7.8331" /> 
  <path d="m 14250.929,-4226.72 14.051,5.78" /> 
  <path d="m 14332.471,-4216.0732 6.439,-25.5066" /> 
  <path d="m 14264.98,-4220.94 21.47,7.2735" /> 
  <path d="m 14062.84,-4211.9801 -17.14,-5.7666" /> 
  <path d="m 14076.75,-4209.8068 -13.91,-2.1733" /> 
  <path d="m 14286.45,-4213.6665 13.23,4.1401" /> 
  <path d="m 14299.68,-4209.5264 7.15,3.3664" /> 
  <path d="m 14086.501,-4201.0132 -9.751,-8.7936" /> 
  <path d="m 14087.99,-4200.3201 -1.489,-0.6931" /> 
  <path d="m 14306.83,-4206.16 8.931,5.8399" /> 
  <path d="m 14325.96,-4200.3201 6.511,-15.7531" /> 
  <path d="m 14315.761,-4200.3201 h 10.199" /> 
  <path d="m 14099.68,-4190.0269 -11.69,-10.2932" /> 
  <path d="m 14113.78,-4185.9268 -14.1,-4.1001" /> 
  <path d="m 14118.64,-4180.2532 -4.86,-5.6736" /> 
  <path d="m 14071.001,-4180.9265 18.86,6.0799" /> 
  <path d="m 14105.38,-4172.72 13.26,-7.5332" /> 
  <path d="m 14055.591,-4172.34 15.41,-8.5865" /> 
  <path d="m 14099.68,-4171.7133 5.7,-1.0067" /> 
  <path d="m 14089.861,-4174.8466 9.819,3.1333" /> 
  <path d="m 14091.24,-4155.2532 v 0" /> 
  <path d="m 14099.68,-4148.9468 -5.95,-4.0199" /> 
  <path d="m 14093.73,-4152.9667 -5.479,6.0932" /> 
  <path d="m 14111.6,-4145.62 -11.92,-3.3268" /> 
  <path d="m 14119.31,-4138.7733 -7.71,-6.8467" /> 
  <path d="m 14124.651,-4136.2202 -5.341,-2.5531" /> 
  <path d="m 14088.251,-4146.8735 -6.781,13.2202" /> 
  <path d="m 14143.601,-4133.6533 -18.95,-2.5669" /> 
  <path d="m 14081.47,-4133.6533 -3.61,12.5733" /> 
  <path d="m 14099.68,-4119.6533 7.67,-0.3533" /> 
  <path d="m 14059.419,-4121.6999 -14.509,2.7668" /> 
  <path d="m 14088.19,-4116.6664 11.49,-2.9869" /> 
  <path d="m 14107.35,-4120.0066 11.521,-7.9734 8.758,12.8601" /> 
  <path d="m 14139.639,-4113.3064 3.962,-20.3469" /> 
  <path d="m 14077.86,-4121.08 10.33,4.4136" /> 
  <path d="m 14063.48,-4108.1467 -4.061,-13.5532" /> 
  <path d="m 14127.629,-4115.1199 -5.499,17.9332" /> 
  <path d="m 14772.879,-4500 h 24.243" />
  <path d="m 14751.779,-4500 -41.37,18.1667 4.711,14.8465" /> 
  <path d="M 14730.15,-4466.9868 14767.108,-4500" /> 
  <path d="m 14697.85,-4464.9467 v 0" /> 
  <path d="m 14726.9,-4460.6533 v 0" /> 
  <path d="m 14715.12,-4466.9868 -15.44,9.1201" /> 
  <path d="m 14699.68,-4447.2466 30.47,-19.7402" /> 
  <path d="m 14699.68,-4457.8667 -13.711,12.1201 13.711,-1.5" /> 
  <path d="m 14599.68,-4417.3 49.4,-18.1465 8.679,-10.1334 -41.128,-6.2267 -16.951,18.5333" /> 
  <path d="m 14412.18,-4411.7134 -12.18,-1.8028" /> 
  <path d="m 14412.309,-4411.6734 -0.129,-0.04" /> 
  <path d="m 14424.68,-4411.3068 -12.371,-0.3666" /> 
  <path d="m 14425.78,-4408.6533 -1.1,-2.6535" /> 
  <path d="m 14533.85,-4434.1999 -34.17,26.8398" /> 
  <path d="m 14428.99,-4400.3201 -3.21,-8.3332" /> 
  <path d="m 14499.68,-4407.3601 -8.96,7.04" /> 
  <path d="m 14517.99,-4400.3201 15.86,-33.8798" /> 
  <path d="m 14599.68,-4433.2733 -34.29,32.9532" /> 
  <path d="m 14580.78,-4400.3201 18.9,-16.9799" /> 
  <path d="m 14436.391,-4395.6665 -7.401,-4.6536" /> 
  <path d="m 14455.49,-4392.2466 -19.099,-3.4199" /> 
  <path d="m 14490.72,-4400.3201 -35.23,8.0735" /> 
  <path d="m 14509.97,-4386.1534 8.02,-14.1667" /> 
  <path d="m 14685.229,-4378.9734 v 0" /> 
  <path d="m 14679.089,-4374.5468 v 0" /> 
  <path d="m 14671.44,-4373.3467 v 0" /> 
  <path d="m 14669.73,-4372.1401 v 0" /> 
  <path d="m 14664.549,-4370.2732 27.571,-13.5868 -33.49,3.0334 5.919,10.5534" /> 
  <path d="m 14565.39,-4400.3201 -25.439,17.4069 13.848,17.0399 26.981,-34.4468" /> 
  <path d="m 14635.77,-4361.8732 v 0" /> 
  <path d="m 14524.64,-4361.5868 -14.67,-24.5666" /> 
  <path d="m 14519.949,-4360.8665 4.691,-0.5803" /> 
  <path d="m 14524.06,-4357.0599 v 0" /> 
  <path d="m 14532.44,-4356.9202 v 0" /> 
  <path d="m 14532.84,-4356.6666 v 0" /> 
  <path d="m 14640.48,-4356.6334 v 0" /> 
  <path d="m 14524.64,-4361.4468 10.4,4.7867 -10.4,-4.9267" /> 
  <path d="m 14611.639,-4345.8733 9.18,-7.547 -9.18,7.547" /> 
  <path d="m 14589.819,-4341.6935 v 0" /> 
  <path d="m 14616.38,-4341.3601 v 0" /> 
  <path d="m 14615.23,-4340.7799 v 0" /> 
  <path d="m 14604.37,-4340.2668 v 0" /> 
  <path d="m 14589.09,-4338.1535 v 0" /> 
  <path d="m 14599.68,-4337.5465 v 0.98" /> 
  <path d="m 14599.68,-4336.5665 v -0.98" /> 
  <path d="m 14533.38,-4333.6533 -13.431,-27.2132" /> 
  <path d="m 14571.55,-4333.6533 h 0.549" /> 
  <path d="m 14572.279,-4333.6533 h 0.141" />
  <path d="m 14573.79,-4333.6533 h -15.9" /> 
  <path d="m 14572.099,-4333.6533 h 0.18" /> 
  <path d="m 14572.42,-4333.6533 h 1.37" /> 
  <path d="m 14566.98,-4329.8199 v 0" /> 
  <path d="m 14538.71,-4329.4933 -5.33,-4.16" /> 
  <path d="m 14557.89,-4333.6533 -19.18,4.16" /> 
  <path d="m 14560.86,-4322.4998 v 0" /> 
  <path d="m 14559.99,-4320.5799 v 0" /> 
  <path d="m 14532.68,-4317.4133 38.87,-16.24" /> 
  <path d="m 14512.72,-4306.8333 v 0" /> 
  <path d="m 14509.76,-4304.5734 v 0" /> 
  <path d="m 14499.62,-4299.44 0.06,0.02" /> 
  <path d="m 14499.68,-4299.4202 33,-17.9931" /> 
  <path d="m 14473.109,-4300.1598 26.511,0.7198" /> 
  <path d="m 14459.12,-4295.0134 4.1,-0.1332" /> 
  <path d="m 14486.58,-4294.7132 v 0" /> 
  <path d="m 14448.65,-4294.0201 10.47,-0.9933" /> 
  <path d="m 14422.909,-4299.8135 25.741,5.7934" /> 
  <path d="m 14463.22,-4295.1466 9.889,-5.0132" /> 
  <path d="m 14400.549,-4292.0799 22.36,-7.7336" /> 
  <path d="m 14400,-4291.7961 0.549,-0.2838" /> 
  <path d="m 13691.38,-3784.4666 v 0" /> 
  <path d="m 14005.17,-3143.7267 v 0" /> 
  <path d="m 14029.86,-3047.2334 v 0" /> 
  <path d="m 12368.14,-2591.8533 v 0" /> 
  <path d="m 12346,-2573.4068 v 0" /> 
  <path d="m 12354.12,-2572.48 v 0" /> 
  <path d="m 12355.36,-2571.9933 v 0" /> 
  <path d="m 14034.2,-2979.2601 v 0" /> 
  <path d="m 14210.95,-2771.5334 v 0" /> 
  <path d="m 14210.271,-2771.52 v 0" /> 
  <path d="m 14212.64,-2767.7334 v 0" /> 
  <path d="m 14214.61,-2766.9867 v 0" /> 
  <path d="m 14215.9,-2765.4467 v 0" /> 
  <path d="m 14218.57,-2761.8999 v 0" /> 
  <path d="m 14221.28,-2748.8867 v 0" /> 
  <path d="m 14220.67,-2748.6 v 0" /> 
  <path d="m 14087.669,-2724.3534 v 0" /> 
  <path d="m 14219.51,-2719.1933 v 0" /> 
  <path d="m 14218.88,-2714.4001 v 0" /> 
  <path d="m 14218.201,-2712.6333 v 0" /> 
  <path d="m 14216.38,-2711.2135 v 0" /> 
  <path d="m 14222,-2710.8133 v 0" /> 
  <path d="m 14224.68,-2708.9468 v 0" /> 
  <path d="m 14218.39,-2708.5333 v 0" /> 
  <path d="m 14217.825,-2704.4218 v 0" /> 
  <path d="m 14217.566,-2704.1681 v 0" /> 
  <path d="m 14222.07,-2703.5267 v 0" /> 
  <path d="m 14217.641,-2703.0666 v 0" /> 
  <path d="m 14212.18,-2671.4733 v 0" /> 
  <path d="m 14216.231,-2666.9867 h -1.811" /> 
  <path d="m 14214.42,-2666.9867 h 1.811" /> 
  <path d="m 14212.871,-2659.4267 v 0" />
  <path d="m 14214.79,-2658.1066 v 0" /> 
  <path d="m 14222.8,-2656.2735 v 0" /> 
  <path d="m 14220.19,-2655.2 v 0" /> 
  <path d="m 14215.63,-2654.2334 v 0" /> 
  <path d="m 14127.82,-2541.7732 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 14128.42,-2475.1467 v 0" /> 
  <path d="m 14145.99,-2422.3932 v 0" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 3_1.svg

<details>
<summary>Click see full SVG data</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="14056.10897, -4118.743422, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<!-- Setting coastline drawing properties --> 
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500"> 
<!-- Actual coastline data --> 
  <path d="m 14107.35,-4120.0066 11.521,-7.9734 8.758,12.8601" /> 
  <path d="m 14139.639,-4113.3064 3.962,-20.3469" /> 
  <path d="m 14063.48,-4108.1467 -4.061,-13.5532" /> 
  <path d="m 14064.7,-4102.9934 -1.22,-5.1533" /> 
  <path d="m 14087.74,-4101.1799 v 0" /> 
  <path d="m 14127.629,-4115.1199 -5.499,17.9332" /> 
  <path d="m 14066.08,-4094.8933 -1.38,-8.1001" /> 
  <path d="m 14085.561,-4093.2201 v 0" /> 
  <path d="m 14099.68,-4093.6466 -13.761,3.2001" /> 
  <path d="m 14139.36,-4088.7199 0.279,-24.5865" /> 
  <path d="m 14108.44,-4088.6665 -8.76,-4.9801" /> 
  <path d="m 14122.13,-4097.1867 -13.69,8.5202" /> 
  <path d="m 14085.919,-4090.4465 -19.839,-4.4468" /> 
  <path d="m 14143.871,-4067.0868 -4.511,-21.6331" /> 
  <path d="m 14146.429,-4060.6533 -2.558,-6.4335" /> 
  <path d="m 14164.661,-4047.5266 -18.232,-13.1267" /> 
  <path d="m 14168.31,-4045.0867 -3.649,-2.4399" /> 
  <path d="m 14179.48,-4029.6131 -11.17,-15.4736" /> 
  <path d="m 14184.309,-4013.0936 -4.829,-16.5195" /> 
  <path d="m 14185.539,-4005.6068 -1.23,-7.4868" /> 
  <path d="m 14193.95,-4000.3201 -8.411,-5.2867" /> 
  <path d="m 14194.121,-4000 -0.171,-0.3201" /> 
  <path d="m 14194.89,-3998.9933 -0.769,-1.0067" /> 
  <path d="m 14196.01,-3988.7932 -1.12,-10.2001" /> 
  <path d="m 14197.859,-3983.1066 -1.849,-5.6866" /> 
  <path d="m 14199.68,-3977.8267 -1.821,-5.2799" /> 
  <path d="m 14199.68,-3977.2598 v -0.5669" /> 
  <path d="m 14199.68,-3975.14 v -2.1198" /> 
  <path d="m 14199.68,-3974.8932 v -0.2468" /> 
  <path d="m 14197.51,-3970.3331 2.17,-4.5601" /> 
  <path d="m 14198.84,-3966.8934 v 0" /> 
  <path d="m 14199.68,-3963.0798 -2.17,-7.2533" /> 
  <path d="m 14201.09,-3950.0332 -1.41,-13.0466" /> 
  <path d="m 14199.68,-3948.1735 1.41,-1.8597" />
  <path d="m 14199.68,-3945.1 v -3.0735" /> 
  <path d="m 14203.799,-3941.9132 v 0" /> 
  <path d="M 14199.68,-3940.9801 V -3945.1" /> 
  <path d="m 14199.68,-3939.9799 v -0.3601" /> 
  <path d="m 14199.68,-3940.34 v 0.3601" /> 
  <path d="m 14195.38,-3939.9666 4.3,-1.0135" /> 
  <path d="m 14199.68,-3935.1665 v 0.1796" /> 
  <path d="m 14191.569,-3934.6001 3.811,-5.3665" /> 
  <path d="m 14191.569,-3934.6001 -1.638,0.9468" /> 
  <path d="m 14194.85,-3933.6533 h 0.11" /> 
  <path d="m 14195.21,-3933.6533 4.47,-1.5132" /> 
  <path d="m 14198.171,-3933.6533 1.509,-1.3336" /> 
  <path d="m 14195.21,-3933.6533 h -0.25" /> 
  <path d="m 14194.85,-3933.6533 h -4.919" /> 
  <path d="m 14198.579,-3930.3867 v 0" /> 
  <path d="m 14192.261,-3918.14 5.91,-15.5133" /> 
  <path d="m 14177.071,-3903.4599 15.19,-14.6801" /> 
  <path d="m 14171.44,-3898.6866 5.631,-4.7733" /> 
  <path d="m 14163.22,-3897.1001 8.22,-1.5865" /> 
  <path d="m 14170.96,-3893.8198 v 0" /> 
  <path d="m 14161.33,-3888.1466 1.89,-8.9535" /> 
  <path d="m 14164.34,-3884.1599 v 0" /> 
  <path d="m 14162.52,-3883.0734 v 0" /> 
  <path d="m 14158.54,-3882.4932 2.79,-5.6534" /> 
  <path d="m 14153.07,-3874.9065 5.47,-7.5867" /> 
  <path d="m 14150.52,-3869.1334 2.55,-5.7731" /> 
  <path d="m 14144.6,-3866.9868 5.92,-2.1466" /> 
  <path d="m 14152.879,-3863.06 -8.279,-3.9268" /> 
  <path d="m 14145.999,-3857.6332 6.88,-5.4268" /> 
  <path d="m 14148.09,-3855.8998 -2.091,-1.7334" /> 
  <path d="m 14151.17,-3854.9801 v 0" /> 
  <path d="m 14153.92,-3850.3201 -5.83,-5.5797" /> 
  <path d="m 14149.64,-3848.04 4.28,-2.2801" /> 
  <path d="m 14150,-3847.8535 v 0" /> 
  <path d="m 14152.75,-3843.7668 v 0" /> 
  <path d="m 14159.28,-3842.2733 v 0" /> 
  <path d="m 14159.38,-3839.6198 v 0" /> 
  <path d="m 14150.65,-3839.78 -1.01,-8.26" /> 
  <path d="m 14120.74,-3839.1998 4.13,-1.3867" /> 
  <path d="m 14160.139,-3838.5601 v 0" /> 
  <path d="m 14142.439,-3837.6801 v 0" /> 
  <path d="m 14107.12,-3836.5932 v 0" /> 
  <path d="m 14108.65,-3836.4334 v 0" /> 
  <path d="m 14107.6,-3836.3201 v 0" /> 
  <path d="m 14116.04,-3835.3065 v 0" /> 
  <path d="m 14105.969,-3835.08 6.68,-2.9201" /> 
  <path d="m 14112.36,-3834.8866 v 0" /> 
  <path d="m 14112.18,-3834.8 v 0" /> 
  <path d="m 14111.45,-3834.6066 v 0" /> 
  <path d="m 14111.4,-3834.1133 v 0" /> 
  <path d="m 14124.87,-3840.5865 20.2,6.5464" />
  <path d="m 14103.67,-3833.9867 2.299,-1.0933" /> 
  <path d="m 14105.2,-3833.6533 v 0" /> 
  <path d="m 14105.431,-3833.5667 v 0" /> 
  <path d="m 14111.02,-3833.1333 v 0" /> 
  <path d="m 14110.671,-3832.7534 v 0" /> 
  <path d="m 14112.441,-3832.5733 v 0" /> 
  <path d="m 14106.95,-3832.4398 v 0" /> 
  <path d="m 14112.649,-3838.0001 8.091,-1.1997" /> 
  <path d="m 14116.18,-3831.7532 v 0" /> 
  <path d="m 14103.61,-3830.7201 0.06,-3.2666" /> 
  <path d="m 14140.91,-3828.5465 v 0" /> 
  <path d="m 14103.09,-3828.2333 -0.24,-0.027" /> 
  <path d="m 14103.09,-3828.2333 0.06,0.013" /> 
  <path d="m 14103.149,-3828.22v 0.1133" /> 
  <path d="m 14104.35,-3827.7065 -0.74,-3.0136" /> 
  <path d="m 14103.149,-3828.1067 1.201,0.4002" /> 
  <path d="m 14145.07,-3834.0401 7.35,6.8466 -1.77,-12.5865" /> 
  <path d="m 14157.44,-3826.9268 v 0" /> 
  <path d="m 14150.2,-3824.6399 v 0" /> 
  <path d="m 14096.24,-3817.4198 6.61,-10.8402" /> 
  <path d="m 14094.17,-3813.1935 2.07,-4.2263" /> 
  <path d="m 14092.2,-3804.7134 1.97,-8.4801" /> 
  <path d="m 14091.55,-3800.3201 0.65,-4.3933" /> 
  <path d="m 14091.451,-3799.3668 0.1,-0.9533" /> 
  <path d="m 14093.12,-3789.6332 -1.669,-9.7336" /> 
  <path d="m 14095.931,-3784.1599 -2.811,-5.4733" /> 
  <path d="m 14099.68,-3776.3931 -3.749,-7.7668" /> 
  <path d="m 14099.68,-3776.3931 1.48,4.1931" /> 
  <path d="m 14101.16,-3772.2 0.79,5.0869" /> 
  <path d="m 14102.65,-3757.4734 -0.7,-9.6397" /> 
  <path d="m 14103.5,-3751.3931 -0.85,-6.0803" /> 
  <path d="m 14103.69,-3746.6599 -0.19,-4.7332" /> 
  <path d="m 14103.69,-3742.7132 v -3.9467" /> 
  <path d="m 14103.49,-3742.7067 h 0.171" /> 
  <path d="m 14103.661,-3742.7067 0.03,-0.01" /> 
  <path d="m 14103.56,-3737.3199 -0.07,-5.3868" /> 
  <path d="m 14102.71,-3733.6533 0.85,-3.6666" /> 
  <path d="m 14102.82,-3731.6601 -0.11,-1.9932" /> 
  <path d="m 14101.24,-3724.1001 1.58,-7.56" /> 
  <path d="m 14100.079,-3718.3735 1.161,-5.7266" /> 
  <path d="m 14099.68,-3710.7399 0.399,-7.6336" /> 
  <path d="m 14079.359,-3685.96 20.321,-24.7799" /> 
  <path d="m 14073.34,-3674.86 6.019,-11.1" /> 
  <path d="m 14071.69,-3669.2734 1.65,-5.5866" /> 
  <path d="m 14071.46,-3666.9868 0.23,-2.2866" /> 
  <path d="m 14071.339,-3666.0267 0.121,-0.9601" /> 
  <path d="m 14071.339,-3666.0267 -9.921,17.8681" /> 
  <path d="m 14061.418,-3648.1586 -0.407,5.5095" />
  <path d="m 14061.011,-3642.6491 -1.522,9.0092" /> 
  <path d="m 14055.969,-3625.5798 3.52,-8.0601" /> 
  <path d="m 14057.201,-3618.4601 -1.232,-7.1197" /> 
  <path d="m 14058.62,-3614.2799 -1.419,-4.1802" /> 
  <path d="m 14061.23,-3608.2333 -2.61,-6.0466" /> 
  <path d="m 14065.35,-3600.3201 -4.12,-7.9132" /> 
  <path d="m 14071.17,-3594.0666 -0.03,0.013" /> 
  <path d="m 14069.42,-3593.3399 -4.07,-6.9802" /> 
  <path d="m 14071.139,-3594.0533 0.03,-0.013" /> 
  <path d="m 14073.81,-3587.9333 -4.39,-5.4066" /> 
  <path d="m 14073.981,-3587.36 -0.171,-0.5733" /> 
  <path d="m 14074.409,-3586.52 -0.428,-0.84" /> 
  <path d="m 14084.38,-3575.0401 0.123,0.2053" /> 
  <path d="m 14084.503,-3574.8348 -10.094,-11.6852" /> 
  <path d="m 14085.19,-3574.3866 -0.54,0.06" /> 
  <path d="m 14084.65,-3574.3267 -0.147,-0.5081" /> 
  <path d="m 14086.099,-3574.2931 -0.909,-0.093" /> 
  <path d="m 14073.614,-3569.3485 -0.08,-0.1847" /> 
  <path d="m 14076.12,-3569.7933 9.979,-4.4998" /> 
  <path d="m 14073.614,-3569.3485 2.506,-0.4448" /> 
  <path d="m 14068.581,-3569.82 5.033,0.4715" /> 
  <path d="m 14062.511,-3567.2401 6.07,-2.5799" /> 
  <path d="m 14060.651,-3566.0599 1.86,-1.1802" /> 
  <path d="m 14055.969,-3562.78 4.682,-3.2799" /> 
  <path d="m 14053.67,-3561.1065 2.299,-1.6735" /> 
  <path d="m 14005.17,-3143.7267 v 0" /> 
  <path d="m 14029.86,-3047.2334 v 0" /> 
  <path d="m 12954.25,-2989.2601 v 0" /> 
  <path d="m 12961.909,-2987.66 v 0" /> 
  <path d="m 12987.18,-2981.6067 v 0" /> 
  <path d="m 12953.529,-2967.5865 v 0" /> 
  <path d="m 12970.59,-2960.22 v 0" /> 
  <path d="m 14034.2,-2979.2601 v 0" /> 
  <path d="m 13606.92,-2042.3935 h -0.02" /> 
  <path d="m 15398.19,-2428.4134 v 0" /> 
</g> 
</svg>
```
</details>

- 3_2.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="14056.10897, -3487.144305, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```

- 3_3.svg
Areas without map data.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="14056.10897, -2855.545188, 659.2878, 631.5991" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" > 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
</svg>
```
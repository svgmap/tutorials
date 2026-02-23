# Tutorial 4: Bitmap Image Map Display

## Introduction  

This is a tutorial that overlays some bitmap image maps onto the contents of Tutorial 1.
[Click here](https://svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html) to see it in action .

### File Structure

The file structure is as follows:

- [The tutrial4 directory](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html) contains the following files.
  - [tutorial4.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html)
    - HTML for Tutorial 4. Same content as tutrial1.html.
  - [Container.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/Container.svg)
    - Load the bitmap image bitmapImage.svg to be displayed over the Coastline.svg file, which is the same as in Tutorial 1.
  - [dynamicOSM_r11.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/dynamicOSM_r11.svg)
    - The same OpenStreetMap layer as in Tutorial 2c
- Bitmap image SVG file to overlay.
  - This was created using this tool: [a tool that layers bitmap map images onto SVGMap](https://svgmap.org/devinfo/devkddi/lvl0.1/bitimage2geoInfo/mapPage/).

## Tutorial

### Files Used

- [ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4.zip) of used files
- Source: [Estimated damage from an earthquake directly beneath the capital, page 7](https://www.bousai.go.jp/kyoiku/bousai-vol/drill/h26/tokyo/tokyo03_kato.pdf#page=4)

### tutorial4.html

Basically the same as tutorial2b.html used in Tutorial 2b .

- Loads the SVGMap core program file (SVGMapLv0.1_r18module.js) and makes various SVGMap APIs available.
- Load CSS for layer list UI
- Define the map display area (using a DIV) and load an SVG file (Containers.svg) that contains the layers to be displayed there (layers that are automatically made visible in the SVGMap core program above will be displayed).
- Defines the display of the zoom up, zoom down, and GPS buttons and their behavior when clicked (calling the respective APIs of the SVGMap core program).
  - Zoom up button: Zooms up the map by calling the svgMap.zoomup() API.
  - Zoom down button: Zooms down the map by calling the svgMap.zoomdown() API.
  - GPS button: Calls the svgMap.gps() API to zoom in on the current location (the location of your PC or smartphone, if it can be determined).
- A cross mark indicating the center is displayed.
- Displays the latitude and longitude on the map indicated by the cross mark above (actually, displays the latitude and longitude of the center of the map when moving the map).
- Place a div element (id="layerList") for the layer list UI.

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
<!-- viewport Defines the entire screen as the display area -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading SVGMap's core API -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgMap=svgMap
</script>

<!-- Loading stylesheet for layer list UI -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- Zoom up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to display in the top right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
<!-- Display at the bottom right of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude of the cross mark displayed in the bottom left of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- Latitude and longitude of the cross mark displayed at the bottom left of the screen (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- Show layer list UI -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

### Container.svg

- [As in Tutorial 2c](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c), the bitmap images bitmapImage.svg and dynamicOSM_r11.svg are loaded as layers.
- [As with the additional chapters in Tutorial 2c](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c#.E8.BF.BD.E5.8A.A0.EF.BC.9A.E8.83.8C.E6.99.AF.E5.9C.B0.E5.9B.B3.E3.82.92.E9.81.B8.E3.81.B9.E3.82.8B.E3.82.88.E3.81.86.E3.81.AB.E3.81.99.E3.82.8B), you can choose from two background maps (OpenStreetMap and Coastline.svg).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Background map 1 Japan coastline data (hidden) -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap switch" visibility="hidden"/>
<!-- Background map 2 OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load a bitmap image SVG file as a display state -->
<animation xlink:href="bitmapImage.svg" x="-3000" y="-3000" width="6000" height="6000" title="Bitmap Image SVG" visibility="visible" opacity="0.6"/>

</svg>
```
### bitmapImage.svg

- Bitmap image SVG file to overlay.
  - Created using a [tool](https://svgmap.org/devinfo/devkddi/lvl0.1/bitimage2geoInfo/mapPage/) that layers bit-image map images into SVGMap.
  - The original bit image is extracted from the document at the beginning of this chapter.

#### Relationship between longitude and latitude and XY coordinates of SVG content

```globalCoordinateSystem transform``` Specified by the element attributes (six values ​​of the linear transformation matrix)

```
Xsvg = a * longitude + c * latitude + e 
Ysvg = b * latitude + d * latitude + f
```

Since the values ​​of the linear transformation matrices a, b, c, d, e, and f are 1, 0, 0, -1, 0, 0 respectively,

```
Xsvg = longitude 
Ysvg = -latitude
```

#### Image element parameters

- The bit image is placed using the image element.
  - ```xlink:href="[ビットイメージのURL]"``` URL of the bit image to be placed
  - ```x="139.1063918412553"``` X origin of placement = western longitude (139.10°)
  - ```y="-35.90355823638255"``` X origin to place = negative value of northernmost latitude (35.903°)
  - ```width="0.8140711890480361"``` Width (0.81° longitude)
  - ```height="0.41815015611484085"``` Height (0.41° latitude)
  - ```preserveAspectRatio="none"``` Even if the aspect ratio of the actual size of the bit image is changed, it will be placed exactly in the specified area ([Reference: SVG spec](https://www.w3.org/TR/SVG2/coords.html#PreserveAspectRatioAttribute))

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
 viewBox="139.1063918412553,-35.90355823638255,0.8140711890480361,0.41815015611484085" about="root"> 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/> 

 <image xlink:href="http://www.toshiseibi.metro.tokyo.jp/bosai/chousa_6/parts/kikendo_map.jpg" 
   x="139.1063918412553" 
   y="-35.90355823638255" 
   width="0.8140711890480361" 
   height="0.41815015611484085" 
   preserveAspectRatio="none" 
   opacity="0.5" /> 

</svg>
```

### dynamicOSM_r11.svg (and dynamicOSM_r11.html)

This is the same as [dynamicOSM_r11.svg from Tutorial 2c](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c#dynamicOSM_r11.svg.E3.80.81.28dynamicOSM_r11.html.29).

### Coastline.svg

This is the same one we have been using since [Tutorial 1](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB1#Coastline.svg).
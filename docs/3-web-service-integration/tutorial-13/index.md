# Tutorial 13 WebApp Layer WMS Display according to elastic scrolling

## Introduction {#introduction}

[Using the WebApp Layer mechanism](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0), you can connect to a web service and dynamically display map content according to the display area. We will use the same [GEBCO Web Service as in Tutorial 12](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/).

- Click on [wms2.html](https://svgmap.org/examples/tutorials/wms2/wms2.html) to see it in action .
    - (Note: It may take some time for the WMS to generate and distribute the map.)

## Source Code Directory {#source-code-directory}

- [Source code directory](https://svgmap.org/examples/tutorials/wms2/)
- Gets the display area parameters each time you scroll.
- Use this parameter to construct a query URL to the WMS.
- The image element places the data retrieved from the WMS.
- The previous image element is deleted.

## Tutorial {#tutorial}

We will use a [WMS (Web Map Service)](https://en.wikipedia.org/wiki/Web_Map_Service) to implement a layer as a [WebApp Layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) that can display a map of the displayed area in response to elastic scrolling . As a WMS, we will continue to use [the GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/) from [Tutorial 12](../tutorial-12/index.md).

- [Click here](https://svgmap.org/examples/tutorials/wms2/wms2.html) to see it in action.
- [ZIP archive file](https://www.svgmap.org/examples/tutorials/wms2.zip) of used files

### [wms2.html](https://svgmap.org/examples/tutorials/wms2/wms2.html) {#wms2-html}

There's nothing particularly different from before.

### [Container.svg](https://svgmap.org/examples/tutorials/wms2/Container.svg) {#container-svg}

There's nothing particularly different from before.

### [wms_dynamic.svg](https://svgmap.org/examples/tutorials/wms2/wms_dynamic.svg) {#wms-dynamic-svg}

- ```data-controller="wmsController.html"``` This layer is linked to the WebApp ("wmsController.html").
    - The WebApp performs DOM manipulation to display WMS content every time you scroll.
- The image element is a dummy (it is not displayed because it does not have an xlink:href attribute).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30" data-controller="wmsController.html#exec=appearOnLayerLoad">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <image id="wmsImage" preserveAspectRatio="none" opacity="0.5" />
</svg>
```

### [wmsController.html](https://svgmap.org/examples/tutorials/wms2/wmsController.html), [wmsController.js](https://svgmap.org/examples/tutorials/wms2/wmsController.js) {#wms-controller}

- ```onload``` A function called immediately after the webApp is loaded.
    - ```svgMap.refreshScreen()``` ```preRenderFunction``` This will cause the map to be refreshed immediately after the webapp is loaded .
- ```preRenderFunction``` [This is a callback function that is executed when redrawing occurs](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#preRenderFunction). It is also called when redrawing occurs during elastic scrolling.
    - ```prevImageElement.remove()``` Delete the image from WMS one step before (just before the telescopic scroll occurs)
    - ```svgMap.getGeoViewBox()``` [Get the display area in geographic coordinates](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getGeoViewBox)
    - ```getScreenSize()``` Get the size of the map display screen
    - ```getWMSreq(GEBCOurl, GEBCOlayer, geoViewBox, screenSize)```
        - A function that generates a request URL to GEBCO WMS based on parameters such as display area and screen size.
        - For details on how to set query parameters, see [the explanation about WMS in Tutorial 12](../tutorial-12/index.md#wms-query-parameters).
    - ```getSvgImage(req, geoViewBox)``` A function that generates an image element based on the request URI to the WMS generated above and the area information of the map data.
        - For details on property settings, see [the explanation of the image element in Tutorial 12](../tutorial-12/index.md#image-element-properties).
    - ```svgImage.documentElement.appendChild(newImage)``` Place the generated Image element in the SVG content

wmsController.js

```js
onload=function(){
	svgMap.refreshScreen();
}

var GEBCOurl="https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv";
was GEBCOlayer="GEBCO_LATEST";

where crsAD=1;

function preRenderFunction(){
	var prevImageElement = svgImage.getElementById("wmsImage");
	prevImageElement.remove();
	
	var geoViewBox = svgMap.getGeoViewBox();
	var screenSize = getScreenSize();
	var req = getWMSreq(GEBCOurl, GEBCOlayer, geoViewBox, screenSize);

	var newImage = getSvgImage(req, geoViewBox);
	svgImage.documentElement.appendChild(newImage);
}

function getSvgImage( imageUrl, geoViewBox){
	var imageElement = svgImage.createElement("image");
	imageElement.setAttribute("opacity", 0.5);
	imageElement.setAttribute("preserveAspectRatio", "none");
	imageElement.setAttribute("id", "wmsImage");
	imageElement.setAttribute("xlink:href", imageUrl);
	imageElement.setAttribute("x", geoViewBox.x * crsAD);
	imageElement.setAttribute("y", -(geoViewBox.y+geoViewBox.height) * crsAD); // Set north edge for axis inversion
	imageElement.setAttribute("width", geoViewBox.width * crsAD);
	imageElement.setAttribute("height", geoViewBox.height * crsAD);
	return(imageElement);
}

function getWMSreq(baseUrl, layerName, geoArea, screenSize){
	var wmsArea_x0=geoArea.x;
	var wmsArea_y0=geoArea.y;
	var wmsArea_x1=geoArea.x+geoArea.width;
	var wmsArea_y1=geoArea.y+geoArea.height;
	
	var ans = `${baseUrl}?
	request=GetMap&
	service=WMS&
	version=1.1.1&
	layers=${layerName}&
	srs=EPSG:4326&
	bbox=${wmsArea_x0},${wmsArea_y0},${wmsArea_x1},${wmsArea_y1}&
	width=${screenSize.width}&
	height=${screenSize.height}&
	format=image%2Fpng`;
	
	ans = ans.replace(/\s/g,""); // Remove blank text (including line breaks)
	return ( ans );
}

function getScreenSize(){
	var gvb = svgMap.getGeoViewBox();
	var scale = svgImageProps.scale;
	return {
		width : Math.round(gvb.width * scale),
		height: Math.round(gvb.height * scale),
	}
}
    ```
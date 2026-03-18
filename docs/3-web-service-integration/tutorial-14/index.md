# Tutorial 14: WebApp Layer Vector Geographic Information Service Integration

## Introduction  {#introduction}

We will integrate a service that dynamically generates and distributes vector data into SVGMap.js. Here, we will integrate the [global earthquake occurrence data (GeoJSON version) distributed by the USGS Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

Although it connects to dynamic services, there is no fundamental difference from [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB#.E3.83.81.E3.83.A5.E3.83.BC.E3.83.88.E3.83.AA.E3.82.A2.E3.83.AB6_WebApp_Layer_geoJSON).

- To see it in action, click [geojson2.html](https://svgmap.org/devinfo/devkddi/tutorials/geojson2/geojson2.html).

## Source Code {#source-code}

[Compared to Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB#.E3.83.81.E3.83.A5.E3.83.BC.E3.83.88.E3.83.AA.E3.82.A2.E3.83.AB6_WebApp_Layer_geoJSON), the following differences apply:

- [Source code directory](https://svgmap.org/devinfo/devkddi/tutorials/geojson2/)
- geoJsonExample2.html:
  - Generates a URL for GeoJson requests based on [the USGS Earthquake Hazards Program Feed specification and provides a UI for doing so](https://earthquake.usgs.gov/earthquakes/feed/).
  - Metadata display settings based on the same specifications
  - Updated every 10 minutes

## Tutorial {#tutorial}

We will integrate a service that dynamically generates and distributes vector data into SVGMap.js. Here, we will integrate [real-time global earthquake occurrence data (GeoJSON Real-time Feeds)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) (GeoJSON version) distributed by the USGS Hazards Program. There are basically no differences from [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14#.E3.83.81.E3.83.A5.E3.83.BC.E3.83.88.E3.83.AA.E3.82.A2.E3.83.AB6_WebApp_Layer_geoJSON).

- [Click here](https://svgmap.org/devinfo/devkddi/tutorials/geojson2/geojson2.html) to see it in action .
- [ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/geojson2.zip) of used files

### geojson1.html {#geojson-html}

- There is no particular difference from [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6).

### Container.svg {#container-svg}

- There is no particular difference from [Tutorial 6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6).

### geoJsonExample2.svg {#geojsonexample2}

- The data-controller attribute of the document root element (svg element) specifies [the webApp that controls this layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI).
  - ```data-controller="geoJsonExample2.html#exec=appearOnLayerLoad```
  - ```exec=appearOnLayerLoad``` This setting causes the webApp window to appear when the layer is displayed. ( [For more information, click here](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0) )
- The defs element defines the marker (POI icon).
  - The marker color is left undefined here because it will change depending on the magnitude.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12375.0 -4500.0 2250.0 2250.0" go:dataArea="12375.0 -4500.0 2250.0 2250.0" data-controller="geoJsonExample2.html#exec=appearOnLayerLoad" property="name,address,phone,url"> 

<defs> 
<g id="p0"> 
<circle cx="0" cy="0" r="10" stroke="none"/> 
</g> 
</defs> 

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100.0,0.0,0.0,-100.0,0.0,0.0)" /> 
<g id="mapContents"></g> 
</svg>
```

### geoJsonExample2.html, geoJsonExample2.js {#geojsonexample2}

#### About [the USGS Earthquake GeoJSON Real-time Feeds Service](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

This service delivers real-time updates of earthquake occurrences around the world at one-minute intervals. The output format is GeoJson, and output data can be selected from several options based on time interval and earthquake scale. There is no query part in the request, and updated data is always delivered via the same URL.

#### Code

- A webApp that is linked to geoJsonExample2.svg and can control its DOM
- The following are the differences from Tutorial 6#geoJsonExample1.html
- ```addEventListener("load", function(){..})```
  - ```changeData()``` A function to request and visualize earthquake data based on UI settings.
    - ```getUSGSURL()``` Generate a GET request to retrieve earthquake data from the USGS.
      - We are making a request that performs cross-origin access. The USGS Earthquake GeoJSON Real-time Feeds is access-control-allow-origin: *accessible because it has a response header.
    - ```loadAndDrawGeoJson()``` A function that asynchronously retrieves and renders JSON data
      - ```loadJSON()``` To prevent browser caching, we add a query part that is constantly changing ( there are getTime() better ways to do this , but this is a classic bad tip).
      - ```buildSchema()```
        - When visualizing with the svgMapGIStool.drawGeoJson function, schema data is constructed to adapt to the metadata display framework of SVGMap.js , and is set as the document root element of the SVGMap content.
        - Generates the final argument (metaSchema) passed to the svgMapGIStool.drawGeoJson function.
      - ```setMagColors()```
        - Use the svgMapGIStool.drawGeoJson function's ability to set styles using the properties of each feature to color point features based on their magnitude values.
      - ```svgMapGIStool.drawGeoJson()```
        - ```buildSchema()``` The generated schema ( metaSchema) is given, and the metadata can be displayed properly using the SVGMap.js metadata display framework.
  - ```setInterval(function(){..}..)``` A function that updates periodically at specified intervals (since earthquake data is updated in real time)

geoJsonExample2.html

```html
<!doctype html> 
<html> 
<head> 
	<meta charset="utf-8"/> 
	<title>Sample of drawing geoJson in an SVGMap webApp layer</title> 
</head> 
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script> 
<script src="geoJsonExample2.js"></script> 
<body> 
<h3>area layer</h3> 
<pVisualization of the <a href="https://earthquake.usgs.gov/earthquakes/feed/">USGS Earthquake Hazards Program Feed</a></p> 
Period<select id="dataSelect1" onchange="changeData()"></select><br> 
Scale<select id="dataSelect2" onchange="changeData()"></select> 
<div id="messageDiv"></div> 
</body> 
</html>
```
geoJsonExample2.js

```js
var usgsEarthquakeService="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/"; 
var timeSpanKeys=["hour","day","week","month"]; // Selection for setting the period of distributed data 
var timeSpanDefault=2; // Display data for the past week by default 
var levelKeys=["significant","4.5","2.5","1.0","all"]; // Selection for distributed data by magnitude 
var levelDefault=2; // Display earthquakes of M2.5 or higher by default 
var intervalMinutes=10; // Update every 10 minutes 
var metaSchema; // Store the normalized schema for the metadata display UI when selecting geometry, which is provided as standard in SVGMap.js 

addEventListener("load", function(){ 
	buildDataSelect(); 
	changeData(); 
	setInterval(function(){ 
		changeData(); 
		messageDiv.innerText=new Date().toLocaleString() + " update"; 
	} ,intervalMinutes * 60 * 1000); 
}); 

function changeData(){ 
	var param1 = dataSelect1.selectedIndex; 
	var param2 = dataSelect2.selectedIndex; 
	var path = getUSGSURL(param1,param2); 
	loadAndDrawGeoJson(path); 
} 

async function loadAndDrawGeoJson(dataPath){ 
	var gjs = await loadJSON(dataPath); 
	buildSchema(gjs.features); 
	setMagColors(gjs.features); 
	console.log("geoJson:",gjs); 
	var parentElm = svgImage.getElementById("mapContents"); 
	removeChildren(parentElm); 
	svgMapGIStool.drawGeoJson(gjs, layerID, "orange", 2, "orange", "p0", "poi", "", parentElm, metaSchema); 
	svgMap.refreshScreen(); 
} 

function buildDataSelect(){ 
	var first=true; 
	for ( var i = 0 ; i < timeSpanKeys.length; i++){ 
		var timeSpanKey = timeSpanKeys[i]; 
		var selectedOpt=""; 
		if ( timeSpanDefault == i){ 
			selectedOpt="selected"; 
		} 
		dataSelect1.insertAdjacentHTML('beforeend', `<option value="${timeSpanKey}" ${selectedOpt}>${timeSpanKey}</option>`); 
	} 
	for ( var i = 0 ; i < levelKeys.length ; i++){ 
		var levelKey = levelKeys[i]; 
		var selectedOpt=""; 
		if ( levelDefault == i){ 
			selectedOpt="selected"; 
		} 
		dataSelect2.insertAdjacentHTML('beforeend', `<option value="${levelKey}" ${selectedOpt}>${levelKey}</option>`); 
	} 
} 

async function loadJSON(url){ 
	var response = await fetch(url+"?time="+new Date().getTime()); // To always get the latest data, add a dummy query part. Bad Tips... 
	// https://stackoverflow.com/questions/37204296/cache-invalidation-using-the-query-string-bad-practice 
	// https://stackoverflow.com/questions/9692665/cache-busting-via-params 
	var json = await response.json(); 
	return ( json ); 
} 

function removeChildren(element){
	while (element.firstChild) element.removeChild(element.firstChild); 
} 

function getUSGSURL(timeSpan, level){ 
	if (!timeSpanKeys[timeSpan]){return}; 
	if (!levelKeys[level]){return}; 
	var ans = `${usgsEarthquakeService}${levelKeys[level]}_${timeSpanKeys[timeSpan]}.geojson`; 
	console.log("getUSGSURL:",ans); 
	return (ans); 
} 

function buildSchema(features){ // Generate a normalized schema from the property name of the geojson feature 
	metaSchema={}; 
	for ( var feature of features){ // Trace all data just in 
		case for ( var propName in feature.properties){ 
			if (!metaSchema[propName]){ 
				metaSchema[propName]=true; 
			} 
		} 
	} 
	metaSchema=Object.keys(metaSchema); 
	svgImage.documentElement.setAttribute("property",metaSchema.join()); 
} 

function setMagColors(features){ // Use the styling specifications from [[Guide#drawGeoJson]] to assign colors according to magnitude 
	features.sort(function(a,b){ // Sort by ascending magnitude 
		return(a.properties.mag - b.properties.mag); 
	}); 
	
	for ( var feature of features){ 
		var cmag = feature.properties.mag; 
		// Clip at magnitude 3...7 
		cmag = Math.max(3,cmag); 
		cmag = Math.min(7,cmag); 
		// Convert to hue and generate an RGB color from it 
		var hue = (7-cmag)/(4)*240; 
		var rgb = svgMapGIStool.hsv2rgb(hue,100,100); 
		console.log(rgb); 
		if ( } } 
			console.log( 
	features 
	) 
		; 
}
```

### Appendix: Cross-origin access

[Cross-origin access](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9) ( now a [separate page](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9) )
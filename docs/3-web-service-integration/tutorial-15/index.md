# Tutorial 15: WebApp Layer Elastic Scrolling Compatible Vector Geographic Information Service Integration

## Introduction  {#introduction}

We will connect a service that dynamically generates and distributes vector data to SVGMap.js. Unlike the previous chapter, each time you scroll, the data corresponding to the display area is retrieved from the service and displayed.

Here we will integrate [the Geoname Service API](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249) (Canadian place name data service) provided by Natural Resources Canada .

- To see it in action, click on [vectorService1.html](https://svgmap.org/examples/tutorials/vectorService1/vectorService1.html).
  - (Note: It may take some time for the service to generate and distribute the data.)

## Source Code {#source-code}

- [Source code directory](https://svgmap.org/examples/tutorials/vectorService1/)
- Gets the display area parameters each time you scroll.
- Use these parameters to construct a query URL to the service based on [your specifications](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249) and retrieve the CSV.
- Visualize point data as an SVG use element.
- The data from one step before will be erased.

## Tutorial {#tutorial}

This example integrates a service that dynamically generates and distributes vector data into SVGMap.js. Unlike [Tutorial 14](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14) , this example retrieves and displays data from the service according to the display area each time you scroll. While [Tutorial 14](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14) used a geoJson data service, this example uses CSV data.

[The service to be combined is the Geoname Service API](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249) (Canadian geographic name data service) provided by Natural Resources Canada .

- [Click here](https://svgmap.org/examples/tutorials/vectorService1/vectorService1.html) to see it in action .
- [ZIP archive file](https://www.svgmap.org/examples/tutorials/vectorService1.zip) of used files

### vectorService1.html {#vector-service-1}

- There is no particular difference from [Tutorial 14](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14).

### Container.svg {#container-svg}

- There is no particular difference from [Tutorial 14](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14).

### CanadianGeoNames.svg {#canadian-geo-names-svg}

- There are no particular differences from [Tutorial 14](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB14). The icon color is also fixed to red.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30" data-controller="CanadianGeoNames.html#exec=appearOnLayerLoad">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <defs>
 <g id="p0">
   <circle cx="0" cy="0" r="6" fill="red"/>
 </g>
 </defs>
</svg>
```

### CanadianGeoNames.html, CanadianGeoNames.js {#canadian-geo-names-js}

#### REST API 

This is a bit complicated, so I will summarize the parts of the API provided by [Geographical names in Canada: Geoname Service that we will use this time](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249).

**Query parameters to use**

This time we will use the following two.

- bbox West, South, East, and North coordinates (World Geodetic System degrees) separated by commas
- num Maximum number to output
- .csv extension Although it is not strictly a query parameter, specifying the extension in the path will allow the specified media to be delivered. (The default is html.) In this example, we will use CSV.
- Cross-origin settings This time, we will be accessing a service on another domain, so the web service must allow cross-origin access. [Geographical names in Canada: Geoname Service](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249) appears to be allowed.

**Data delivered**

CSV data based on the query parameters will be returned. The first line is the schema line, and data follows on the second line. It appears to have the following columns. The latitude and longitude columns can be used to place point features on the map, and the name column can be used to set their titles. The other columns can be displayed as properties when you click on a symbol. When retrieving the data, it appears that data containing commas may be escaped with double quotes.

- id
- name
- language.code
- language.href
- syllabic
- feature.id
- feature.href
- category
- status.code
- status.href
- concise.code
- concise.href
- generic.code
- generic.href
- location
- province.code
- province.href
- map
- relevance
- accuracy
- Latitude
- longitude
- decision

#### Code

- ```addEventListener("zoomPanMap", getGeoNames)``` : Each time a zoom scroll occurs, the service is queried, a DOM of the SVGMap content for the associated layer is constructed, and it is visualized.
  - Even if data from the previous step (before the elastic scroll) exists in the current step, it is simply erased and then relocated (more advanced mechanisms such as tiling are not implemented).
- ```getGeoNames()``` : Asynchronous functions visualized along with the service
  - ```svgMap.getGeoViewBox()``` : Get the geographical display area
  - ```getCanadianGeoNamesReq()``` : Construct a query to the service based on the display area
  - ```await getCsv()``` : Asynchronously retrieve and parse CSV using a query
    - ```line.split(...)``` : Parsing with double quotation escape [based on this article](https://www.ipentec.com/document/csharp-read-csv-file-by-regex)
  - ```drawPoints()``` : Visualize the retrieved data. In this example, we create an SVG use element directly from the CSV and visualize it.
    - ```svgImage``` : The SVGMap document object for the layer embedded in the webApp associated with the layer
      -	Reference: [Manual #svgImage](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)
    - ```schema``` : Place a schema in the property of the document element of the associated layer's SVGMap content
      - Reference: [SVGMap.js metadata framework](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)
    - ```"transform", `ref(svg,${lng},${-lat})` ```: Using [TransformRef](https://www.w3.org/TR/SVGTiny12/single-page.html#coords-transform-ref)  in svg1.2 , we have placed an icon that does not change size.
      - Reference: [Supported attributes](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.B1.9E.E6.80.A7)
    - ```"content"``` : Metadata is set in CSV format
    - ```"xlink:href", "#p0"``` : Refer to the symbol (red circle) with id:p0 in the defs element
    - ```svgMap.refreshScreen();``` : Redraw the SVGMap content once the DOM is created
      - Reference: [Redraw Limit](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

CanadianGeoNames.html

```html
<!doctype html>
<html>
<head>
<title>basic dynamic wms layer controller</title>
<meta charset="utf-8"></meta>
</head>
<script src="CanadianGeoNames.js"></script>
<body>
<h3>Canadian GeoNames layer controller</h3>
<p>Get Canadian GeoNames Features from <a href="https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249" target="_blank">Canadian GeoNames Search Service</a></p>
<div id="messageDiv" style="color:red">-</div>
</body>
</html>
```

CanadianGeoNames.js

```js
var canadianGeoNamesService = "https://geogratis.gc.ca/services/geoname/en/geonames.csv";

onload=function(){
	addEventListener("zoomPanMap", getGeoNames);
	getGeoNames();
}


var crsAD=1;
var maxItems=100;

async function getGeoNames(){
	var geoViewBox = svgMap.getGeoViewBox(); // Get the geographic view box
	var req = getCanadianGeoNamesReq(geoViewBox); // Build a query to the service based on the view box
	var csv = await getCsv(req); // Get CSV asynchronously using a query
	if (csv.length > maxItems){ // Display a message if the number is greater than the maximum
		messageDiv.innerText="Exceeded maximum number. Please zoom in.";
	}else{
		messageDiv.innerText="";
	}
	drawPoints(csv); // Visualize the acquired data
}

function getCanadianGeoNamesReq(geoArea){
	var area_x0=geoArea.x;
	var area_y0=geoArea.y;
	var area_x1=geoArea.x+geoArea.width;
	var area_y1=geoArea.y+geoArea.height;
	var ans = `${canadianGeoNamesService}?bbox=${area_x0},${area_y0},${area_x1},${area_y1}&num=${maxItems}`;
	return ( ans );
}

async function getCsv(url){
	var response = await fetch(url);
	var txt = await response.text();
	txt = txt.split("\n");
	var ans = [];
	for ( var line of txt ){
		// https://www.ipentec.com/document/csharp-read-csv-file-by-regex CSV parsing with double quote escaping
		line = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
		if (line.length > 1){
			ans.push(line);
		}
	}
	return ( ans );
}

function drawPoints(csv){
	removeUses();
	var schema = csv[0].join();
	var latCol=csv[0].indexOf("latitude");
	var lngCol=csv[0].indexOf("longitude");
	svgImage.documentElement.setAttribute("property",schema);
	for ( var i = 1 ; i < csv.length ; i++){
		var point = csv[i];
		var meta = point.join();
		var lat = Number(point[latCol]);
		var lng = Number(point[lngCol]);
		var use=svgImage.createElement("use");
		use.setAttribute("xlink:href","#p0");
		use.setAttribute("content",meta);
		use.setAttribute("x",0);
		use.setAttribute("y",0);
		use.setAttribute("transform",`ref(svg,${lng},${-lat})`);
		svgImage.documentElement.appendChild(use);
	}
	svgMap.refreshScreen();
}

function removeUses(){
	var uses = svgImage.getElementsByTagName("use");
	for ( var i = uses.length-1 ; i >=0 ; i--){
		uses[i].remove();
	}
}
```
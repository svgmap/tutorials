# Tutorial 12 Using WMS

## Introduction  {#introduction}

We will display the [Web Map Service (WMS)](https://ja.wikipedia.org/wiki/Web_Map_Service) service , a web service specification that outputs bit image map data according to specified parameters, as an SVGMap layer.

Let's try using the [GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/) ( [global topographic map including the ocean floor](https://ja.wikipedia.org/wiki/%E5%A4%A7%E6%B4%8B%E6%B0%B4%E6%B7%B1%E7%B7%8F%E5%9B%B3) ).

First, let's simply display the map content, regardless of the elastic scrolling. This is basically the same as what we did in [Tutorial 4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4). We just set the query part of the URL according to the WMS specifications.

- Click [wms1.html](https://svgmap.org/examples/tutorials/wms1/wms1.html) to see it in action .
  - (Note: It may take some time for the WMS to generate and distribute the map.)

## Source Code Directory {#source-code-directory}

- [Source code directory](https://svgmap.org/examples/tutorials/wms1/)
- Understand the relationship between WMS parameters and SVGMap content bit image alignment parameters
- The image element places the data retrieved from the WMS.

## Tutorial {#tutorial}

This section explains the most basic method of connecting to [the GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/) , which distributes map data based on [the WMS (Web Map Service)](https://en.wikipedia.org/wiki/Web_Map_Service) specification, which dynamically generates map data for a specified area , and displaying map data.

On the client side, there is no dynamic code implemented, such as JavaScript, and it simply displays a static bit image. Therefore, there is almost no difference from [Tutorial 4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4).

- Click [here](https://svgmap.org/examples/tutorials/wms1/wms1.html) to see it in action.
- [ZIP archive file](https://www.svgmap.org/examples/tutorials/wms1.zip) of used files

### [wms1.html](https://svgmap.org/examples/tutorials/wms1/wms1.html) {#wms1-html}

There's nothing particularly different from before.

### [Container.svg](https://svgmap.org/examples/tutorials/wms1/Container.svg) {#container-svg}

There's nothing particularly different from before.

### [wms_static.svg](https://svgmap.org/examples/tutorials/wms1/wms_static.svg) {#wms-static-svg}

As in [Tutorial 4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4) , we use the image element to place a bit image in the SVGMap content .

In [Tutorial 4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4), we only briefly explained the relationship between image region information and image element parameters, but here we will provide a detailed explanation of the relationship between image region information and image element parameters.

#### WMS query parameters

For details about WMS, please [refer to the specifications](https://www.ogc.org/standards/wms) . Here we will provide the main points.

- Fixed parameters The following are parameters that basically never change when obtaining a bit image of a map.
  - ```request=GetMap```
  - ```service=WMS```
  - ```version=1.1.1```
  - ```format=image/png``` PNG is generally the best data format for most situations. (Lossless, transparent pixels (where there is no data, etc.))
- ```layers=GEBCO_LATEST``` To see what layers are available in GEBCO WMS, use [GEBCO's getcapabilities](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getcapabilities&service=wms&version=1.1.1).
- ```srs=EPSG:4326``` The spatial reference system (a concept that combines a geographic coordinate system and a projection) is specified as [EPSG:4326 (WGS84 coordinate system)](https://spatialreference.org/ref/epsg/wgs-84/).
  - Data in the WGS84 coordinate system (World Geodetic System of X: longitude, Y: latitude) is plotted on a plane linear to that coordinate system (i.e., [equirectangular projection](https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%B7%9D%E5%86%86%E7%AD%92%E5%9B%B3%E6%B3%95)).
- ```bbox=120,20,150,50``` Specify the area to be plotted using the coordinate system (longitude and latitude) specified above.
  - Specify the coordinates of two diagonal points in the order X1, Y1, X2, Y2. Note: Not X, Y, Width, Height.
  - Data is requested for the diagonal regions of 120° longitude, 20° latitude and 150°, 50° latitude.
- ```width=600&height=600``` The size of the bit image to be plotted
  - You are requesting a PNG image with a size of 600 x 600 px.
  - WMS does not maintain the aspect ratio, but outputs a bit image with a changed aspect ratio so that the area specified by the bbox fits exactly within the specified size.

#### Image element properties

Place the bit image obtained via WMS in the SVG image element.

globalCoordinateSystem element description

```<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />```

From this, we can see that the relationship between SVG coordinates (Xsvg, Ysvg) and geographic coordinates (WGS84 system: Xgeo (longitude), Ygeo (latitude)) is as follows.

```
Xsvg = 1 * Xgeo + 0 * Ygeo + 0 ⇒ Xsvg = Xgeo
Ysvg = 0 * Xgeo - 1 * Ygeo + 0 ⇒ Ysvg = -Ygeo
```

The Y axis is important to note. It is inverted (the Y axis in computer graphics points downward, whereas the normal Y axis points upward). This means that when placing graphics in SVG coordinates, the origin position is also reversed (in geographic coordinates, the origin is at the southern end, but in SVG coordinates, the origin is at the northern end).

With that in mind, let's look at the properties of the image element.

- ```xlink:href="[WMSクエリパラメータが設定されたGEVBCO WMSのURL]"```
- ```x="120"``` Origin of the X axis = Longitude of the easternmost point (easternmost point is 120°)
- ```y="-50"``` Origin of the Y axis = negative latitude of the northernmost point (northernmost point is 50°)
- ```width="30"``` Width in X direction = (West end - East end = 150 - 120 = 30°)
- ```height="30"``` Height in Y direction = (North end - South end = 50 - 20 = 30°)
- ```preserveAspectRatio="none"``` In accordance with the WMS bit image generation policy, the aspect ratio is not maintained when placing bit images.
- ```opacity="0.5"``` The transparency is set to 50% to allow some of the background map to be seen.

#### Source

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <image
   xlink:href="https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?
     request=GetMap&
     service=WMS&
     version=1.1.1&
     layers=GEBCO_LATEST&
     srs=EPSG%3A4326&
     bbox=120,20,150,50&
     width=600&
     height=600&
     format=image%2Fpng"
   x="120"
   y="-50"
   width="30"
   height="30"
   preserveAspectRatio="none"
   opacity="0.5"
 />
</svg>
```
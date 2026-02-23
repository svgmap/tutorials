# Tutorial 2c: OpenStreetMap and POI (airport) display (layering)

## Introduction  

In this tutorial, we will use OpenStreetMap as the background map to create a more practical page. [Click here](https://svgmap.org/devinfo/devkddi/tutorials/tutorial2c/tutorial2c.html) to see it in action. This tutorial is the same as Tutorial 2b, except that it uses OpenStreetMap.svg as the background map.

### File Structure

The file structure is as follows:

- The tutrial2c directory contains the following files
  - [tutorial2c.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2c/tutorial2c.html)
- The background map referenced in Container.svg has been replaced from Coastline.svg to dynamicOSM_r11.svg.
  - dynamicOSM_r11.svg is a dynamic content (WebAppLayer) linked with JavaScript code. We will not go into that in this chapter, but will focus on practical layering.
    - Note: Dynamic content is explained in more detail in [the WebApp Layer section](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB#WebApp_Layer.E7.B7.A8).

## Tutorial

### Files Used

- [ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2c.zip) of used files

### Content Structure

```plaintext
tutorial2b.html
 |
 +-img/zoomup.png, img/zoomdown.png, img/gps.png, img/Xcursor.png (images of map operation UI)
 |
 +-js/SVGMapLv0.1_r17.js, js/SVGMapLv0.1_LayerUI2_r4.js (Javascript library for displaying SVGMap)
   |
   +-Container.svg (An SVG file that holds various data (layers))
     |
     +-dynamicOSM_r11.svg (OpenStreetMap layer)
     | |
     | + dynamicOSM_r11.html (WebApp that dynamically generates OpenStreetMap layers)
     |
     +-Airport.svg (actual map layer content (airport points))
```
### tutorial2c.html

This is the same as [Tutorial 2B](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#tutorial2b.html)

### layerListStyle.css

This is the same as [Tutorial 2B](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#tutorial2b.html)

### Container.svg

- Load the SVG files for the two layers you want to display as layers.
  - Coastline.svg
  - Airport.svg
- The layer order is as follows: The lower the row, the higher the layer . SVG Painters Model
- Layer list UI can be grouped by specifying a class
- Referencing layers by animation elements
- Set the initial visibility state using the visibility attribute (if there is no layer list UI, it is impossible to change the initial visibility state)
- The x, y, width, and height values ​​set the maximum possible area.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Background map OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load the SVG file of Japanese airport data as the display state -->
<animation xlink:href="Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Air Port" class="poi" visibility="visible"/>
</svg>
```

### dynamicOSM_r11.svg, (dynamicOSM_r11.html)

- This is the default OpenStreetMap background map layer that replaces Coastline.svg.
- This content is not just SVG content, but a WebAppLayer where content is dynamically generated using JavaScript.
  - dynamicOSM_r11.html is the WebApp content containing the javascript and is linked from dynamicOSM_r11.svg.
  - WebAppLayer will be explained in more detail in Tutorial: WebAppLayer . For now, just think of it as a practical background map layer that can be easily used, where a detailed map will be displayed when zoomed in, by simply replacing Coastline.svg with this.

### Airport.svg

This is the same as [Tutorial 2B](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#tutorial2b.html)

## Added: Allows you to choose background map

In the previous chapter, we replaced Coastline.svg with dynamicOSM_r11.svg, but by using the layer function, users can choose from multiple background maps from the UI.

You can also use the same method to set up multiple add-on information items and switch between them.
  
- Click here to see it in action .
  - If you click on the layer list UI in the upper left corner of the screen, you can choose from two background maps.
- The file used is here

The difference is the contents of Container.svg

### tutorial2c_add.html

[This is the same as the html in the previous chapter](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c#tutorial2c.html), except that the linked container svg is Container_add.svg .

### Container_add.svg

**The key point is the animation** element (there are no other differences).

- Set multiple animation elements for the background map content
- Give each background map a different title attribute
- **Class** attribute
  - Set a common class name for the background map
    - The name specified in the class name will be the name of the group that appears in the layer list UI.
  - Additionally, add a switch to the class name so that only one of the background maps can be selected in the UI. (If you want to be able to display both at the same time, do not add a switch.)
    - class="basemap switch"
- Set everything except the background map you want to display by defaultvisibility="hidden"

#### Source code

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Background map 1 Japan coastline data (hidden) -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap switch" visibility="hidden"/>
<!-- Background map 2 OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load the SVG file of Japanese airport data as the display state -->
<animation xlink:href="Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Air Port" class="poi" visibility="visible"/>
</svg>
```

### Coastline.svg

This is the same as [Tutorial 2B](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#tutorial2b.html)
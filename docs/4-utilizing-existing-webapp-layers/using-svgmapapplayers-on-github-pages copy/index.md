# Copy svgmapAppLayers to your own host and use it

## Introduction  {#introduction}

Download the contents of [svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) and copy (clone) them to a host you have prepared yourself for use. The limitations that existed when referencing GitHub Pages in the previous chapter do not apply.

- [Click here](https://www.svgmap.org/examples/tutorials/ghAppLayersClone/ghAppLayers_clone.html) to see the actual operation.
  - (This sample uses only the Ministry of Land, Infrastructure, Transport and Tourism's road traffic information layers, the CSV authoring tool layer, and basemaps.)

In this chapter, we will copy [the svgmapAppLayers repository](https://github.com/svgmap/svgmapAppLayers) to your own host and use it. There are no [limitations](https://www.svgmap.org/wiki/index.php?title=SvgmapAppLayers_GitHub_Pages%E3%81%AE%E5%88%A9%E7%94%A8#.E5.88.B6.E9.99.90.E4.BA.8B.E9.A0.85) as in the previous chapter, but you will need to be responsible for reflecting updates to the svgmapAppLayers repository yourself.

- [Click here](https://www.svgmap.org/examples/tutorials/ghAppLayersClone/ghAppLayers_clone.html) to see the actual operation.
  - This sample uses only the Ministry of Land, Infrastructure, Transport and Tourism's road traffic information layers, the CSV authoring tool layer, and basemaps.
- The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/ghAppLayersClone.zip).

### Synopsis {#synopsis}

- Download (or clone) [https://github.com/svgmap/svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers).
  - [Download](https://github.com/svgmap/svgmapAppLayers/archive/refs/heads/main.zip) as a zip file (requires extraction).
  - For git clone:　```git clone git@github.com:svgmap/svgmapAppLayers.git```
- Copy the content to the host you operate.
- Edit Container.svg and select the layers you want to include.
- Build a proxy if necessary.

### Procedure {#procedure}

- Duplicate the contents of [svgmapAppLayer](https://github.com/svgmap/svgmapAppLayers).
  - You can download it from the UI at [https://github.com/svgmap/svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) (```<>```Code button ⇒ [Download ZIP](https://github.com/svgmap/svgmapAppLayers/archive/refs/heads/main.zip)) (unzipping should be done in an environment where symbolic links are enabled (such as Linux)), or Clone using the git command　```git clone git@github.com:svgmap/svgmapAppLayers```
- You can delete directories for layers other than the one you want to use.
  - However, the common library (common library) consists of files linked by symbolic links within each directory, so it cannot be deleted in principle. (It is possible to delete files that are not referenced from the directory of the layer being used.)
- The bbs directory within authoringLayers (authoringLayers/bbs) is an implementation of the function to save authored files to the server using PHP. This tutorial will not cover it, so please delete it to prevent unintended server operation.
- Prepare the HTML for the map page (same as in the previous chapter).
- Place the img and js directories and their contents there.
- Set up a proxy service (same as in the previous chapter)
- Edit Container.svg and keep only the necessary layers.

### Directory Structure {#directory-structure}

This sample uses only the Ministry of Land, Infrastructure, Transport and Tourism's road traffic information layers, the CSV authoring tool layer, and basemaps.

```svg
|--Container.svg 
|--appLayers 
| |--mlitRoad 
| |--... 
| 
|--authoringLayers 
| |--local 
| | |--csvLayer 
| | |--... 
| 
|   
| 
--mappin.png 
|   
|--basemaps 
| 
|--... 
|   
| 
--commonLib 
| |--... 
|   
|--js 
| |--... 
|   
|--simpleCORSproxy.php
```

### Container.svg {#container-svg}

This sample uses only the Ministry of Land, Infrastructure, Transport and Tourism's road traffic information layers, the CSV authoring tool layer, and basemaps.

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:go="http://purl.org/svgmap/profile" viewBox="123 -46 22 22" > 

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1.0,0.0,0.0,-1.0,0.0,0.0)" /> 

<!-- Basemap Layers --> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicWMTS.svg" title="sentinel2_2018_WMTS" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=ort" title="DenshiKokudo:orthoPhoto" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=pale" title="DenshiKokudo:Pale" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=relief" title="DenshiKokudo:relief" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg" title="DenshiKokudo" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/osmTileProviders/osmtp.svg" title="OpenStreetMap Etc" class="basemap switch" visibility="hidden"/> 
<animation x="-300" y="-300" width="600" height="600" xlink:href="./basemaps/dynamicOSM_r11.svg" title="OpenStreetMap(Global)" class="basemap switch" visibility="visible"/> 

<!-- Group of authoring tools --> 
<animation xlink:href="./authoringLayers/local/csvLayer/csvXhr_r20.svg" title="CSV data visualization" data-cross-origin-restricted="true" x="-30000" y="-30000" width="60000" height="60000" class="Authoring file editable" opacity="0.75" visibility="hidden"/> 

<!-- Ministry of Land, Infrastructure, Transport and Tourism Road Information --> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/notoEQ2024/notoRoad.svg" title="Reiwa 6 Noto Peninsula Earthquake Road restoration status" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism road information batch clickable" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/doroBosai/kinkyuYuso.svg" title="Emergency Transport Road R" data-cross-origin-proxy-required="true" opacity="0.85" <animation x="-30000" y="-30000" width =" 
  60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=imusho" title="National Highway Offices, etc." data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/>
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=station" title="Roadside Station R" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=kojiyotei" title="Construction Schedule" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=expressway" title="Expressway Pre-Traffic Restriction Section" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=jizenkisei" title="Pre-Traffic Restriction Section R" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=weather" title="Hourly Rainfall" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> < 
  animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=camera" title="Live Camera" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" <animation x="-30000" y="-30000" width= " 
  60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg" title="Traffic Restrictions" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/> 
</svg>
```

## Reference information: Structure of a map page that loads svgmap.js {#reference-information}

By cloning the contents of the following GitHub repository, you can easily create a map web application page using svgmap.js as described in this tutorial. This repository is a GitHub page that publishes one of the official demo pages from svgmap.org, and it comes pre-configured with the extended features of svgmapjs, such as 3D visualization and custom layer management.

[https://github.com/svgmap/svgMapDemo](https://github.com/svgmap/svgMapDemo)

However, the CORS proxy in the source code of the GitHub repository mentioned above is configured specifically for the official demo system of svgmap.org. Therefore, please edit the relevant section of the HTML source code to use a CORS proxy that you have prepared separately for your own site. For information on configuring a CORS proxy, please refer to [this link](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB#.E3.82.AF.E3.83.AD.E3.82.B9.E3.82.AA.E3.83.AA.E3.82.B8.E3.83.B3.E3.82.A2.E3.82.AF.E3.82.BB.E3.82.B9).

Reference: [Official SVGMap demo page from the above GitHub repository](https://svgmap.github.io/svgMapDemo/)
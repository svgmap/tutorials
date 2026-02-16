# Tutorial 2a: Coastline Map and Airport POI Display

## Introduction

This is a tutorial that adds airport POIs [(Points of Interest)](https://ja.wikipedia.org/wiki/Point_of_interest) to the content of [Tutorial 1](../tutorial-1/).

[Click here](https://svgmap.org/devinfo/devkddi/tutorials/tutorial2/tutorial2.html) to see it in action.

### File Structure

The [tutorial2 directory](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2) contains the following files. The file structure is as follows:

- [tutorial2.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2/tutorial2.html)
  - HTML for Tutorial 2. Same content as tutorial1.html.
- Container.svg
  - Load an SVG file for each layer you want to display (only Coastline_Airport.svg is loaded)
- [Coastline_Airport.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2/Coastline_Airport.svg)
  - Adds airport information to Coastline.svg in Tutorial 1.
  - Defines the airport display image and describes the actual airport information (latitude/longitude, image used, title, information displayed upon clicking).
  - HTTP links can also be described alongside airport information. In this case, the following actions become possible:
    - Clicking an airport image navigates to another webpage.
    - Adding a hash to the current URL changes the map display position.
    - The above settings can be configured for a single airport (a dialogue box appears after clicking, allowing selection between displaying airport information or navigating to the URL).

## Tutorial

### Files Used

[ZIP archive file](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial2.zip) of the files used in this tutorial.

### Content Structure

```plaintext
tutorial2.html
 |
 +-img/zoomup.png, img/zoomdown.png, img/gps.png, img/Xcursor.png (images of map operation UI)
 |
 +-js/SVGMapLv0.1_r17.js, js/SVGMapLv0.1_LayerUI2_r4.js (Javascript library for displaying SVGMap)
   |
   +-Container.svg (Loads an SVG file that serves as a bundle for various data (layers))
     |
     +-Coastline_Airport.svg (actual map content (coastline and airport points))
```

### tutorial2.html

Basically the same as tutorial1.html used in Tutorial 1.

- Loads the SVGMap core program file (SVGMapLv0.1_r18module.js) and makes various SVGMap APIs available.
- Defines the map display area (using a DIV) and loads an SVG file (Containers.svg) that contains the layers to be displayed (layers that are automatically made visible in the SVGMap core program above will be displayed).
- Defines the display of the zoom up, zoom down, and GPS buttons and their behavior when clicked (calling the respective APIs of the SVGMap core program).
  - Zoom up the map by calling the svgMap.zoomup() API.
  - Zoom down the zoom down button: svgMap.zoomdown() Zoom down the map by calling the API.
  - GPS button: svgMap.gps() By calling the API, zoom up and display around the current location (only if the position of the PC or smartphone can be identified).
- A cross mark indicating the center is displayed.
- Displays the latitude and longitude on the map indicated by the cross mark above (actually, displays the latitude and longitude of the center of the map when moving the map).

```html
<!DOCTYPE html>
<html>
  <title>SVGMapLevel0.1-Rev14-Draft Tutorial2 Coastline & Air Port</title>
  <!-- viewport Defines the entire screen as the display area -->
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0"
  />
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

  <!-- Loading SVGMap's core API -->
  <script type="module">
    import { svgMap } from "https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js";
    window.svgMap = svgMap;
  </script>

  <body bgcolor="#ffffff" style="overflow:hidden;">
    <!-- Loading a container file (Container.svg) containing multiple map SVG files (only one file in this tutorial) -->
    <div id="mapcanvas" data-src="Container.svg"></div>
    <div id="gui">
      <!-- Zoom up button -->
      <img
        id="zoomupButton"
        style="left: 5px; top: 5px; position: absolute;"
        src="./img/zoomup.png"
        onclick="svgMap.zoomup()"
        width="20"
        height="20"
      />
      <!-- Zoom down button -->
      <img
        id="zoomdownButton"
        style="left: 5px; top: 25px; position: absolute;"
        src="./img/zoomdown.png"
        onclick="svgMap.zoomdown()"
        width="20"
        height="20"
      />
      <!-- GPS button -->
      <img
        id="gpsButton"
        style="left: 5px; top: 45px; position: absolute;"
        src="./img/gps.png"
        onclick="svgMap.gps()"
        width="20"
        height="20"
      />
      <!-- Title to display in the top right corner of the screen -->
      <font color="blue" style="right: 5px; top: 5px; position: absolute;"
        >SVGMapLevel0.1 Rev14 Draft : Tutorial2 Coastline & Air Port</font
      >
      <!-- Display at the bottom right of the screen -->
      <font
        color="blue"
        style="right: 5px; bottom: 5px; position: absolute;"
        size="-2"
        >by SVGMap tech.</font
      >
      <!-- Cross mark displayed in the center -->
      <img
        id="centerSight"
        style="opacity:0.5"
        src="./img/Xcursor.png"
        width="15"
        height="15"
      />
      <!-- Latitude and longitude of the cross mark displayed in the bottom left of the screen (title) -->
      <font
        id="posCmt"
        size="-2"
        color="brown"
        style="left: 5px; bottom: 5px; position: absolute;"
        >Lat,Lng:</font
      >
      <!-- Latitude and longitude of the cross mark displayed at the bottom left of the screen (initial display of actual values) -->
      <font
        id="centerPos"
        size="-2"
        color="brown"
        style="left: 50px; bottom: 5px; position: absolute;"
        >lat , lng</font
      >
    </div>
  </body>
</html>
```

### Container.svg

Load an SVG file for each layer you want to display (only Coastline_Airport.svg is loaded).

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Load the SVG file of Japan's coastline and airport data as a display state -->
<animation xlink:href="Coastline_Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline and Air Port" class="editable" visibility="visible"/>

</svg>
```

### Coastline_Airport.svg

- Added airport information to Coastline.svg in Tutorial 1.
- **Drawing proceeds from the top row**, so first write the background (coastline), then write the point data (additional information).

#### How to write point data (POI)

##### Defining icons using the defs element

- **Within the defs element**, define the icons to be used within that SVG file.
- Each individual icon is defined using a **g** element placed as its child element.
  - Assign an ID to the g element to reference the icon.
  - Describe the actual icon within the g element. Here, an image element is used to employ a bitmap image as the icon.
- For bitmap icons using the image element:
  - Specify the icon size using the width and height attributes.
  - Use the x and y attributes to define the origin (anchor point).
    - This determines which part of the bitmap icon corresponds to the point geometry's coordinates. For instance, when using an icon shaped like a pin, it is advisable to set the pin's tip as the origin.
    - Specifies the shift amount of the POI icon's origin relative to the bitmap image's origin (top-left). The shift value is typically negative.
    - In this sample, for an icon size of 19x27, specifying x="-8" y="-25" sets the origin to (almost) the bottom-left corner, centred.

##### Placing POI data using the use element

- References the icon defined by the **xlink:href** attribute.
- Coordinates for point data are set in the **transform** attribute for use with the feature described later (Non-scaling Object) (set x and y attributes to 0).
- Describe metadata in the **content** attribute, separated by commas. This metadata is displayed when the icon is clicked.
  - Define the airport display image and describe the actual airport information (latitude/longitude, image used, title, information displayed on click).
  - Using the **property** attribute of the **svg** element (documentElement), metadata attribute names can be specified in CSV format to enable organised display upon clicking.
  - The number of entries in the CSV for the **property** attribute (metadata names) must match the number of entries in the CSV for the **content** attribute (metadata values).

- Note:
  - By embedding the use element within the **a** element, hyperlinks can be described alongside airline information. In this case, the following functionality is possible:
  - Clicking the airport image will navigate to another webpage.
  - The above functionality can be configured for a single airport (a dialogue box will appear after clicking, allowing selection between displaying airline information or navigating to the URL).

#### Source Code

<details>
<summary>Expand to see source code</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -4750.342539, 2637.1512, 2526.396468" xmlns:go="http://purl.org/svgmap/profile" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />
<!-- Image settings for POI -->
 <defs>
  <g id="syl5" >
   <image xlink:href="./img/mappin1.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl6" >
   <image xlink:href="./img/mappin2.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl7" >
   <image xlink:href="./img/mappin2.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl8" >
   <image xlink:href="./img/mappin3.png" preserveAspectRatio="none" x="-5.6" y="-17.5" width="13.3" height="18.9"/>
  </g>
  <g id="syl9" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl10" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl11" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl12" >
   <image xlink:href="./img/mappin5.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl13" >
   <image xlink:href="./img/mappin3.png" preserveAspectRatio="none" x="-4" y="-12.5" width="9.5" height="13.5"/>
  </g>
 </defs>

<!-- Set coastline drawing properties -->
<g style="stroke: #000000" fill="none" fill-rule="evenodd" stroke="green" stroke-width="1" opacity="1" vector-effect="non-scaling-stroke" stroke-linejoin="bevel" visibleMaxZoom="500">
<!-- Actual coastline data -->
<path d="M14096.4905,-4547.62L14096.4905,-4547.62"/>
<path d="M14205.0903,-4540.3332L14199.6796,-4546.2132"/>
<!--
 .....
 omission
 .....
-->
<path d="M14145.99,-2422.3932L14145.99,-2422.3932"/>
<path d="M15398.1903,-2428.4134L15398.1903,-2428.4134"/>
<!-- Total:2641 records. -->
</g>

<!-- Airport Information -->
<!-- Draw ug:POI using defs-ed symbols -->
 <use transform="ref(svg,14179.54536,-4539.8095)" x="0" y="0" xlink:href="#syl6" content="WKJ/RJCW,Base (Country),45.398095,141.7954536,Wakkanai Airport,Wakkanai City, Hokkaido,2000×45(08/26)" xlink:title="Wakkanai Airport"/>

 <use transform="ref(svg,14118.37511,-4524.39994)" x="0" y="0" xlink:href="#syl8" content="RIS/RJER,Local Management,45.2439994,141.1837511,Rishiri Airport,Rishirifuji Town,Rishiri District,Hokkaido,1800×45(07/25)" xlink:title="Rishiri Airport"/>

 <use transform="ref(svg,14245.81628,-4366.90539)" x="0" y="0" xlink:href="#syl7" content="AKJ/RJEC,Base (Location),43.6690539,142.4581628,Asahikawa Airport,Higashikagura-cho,Kamikawa-gun,Hokkaido,2500×60(16/34)" xlink:title="Asahikawa Airport"/>

 <use transform="ref(svg,14340.76139,-4430.68353)" x="0" y="0" xlink:href="#syl8" content="MBE/RJEB,Locally Managed,44.3068353,143.4076139,Monbetsu Airport,Monbetsu City, Hokkaido,2000×45(14/32)" xlink:title="Monbetsu Airport"/>

 <use transform="ref(svg,14415.86869,-4388.14367)" x="0" y="0" xlink:href="#syl8" content="MMB/RJCM,Locally Managed,43.8814367,144.1586869,Memanbetsu Airport,Ozora Town, Abashiri District, Hokkaido,2500×45(18/36)" xlink:title="Memanbetsu Airport"/>

 <use transform="ref(svg,14495.63417,-4356.79867)" x="0" y="0" xlink:href="#syl8" content="SHB/RJCN,Local Management,43.5679867,144.9563417,Nakashibetsu Airport,Nakashibetsu Town, Shibetsu District, Hokkaido,2000×45(08/26)" xlink:title="Nakashibetsu Airport"/>

 <use transform="ref(svg,14421.14861,-4302.77597)" x="0" y="0" xlink:href="#syl6" content="KUH/RJCK,Base (Country),43.0277597,144.2114861,Kushiro Airport,Kushiro City, Hokkaido,2500×45(17/35)" xlink:title="Kushiro Airport"/>

 <use transform="ref(svg,14321.28353,-4273.22117)" x="0" y="0" xlink:href="#syl7" content="OBO/RJCB,Base (Location),42.7322117,143.2128353,Obihiro Airport,Obihiro City, Hokkaido,2500×45(17/35)" xlink:title="Obihiro Airport"/>

 <use transform="ref(svg,14136.76408,-4310.85172)" x="0" y="0" xlink:href="#syl10" content="SPK/RJCO,GSDF/Joint-Use,43.1085172,141.3676408,Sapporo Okadama Airport,Sapporo,Hokkaido,1500×45(14/32)" xlink:title="Sapporo Okadama Airport"/>

 <use transform="ref(svg,14081.53264,-4177.59875)" x="0" y="0" xlink:href="#syl6" content="HKD/RJCH,Base (Country),41.7759875,140.8153264,Hakodate Airport,Hakodate City, Hokkaido,3000×45(12/30)" xlink:title="Hakodate Airport"/>

 <use transform="ref(svg,14168.9825,-4278.69075)" x="0" y="0" xlink:href="#syl6" content="CTS/RJCC,Base (Country),42.7869075,141.689825,New Chitose Airport,Chitose City,Hokkaido,(A)3000×60(01L/19R)" xlink:title="New Chitose Airport"/>

 <use transform="ref(svg,13944.468,-4206.82092)" x="0" y="0" xlink:href="#syl8" content="OIR/RJEO,Locally Managed,42.0682092,139.44468,Okushiri Airport,Okushiri Town,Okushiri District,Hokkaido,1500×45(12/30)" xlink:title="Okushiri Airport"/>

 <use transform="ref(svg,14067.56139,-4072.87761)" x="0" y="0" xlink:href="#syl8" content="AOJ/RJSA,Local Administration,40.7287761,140.6756139,Aomori Airport,Aomori City,Aomori Prefecture,3000×60(06/24)" xlink:title="Aomori Airport"/>

 <use transform="ref(svg,14138.74264,-4069.16497)" x="0" y="0" xlink:href="#syl12" content="MSJ/RJSM, US Military/Shared,40.6916497,141.3874264,Misawa Airport, Misawa City, Aomori Prefecture, 3050×45(10/28)" xlink:title="Misawa Airport"/>

 <use transform="ref(svg,14113.06225,-3942.93206)" x="0" y="0" xlink:href="#syl8" content="HNA/RJSI,Locally Managed,39.4293206,141.1306225,Hanamaki Airport,Hanamaki City, Iwate Prefecture,2500×45(02/20)" xlink:title="Hanamaki Airport"/>

 <use transform="ref(svg,14021.30644,-3961.1885)" x="0" y="0" xlink:href="#syl7" content="AXT/RJSK,Base (Location),39.611885,140.2130644,Akita Airport,Akita City,Akita Prefecture,2500×60(10/28)" xlink:title="Akita Airport"/>

 <use transform="ref(svg,14037.20758,-4019.54628)" x="0" y="0" xlink:href="#syl8" content="ONJ/RJSR,Local Management,40.1954628,140.3720758,Odate Noshiro Airport,Kitaakita City, Akita Prefecture,2000×45(11/29)" xlink:title="Odate Noshiro Airport"/>

 <use transform="ref(svg,13977.99947,-3883.06025)" x="0" y="0" xlink:href="#syl8" content="SYO/RJSY,Locally Managed,38.8306025,139.7799947,Shonai Airport,Sakata City,Yamagata Prefecture,2000×45(09/27)" xlink:title="Shonai Airport"/>

 <use transform="ref(svg,14036.17906,-3840.75203)" x="0" y="0" xlink:href="#syl7" content="GAJ/RJSC,Base (Location),38.4075203,140.3617906,Yamagata Airport,Higashine City,Yamagata Prefecture,2000×45(01/19)" xlink:title="Yamagata Airport"/>

 <use transform="ref(svg,14092.94397,-3813.79306)" x="0" y="0" xlink:href="#syl6" content="SDJ/RJSS,Base (Country),38.1379306,140.9294397,Sendai Airport,Natori City, Miyagi Prefecture,(A)1200×45(12/30)" xlink:title="Sendai Airport"/>

 <use transform="ref(svg,14040.196,-3722.91308)" x="0" y="0" xlink:href="#syl8" content="FKS/RJSF,Local Management,37.2291308,140.40196,Fukushima Airport,Tamagawa Village, Ishikawa County, Fukushima Prefecture,2500×60(01/19)" xlink:title="Fukushima Airport"/>

 <use transform="ref(svg,14040.44017,-3617.84106)" x="0" y="0" xlink:href="#syl9" content="IBR/RJAH,ASDF/Joint-Use,36.1784106,140.4044017,Ibaraki Airport,Omitama City,Ibaraki Prefecture,(A)2700×45(03R/21L)" xlink:title="Ibaraki Airport"/>

 <use transform="ref(svg,14038.88606,-3576.66103)" x="0" y="0" xlink:href="#syl5" content="NRT/RJAA,Base (Association),35.7666103,140.3888606,Narita International Airport,Narita City, Chiba Prefecture,(A)4000×60(16R/34L)" xlink:title="Narita International Airport"/>

 <use transform="ref(svg,13978.32156,-3555.07211)" x="0" y="0" xlink:href="#syl6" content="HND/RJTT,Base (Country),35.5507211,139.7832156,Tokyo International Airport,Ota Ward,Tokyo,(A)3000×60(16R/34L)" xlink:title="Tokyo International Airport"/>

 <use transform="ref(svg,13953.74194,-3566.85689)" x="0" y="0" xlink:href="#syl13" content="***/RJTF,Other,35.6685689,139.5374194,Chōfu Airport,Chofu City,Tokyo,800×30(17/35)" xlink:title="Chōfu Airport"/>

 <use transform="ref(svg,13936.33606,-3477.55611)" x="0" y="0" xlink:href="#syl8" content="OIM/RJTO,Local Administration,34.7755611,139.3633606,Oshima Airport,Oshima-cho,Tokyo,1800×45(03/21)" xlink:title="Oshima Airport"/>

 <use transform="ref(svg,13925.98347,-3437.18567)" x="0" y="0" xlink:href="#syl8" content="***/RJAN,Local Administration,34.3718567,139.2598347,Niijima Airport,Niijima Village,Tokyo,800×25(11/29)" xlink:title="Niijima Airport"/>

 <use transform="ref(svg,13913.48717,-3419.04644)" x="0" y="0" xlink:href="#syl8" content="***/RJAZ,Local Management,34.1904644,139.1348717,Kozushima Airport,Kozushima Village,Tokyo,800×25(11/29)" xlink:title="Kozushima Airport"/>

 <use transform="ref(svg,13955.60792,-3406.89564)" x="0" y="0" xlink:href="#syl8" content="MYE/RJTQ,Local Management,34.0689564,139.5560792,Miyakejima Airport,Miyake Village,Tokyo,1200×30(02/20)" xlink:title="Miyakejima Airport"/>

 <use transform="ref(svg,13977.97953,-3311.65797)" x="0" y="0" xlink:href="#syl8" content="HAC/RJTH,Local Management,33.1165797,139.7797953,Hachijojima Airport,Hachijo-cho,Tokyo,1800×45(07/25)" xlink:title="Hachijojima Airport"/>

 <use transform="ref(svg,13911.42792,-3795.19908)" x="0" y="0" xlink:href="#syl6" content="KIJ/RJSN,Base (Country),37.9519908,139.1142792,Niigata Airport,Niigata City,Niigata Prefecture,(A)1314×45(04/22)" xlink:title="Niigata Airport"/>

 <use transform="ref(svg,13718.94392,-3664.31019)" x="0" y="0" xlink:href="#syl8" content="TOY/RJNT,Locally Managed,36.6431019,137.1894392,Toyama Airport,Toyama City,Toyama Prefecture,2000×45(02/20)" xlink:title="Toyama Airport"/>

 <use transform="ref(svg,13641.27908,-3640.18053)" x="0" y="0" xlink:href="#syl9" content="KMQ/RJNK,ASDF/Joint-Use,36.4018053,136.4127908,Komatsu Airport,Komatsu City, Ishikawa Prefecture,2700×45(06/24)" xlink:title="Komatsu Airport"/>

 <use transform="ref(svg,13692.68697,-3728.52464)" x="0" y="0" xlink:href="#syl8" content="NTQ/RJNW,Local Management,37.2852464,136.9268697,Noto Airport,Wajima City,Ishikawa Prefecture,2000×45(07/25)" xlink:title="Noto Airport"/>

 <use transform="ref(svg,13793.25142,-3618.64958)" x="0" y="0" xlink:href="#syl8" content="MMJ/RJAF,Locally Managed,36.1864958,137.9325142,Matsumoto Airport,Matsumoto City, Nagano Prefecture,2000×45(18/36)" xlink:title="Matsumoto Airport"/>

 <use transform="ref(svg,13691.94908,-3525.37731)" x="0" y="0" xlink:href="#syl13" content="NKM/RJNA,Other,35.2537731,136.9194908,Nagoya Airport,Toyoyama-cho, Nishikasugai-gun, Aichi Prefecture,2740×45(16/34)" xlink:title="Nagoya Airport"/>

 <use transform="ref(svg,13681.46917,-3485.89817)" x="0" y="0" xlink:href="#syl5" content="NGO/RJGG,Base (Association),34.8589817,136.8146917,Central Japan International Airport,Tokoname City,Aichi Prefecture,3500×60(18/36)" xlink:title="Central Japan International Airport"/>

 <use transform="ref(svg,13818.35372,-3479.35906)" x="0" y="0" xlink:href="#syl8" content="FSZ/RJNS,Local Management,34.7935906,138.1835372,Shizuoka Airport,Makinohara City, Shizuoka Prefecture,2500×60(12/30)" xlink:title="Shizuoka Airport"/>

 <use transform="ref(svg,13544.25181,-3479.01583)" x="0" y="0" xlink:href="#syl6" content="ITM/RJOO,Base (Country),34.7901583,135.4425181,Osaka International Airport,Toyonaka City, Osaka Prefecture,(A)1828×45(14L/32R)" xlink:title="Osaka International Airport"/>

 <use transform="ref(svg,13524.41067,-3443.52619)" x="0" y="0" xlink:href="#syl5" content="KIX/RJBB,Base (Meeting),34.4352619,135.2441067,Kansai International Airport,Izumisano City,Osaka Prefecture,(A)3500×60(06R/24L)" xlink:title="Kansai International Airport"/>

 <use transform="ref(svg,13523.786959,-3463.670469)" x="0" y="0" xlink:href="#syl8" content="UKB/RJBE,Local Administration,34.63670469,135.23786959,Kobe Airport,Kobe City,Hyogo Prefecture,2500×60(09/27)" xlink:title="Kobe Airport"/>

 <use transform="ref(svg,13478.95714,-3551.62906)" x="0" y="0" xlink:href="#syl13" content="TKG/RJBT,Other,35.5162906,134.7895714,Tajima Airport,Toyooka City, Hyogo Prefecture,1200×30(01/19)" xlink:title="Tajima Airport"/>

 <use transform="ref(svg,13535.71056,-3366.6415)" x="0" y="0" xlink:href="#syl8" content="SHM/RJBD,Local Management,33.666415,135.3571056,Nanki Shirahama Airport, Shirahama Town, Nishimuro District, Wakayama Prefecture, 2000×45(15/33)" xlink:title="Nanki Shirahama Airport"/>

 <use transform="ref(svg,13416.31778,-3552.39886)" x="0" y="0" xlink:href="#syl8" content="TTJ/RJOR,Locally Managed,35.5239886,134.1631778,Tottori Airport,Tottori City, Tottori Prefecture,2000×45(10/28)" xlink:title="Tottori Airport"/>

 <use transform="ref(svg,13325.44933,-3549.91892)" x="0" y="0" xlink:href="#syl9" content="YGJ/RJOH,ASDF/Joint-Use,35.4991892,133.2544933,Yonago Airport,Sakaiminato City,Tottori Prefecture,2500×45(07/25)" xlink:title="Yonago Airport"/>

 <use transform="ref(svg,13285.30253,-3539.616)" x="0" y="0" xlink:href="#syl8" content="IZO/RJOC,Locally Managed,35.39616,132.8530253,Izumo Airport,Hikawa Town, Hikawa District, Shimane Prefecture,2000×45(07/25)" xlink:title="Izumo Airport"/>

 <use transform="ref(svg,13333.02447,-3617.75225)" x="0" y="0" xlink:href="#syl8" content="OKI/RJNO,Local Management,36.1775225,133.3302447,Oki Airport,Okinoshima Town, Oki District, Shimane Prefecture,2000×45(08/26)" xlink:title="Oki Airport"/>

 <use transform="ref(svg,13179.47744,-3467.99842)" x="0" y="0" xlink:href="#syl8" content="IWJ/RJOW,Locally Managed,34.6799842,131.7947744,Iwami Airport,Masuda City,Shimane Prefecture,2000×45(11/29)" xlink:title="Iwami Airport"/>

 <use transform="ref(svg,13385.40253,-3476.23728)" x="0" y="0" xlink:href="#syl8" content="OKJ/RJOB,Local Management,34.7623728,133.8540253,Okayama Airport,Okayama City,Okayama Prefecture,3000×45(07/25)" xlink:title="Okayama Airport"/>

 <use transform="ref(svg,13291.88794,-3443.98678)" x="0" y="0" xlink:href="#syl6" content="HIJ/RJOA,Base (Country),34.4398678,132.9188794,Hiroshima Airport,Mihara City,Hiroshima Prefecture,3000×60(10/28)" xlink:title="Hiroshima Airport"/>

 <use transform="ref(svg,13127.49725,-3393.30717)" x="0" y="0" xlink:href="#syl7" content="UBJ/RJDC,Base (Location),33.9330717,131.2749725,Yamaguchi Ube Airport,Ube City,Yamaguchi Prefecture,2500×45(07/25)" xlink:title="Yamaguchi Ube Airport"/>

 <use transform="ref(svg,13221.98611,-3415.45625)" x="0" y="0" xlink:href="#syl12" content="IWK/RJOI, US Military/Shared, 34.1545625, 132.2198611, Iwakuni Airport, Iwakuni City, Yamaguchi Prefecture, 2440×60(02/20)" xlink:title="Iwakuni Airport"/>

 <use transform="ref(svg,13403.62042,-3430.38936)" x="0" y="0" xlink:href="#syl6" content="TAK/RJOT,Base (Country),34.3038936,134.0362042,Takamatsu Airport,Takamatsu City,Kagawa Prefecture,2500×45(08/26)" xlink:title="Takamatsu Airport"/>

 <use transform="ref(svg,13457.84253,-3414.22669)" x="0" y="0" xlink:href="#syl11" content="TKS/RJOS,MSDF/Joint-Use,34.1422669,134.5784253,Tokushima Airport,Matsushige-cho,Itano-gun,Tokushima Prefecture,2500×45(11/29)" xlink:title="Tokushima Airport"/>

 <use transform="ref(svg,13270.87,-3383.12342)" x="0" y="0" xlink:href="#syl6" content="MYJ/RJOM,Base (Country),33.8312342,132.7087,Matsuyama Airport,Matsuyama City, Ehime Prefecture,2500×45(14/32)" xlink:title="Matsuyama Airport"/>

 <use transform="ref(svg,13367.41986,-3354.74358)" x="0" y="0" xlink:href="#syl6" content="KCZ/RJOK,Base (Country),33.5474358,133.6741986,Kochi Airport,Nankoku City, Kochi Prefecture,2500×45(14/32)" xlink:title="Kochi Airport"/>

 <use transform="ref(svg,13103.17475,-3383.96675)" x="0" y="0" xlink:href="#syl6" content="KKJ/RJFR,Base (Country),33.8396675,131.0317475,Kitakyushu Airport,Kitakyushu City,Fukuoka Prefecture,2500×60(18/36)" xlink:title="Kitakyushu Airport"/>

 <use transform="ref(svg,13045.31556,-3360.39061)" x="0" y="0" xlink:href="#syl6" content="FUK/RJFF,Base (Country),33.6039061,130.4531556,Fukuoka Airport,Fukuoka City,Fukuoka Prefecture,2800×60(16/34)" xlink:title="Fukuoka Airport"/>

 <use transform="ref(svg,13030.60919,-3315.26375)" x="0" y="0" xlink:href="#syl8" content="HSG/RJFS,Locally Managed,33.1526375,130.3060919,Saga Airport,Kawasoe Town, Saga District, Saga Prefecture,2000×45(11/29)" xlink:title="Saga Airport"/>

 <use transform="ref(svg,13085.79081,-3283.44322)" x="0" y="0" xlink:href="#syl6" content="KMJ/RJFT,Base (Country),32.8344322,130.8579081,Kumamoto Airport,Mashiki Town, Kamimashiki District, Kumamoto Prefecture,3000×45(07/25)" xlink:title="Kumamoto Airport"/>

 <use transform="ref(svg,13017.080813,-3246.08038)" x="0" y="0" xlink:href="#syl13" content="AXJ/RJDA,Other,32.4608038,130.17080813,Amakusa Airport,Amakusa City, Kumamoto Prefecture,1000×30(13/31)" xlink:title="Amakusa Airport"/>

 <use transform="ref(svg,13173.07403,-3347.54397)" x="0" y="0" xlink:href="#syl6" content="OIT/RJFO,Base (Country),33.4754397,131.7307403,Oita Airport,Kunisaki City,Oita Prefecture,3000×45(01/19)" xlink:title="Oita Airport"/>

 <use transform="ref(svg,13143.64547,-3187.16022)" x="0" y="0" xlink:href="#syl6" content="KMI/RJFM,Base (Country),31.8716022,131.4364547,Miyazaki Airport,Miyazaki City, Miyazaki Prefecture,2500×45(09/27)" xlink:title="Miyazaki Airport"/>

 <use transform="ref(svg,12992.21047,-3291.46489)" x="0" y="0" xlink:href="#syl6" content="NGS/RJFU,Base (Country),32.9146489,129.9221047,Nagasaki Airport,Omura City,Nagasaki Prefecture,(A)1200×30(18/36)" xlink:title="Nagasaki Airport"/>

 <use transform="ref(svg,12932.65492,-3428.53933)" x="0" y="0" xlink:href="#syl8" content="TSJ/RJDT,Locally Managed,34.2853933,129.3265492,Tsushima Airport,Tsushima City,Nagasaki Prefecture,1900×45(14/32)" xlink:title="Tsushima Airport"/>

 <use transform="ref(svg,12978.27286,-3374.64683)" x="0" y="0" xlink:href="#syl8" content="IKI/RJDB,Local Management,33.7464683,129.7827286,Iki Airport,Iki City, Nagasaki Prefecture,1200×30(02/20)" xlink:title="Iki Airport"/>

 <use transform="ref(svg,12883.72992,-3267.03464)" x="0" y="0" xlink:href="#syl8" content="FUJ/RJFE,Local Management,32.6703464,128.8372992,Fukue Airport,Goto City,Nagasaki Prefecture,2000×45(03/21)" xlink:title="Fukue Airport"/>

 <use transform="ref(svg,13071.71897,-3179.42389)" x="0" y="0" xlink:href="#syl6" content="KOJ/RJFK,Base (Country),31.7942389,130.7171897,Kagoshima Airport,Kirishima City,Kagoshima Prefecture,3000×45(16/34)" xlink:title="Kagoshima Airport"/>

 <use transform="ref(svg,13099.16719,-3060.92667)" x="0" y="0" xlink:href="#syl8" content="TNE/RJFG,Locally Managed,30.6092667,130.9916719,Tanegashima Airport,Nakatane Town, Kumage District, Kagoshima Prefecture,2000×45(13/31)" xlink:title="Tanegashima Airport"/>

 <use transform="ref(svg,13065.36264,-3038.79056)" x="0" y="0" xlink:href="#syl8" content="KUM/RJFC,Local Management,30.3879056,130.6536264,Yakushima Airport,Kagoshima Prefecture,Kamiyaku Town,Kumage District,1500×45(14/32)" xlink:title="Yakushima Airport"/>

 <use transform="ref(svg,12970.62783,-2843.15436)" x="0" y="0" xlink:href="#syl8" content="ASJ/RJKA,Local Management,28.4315436,129.7062783,Amami Airport,Amami City, Kagoshima Prefecture,2000×45(03/21)" xlink:title="Amami Airport"/>

 <use transform="ref(svg,12992.78356,-2831.90211)" x="0" y="0" xlink:href="#syl8" content="KKX/RJKI,Local Management,28.3190211,129.9278356,Kikai Airport,Kagoshima Prefecture,Oshima District,Kikai Town,1200×30(07/25)" xlink:title="Kikai Airport"/>

 <use transform="ref(svg,12888.33239,-2783.23517)" x="0" y="0" xlink:href="#syl8" content="TKN/RJKN,Locally Managed,27.8323517,128.8833239,Tokunoshima Airport,Amagi Town, Oshima District, Kagoshima Prefecture,2000×45(01/19)" xlink:title="Tokunoshima Airport"/>

 <use transform="ref(svg,12870.39914,-2743.38942)" x="0" y="0" xlink:href="#syl8" content="OKE/RJKB,Locally Managed,27.4338942,128.7039914,Okinoerabu Airport,Wadomari Town, Oshima District, Kagoshima Prefecture,1350×30(04/22)" xlink:title="Okinoerabu Airport"/>

 <use transform="ref(svg,12840.04583,-2704.15739)" x="0" y="0" xlink:href="#syl8" content="RNJ/RORY,Locally Managed,27.0415739,128.4004583,Yoron Airport,Yoron Town, Oshima District, Kagoshima Prefecture,1200×30(14/32)" xlink:title="Yoron Airport"/>

 <use transform="ref(svg,12765.08083,-2620.56425)" x="0" y="0" xlink:href="#syl6" content="OKA/ROAH,Base (Country),26.2056425,127.6508083,Naha Airport,Naha City,Okinawa Prefecture,3000×45(18/36)" xlink:title="Naha Airport"/>

 <use transform="ref(svg,12723.88214,-2659.32767)" x="0" y="0" xlink:href="#syl8" content="AGJ/RORA,Local Management,26.5932767,127.2388214,Aguni Airport,Aguni Village, Shimajiri District, Okinawa Prefecture,800×25(01/19)" xlink:title="Aguni Airport"/>

 <use transform="ref(svg,12671.53831,-2636.34)" x="0" y="0" xlink:href="#syl8" content="UEO/ROKJ,Local Management,26.3634,126.7153831,Kumejima Airport,Kumejima Town, Shimajiri District, Okinawa Prefecture,2000×45(03/21)" xlink:title="Kumejima Airport"/>

 <use transform="ref(svg,13132.45694,-2594.45475)" x="0" y="0" xlink:href="#syl8" content="KTD/RORK,Local Management,25.9445475,131.3245694,Kitadaito Airport,Kitadaito Village, Shimajiri District, Okinawa Prefecture,1500×45(03/21)" xlink:title="Kitadaito Airport"/>

 <use transform="ref(svg,13126.56264,-2584.58983)" x="0" y="0" xlink:href="#syl8" content="MMD/ROMD,Local Management,25.8458983,131.2656264,Minamidaito Airport,Minamidaito Village, Shimajiri District, Okinawa Prefecture,1500×45(02/20)" xlink:title="Minamidaito Airport"/>

 <use transform="ref(svg,12529.1325,-2479.221)" x="0" y="0" xlink:href="#syl8" content="MMY/ROMY,Locally Managed,24.79221,125.291325,Miyako Airport,Miyakojima City, Okinawa Prefecture,2000×45(04/22)" xlink:title="Miyako Airport"/>

 <use transform="ref(svg,12514.9188,-2482.6576)" x="0" y="0" xlink:href="#syl8" content="SHI/RORS,Local Management,24.826576,125.149188,Shimojishima Airport,Miyakojima City,Okinawa Prefecture,3000×60(17/35)" xlink:title="Shimojishima Airport"/>

 <use transform="ref(svg,12467.82847,-2465.47086)" x="0" y="0" xlink:href="#syl8" content="TRA/RORT,Locally Managed,24.6547086,124.6782847,Tarama Airport,Tarama Village, Miyako District, Okinawa Prefecture,1500×45(18/36)" xlink:title="Tarama Airport"/>

 <use transform="ref(svg,12418.32569,-2434.47911)" x="0" y="0" xlink:href="#syl8" content="ISG/ROIG,Local Administration,24.3447911,124.1832569,Ishigaki Airport,Ishigaki City, Okinawa Prefecture,1500×45(04/22)" xlink:title="Ishigaki Airport"/>

 <use transform="ref(svg,12298.00817,-2446.52631)" x="0" y="0" xlink:href="#syl8" content="OGN/ROYN,Local Management,24.4652631,122.9800817,Yonaguni Airport,Yonaguni Town, Yaeyama District, Okinawa Prefecture,2000×45(08/26)" xlink:title="Yonaguni Airport"/>

<!-- Airport information with link: Clicking on this POI will display a dialog asking whether you want to go to the link or view the content information. Selecting the link will display the link in a new tab -->
 <a xlink:href="http://www.google.co.jp/" target="null">
  <use transform="ref(svg,13970,-3555.07211)" x="0" y="0" xlink:href="#syl6" content="HND/RJTT,Base (Country),35.5507211,139.7832156,Tokyo International Airport XXX,Ota Ward,Tokyo,(A)3000×60(16R/34L)" xlink:title="Tokyo International Airport XXX"/>
 </a>

<!-- Airport information with link: Click on this POI to go to the link (in the current tab) -->
 <a xlink:href="http://www.google.co.jp/">
  <use transform="ref(svg,13960,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="url noTarget noMetadata"/>
 </a>
<!-- Airport information with link: Click this POI to go to the link (changes the display position on the current map. Specify the full URL). Open the link in a new tab -->
 <a xlink:href="http://svg2.mbsrv.net/devinfo/devkddi/tutorials/tutorial2/tutorial2.html#svgView(viewBox(global,139,35,2,2))" target="null">
  <use transform="ref(svg,13950,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="URL+hash target noMetadata"/>
 </a>
<!-- Airport information with link: Clicking on this POI will take you to the link (changes the display position on the current map. Appends the href content to the current URL). Go to the link in the current tab. -->
 <a xlink:href="#svgView(viewBox(global,139,35,3,3))">
  <use transform="ref(svg,13940,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="viewchange 139,35,3,3 noMetadata"/>
 </a>
 
<!-- Airport information with link: Click on this POI to go to the link. Go to the link in the current tab. -->
 <a xlink:href="tutorial2.html">
  <use transform="ref(svg,13930,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="noScheme noTarget noMetadata"/>
 </a>
</svg>
```

</details>

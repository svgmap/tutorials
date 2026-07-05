# Using svgmapAppLayers on GitHub Pages

## Introduction  {#introduction}

[The svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) GitHub repository has a [GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/what-is-github-pages) setup. Therefore, some layers can be used simply by linking to the URL published on GitHub Pages.

To see the actual operation, click on [ghAppLayers_wpxy.html](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers_wpxy.html).

[The svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) repository on GitHub is a collection of [WebApp Layers](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) that provide various features and content usable with SVGMap.js . All are released as open source. (The license is [MPL2](https://www.mozilla.org/en-US/MPL/2.0/) ( [Japanese reference translation](https://www.mozilla.jp/documents/mpl/2.0/) ) (same as SVGMap.js))

This repository is also set up as a [GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/what-is-github-pages). The repository root is [https://svgmap.github.io/svgmapAppLayers/](https://svgmap.github.io/svgmapAppLayers/).

Therefore, in this chapter, we will try to build a map page by directly referencing the layers of svgmapAppLayers, which are published as GitHub Pages.

[Click here](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers_wpxy.html) for actual operation (with proxy set up)
The file used is a [ZIP archive file](https://www.svgmap.org/examples/tutorials/ghAppLayers.zip).

### Synopsis {#synopsis}

- The GitHub Pages URL for the root directory of svgmapAppLayers is [https://svgmap.github.io/svgmapAppLayers/](https://svgmap.github.io/svgmapAppLayers/)
- You can check the list of layers registered in svgmapAppLayers in [the source code of Container.svg](https://github.com/svgmap/svgmapAppLayers/blame/main/Container.svg).
    - Layers in svgmapAppLayers that cannot directly reference a GitHub Pages webApp have the data-cross-origin-restricted attribute.
    - Layers that require cross-origin access proxy configuration have the `data-cross-origin-proxy-required` attribute.
    - Using the [Container SVG Generation Support WebApp](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html), you can easily generate Container.svg.
- Build a proxy if necessary.

### Restrictions {#restrictions}

- Some layers that perform cross-origin access to data sources require the provision of proxies (explained later in this document).
- Some layers cannot be used with direct references to GitHub Pages (they become available after cloning and using them, as explained in the next chapter).

### List of Available Layers {#list-of-available-layers}

- Please refer to [this page](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html).
    - This page was generated based on [https://github.com/svgmap/svgmapAppLayers/blob/main/Container.svg](https://github.com/svgmap/svgmapAppLayers/blob/main/Container.svg).
- Layers with `corsRestricted` set to true cannot be used with direct references to GitHub Pages.
- Layers where corsProxyRequired is true require a proxy to be provided.

## Try using only the layers that don't require proxies {#try-using-only-the-layers-that-dont-require-proxies}

- Let's try creating a page that only uses layers that don't require proxies. It's easy because there are no proxy settings.
    - It can be operated entirely with static hosting. (It can also be published using a GitHub Pages instance that you have built yourself.)
- Click [here](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers.html) to see the actual operation.

### Preparing the container (conainer.svg) {#preparing-container-svg}

- Show [this page](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html#withoutProxy)
    - Layers that require a proxy are automatically unchecked. (This includes layers that cannot directly reference GitHub Pages.)
- You can obtain Container.svg by checking the layers you want to display and pressing the Save (or Display) button for Container.svg. This will retrieve a Container with embedded links for direct reference.

### HTML for the map page (ghAppLayers.html) {#html-for-map-page}

- There are no significant differences in content compared to previous chapters.

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
<!-- Definition that the viewport display area is the entire screen -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading the SVGMap core API -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgmap=svgmap
</script>

<!-- Loading stylesheet for the layer list UI -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files -->
 <div id="mapcanvas" data-src="Conainer.svg"></div>
 <div id="gui">
<!-- Zoom-up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to be displayed in the upper right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
<!-- Display in the lower right corner of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude displayed as a crosshair in the lower left corner of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- The crosshairs displayed in the lower left corner of the screen show the latitude and longitude (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- Display the layer list UI -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

## Set up so that layers requiring proxies can also be used {#set-up-so-that-layers-requiring-proxies-can-also-be-used}

- Let's try creating a page that uses layers that require proxies.
    - A proxy service needs to be prepared (it can also be run using PHP; this tutorial provides an example using PHP).
- [Click here](https://svgmap.org/devinfo/devkddi/tutorials/ghAppLayers/ghAppLayers_wpxy.html) to see the actual operation.

### Preparing the container (Container_wpxy.svg) {#preparing-the-container-wpxy-svg}

- Show [this page](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html)
- Layers that require a proxy are also checked. (Layers that cannot be directly referenced from GitHub Pages are unchecked.)
- Check the layers you want to display, and then press the Save (or Display) button for Container_wpxy.svg to obtain Container.svg. You will get a Container with links that directly reference it.

### The HTML file for the map page (ghAppLayers_wpxy.html) {#the-html-file-for-the-map-page}

- The difference is that SVGMap.js is set up to allow the use of a proxy. Please refer to [this information](../../3-web-service-integration/cross-origin-access/index.md) for more details.
    - The library for handling proxies is imported with `import { CorsProxy } from ' https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js' ;`.
    - Set it up with corsProxy.setService
        - (In this example, a PHP proxy (./simpleCORSproxy.php) located in the same directory is specified.)
    - It's integrated into SVGMap.js using svgMap.setProxyURLFactory.
- The container SVG used is named "Container.svg".

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
<!-- Definition that the viewport display area is the entire screen -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading the SVGMap core API -->
<script type="module">
import { CorsProxy } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js';
import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
window.svgmap=svgmap
var corsProxy = new CorsProxy();

// Proxy settings
var proxyPath = new URL("./simpleCORSproxy.php",location.href).href + "?file=";

corsProxy.setService(proxyPath, null, true, true); // Setting the fourth parameter to true encodes the destination URL.
svgMap.setProxyURLFactory(null,null,null, corsProxy.getURLfunction(), true); // Use proxy only when converting bit image to nonlinear plotting.
</script>


<!-- Loading stylesheet for the layer list UI -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- Loading a container file (Container.svg) containing multiple map SVG files -->
 <div id="mapcanvas" data-src="Container_wpxy.svg"></div>
 <div id="gui">
<!-- Zoom-up button -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- Zoom down button -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPS button -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- Title to be displayed in the upper right corner of the screen -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
<!-- Display in the lower right corner of the screen -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- Cross mark displayed in the center -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- Latitude and longitude displayed as a crosshair in the lower left corner of the screen (title) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- The crosshairs displayed in the lower left corner of the screen show the latitude and longitude (initial display of actual values) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- Display the layer list UI -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

### Preparing a proxy {#preparing-a-proxy}

This time, we'll set up a simple proxy using PHP on a hosting service that supports PHP.

- The line // Set acceptable referer criteria sets a simple restriction that only allows access from the domain where this HTML is located (svgmap.org).
- For more details, please refer to [the simple proxy implementation example](https://www.svgmap.org/wiki/index.php?title=%E5%8D%98%E7%B4%94%E3%81%AA%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7%E5%AE%9F%E8%A3%85%E4%BE%8B).

```php
<?php
function file_get_contents_curl($url) {
	$headers = array(
	    "HTTP/1.0",
	    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
// "Accept-Encoding:gzip ,deflate",
	    "Accept-Language:ja,en-us;q=0.7,en;q=0.3",
	    "Connection:keep-alive",
	    "User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0"
	    );
    // **/
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);       

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

if($_GET["file"]){
	
	$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
	// accept only referrer within this site
	header("Access-Control-Allow-Origin: " . "*"); // MUST SET for CORS
	if (preg_match("|^https?://svgmap\.org|", $referer) || preg_match("|^https?://www\.svgmap\.org|", $referer)) { // Set acceptable referer criteria
		if ( $_GET["type"]){
			header("Content-type: " . $_GET["type"]);
		else {
			if(strpos($_GET["file"],'png')){
				header("Content-type: image/png");
			else {
				header("Content-Type:image/jpeg;");
			}
		}
// echo file_get_contents_curl( urldecode($_GET["file"]), true);
		echo file_get_contents_curl( ($_GET["file"]), true);
	else {
		echo "ERR : referer : " . $referer;
	}
else {
	foreach (getallheaders() as $name => $value) {
		echo "$name: $value<br>";
	}
	foreach ($_GET as $key => $value) {
	echo "GET Key:".$key.", Value:".$value."<br>";
	}
	echo "referrer: ".$_SERVER['HTTP_REFERER'];
}
?>
```
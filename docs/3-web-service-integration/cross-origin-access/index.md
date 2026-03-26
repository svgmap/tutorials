# Cross-origin access

When integrating with external web services, you need to understand and handle cross-origin access depending on the external service.

When a map layer in a bit image requires a projection transformation, or when accessing a web service (web API) on a different domain than the site where the web application resides using XMLHttpRequest or fetch, [cross-origin access](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS) restrictions may cause errors. These errors cannot be resolved solely on the web application side; server-side configuration adjustments are necessary.

## Overview {#overview}

Because SVGMap has a hyper-layering architecture, the client SVGMap framework web app consisting of [the root html document](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) basically needs to access a server of a different origin. This means that a process commonly known as " [Cross-Origin Resource Sharing](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS) (CORS)" may be performed, and at this time, [CORS errors](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS/Errors) may occur due to the native functionality of the web browser.

The table below shows cross-origin access cases and the possibility of CORS errors occurring.

**Error due to cross-origin access in svgmapjs**
| Types of content accessed cross-origin | Content Processing | Possible CORS error |
|---|---|---|
|Bitimage (including tiles)|Overlay|Does not occur|
|Bitimage (including tiles)|Overlay with [nonlinear projection transformation](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9#.E9.9D.9E.E7.B7.9A.E5.BD.A2.E5.9B.B3.E6.B3.95.E5.A4.89.E6.8F.9B)|Possible occurrence|
|Bitimage (including tiles)|Geospatial information processing, etc.|Possible occurrence|
|Data other than bit images, such as vector data and JSON|Overlay|Possible occurrence|
|Data other than bit images, such as vector data and JSON|Geospatial information processing, etc.|Possible occurrence|
|All types of content and data|[3D display using Cesium extension](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapCesiumWrapper..E3.81.A7.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.9B.E3.82.8BAPI)|Possible occurrence|

## How to check for errors {#how-to-check-errors}

Open the SVGMap page in a web browser and check the console or network screen of the developer tools to see if there is an error (such as a message about being blocked by CORS policy).

## Server (service side): Configure to return CORS response headers {#server}

- Configure your server to return an Access-Control-Allow-Origin * (or a specified origin) response header.
    - [Apache example](https://phaier.github.io/school/engineering/platform/server/apache/how-to/cors.html)
    - [etc](https://enable-cors.org/server.html)
- Services that are designed to be accessed from outside have this setting (e.g., Geospatial Information Authority maps and gitHubPages sites), so there is no need to use the proxy below.

## Prepare a proxy service and route traffic through it {#prepare-proxy}

- Implementation using node.js
    - [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) ( [Setup Notes](https://www.svgmap.org/wiki/index.php?title=CORS_Anywhere_setup_notes) )
- Implementation using php
    - [php-cross-domain-proxy](https://github.com/softius/php-cross-domain-proxy) ( [fork](https://github.com/softius/php-cross-domain-proxy) of svgmap.org )
    - [Simple proxy implementation example](https://www.svgmap.org/wiki/index.php?title=%E5%8D%98%E7%B4%94%E3%81%AA%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7%E5%AE%9F%E8%A3%85%E4%BE%8B)

#### SVGMap.js support for easier cross-origin access through proxies

SVGMap.js has several features that make it easier to support cross-origin access through proxies.

There are three main cases where SVGMap.js requires cross-origin access:

1. Projection conversion of bit image (including tiles) data
2. Raster GIS
3. Proprietary communication in the webApp layer

(1) and (2) require cross-origin access to be performed under the management of SVGMap.js, and an API is provided to configure cross-origin access (proxy settings for cross-origin access) when SVGMap.js is initialized.

- [Manual#Proxy settings](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.82.AD.E3.82.B7.E3.81.AE.E8.A8.AD.E5.AE.9A)
- [Reference#setProxyURLFactory](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setProxyURLFactory)
- [Manual#setImageProxy](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setImageProxy)

[Examples of initialization](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9#SVGMap.js.E3.81.AE.E5.88.9D.E6.9C.9F.E5.8C.96) using these APIs are explained in the next chapter.

**Cross-Origin Access in the WebApp Layer**

On the other hand, case 3 is a case where each layer's webApp ( [webApp Layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) ) performs cross-origin access (using fetch, XMLHttpRequest, etc.) to obtain data (for example, custom data in JSON format) to generate the layer's content, and strictly speaking, this is a process that does not involve SVGMap.js. Care for this type of cross-origin access must basically be taken by the developer of each individual layer's webApp.

However, when accessing via a proxy, it is possible that the proxy used for cases 1 and 2 above will also be used as a proxy common to all layers, and in this case there is a function that can call the proxy set during SVGMap.js initialization using a common function.

- [Reference#getCORSURL](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getCORSURL)

We will show how to use getCORSURL [in a later chapter](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9#webApp.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A7.E3.81.AE.E3.82.AF.E3.83.AD.E3.82.B9.E3.82.AA.E3.83.AA.E3.82.B8.E3.83.B3.E3.82.A2.E3.82.AF.E3.82.BB.E3.82.B9).

#### Initializing SVGMap.js

- Using the above mentioned functions, we will introduce the steps to initialize [the root HTML document](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) to easily enable cross-origin access . See the next chapter for corsProxy.js.
    - Full implementation of the root HTML document: [GitHub](https://github.com/svgmap/svgMapDemo/blob/main/index.html)

```html
<!doctype html>
<html>
...
<script type="module">
import { CorsProxy } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js';
import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
window.svgMap=svgMap
var corsProxy = new CorsProxy();

// プロキシの設定
var proxyPath = "https://..url..of../simpleCORSproxy.php?file=";

corsProxy.setService(proxyPath, null, true, true); // 第4パラメータをtrueにするとアクセス先URLをエンコードする
window.corsProxy = corsProxy;
svgMap.setProxyURLFactory(null,null,null, corsProxy.getURLfunction(), true); // ビットイメージ非線形図法変換の時のみプロキシを使う
</script>
...
</html>
```

**corsProxyMoule.js**

Here is a library to make initialization easier. [gitHub](https://github.com/svgmap/svgmapjs/blob/main/CorsProxyModule.js)
- corsProxy.setService(pxUrl , directURLls , useAnonProxy, requireEncoding)
    - pxUrl: Proxy URL
    - directURLls: [List of URLs that do not use the proxy]
    - useAnonProxy: Whether to assign anonymous attribute
    - requireEncoding: Whether to URL encode the URL passed to the proxy service
- corsProxy.getURLfunction : Gets the function to get the URL via the proxy

#### Cross-origin access at the webApp layer

[The getCORSURL API](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getCORSURL) can be used in webApps of each layer that are registered in [the root HTML document (SVGMap page)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) where SVGMap.js has been initialized [for cross-origin access](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9#SVGMap.js.E3.81.AE.E5.88.9D.E6.9C.9F.E5.8C.96).

This API is a function that allows you to obtain a URL that enables access to the URL of the service you want to access via a commonly prepared cross-origin access server. For example, it can be used as follows:

```var dataResponse = await fetch( svgMap.getCORSURL( serviceURL ) );```

[On the other hand, if the root HTML document (SVGMap page)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) does not initialize cross-origin access , the webApps in each layer must resolve cross-origin access independently. For example, if ```https://[myproxy.mydomain.com]/proxy/``` a proxy is provided as a proxy for cross-origin access and ```?targetURL=serviceURL``` the destination service is accessed with a query parameter, it would look like this:
```var dataResponse = await fetch( "https://[myproxy.mydomain.com]/proxy/?targetURL=" + serviceURL );```

#### Nonlinear projection transformation

Projection conversions between Mercator projection and equirectangular projection, etc., involve coordinate transformations that cannot be performed using a linear affine transformation (matrix (a, b, c, d, e, f)).
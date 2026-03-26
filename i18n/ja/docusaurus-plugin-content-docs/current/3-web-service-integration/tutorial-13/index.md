# チュートリアル13 WebApp Layer WMS 伸縮スクロールに応じた表示

## はじめに {#introduction}

[WebApp Layer機構](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)を用いれば、ウェブサービスに接続し表示領域に応じた地図コンテンツを動的に表示することができます。チュートリアル12と同じ[GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/)を使ってみます。

- 実際の動作は、[wms2.html](https://svgmap.org/examples/tutorials/wms2/wms2.html)  をクリック。
    - Note: WMSが地図を生成配信するまでに少々時間がかかります）

## ソースコードディレクトリ {#source-code-directory}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/wms2/)
- 表示領域のパラメータを伸縮スクロールの度に取得します。
- このパラメータを用いて、WMSへのクエリURLを構築します。
- image要素によって、WMSから取得したデータを配置します
- 1ステップ前のimage要素は消去します。

## チュートリアル {#tutorial}

[WMS (Web Map Service)](https://en.wikipedia.org/wiki/Web_Map_Service)を使って、表示している領域の地図を伸縮スクロールに応じて表示する機能を持つレイヤーを[WebApp Layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)として実装します。WMSとしては[Tutorial 12](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB12) に引き続き [the GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/)を使用します。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/wms2/wms2.html) をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/wms2.zip)

### [wms2.html](https://svgmap.org/examples/tutorials/wms2/wms2.html) {#wms2-html}

これまでと特に変わったところはありません。

### [Container.svg](https://svgmap.org/examples/tutorials/wms2/Container.svg) {#container-svg}

これまでと特に変わったところはありません。

### [wms_dynamic.svg](https://svgmap.org/examples/tutorials/wms2/wms_dynamic.svg) {#wms-dynamic-svg}

- ```data-controller="wmsController.html"``` このレイヤーにWebApp("wmsController.html)を紐付けています
    - WebAppではWMSのコンテンツを表示するためのDOM操作を伸縮スクロールのたびに行っています。
- image要素はダミーです（xlink:href属性がないので表示されない）

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30" data-controller="wmsController.html#exec=appearOnLayerLoad">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <image id="wmsImage" preserveAspectRatio="none" opacity="0.5" />
</svg>
```

### [wmsController.html](https://svgmap.org/examples/tutorials/wms2/wmsController.html), [wmsController.js](https://svgmap.org/examples/tutorials/wms2/wmsController.js) {#wms-controller}

- ```onload``` webApp読み込み直後に呼ばれる関数
    - ```svgMap.refreshScreen()``` webAppが読み込まれた直後に地図の```[[[解説書#refreshScreen|再描画を明示]]```し、 ```preRenderFunction```が実行されるようにします。
- ```preRenderFunction``` [再描画に際して実行されるコールバック関数](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#preRenderFunction)です。伸縮スクロール時も再描画されるため呼び出されます。
    - ```prevImageElement.remove()```  １ステップ前（伸縮スクロールが起きる直前）のWMSからの画像を消去
    - ```svgMap.getGeoViewBox()``` [ 表示領域を地理座標で取得](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getGeoViewBox)
    - ```getScreenSize()```  地図表示画面のサイズを取得
    - ```getWMSreq(GEBCOurl, GEBCOlayer, geoViewBox, screenSize)```
        - 表示領域、スクリーンサイズなどのパラメータをもとにGEBCO WMSへのリクエストURLを生成する関数
        - クエリパラメータの設定内容については、 [チュートリアル12のWMSに関する説明](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB12#WMS.E3.81.AE.E3.82.AF.E3.82.A8.E3.83.AA.E3.83.91.E3.83.A9.E3.83.A1.E3.83.BC.E3.82.BF)を参照
    - ```getSvgImage(req, geoViewBox)``` 上で生成したWMSへのリクエストURIと、その地図データの領域情報をもとに、image要素を生成する関数
        - プロパティの設定内容については、 [チュートリアル12のimage要素の説明](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB12#image.E8.A6.81.E7.B4.A0.E3.81.AE.E3.83.97.E3.83.AD.E3.83.91.E3.83.86.E3.82.A3)を参照
    - ```svgImage.documentElement.appendChild(newImage)``` 生成したImage要素をSVGコンテンツに設置

wmsController.js

```js
onload=function(){
	svgMap.refreshScreen();
}

var GEBCOurl="https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv";
var GEBCOlayer="GEBCO_LATEST";

var crsAD=1;

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
	imageElement.setAttribute("y", -(geoViewBox.y+geoViewBox.height) * crsAD); // 軸反転のため北端を設定
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
	
	ans = ans.replace(/\s/g,""); // 空白文字(改行含)を除去
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
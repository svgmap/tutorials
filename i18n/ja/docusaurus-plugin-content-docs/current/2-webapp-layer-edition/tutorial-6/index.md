---
sidebar_position: 6
---

# チュートリアル6 WebApp Layer geoJSON

## はじめに  {#introduction}

webAppで非同期読み込みにより[GeoJSONデータ](https://ja.wikipedia.org/wiki/GeoJSON) を読み込み、SVGMapフレームワークのライブラリを使ってSVGMapコンテンツのDOMに変換し表示するチュートリアルです。

実際の動作は、 [geojson1.html](https://svgmap.org/examples/tutorials/geojson1/geojson1.html)をクリック。

### ファイル構造 {#file-structure}

- [tutorial6ディレクトリ](https://svgmap.org/examples/tutorials/geojson1/)
- geojson1.html: 周辺ライブラリ(SVGMapGIS)の読み込み
- Container.svg: クリッカブルなレイヤリングの設定
- geoJsonExample1.svg: UIを持ったレイヤーを操作するwebAppを指定する方法
- geoJsonExample1.html:
- geoJsonExample1.js: svgMapGIStoolによるGeoJsonデータのSVGMapコンテンツ化

## チュートリアル {#tutorial}

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/geojson1/geojson1.html)をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/geojson1.zip)

### geojson1.html {#geojson1-html}

[チュートリアル2b](../../1-basic/tutorial-2b/index.md) のhtmlに対して、読み込む [SVGコンテンツ](https://svgmap.org/examples/tutorials/geojson1/Container.svg) が異なるだけです。

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial2 Coastline & Air Port</title>
<!-- viewport 知表示領域を画面全体とする定義 -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- SVGMapのコアAPIの読み込み -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgMap=svgMap
</script>

<!-- レイヤーリストUIのスタイルシート読み込み -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- 地図SVGファイル(レイヤー)を複数含むコンテナファイル(Container.svg)の読み込み -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- ズームアップボタン -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- ズームダウンボタン -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPSボタン -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- 画面右上に表示するタイトル -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial2 Coastline & Air Port</font>
<!-- 画面右下に表示する -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- 中央に表示される十字マーク -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- 画面左下に表示される十字マークの緯度・経度(タイトル) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- 画面左下に表示される十字マークの緯度・経度(実際の値の初期表示) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- レイヤーリストUIの表示 -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

### Container.svg {#container-svg}

- [GeoJsonを表示する主題レイヤ](https://svgmap.org/examples/tutorials/geojson1/geoJsonExample1.svg) と、背景地図(OpenStreetMap)をanimation要素で読み込んでいます。
- GeoJsonデータはベクトルデータのため、class属性で [`clickable`](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#class.E5.B1.9E.E6.80.A7.E3.81.AB.E3.82.88.E3.82.8B.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.AE.E3.82.B0.E3.83.AB.E3.83.BC.E3.83.94.E3.83.B3.E3.82.B0.E3.83.BB.E3.82.AF.E3.83.AA.E3.83.83.E3.82.AB.E3.83.96.E3.83.AB.E6.A9.9F.E8.83.BD.E3.81.AE.E6.8F.90.E4.BE.9B) を指定しています。
- それ以外は [こちらの要点](../../1-basic/tutorial-1/index.md#レイヤリング-layering)を参考にしたレイヤリングを行っています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Load OpenStretMap background map as the display state -->
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap" visibility="visible"/>

<!-- Load various GeoJSON data (Point Feature) as display state -->
<animation xlink:href="geoJsonExample1.svg" x="-3000" y="-3000" width="6000" height="6000" title="GeoJson Layer" class="poi clickable" visibility="visible" opacity="0.7"/>
</svg>
```

### geoJsonExample1.svg {#geo-json-example1-svg}

- ドキュメントルート要素(svg要素)の、data-controller属性で、この [レイヤーを操作するwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)を指定しています。
	- ```data-controller="geoJsonExample1.html#exec=appearOnLayerLoad```
	- ```exec=appearOnLayerLoad``` は、レイヤが表示状態になるとwebAppのウィンドが出現する設定です。 ([詳しくはこちら](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0))
- defs要素でgeoJsonのポイントフィーチャーを可視化するときに使うマーカー(アイコン)を定義しています

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  data-controller="geoJsonExample1.html#exec=appearOnLayerLoad"
  viewBox="12375.0 -4500.0 2250.0 2250.0"
  go:dataArea="12375.0 -4500.0 2250.0 2250.0"
  property="name,address,phone,url"
>

<defs>
<g id="p0">
<circle cx="0" cy="0" r="10" fill="blue" stroke="none"/>
</g>
</defs>

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100.0,0.0,0.0,-100.0,0.0,0.0)" />
<g id="mapContents"></g>
</svg>
```

### geoJsonExample1.html, geoJsonExample1.js {#geo-json-example1}

geoJsonExample1.svgに紐付けられたwebApp([レイヤー固有のUI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)) です。レイヤーに紐付けられたwebAppでは、[独自のAPI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API)が利用できます。

#### geoJsonexample1.html

htmlは、[レイヤー固有のUIの初期化処理のための共通ライブラリ(svgMapLayerLib.js)の読み込み](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI.E3.81.AE.E3.81.9F.E3.82.81.E3.81.AEhtml.E6.96.87.E6.9B.B8.28webApp.29.E3.81.AE.E6.A7.8B.E9.80.A0.E3.83.BB.E4.BD.9C.E6.B3.95)と、このレイヤー固有の処理内容を記述したscriptコード部(```geoJsonExample1.js```)、及びUI(html,css等)から構成されます。

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>SVGMapのwebAppレイヤーで、geoJsonを描画するサンプル</title>
</head>
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script>
<script src="geoJsonExample1.js"></script>
<body>
<h3>area layer</h3>
<p>geoJsonの可視化</p>
<select id="dataSelect" onchange="changeData()"></select>
</body>
</html>
```

#### geoJsonExample1.js

- [レイヤー固有のUI:拡張AP](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API)記載の通りsvgImage, svgMapGIStoolオブジェクトが自動的にwindowに組み込まれています。
- geoJsonExample1.svgに紐付けられ、 [そのDOMをコントロールできるwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI).
- このアプリでは簡単なUIを持ち、 ```dataPaths``` で設定した　いくつかのgeoJsonデータを選択できるようになっています。
- ```loadJSON(url)``` : [await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function[) [fetch](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch) を使って [GeoJSON](https://ja.wikipedia.org/wiki/GeoJSON) を非同期読み込み
- [SVGMap GISライブラリ(svgMapGIStool)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapGIStool..E3.81.A7.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.9B.E3.82.8BAPI)の ```drawGeoJson``` 関数を使用し、geoJsonをSVGMapコンテンツ(のDOM)への変換をしています。
	- 変数 layerID 組み込み変数 ([the documentation #layerID](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#layerID)参照)
	- なお、自力でgeoJsonをSVGMapコンテンツのDOMに変換することももちろん可能ですが、チュートリアル6ではライブラリを使っています。
	- ```drawGeoJson``` 関数については [解説書#drawGeoJson](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#drawGeoJson)を参照
- ```svgMap.refreshScreen()```  伸縮スクロール以外のタイミングでDOMの再描画が必要な場合、 [再描画を明示](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen)する必要があります。
	- [参考情報](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```js
var dataPaths = {
	"A34b-180316.geojson": "世界遺産構成資産範囲ポリゴン（代表点）",
	"A34a-180316.geojson": "世界遺産構成資産範囲ポリゴンデータ",
	"A34d-180316.geojson": "世界遺産構成資産範囲ライン（代表点）",
	"A34c-180316.geojson": "世界遺産構成資産範囲ラインデータ",
	"A34e-180316.geojson":"世界遺産構成資産",
	"A34f-180316.geojson": "世界遺産緩衝地帯ポリゴンデータ",
	"A34g-180316.geojson":"世界遺産緩衝地帯ポリゴン（代表点）",
	"C28-20_Airport.geojson":"空港データ空港",
	"C28-20_AirportReferencePoint.geojson":"空港データ標点",
	"C28-20_SurveyContent.geojson": "空港データ調査内容",
	"C28-20_TerminalBuilding.geojson":"空港データターミナルビル",
	"N02-20_RailroadSection.geojson":"鉄道データ鉄道",
	"N02-20_Station.geojson":"鉄道データ駅"
};

addEventListener("load", function(){
	buildDataSelect();
	changeData();
});

function changeData(){
	var path = dataSelect.options[dataSelect.selectedIndex].value;
	loadAndDrawGeoJson(path);
}

async function loadAndDrawGeoJson(dataPath){
	var gjs = await loadJSON(dataPath);
	var parentElm = svgImage.getElementById("mapContents");
	removeChildren(parentElm);
	svgMapGIStool.drawGeoJson(gjs, layerID, "orange", 2, "orange", "p0", "poi", "", parentElm);
	svgMap.refreshScreen();
}

function buildDataSelect(){
	var first = true;
	for ( var dataPath in dataPaths){
		dataSelect.insertAdjacentHTML('beforeend', '<option value="' + dataPath +'" >'+dataPaths[dataPath]+'</option>');
	}
}

async function loadJSON(url){
	var dt = getDateStr(new Date(),10);
	var response = await fetch(url+"?time="+dt); // Add some dummy query part to always get the latest data. Bad Tips...
	// https://stackoverflow.com/questions/37204296/cache-invalidation-using-the-query-string-bad-practice
	// https://stackoverflow.com/questions/9692665/cache-busting-via-params
	var json = await response.json();
	return ( json );
}

function getDateStr(dateData , tStep){
	var mind = tStep * Math.floor( dateData.getUTCMinutes() / tStep );
	var ans = dateData.getUTCFullYear()+ pad(dateData.getUTCMonth() + 1) + pad(dateData.getUTCDate()) + pad(dateData.getUTCHours()) + pad(mind);
	return ( ans );
}
function pad( inp ){
	return (("0"+inp).slice(-2));
}

function removeChildren(element){
	while (element.firstChild) element.removeChild(element.firstChild);
}
```
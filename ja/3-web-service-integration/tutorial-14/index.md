# チュートリアル14 WebApp Layer ベクトル地理情報サービスの結合

## はじめに  {#introduction}

動的にベクトルデータが生成・配信されているサービスをSVGMap.jsに結合します。ここではUSGS Hazards Programが配信している、 [世界の地震発生状況データ](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)(GeoJSON版)を結合してみます。

動的なサービスと接続してはいますが、基本的には [チュートリアル6](../../2-webapp-layer-edition/tutorial-6/index.md)との違いはありません。

- 実際の動作は、 [geojson2.html](https://svgmap.org/examples/tutorials/geojson2/geojson2.html)をクリック。

## ソースコードディレクトリ {#source-code}

[チュートリアル6](../../2-webapp-layer-edition/tutorial-6/index.md)に対し、以下が相違点です。

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/geojson2/)
- geoJsonExample2.html:
  - [USGS Earthquake Hazards Program Feed](https://earthquake.usgs.gov/earthquakes/feed/)の仕様に基づいたGeoJsonリクエスト用URLの生成とそのためのUI
  - 同仕様に基づいたメタデータ表示設定
  - 10分に一回更新

## チュートリアル {#tutorial}

動的にベクトルデータが生成・配信されているサービスをSVGMap.jsに結合します。ここではUSGS Hazards Programが配信している、[リアルタイム世界の地震発生状況データ(GeoJSON Real-time Feeds)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)(GeoJSON版)を結合してみます。基本的には[チュートリアル6](../../2-webapp-layer-edition/tutorial-6/index.md)との違いはありません。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/geojson2/geojson2.html)をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/geojson2.zip)

### geojson1.html {#geojson-html}

- [チュートリアル6](../../2-webapp-layer-edition/tutorial-6/index.md)と特に違いはありません。

### Container.svg {#container-svg}

- [チュートリアル6](../../2-webapp-layer-edition/tutorial-6/index.md)と特に違いはありません。

### geoJsonExample2.svg {#geojsonexample2}

- ドキュメントルート要素(svg要素)の、data-controller属性で、この [レイヤーを操作するwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)を指定しています。
  - ```data-controller="geoJsonExample2.html#exec=appearOnLayerLoad```
  - ```exec=appearOnLayerLoad``` は、レイヤが表示状態になるとwebAppのウィンドが出現する設定です。 ( [詳しくはこちら](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0) )
- defs要素でマーカー(POIのアイコン)を定義しています
  - マーカーの色はマグニチュードに応じて変化させるためここでは未定義にしてあります

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

#### [USGS Earthquake GeoJSON Real-time Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)サービスについて

このサービスは全世界の地震発生状況を更新間隔1分リアルタイム配信しています。出力形式はGeoJson、出力データは時間間隔および地震規模でいくつか選択できるようになっています。リクエストにはクエリパートはなく、更新されたデータが常に同じURLで配信されます。

#### Code

- geoJsonExample2.svgに紐付けられ、[そのDOMをコントロールできるwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)
- [チュートリアル6#geoJsonExample1.html](../../2-webapp-layer-edition/tutorial-6/index.md#geojsonexample1html)に対して以下が相違点
- ```addEventListener("load", function(){..})```
  - ```changeData()``` UIの設定に基づき、地震データをリクエストして可視化する関数
    - ```getUSGSURL()```  USGSが配信する地震データを取得するためのGETリクエストを生成
      - クロスオリジンアクセスを行うリクエストを作っています。[USGS Earthquake GeoJSON Real-time Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) は ```access-control-allow-origin: *``` レスポンスヘッダを持っているためアクセス可能です。
    - ```loadAndDrawGeoJson()``` 非同期でjsonデータを取得し描画する関数
      - ```loadJSON()``` ブラウザ側キャッシュを効かせないように、常に変化する適当なクエリパートをつけています( ```getTime()``` [より適切な方法](https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/) がありますが、ここでは古典的なBad Tipsを用いています)
      - ```buildSchema()```
        - [svgMapGIStool.drawGeoJson](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#drawGeoJson) 関数で可視化する際に、[SVGMap.jsが持つメタデータ表示フレームワーク](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)に適応させるためのスキーマデータを構築するとともに、SVGMapコンテンツのドキュメントルート要素に設定
        - svgMapGIStool.drawGeoJson関数で渡す末尾の引数(metaSchema)を生成している
      - ```setMagColors()```
        - [svgMapGIStool.drawGeoJson](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#drawGeoJson)関数の持つ、各フィーチャーのproperties値を使ってスタイルを設定可能な機能を使い、マグニチュード値をもとにpointフィーチャの色を指定
      - ```svgMapGIStool.drawGeoJson()```
        - ```buildSchema()``` で生成したスキーマ ( ```metaSchema``` )を与え、[SVGMap.jsのメタデータ表示フレームワーク](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)でメタデータがうまく表示できるようにしています
  - ```setInterval(function(){..}..)```  指定した間隔で定期的に更新する関数（地震データはリアルタイムに更新されるため）

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

### appendix:クロスオリジンアクセス

[クロスオリジンアクセス](../cross-origin-access/index.md) については([独立したページ](../cross-origin-access/index.md)に移行しました)
---
sidebar_position: 7
---

# チュートリアル7 WebApp Layer ベクトルタイル

## はじめに  {#introduction}

webAppで非同期読み込みによりタイル分割されたCSVのPointジオメトリファイルを読み込み、SVGMapフレームワークのライブラリを使ってSVGMapコンテンツのDOMに変換し表示するチュートリアルです。

- 実際の動作は、[tiling1.html](https://svgmap.org/examples/tutorials/tiling1/tiling1.html)をクリック。

### ソースコード {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/tiling1/)
- tiling1.html: 周辺ライブラリ(SVGMapGIS)の読み込み
- Container.svg: クリッカブルなレイヤリングの設定 ([Tutorial 6](../tutorial-6/index.md)とほぼ同じ)
- simpleTiling.svg: UIを持ったレイヤーを操作するwebApp [tutorial 6](../tutorial-6/index.md)とほぼ同じ
- simpleTiling.html:
- simpleTiling.js:
	- GeoJsonを読む点は[Tutorial 6](../tutorial-6/index.md)と同様
	- 表示領域に応じてGeoJsonを動的に読み込む
		- 小縮尺(広いエリア)表示のとき、読み込むタイルが多くなりすぎる場合は読み込みをやめ表示させない

## チュートリアル {#tutorial}

バックエンドにDBMSなどの動的な機構を持たせず、比較的大きなサイズのベクトルデータ（ここではポイントジオメトリデータを扱います）をタイル分割しWebMap/GISとして快適に利用できるコンテンツにします。このようなデザインはGISの世界では[ベクトルタイル](https://en.wikipedia.org/wiki/Vector_tiles)と呼ばれますが、より一般には[Jamstack pattern](https://en.wikipedia.org/wiki/Jamstack)と呼ばれるパターンの一種でしょう。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/tiling1/tiling1.html)をクリック。
- 使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/tiling1.zip).

#### Note

なお、他のフレームワークでは実現できないような、ふつうはDBMSを接続するなどしないと実装できないような、より大規模なデータセットを[さらに効率的に配信するタイリング](https://satakagi.github.io/mapsForWebWS2020-docs/QuadTreeCompositeTilingAndVectorTileStandard.html)もSVGMap.jsでは実装できます。たとえば [SVGMapTools](https://github.com/svgmap/svgMapTools/tree/master/tutorials)を使うと簡単に実現できます。SVGMapは、[Jamstack pattern](https://en.wikipedia.org/wiki/Jamstack)パターンをより広く適用できる特性を備えているといえるでしょう。

### Format of Tiled CSV Data {#format-of-tiled-csv-data}

- 緯度経度とも、１度×１度ごとにタイル分割。
	- tile_[経度]_[緯度].csv

#### データの例(tile_125_24.csv)

```
X,Y,P27_001,P27_002,P27_003,P27_004,P27_005,P27_006,P27_007,P27_008,P27_009
125.317688,24.796933,47214,3,03002,03002,宮古島市総合博物館,平良字東仲宗根添1166-287,3,-99,1989
125.282787,24.806925,47214,3,03003,03003,宮古島市立平良図書館北分館,平良字東仲宗根42,3,-99,9999
125.393222,24.753839,47214,3,03003,03003,宮古島市立城辺図書館,城辺字福里377-1,3,-99,9999
125.281532,24.805915,47214,3,03003,03003,宮古島市立平良図書館,平良字西里187,3,-99,9999
125.213555,24.8377,47214,3,99999,03109,佐良浜スポーツセンター,伊良部字池間添248-1,3,3,9999
125.195077,24.83307,47214,3,99999,03104,伊良部運動公園,伊良部字前里添945,4,3,9999
125.325478,24.740085,47214,3,99999,03109,上野体育館,上野字宮国1746-2,4,3,9999
125.387054,24.756012,47214,3,99999,03129,城辺トレーニングセンター,城辺字福里579,4,3,9999
125.299712,24.803737,47214,3,99999,03109,宮古島市総合体育館,平良字東仲宗根676-1,4,3,9999
125.328061,24.758818,47214,3,99999,03104,大嶽城跡公園多目的広場,上野字野原1190-134,4,3,9999
125.405059,24.764564,47214,3,99999,03104,城辺運動公園多目的広場,城辺字福里245-1,4,3,9999
125.407091,24.764468,47214,3,99999,03102,城辺運動公園多目的広場,城辺字福里245-1,4,3,9999
125.404346,24.76409,47214,3,99999,03115,城辺運動公園多目的広場,城辺字福里245-1,4,3,9999
125.281412,24.729776,47214,3,99999,03102,下地公園（多目的広場）,下地字与那覇1590,4,3,9999
125.280271,24.730391,47214,3,99999,03104,下地公園（多目的広場）,下地字与那覇1590,4,3,9999
125.263557,24.735081,47214,3,99999,03104,ふれあいの前浜広場,下地与那覇1199-1,4,3,9999
125.299657,24.801104,47214,3,99999,03101,宮古島市陸上競技場,平良字東仲宗根935-1,3,3,9999
125.301632,24.805759,47214,3,99999,03102,宮古島市市民球場,平良字西仲宗根1574-1,3,3,9999
125.301437,24.804417,47214,3,99999,03104,前福多目的屋内運動場,平良字西仲宗根1574-7,3,3,9999
125.302217,24.804102,47214,3,99999,03102,多目的前福運動場,平良字西仲宗根,3,3,9999
125.302178,24.803613,47214,3,99999,03104,多目的前福運動場,平良字西仲宗根,3,3,9999
125.389757,24.75579,47214,3,99999,03101,城辺陸上競技場,城辺字福里616,3,3,9999
125.283694,24.729841,47214,3,99999,03101,下地陸上競技場,下地字与那覇1590,3,3,9999
125.282256,24.729096,47214,3,99999,03109,下地体育館,下地字与那覇1590,3,3,9999
125.326167,24.740636,47214,3,99999,03101,上野陸上競技場,上野字宮国1746-2,3,3,9999
125.162675,24.835657,47214,3,99999,03109,伊良部勤労者体育センター,伊良部字長浜1542-5,3,3,9999
125.161233,24.835137,47214,3,99999,03109,伊良部Ｂ＆Ｇ海洋センター,伊良部字長浜1822-5,3,3,9999
125.161328,24.834684,47214,3,99999,03106,伊良部Ｂ＆Ｇ海洋センター,伊良部字長浜1822-5,3,3,9999
125.262975,24.734973,47214,3,99999,03148,与那覇前浜,下地与那覇1199-1,3,3,9999
125.271057,24.802628,47214,3,99999,03148,パイナガマ,平良下里338-3,3,3,9999
125.443114,24.74628,47214,3,99999,03148,新城海岸,城辺字新城,3,3,9999
125.447629,24.741724,47214,3,99999,03148,吉野海岸,城辺保良,3,3,9999
125.432329,24.729739,47214,3,99999,03148,保良川ビーチ,城辺保良591-1,3,3,9999
125.257704,24.797368,47214,3,99999,03148,サンセットビーチ,平良久貝643-3,3,3,9999
125.156941,24.857008,47214,3,99999,03148,佐和田の浜,伊良部佐和田,3,3,9999
125.181135,24.81205,47214,3,99999,03148,渡口の浜,伊良部町伊良部,3,3,9999
```

### 元データと、分割プログラム {#original-data-and-splitting-program}

#### 元データのDL先

- [国土数値情報文化施設 ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P27.html#prefecture00)の 全国　をダウンロード 解凍

#### Shapefile->CSV変換

- OGR2OGRで変換
	- コマンド：　```ogr2ogr -lco GEOMETRY=AS_XY P27-13.csv P27-13.shp```
		- [オプションの参考情報](https://qiita.com/tohka383/items/d3d1bf80db2cfb416330#csv)

#### Notes

- OGR2OGR:
	- ogr2ogrは[GDAL](https://gdal.org/)と呼ばれるよく知られたOSSのGISツール集に同梱されているベクトルデータの変換ツール。
	- Windows版は[こちら](https://gdal.org/download.html#windows)に紹介されているように [gisinternals.com](https://www.gisinternals.com/)でコンパイル済みのバイナリが配布されています。
		- インストール/Windows
			- [Stable Releases](https://www.gisinternals.com/release.php)　　⇒　MSVC 2017 x64 (他コンパイル環境も可)　⇒　Generic installer for the GDAL core components (gdal-*-core.msi)
		- ogr2ogrの実行方法/Windows
			- Windowsメニュー　⇒　すべてのアプリ　⇒　GDAL　⇒　GDAL * Command Prompt で起動したコマンドプロンプト上で動かす
- CSVのヘッダ行：
	- 国土数値情報のヘッダ行は機械的に割り振られた番号(P27_001など)になっている。[国土数値情報の属性情報の説明](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P27.html) を見て、タイル分割前にCSVのヘッダ行を地物名に書き換えるとわかりやすくなります。

#### CSVのタイル分割

- [simpleTiling.py](https://svgmap.org/examples/tutorials/tiling1/simpleTiling.py)を用意したのでこれを使います
- 作業ディレクトリにtilesディレクトリを作成
- コマンド：　```python simpleTiling.py P27-13.csv 0 1```
	- 参考 : [Windows版Pythonのインストール](https://www.python.jp/install/windows/install.html)

### tiling1.html {#tiling1-html}

- [チュートリアル6](../tutorial-6/index.md)のhtmlと特に違いはありません

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

- [チュートリアル6](../tutorial-6/index.md)のhtmlと特に違いはありません。
	- GeoJsonデータはベクトルタイルデータのため、class属性で[clickable](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#class.E5.B1.9E.E6.80.A7.E3.81.AB.E3.82.88.E3.82.8B.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.AE.E3.82.B0.E3.83.AB.E3.83.BC.E3.83.94.E3.83.B3.E3.82.B0.E3.83.BB.E3.82.AF.E3.83.AA.E3.83.83.E3.82.AB.E3.83.96.E3.83.AB.E6.A9.9F.E8.83.BD.E3.81.AE.E6.8F.90.E4.BE.9B)を指定しています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- OpenStretMap背景地図を表示状態として読み込む -->
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap" visibility="visible"/>

<!-- 日本の公共施設データのPoint CSVファイルのタイルデータを表示状態として読み込む -->
<animation xlink:href="simpleTiling.svg" x="-3000" y="-3000" width="6000" height="6000" title="Cultural Facility" class="POI clickable" visibility="visible"/>
</svg>
```

### simpleTiling.svg {#simple-tiling-svg}

- defs要素でアイコンを定義しています。
- データの実体はここにはありません。webAppで動的に生成されます。
- id="mapTiles"のグループ内に、タイルごとにサブグループが作られ、そこにアイコン(Point)が配置されます。

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" property="" data-controller="simpleTiling.html#exec=appearOnLayerLoad"> 
<defs> 
<g id="p0"> 
  <circle cx="0" cy="0" r="5" fill="blue"/> 
</g> 
</defs> 
<globalCoSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" /> 
<g id="mapTiles"> 
</g> 
</svg>
```

### simpleTiling.html, simpleTiling.js {#simple-tiling}

- simpleTiling.svgに紐付けられ、[そのDOMをコントロールできるwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)
-  表示領域に応じてタイル分割されたGeoJsonデータを動的に読み込みます。この点は [チュートリアル5](../tutorial-5/index.md)と類似しています。
- 縮尺に応じたピラミッド構造は持っていないので、このチュートリアルのほうが単純です。
- その代わり、小縮尺(縮小表示)では読み込むデータが大量になりすぎるので、読み込みを行わず、描画を消去し(```removeAllTiles()```)、webAppのウィンド上に拡大を促すメッセージを出します。
- ```addEventListener("zoomPanMap",zpmFunc)``` : 伸縮スクロールが発生したときに、 zpmFunc()を呼び出す。
- ```zpmFunc()``` : 表示領域に応じて読み込むべきタイルを選別して表示する
- ```svgMap.getGeoViewBox()``` : 地理的な表示領域を取得
- ```getTileList(geoViewBox)``` : 表示すべきタイルをリストアップする
- ```delete tiles[tileKey]``` : 表示領域から外れたタイルのグループを消去
- ```await loadCSV()``` : 既に読み込み済みのものを除き、表示すべきタイルデータ(CSV)を読み込み
- ```drawTiles()```：読み込んだCSVデータを表示する
- タイルを表示するためのグループを作成
- ```csv2geojson``` : 読み込んだCSVからgeoJsonを生成する
- ```svgMapGIStool.drawGeoJson()``` : geoJsonからSVGのDOMを生成
- ```svgMap.refreshScreen()``` 伸縮スクロール以外のタイミングでDOMの再描画が必要な場合、 [再描画を明示](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen)する必要があります。
- [参考情報](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```html
<!doctype html> 
<html> 
<head> 
<title>Simple Tiling Tutorial</title> 
<meta charset="utf-8"></meta> 
</head> 
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script> 
<script src="simpleTiling.js"></script> 
<body> 
<h3>Displaying CSV Tile Data</h3> 
<div id="message">-</div> 
</body> 
</html>
```

```js
addEventListener("load",init);
addEventListener("zoomPanMap",zpmFunc);

var latCol=10;
var lngCol=9;
var tilesTh=8; // 画面の中に入るタイルの枚数の閾値（縮小すると読み込むタイルが多くなりすぎ重くなるのを防ぐ）

function init(){
	zpmFunc();
}

function getTileList(geoViewBox){
	var tileNames={};
	for ( var ty = Math.floor(geoViewBox.y) ; ty<= Math.floor(geoViewBox.y+geoViewBox.height) ; ty++){
		for ( var tx = Math.floor(geoViewBox.x) ; tx <= Math.floor(geoViewBox.x+geoViewBox.width) ; tx++){
			var tile="tile_" + tx + "_" + ty;
			tileNames[tile]=true;
		}
	}
	return ( tileNames);
}

var tiles={}; // データ(CSVを配列化したもの)をタイルごとに格納する変数

async function zpmFunc(){
	var geoViewBox = svgMap.getGeoViewBox();
	var tileList=getTileList(geoViewBox);
	
	if (Object.keys(tileList).length < tilesTh ){
		for ( var tileKey in tiles ){ // 必要ないデータを消す
			if ( !tileList[tileKey]){
				delete tiles[tileKey];
			}
		}
		for ( var tileKey in tileList ){ // 不足しているデータを読み込む
			if ( !tiles[tileKey] ){
				tiles[tileKey]=await loadCSV(`tiles/${tileKey}.csv`); // テンプレートリテラル
			}
		}
		message.innerText="-";
		drawTiles(tileList);
	} else {
		message.innerText="Too many tiles, please zoom in.";
		removeAllTiles();
	}
}

function removeAllTiles(){
	tiles={};
	var groups = svgImage.getElementById("mapTiles").children;
	for ( var i = groups.length -1 ; i >= 0 ; i-- ){
		groups[i].remove(); 
	}
	svgMap.refreshScreen();
}

function drawTiles(tileList){
	// tileList:表示すべきタイルのキー(ID)の連想配列
	var tileGroup = svgImage.getElementById("mapTiles");
	var groups = tileGroup.children;
	for ( var i = groups.length -1 ; i >= 0 ; i-- ){
		var groupKey = groups[i].getAttribute("id");
		if ( !tileList[groupKey]){
			groups[i].remove(); // 表示する必要のないグループは消す
		} else {
			delete tileList[groupKey]; // すでに描画済みのタイルなのでtileListから消す
		}
	}
	// tileListは、新たに描画すべきタイルのリストとなった
	for ( var tileKey in tileList){
		var grp = svgImage.createElement("g");
		grp.setAttribute("id",tileKey);
		tileGroup.appendChild(grp);
		if ( tiles[tileKey] ){
			var geoJson = csv2geojson(tiles[tileKey], lngCol, latCol);
			svgMapGIStool.drawGeoJson(geoJson, layerID, "", 0, "", "p0", "poi", "", grp);
		}
		
	}
	svgMap.refreshScreen();
}

var schema;

async function loadCSV(url){
	var response = await fetch(url);
	if ( response.ok ){
		var txt = await response.text();
		txt=txt.split("\n");
		var csv=[];
		var schemaLine = true;
		for ( line of txt){
			line = line.trim();
			if ( schemaLine ){
				schema = line;
				svgImage.documentElement.setAttribute("property",schema);
			} else {
				if ( line !=""){
					line=line.split(",");
					csv.push(line);
				}
			}
			schemaLine = false;
		}
		return ( csv );
	} else {
		return ( null );
	}
}

function csv2geojson(csvArray, lngCol, latCol){
	var geoJson = {type: "FeatureCollection",  features: []}
	for ( var csvRecord of csvArray ){
		var lng = Number(csvRecord[lngCol]);
		var lat = Number(csvRecord[latCol]);
		var feature = { type: "Feature",
			geometry: {
				type: "Point",
				"coordinates": [lng, lat]
			},
			"properties": {
				"csvMetadata": csvRecord.toString() // この処理は非常に雑です。
			}
		}
		geoJson.features.push(feature);
	}
	return(geoJson);
}

```
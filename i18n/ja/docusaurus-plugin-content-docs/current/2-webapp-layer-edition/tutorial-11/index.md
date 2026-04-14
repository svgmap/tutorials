---
sidebar_position: 11
---

# チュートリアル11 WebApp Layer 地図を使った位置指定UI

## はじめに  {#introduction}

[チュートリアル10](../tutorial-10/index.md)をベースに、地図上で位置を指定して、その場所のジオイド高を計算・表示する対話型アプリを構築します。

実際の動作は、 [mesh3b.html](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html)をクリック。

### ソースコード {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/mesh3b/)
- バイリニア補完によるメッシュデータを利用した任意位置の値の計算
- 地図上の任意の点を指定して、その位置のジオイド高を表示

## チュートリアル {#tutorial}

[チュートリアル10](../tutorial-10/index.md)をベースに、地図上で位置を指定して、その場所のジオイド高を計算・表示する対話型アプリを構築します。 特徴的なコードはレイヤーに紐付いたwebAppにあります。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html) をクリック。
- 使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/mesh3b.zip)

### [mesh3b.html](https://svgmap.org/examples/tutorials/mesh3b/mesh3b.html) {#mesh3b-html}

特にこれまでと大きな違いはありません。

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

### [Container.svg](https://svgmap.org/examples/tutorials/mesh3b/Container.svg) {#container-svg}

これまでと特に大きな違いはありません。

### [rasterMeshI.svg](https://svgmap.org/examples/tutorials/mesh3b/rasterMeshI.svg) {#raster-meshi-svg}

[チュートリアル10](../tutorial-10/index.md#containersvg-container-svg)と特に大きな違いはありません。

### [rasterMeshI.html](https://svgmap.org/examples/tutorials/mesh3b/rasterMeshI.html), [geoidCalc.js](https://svgmap.org/examples/tutorials/mesh3b/geoidCalc.js) {#raster-mesh-geoid-calc}

[チュートリアル10](../tutorial-10/index.md)のコードに対して、地図上で位置を指定するUIと、その位置のジオイド高を計算する機能が追加されています。

- 地図上で位置を指定するUI：SVGMapAuthoring.jsというSVGMap.js用の追加ライブラリを用いています。
- ジオイド高計算： [バイリニア補間](https://en.wikipedia.org/wiki/Bilinear_interpolation)を用いて、グリッドデータを用いて任意の位置の値を演算します。
	- バイリニア補間については、地理院が[こちらのページで公開するジオイド高データ](https://fgd.gsi.go.jp/download/geoid.php)(TEXTデータ)のパッケージ同梱文書(**asc取扱説明書.pdf**)にも計算式が記載されていますので参考にしてください。(本チュートリアルの ```getGeoidHeight(lng,lat)``` 関数は同文書の式をベースにしています。)
- ```initPOIUI``` 地図上で位置を指定するUIの初期化をload時に実行
	- ```svgMapAuthoringTool.initPOIregistTool```
		- ```id="pointInputUI"``` のdiv要素に、
		- [svgMapAuthoringTool](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapAuthoringTool) で使える、地図上でポイント情報を設置するUIを登録します。 ([initPOIregistTool](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#initPOIregistTool))
		- ```POIUIcbFunc``` ポイントを設定する操作を実施するすると呼び出されるコールバック関数。緯度、経度の情報をUIから取得し、ジオイド高を計算する関数(```getGeoidHeight```)に渡して、答えを表示します。
- ```getGeoidHeight``` グリッドデータからジオイド高を計算する関数
	- バイリニア補間を用いて任意の緯度経度（ただしグリッドデータのある範囲）におけるジオイド高を計算します。

geoidCalc.js

```js
...
...
onload = async function(){
	initPOIUI();
	...
	...
}
...
...
function getGeoidHeight(lng,lat){
	// バイリニア補完によって、任意の緯度経度(実数)でのジオイド高を算出する(世界測地系)
	var px = Math.floor((lng-dataProps.glomn)/dataProps.dglo);
	var py = Math.floor((lat-dataProps.glamn)/dataProps.dgla);
	
	if ( px < 0 || px > dataProps.nlo -1 || py < 0 || py > dataProps.nla ){
		return ( null );
	}
	
	var lng0 = dataProps.glomn + px * dataProps.dglo;
	var lat0 = dataProps.glamn + py * dataProps.dgla;
	var lng1 = lng0 + dataProps.dglo;
	var lat1 = lat0 + dataProps.dgla;
	
	var Z00 = geoidGrid[py][px];
	var Z10 = geoidGrid[py][px+1];
	var Z01 = geoidGrid[py+1][px];
	var Z11 = geoidGrid[py+1][px+1];
	
	
	if ( Z00 == 999 || Z10 == 999 || Z01 == 999 || Z11 == 999 ){
		return ( null );
	}
	
	var u = (lng - lng0)/(lng1 - lng0);
	var t = (lat - lat0)/(lat1 - lat0);
	var Z = (1 - t) * (1 - u) * Z00 + (1 - t) * u * Z10 + t * (1 - u) * Z01 + t * u * Z11;
	
	return ( Z );
}
...
...
var poiUI;
function initPOIUI(){
	poiUI=document.getElementById("pointInputUI");
	var getPointOnly = false;
	svgMapAuthoringTool.initPOIregistTool(poiUI,svgImageProps.rootLayer,"targetPoint","p0","targetPoint","",POIUIcbFunc,"cbFuncParam",getPointOnly);
}

function POIUIcbFunc(){
	var latlngs=(poiUI.getElementsByTagName("input")[2].value).split(",");
	console.log(latlngs);
	var lat=Number(latlngs[0]);
	var lng=Number(latlngs[1]);
	var geiodHeight = getGeoidHeight(lng,lat);
	messageDiv.innerText=geiodHeight+" m";
}
```
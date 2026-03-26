---
sidebar_position: 5
---

# チュートリアル5 WebApp Layer タイルピラミッド

## はじめに  {#introduction}

[OpenStreetMapのタイルピラミッド](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) を用いて、伸縮・スクロールに応じ適切な地図を表示 ([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) するレイヤーを、SVGMapの [WebApp Layer機構](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)によって構成するチュートリアルです。

実際の動作は、[こちら](https://svgmap.org/examples/tutorials/tutorial5/tutorial5.html) をクリック。

### ファイル構造 {#file-structure}

ファイル構造は以下の通りです：

- ファイル構成は[tutorial5](https://www.svgmap.org/examples/tutorials/tutorial5) ディレクトリに以下のファイルがあります。
  - [Tutorial5.html](https://www.svgmap.org/examples/tutorials/tutorial5/tutorial5.html)
    - チュートリアル5用のhtml。tutrial2b.htmlと同様の内容。
  - [Container.svg](https://www.svgmap.org/examples/tutorials/tutorial5/Container.svg)
    - 外部のOpenStreetMapを表示するためのdynamicOSM_r11.svgを読み込む。
  - [dynamicOSM_r11.svg](https://www.svgmap.org/examples/tutorials/tutorial5/dynamicOSM_r11.svg)
    - 外部のOpenStreetMapを表示するSVGMapコンテンツのレイヤー(中身は空で下のウェブアプリケーションがDOMを動的に構築している)
  - [dynamicOSM_r11.html](https://www.svgmap.org/examples/tutorials/tutorial5/dynamicOSM_r11.html)
    - 上記dynamicOSM_r11.svgに紐づいたウェブアプリケーションのhtml
  - [dynamicOSM_r11.js](https://www.svgmap.org/examples/tutorials/tutorial5/dynamicOSM_r11.js)
    - 上記dynamicOSM_r11.svgに紐づいたウェブアプリケーションのjavascriptコード

## チュートリアル {#tutorial}

SVGMap.jsでは、レイヤーは単なるコンテンツ(SVGのファイル)だけでなく、javascriptによって動的にSVGMapコンテンツを生成するWebAppを与えることができます。 ([WebAppによる動的なレイヤー (WebApp Layer)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)) の ([レイヤー固有のUI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI))

WebApp Layerの名の通り、レイヤーに紐付けられるのはjavascriptコードだけでなく、HTML+CSSなどによるUI(Windowオブジェクト)も持ちます。

チュートリアル５以降は、主にこのWebApp Layer機能を使って様々なデータを表示したり、レイヤーに固有のユーザインターフェースを設ける機能を実装します。

ここではこの機能を使って、OpenStreetMapのタイルピラミッドを用いて、伸縮スクロールに応じて適切な地図をスピーディに表示するレイヤーを構築してみます。

なお、チュートリアル５は少々コード量が多いので、短いコードでWebApp Layerの機能を試すには [チュートリアル6](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB6) の方が簡単かもしれません。

実際の動作は、[こちら](https://www.svgmap.org/examples/tutorials/tutorial5/tutorial5.html) をクリック。
使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/tutorial5.zip).

### Tutorial5.html {#tutorial5-html}

- SVGMapのコアプログラムファイル(SVGMapLv0.1_r18module.js)を読み込み、SVGMapの各種APIを利用可能にする。
- 地図表示部分を(DIVで)定義し、そこに表示するレイヤをまとめたSVGファイル(Containers.svg)を読み込む(上記SVGMapのコアプログラムにて自動的にVisibleになっているレイヤが表示される)。
- ズームアップ・ズームダウン・GPSの各ボタンの表示とクリック時の動作(SVGMapのコアプログラムのそれぞれのAPIを呼び出す)を定義。
  - ズームアップボタン:svgMap.zoomup() APIを呼び出すことで地図をズームアップする。
  - ズームダウンボタン:svgMap.zoomdown() APIを呼び出すことで地図をズームダウンする。
  - GPSボタン:svgMap.gps() APIを呼び出すことで、現在地(PCやスマートフォンの位置、特定できる場合のみ)を中心にズームアップ表示する。
- 中心を表す十字マークを表示。
- 上記十字マークが示している地図上の緯度・経度の表示(実際には、地図の移動時に地図の中心の緯度・経度を表示する)。

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial5 DynamicContents</title>
<!-- viewport 知表示領域を画面全体とする定義 -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- SVGMapのコアAPIの読み込み -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgMap=svgMap
</script>

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- 地図SVGファイルを複数含む(このチュートリアルでは5ファイルのみ)コンテナファイル(Container.svg)の読み込み -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- ズームアップボタン -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- ズームダウンボタン -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPSボタン -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- 画面右上に表示するタイトル -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial5 DynamicContents</font>
<!-- 画面右下に表示する -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- 中央に表示される十字マーク -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- 画面左下に表示される十字マークの緯度・経度(タイトル) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- 画面左下に表示される十字マークの緯度・経度(実際の値の初期表示) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat ,lng</font> 
</html>
</body>
 </div>
```

### コンテナ.svg {#container-svg}

- 表示する各レイヤ用のSVGファイルを読み込む(dynamicOSM_r10.svgのみを読み込んでいる)。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:go="http://purl.org/svgmap/profile" viewBox="12300 -4600 2200 2200" >

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100.0,0.0,0.0,-100.0,0.0,0.0)" />

<!-- Load the SVG file for OpenStreetMap as the display state -->
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="dynamicOSM_r11.svg" title="OpenStreetMap(Global)" class="basemap switch" visibility="visible"/>
</svg>
```

### dynamicOSM_r11.svg {#dynamic-osm-r11-svg}

外部のOpenStreetMapを表示するためのWebAppが紐付けられたSVG Mapコンテンツレイヤーファイル。

SVGMap.jsの持つ [WebApp Layer機構](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) を活用します。

- SVGコンテンツのドキュメント要素(svg要素)のdata-controller属性でウェブアプリケーション(javascriptコードが載ったhtmlコンテンツ)を参照することで、SVGMapコンテンツのレイヤーにウェブアプリを紐づけます。
  - #exec=hiddenOnLayerLoad ハッシュは、同ウェブアプリケーションを非表示状態で起動させます。 [解説書#レイヤー固有のUI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) の詳細を参照
- ウェブアプリでDOMを直接生成するので、コンテンツの中身はほとんど空になっています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" data-controller="dynamicOSM_r11.html#exec=hiddenOnLayerLoad" >

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />

</svg>
```

### dynamicOSM_r11.html, dynamicOSM_r11.js {#dynamicosm-r11}

dynamicOSM_r11.svgに紐付けられたwebApp [レイヤー固有のUI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI) です。レイヤーに紐付けられたwebAppでは、 [独自のAPI](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E6.8B.A1.E5.BC.B5API) が利用できます


[OpenStreetMap(OSM)](https://www.openstreetmap.org/) は縮尺に応じたピラミッド状の256×256ピクセルのタイルに分割された、[ピラミッド状のイメージ](https://satakagi.github.io/mapsForWebWS2020-docs/imgs/tile_pyramid.png) を配信しています。 ([OSM Slippy map tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames),[OSM ZoomLevels](https://wiki.openstreetmap.org/wiki/Zoom_levels))

これを使用して、表示範囲とズームレベルに適したタイルをOpenStreetMapのサーバから動的に取得・表示する機能([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) を実装します。

Note: ここで使用しているOpenStreetMapのタイルはいわゆるウェブメルカトル図法上での均等メッシュタイルとなっています。一方、このチュートリアルで使用しているSVGMapコンテンツは[正距方位図法](https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%B7%9D%E5%86%86%E7%AD%92%E5%9B%B3%E6%B3%95) (Plate Caree：経度緯度をそのままX,Y平面に展開した図法、業務や技術系の分野でよく使われる)を用いています。そのため図法変換が必要になりますが、本チュートリアルでは簡単化のためにタイルの1次変換だけで済ませています。日本列島レベルぐらいの小縮尺では少し図法の違いによるずれが見えるかもしれません。（SVGMap.jsでは[より正確な図法変換にも対応](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.A1.E3.83.AB.E3.82.AB.E3.83.88.E3.83.AB.E5.9B.B3.E6.B3.95.E3.82.92.E5.90.AB.E3.82.80.E4.BB.BB.E6.84.8F.E3.81.AE.E5.9B.B3.E6.B3.95.E3.81.AE.E5.AE.9A.E7.BE.A9.E3.81.A8.E3.81.9D.E3.81.AE.E5.90.88.E6.88.90.E6.A9.9F.E8.83.BD.28.EF.BC.9Erev16.29)しています。）

#### dynamicOSM_r11.html

htmlは、[レイヤー固有のUIの初期化処理のための共通ライブラリ(svgMapLayerLib.js)の読み込み](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI.E3.81.AE.E3.81.9F.E3.82.81.E3.81.AEhtml.E6.96.87.E6.9B.B8.28webApp.29.E3.81.AE.E6.A7.8B.E9.80.A0.E3.83.BB.E4.BD.9C.E6.B3.95) と、このレイヤー固有の処理内容を記述したscriptコード部```dynamicOSM_r11.js```、及びUI(html,css等)から構成されます。

dynamicOSM_r11.html

```html
<!doctype html> 
<html> 
<head> 
<meta charset="utf-8"></meta> 
<title>OpenStreetMap ダイナミックレイヤー</title> 
</head> 

<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script> 
<script src="dynamicOSM_r11.js"></script> 

<body> 
<h3>OpenStreetMap ダイナミックレイヤー</h3> 
</body> 
</html>
```

#### dynamicOSM_r11.js

- ```onload``` 通常のwebAppと同様、このhtmlに関係するリソースの読み込み完了後実行される関数
  - ```svgMap``` [コアフレームワークインスタンス](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMap)
    - ```svgMap.refreshScreen()```伸縮スクロール以外のタイミングでDOMの再描画が必要な場合、 [再描画を明示](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#refreshScreen)する必要があります。
      - [参考情報](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)
- ```preRenderFunction()```この関数を定義すると、 [画面の再描画の度に、その直前にこの関数が実行されます。](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#preRenderFunction)
  - ```svgImagesProps``` [webAppに紐づいたSVGコンテンツの各種情報](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImageProps) 
    - [解説書参照 ](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImageProps), [参照2](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.83.91.E3.83.86.E3.82.A3.E3.83.AA.E3.82.B9.E3.83.88)
    - ```svgImageProps.scale``` SVGコンテンツの座標系の画面の座標系に対するスケール (注：地理座標系とは異なる) ([参考情報](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.83.91.E3.83.86.E3.82.A3.E3.83.AA.E3.82.B9.E3.83.88))
  - ```svgMap.getGeoViewBox()``` [表示領域を地理座標で取得](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getGeoViewBox).
  - ```getTileSet``` 表示すべきタイルのリスト(連想配列)を取得(詳細後述)
  - ```svgImage``` [ 紐付けられたSVGMapコンテンツのDOM](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgImage)
    - OSMのタイルはsvgのimage要素としてsvg DOMに配置されます。また、getTileSetで得た各タイルのタイル番号(連想配列のKey)をmetadata属性に設定しています。
    - スクロール後、この関数(preRenderFunction)が再度呼び出された時、前ステップまでに既に描画済みのタイルのうち、スクロール後も描画すべきタイルはそのまま残しておくための処理をこのmetadataの値をもとに行います。
  - ```getTile``` タイルリストの連想配列の情報(ZoomLevel,X,Y)をもとに、新たに取得すべきタイルのためのimage要素を得る
    - OSMのビットイメージタイルはsvgのimage要素として貼り付けられます。
    - ```getURL```  ZoomLevel,X,Yから、実際のOSMのタイルのURLを生成する関数
    - ```XY2latLng``` ZoomLevel,X,Yから、タイルの地理座標の領域を得る関数
- ```getTileSet``` 現在のズームレベルと表示領域において、表示すべきタイルをリストアップする関数
  - OSM Slippy Map Tileの、[Zoom](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels) 及び [XY番号](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#X_and_Y) を求め、それをキーにした連想配列を返却します。
  - OSM Slippy Map Tileは、[ウェブメルカトル](https://en.wikipedia.org/wiki/Mercator_projection#Web_Mercator) 図法上で再帰的に２ｘ２等分したタイルピラミッドになっています。
    - ウェブメルカトル図法は、(経度±180度、緯度±85.05113度)の範囲を正方形の地図として構築します。
  - ```latLng2XY``` ウェブメルカトル図法上の、指定したZoomLevelにおいて、地球全図を一枚の大きな正方形のビットイメージと想定したときの、指定した緯度経度のぞのビットイメージ上での座標値を求める
    - ```lvl2Res```  ZoomLevelから対応する地球全体のビットイメージの幅を求める(Level0:256px)
  - ```XY2TileXY``` 上記地球全図の一枚の大きな正方形のビットイメージ上のXY座標から、それをタイル分割したときに、その座標が属するタイルの番号（タイルのX番号、Y番号）を得る

  dynamicOSM_r11.js

<details>
<summary>Click see full JS data</summary>

```js
// Dynamic OpemStreetMap Layer for SVGMap Sample for SVGMapLevel0 > r10
//
// Programmed by Satoru Takagi
// 
// License: (MPL v2)
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
// iframe化を想定した動的レイヤーのプロトタイプ
// (JavaScriptをインポートSVGコンテンツに置くことができる。)
// 地図データとしては、OpenStreetMapを利用（比較的容易に他にも置き換えられる）
//
//
// このコードの動作環境では、以下があらかじめ設定される
// document:このドキュメント自身
// svgImage:このドキュメントに紐づいたSVGMapコンテンツ
//   svgMap.getGeoViewBox(): 地理的なビューボックス
// svgImageProps:このドキュメントに紐づいたSVGMapコンテンツの各種プロパティ
//   svgImageProps.scale: スケール(画面座標に対する、このsvgコンテンツの座標のスケール)
//
// 2013/01/24 : 1st ver.
// 2022/01/31 : WebApp layerに移植

// このファイルの読み込み時に実行する
onload = function () {
	// このスクリプトが読み込まれた直後、refreshScreen()を呼ぶことで、
	//下記preRenderFunctionが初回実行される
	svgMap.refreshScreen();
};

function preRenderFunction() {
	// 再描画直前に実行されるコールバック関数
	var level = 8;
	// ズームレベルを計算(3から18)
	var level = Math.floor(Math.LOG2E * Math.log(svgImageProps.scale) + 7.5);
	if (level > 18) {
		level = 18;
	} else if (level < 3) {
		level = 3;
	}

	// この地図の地理座標におけるviewBox内表示させる、tileのXYとそのHashKeyを取得する
	var tileSet = getTileSet(svgMap.getGeoViewBox(), level);

	// 現在読み込まれているimageというタグ名を持った(地図のタイルごとのイメージ)要素を取得
	console.log("tileSet:", tileSet);
	var currentTiles = svgImage.getElementsByTagName("image");

	// 取得できた各タイル分以下を繰り返し、既に読み込み済みのものは再利用、表示範囲外のものは削除する
	for (var i = currentTiles.length - 1; i >= 0; i--) {
		var oneTile = currentTiles[i];
		var qkey = oneTile.getAttribute("metadata");
		if (tileSet[qkey]) {
			//				すでにあるのでスキップさせるフラグ立てる。
			tileSet[qkey].exist = true;
		} else {
			//				ないものなので、消去
			oneTile.parentNode.removeChild(oneTile);
		}
	}

	// 表示させるタイル分以下を繰り返し、読み込まれていないファイルを読込み要素に加える
	for (var tkey in tileSet) {
		if (!tileSet[tkey].exist) {
			var addTile = getTile(tileSet[tkey].x, tileSet[tkey].y, level, this.CRS);
			svgImage.getElementsByTagName("svg")[0].appendChild(addTile);
		}
	}
}

// 指定された場所のタイル(分割された地図イメージ)を取得
function getTile(tileX, tileY, level, crs) {
	// tileX、tileYの座標、levelのズームレベルのタイルのURLを取得。
	var tileURL = getURL(tileX, tileY, level);

	// タイルのSVGにおけるbboxを得る
	var tLatLng = XY2latLng(tileX * tilePix, tileY * tilePix, level);
	var tSvg = svgMap.transform(tLatLng.lng, tLatLng.lat, crs);
	var tLatLngBR = XY2latLng(
		tileX * tilePix + tilePix,
		tileY * tilePix + tilePix,
		level
	);
	var tSvgBR = svgMap.transform(tLatLngBR.lng, tLatLngBR.lat, crs);
	tSvg.width = tSvgBR.x - tSvg.x; // 効率悪い・・改善後回し
	tSvg.height = tSvgBR.y - tSvg.y;

	// 取得するタイル要素を作成し、各属性をセットする。
	var cl = svgImage.createElement("image");
	cl.setAttribute("x", tSvg.x);
	cl.setAttribute("y", tSvg.y);
	cl.setAttribute("width", tSvg.width);
	cl.setAttribute("height", tSvg.height);
	cl.setAttribute("xlink:href", tileURL.URL);
	cl.setAttribute("metadata", tileURL.Key);

	return cl;
}

// 指定された地図座標geoViewBoxに、levelのズームレベルの地図を表示する場合に、必要なタイルのXYのセットを返却する
function getTileSet(geoViewBox, level) {
	var TileSet = new Object();
	if (geoViewBox.y + geoViewBox.height > 85.05113) {
		geoViewBox.height = 85.05113 - geoViewBox.y;
	}

	if (geoViewBox.y < -85.05113) {
		geoViewBox.y = -85.05113;
	}

	// 指定エリアの、tileのXYとそのHashKeyを返却する
	var tlxy = latLng2XY(geoViewBox.y + geoViewBox.height, geoViewBox.x, level);
	var tileTLxy = XY2TileXY(tlxy);
	var brxy = latLng2XY(geoViewBox.y, geoViewBox.x + geoViewBox.width, level);
	var tileBRxy = XY2TileXY(brxy);

	// 必要な高さ・幅分のタイル個数分以下を繰り返す
	for (var i = tileTLxy.y; i <= tileBRxy.y; i++) {
		for (var j = tileTLxy.x; j <= tileBRxy.x; j++) {
			// タイルのXYとズームレベルからHashKeyを取得する
			var qkey = getKey(j, i, level);
			// 上記で取得したHashKeyごとに、必要なタイル情報を設定する
			TileSet[qkey] = new Object();
			TileSet[qkey].x = j;
			TileSet[qkey].y = i;
		}
	}
	return TileSet;
}

// 緯度・経度からXYに変換
function latLng2XY(lat, lng, lvl) {
	var size = lvl2Res(lvl);
	var sinLat = Math.sin((lat * Math.PI) / 180.0);
	var pixelX = ((lng + 180.0) / 360.0) * size;
	var pixelY =
		(0.5 - Math.log((1 + sinLat) / (1.0 - sinLat)) / (4 * Math.PI)) * size;
	return {
		x: pixelX,
		y: pixelY,
	};
}

// XYからタイルのXYに変換
function XY2TileXY(xy) {
	var tileX = Math.floor(xy.x / tilePix);
	var tileY = Math.floor(xy.y / tilePix);
	return {
		x: tileX,
		y: tileY,
	};
}

var tilePix = 256;
// ズームレベルからタイルの一片のサイズを返却
function lvl2Res(lvl) {
	var j = 1;
	for (var i = 0; i < lvl; i++) {
		j = j * 2;
	}
	return j * tilePix;
}

// XYから緯度・経度に変換
function XY2latLng(px, py, lvl) {
	var size = lvl2Res(lvl);
	var x = px / size - 0.5;
	var y = 0.5 - py / size;
	var lat = 90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI;
	var lng = 360 * x;
	return {
		lat: lat,
		lng: lng,
	};
}

var sva = new Array("a", "b", "c");
var svNumb = 0;
var culture = "en-US";
var bingRoadSearchPart = ".jpeg?g=849&mkt=" + culture + "&shading=hill";

// タイルのXYとズームレベルからURLを返却する
function getURL(tx, ty, lvl) {
	// XYとズームレベルからHashKeyを取得
	var tile_ans = getKey(tx, ty, lvl);
	// OpenStreetMapのURLを組み立てる
	var mapServerURL =
		"http://" +
		sva[svNumb] +
		".tile.openstreetmap.org/" +
		lvl +
		"/" +
		tx +
		"/" +
		ty +
		".png";
	// 複数の同様のサーバを順次切り替えながら使用することで、地図イメージ取得時の負荷分散を行う。
	++svNumb;
	if (svNumb > 2) {
		svNumb = 0;
	}
	return {
		URL: mapServerURL,
		Key: tile_ans,
	};
}

// HashKeyを生成し返却する
function getKey(tx, ty, lvl) {
	return tx + "_" + ty + "_" + lvl;
}
```

</details>
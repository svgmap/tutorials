# チュートリアル4 Bitmapイメージ地図表示

## はじめに  {#introduction}

チュートリアル1の内容に一部のBitmapイメージ地図を重ねて表示するチュートリアルです。実際の動作は[こちら](https://svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html)をクリック。

### ファイル構造 {#file-structure}

The file structure is as follows:

- ファイル構成は[tutrial4ディレクトリ](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html)ディレクトリに以下のファイルがあります。
  - [tutorial4.html](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/tutorial4.html)
    - チュートリアル4用のhtml。tutrial1.htmlと同様の内容。
  - [Container.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/Container.svg)
    - チュートリアル1と同様のCoastline.svgと重ね合わせて表示するビットマップイメージのbitmapImage.svgを読み込む
  - [dynamicOSM_r11.svg](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4/dynamicOSM_r11.svg)
    - チュートリアル2cと同様のOpenStreetMapレイヤー
- 重ね合わせるビットマップイメージSVGファイル。
  - こちらのツールを使用して作成したもの。[ビットイメージの地図画像をSVGMapのレイヤー化するツール](https://svgmap.org/devinfo/devkddi/lvl0.1/bitimage2geoInfo/mapPage/).

## チュートリアル {#tutorial}

### 使用ファイル {#files-used}

- 実際の動作は[こちら](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial4.zip)をクリック。
- 出典：[首都直下地震の被害想定 7ページ](https://www.bousai.go.jp/kyoiku/bousai-vol/drill/h26/tokyo/tokyo03_kato.pdf#page=4)

### tutorial4.html {#tutorial4-html}

基本的に[チュートリアル2b](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b)で使用したtutorial2b.htmlと同様。

- SVGMapのコアプログラムファイル(SVGMapLv0.1_r18module.js)を読み込み、SVGMapの各種APIを利用可能にする。
- レイヤーリストUI用のCSSを読み込み
- 地図表示部分を(DIVで)定義し、そこに表示するレイヤをまとめたSVGファイル(Containers.svg)を読み込む(上記SVGMapのコアプログラムにて自動的にVisibleになっているレイヤが表示される)。
- ズームアップ・ズームダウン・GPSの各ボタンの表示とクリック時の動作(SVGMapのコアプログラムのそれぞれのAPIを呼び出す)を定義。
  - ズームアップボタン:svgMap.zoomup() APIを呼び出すことで地図をズームアップする。
  - ズームダウンボタン:svgMap.zoomdown() APIを呼び出すことで地図をズームダウンする。
  - GPSボタン:svgMap.gps() APIを呼び出すことで、現在地(PCやスマートフォンの位置、特定できる場合のみ)を中心にズームアップ表示する。
- 中心を表す十字マークを表示。
- 上記十字マークが示している地図上の緯度・経度の表示(実際には、地図の移動時に地図の中心の緯度・経度を表示する)。
- レイヤーリストUI用のdiv要素(id="layerList"を設置)

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
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
<!-- 地図SVGファイルを複数含むコンテナファイル(Container.svg)の読み込み -->
 <div id="mapcanvas" data-src="Container.svg"></div>
 <div id="gui">
<!-- ズームアップボタン -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- ズームダウンボタン -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPSボタン -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- 画面右上に表示するタイトル -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
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

- [チュートリアル2c](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c)と同様に、ビットマップイメージのbitmapImage.svg、dynamicOSM_r11.svgをレイヤーとして読み込んでいます。
- [チュートリアル2c追加の章と](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c#.E8.BF.BD.E5.8A.A0.EF.BC.9A.E8.83.8C.E6.99.AF.E5.9C.B0.E5.9B.B3.E3.82.92.E9.81.B8.E3.81.B9.E3.82.8B.E3.82.88.E3.81.86.E3.81.AB.E3.81.99.E3.82.8B)と同様に背景地図を2つ(OpenStreetMapとCoastline.svg)選べるようにしています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Background map 1 Japan coastline data (hidden) -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap switch" visibility="hidden"/>
<!-- Background map 2 OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load a bitmap image SVG file as a display state -->
<animation xlink:href="bitmapImage.svg" x="-3000" y="-3000" width="6000" height="6000" title="Bitmap Image SVG" visibility="visible" opacity="0.6"/>

</svg>
```
### bitmapImage.svg {#bitmapimage-svg}

- 重ね合わせるビットマップイメージSVGファイル。
  - ビットイメージの地図画像をSVGMapのレイヤー化するツールを使用して作成。[こちらのツール](https://svgmap.org/devinfo/devkddi/lvl0.1/bitimage2geoInfo/mapPage/)
  - オリジナルのビットイメージは本章冒頭記載の文書から抽出

#### 経度緯度とSVGコンテンツのXY座標との関係 {#relationship-between-lon-lat-xy-coord}

```globalCoordinateSystem``` 要素の ```transform``` 属性（一次変換マトリクスの６つの値）で指定されます

```
Xsvg = a * 経度 + c * 緯度 + e 
Ysvg = b * 緯度 + d * 緯度 + f
```

一次変換マトリクスa,b,c,d,e,fの値がそれぞれ1,0,0,-1,0,0であることから、

```
Xsvg = 経度
Ysvg = -緯度
```

#### image要素のパラメータ {#image-element-parameters}

- image要素によってビットイメージを配置しています
  - ```xlink:href="[ビットイメージのURL]"``` 配置するビットイメージのURL
  - ```x="139.1063918412553"``` 配置するX原点＝西端の経度（139.10..°）
  - ```y="-35.90355823638255"``` 配置するX原点＝北端の緯度（35.903..°）をマイナスにした値
  - ```width="0.8140711890480361"``` 幅（経度で0.81°）
  - ```height="0.41815015611484085"``` 高さ (緯度で0.41°）
  - ```preserveAspectRatio="none"``` ビットイメージの実際のサイズのアスペクト比を変えてでも上記指定領域にぴったりと配置する　([参考：SVG spec](https://www.w3.org/TR/SVG2/coords.html#PreserveAspectRatioAttribute))

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
 viewBox="139.1063918412553,-35.90355823638255,0.8140711890480361,0.41815015611484085" about="root"> 
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/> 

 <image xlink:href="http://www.toshiseibi.metro.tokyo.jp/bosai/chousa_6/parts/kikendo_map.jpg" 
   x="139.1063918412553" 
   y="-35.90355823638255" 
   width="0.8140711890480361" 
   height="0.41815015611484085" 
   preserveAspectRatio="none" 
   opacity="0.5" /> 

</svg>
```

### dynamicOSM_r11.svg (およびdynamicOSM_r11.html) {#dynamicosm-r11-svg}

[チュートリアル2cのdynamicOSM_r11.svg](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2c#dynamicOSM_r11.svg.E3.80.81.28dynamicOSM_r11.html.29)と同じものです。

### Coastline.svg {#coastline-svg}

[チュートリアル1](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB1#Coastline.svg)から使ってきているものと同じです。
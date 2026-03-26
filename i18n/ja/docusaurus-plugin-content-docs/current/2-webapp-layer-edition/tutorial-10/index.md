---
sidebar_position: 10
---

# チュートリアル10 WebApp Layer メッシュデータのビットイメージ化

## はじめに  {#introduction}

メッシュデータ（グリッドデータ）は[ラスターデータとも呼ばれる](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Raster)ように、Webコンテンツとして使われるビットイメージデータとほぼ同等です。そこでメッシュデータを動的にビットイメージコンテンツ(PNG形式)化し地図画面上に表示するWebAppを構築してみます。性能面でのメリットがあります。

実際の動作は、[mesh3.html](https://svgmap.org/examples/tutorials/mesh3/mesh3.html) をクリック。

### ソースコード {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/mesh3/)
- 地理院が公開する[ジオイド高データ](https://fgd.gsi.go.jp/download/geoid.php) (TEXTデータ)をfetchAPIで読み込み変数(Object)に保持する
- canvas要素のAPIを用いてビットイメージを構築
- dataURI化してSVGのimage要素にし、地図上に配置

## チュートリアル {#tutorial}

メッシュデータ（グリッドデータ）は [ラスターデータとも呼ばれる](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Raster)ように、Webコンテンツとして一般的に使われるビットイメージデータ形式(PNGやJPEGなど)とほぼ同等の形式です。そこでメッシュデータを動的にビットイメージコンテンツ(PNG形式)化し、地図画面上に表示するWebAppを構築してみます。性能面でのメリットがあります。

特徴的なコードはレイヤーに紐付いたwebAppにあります。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/mesh3/mesh3.html) をクリック。
- 使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/mesh3.zip)

### 使用するデータ {#data-to-use}

地理院が [こちらのページで公開するジオイド高データ](https://fgd.gsi.go.jp/download/geoid.php) (TEXTデータ)を使用します。

[実際に使用するデータ](https://svgmap.org/examples/tutorials/mesh3/gsigeo2011_ver2_1.asc)

このデータの詳細な仕様は上記サイトで配布されているパッケージ同梱文書(**asc取扱説明書.pdf**)に記載されていますが、基本的にはテキストの[Raster形式](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB8#Raster)です。

データ形式としては、カンマ区切りでなく空白文字区切り 一つのRaw（桁）が１行で終結せず、２５５文字で改行される点が注意点です

データの内容としては、グリッドデータの原点の定義と、それをビットイメージ画像として可視化したときの原点との違いに注意が必要です。（下記２点）

- Y(緯度)軸の向きが逆のため、元のラスターデータの原点は南端、ビットイメージの原点は上端、
- ラスターデータの原点は、それをビットイメージとして可視化したときのピクセルの中心位置なのに対し、ビットイメージを配置するときの原点はピクセルの左上隅

![Explination Diagram](../../../../../../src/images/800px-Raster.png)

[Explination Diagram](https://svgmap.org/examples/tutorials/mesh3/mesh3_raster_exp.svg)

### [mesh3.html](https://svgmap.org/examples/tutorials/mesh3/mesh3.html) {#mesh3-html}

これまでと特に変わったところはありません。

### [Container.svg](https://svgmap.org/examples/tutorials/mesh3/Container.svg) {#container-svg}

これまでと特に変わったところはありません。

### [rasterMesh.svg](https://svgmap.org/examples/tutorials/mesh3/rasterMesh.svg) {#raster-mesh-svg}

- WebAppが(下記rasterMesh.html)が紐付けられた空白のコンテンツです。
- 表示とともにwebAppのウィンドが出現するように指定しています。
- これまでと特に変わったところはありません。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-controller="rasterMesh.html#exec=appearOnLayerLoad" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" property="Local government codes">

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />
</svg>
```

### [rasterMesh.html](https://svgmap.org/examples/tutorials/mesh3/rasterMesh.html), [rasterMesh.js](https://svgmap.org/examples/tutorials/mesh3/rasterMesh.js) {#raster-mesh}

読み込んだテキストのラスターデータを用いてビットイメージを動的に生成、これを紐付けられたrasterMesh.svgに張り付けて可視化します。

- ```onload=async function()```
	- ```await buildData()``` メッシュデータを読み込みグローバル変数に保存する非同期関数
	- ```var duri = buildImage()```
		- 指定されたCanvas要素を作業用に使用し、読み込んだデータからビットイメージを生成、[dataURI](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)として出力する
		- ```canvas.toDataURL()``` [canvasオブジェクトのtoDataURL](https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL)でPNGビットイメージをDataURLとして生成しています
	- ```imageGeoArea``` [ データの注意点](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB10#.E4.BD.BF.E7.94.A8.E3.81.99.E3.82.8B.E3.83.87.E3.83.BC.E3.82.BF)での指摘の通り、ビットイメージをSVG座標に張り付けるための領域情報を計算しています
	- ```buildSvgImage()```  生成したビットイメージ(dataURI)およびその領域情報を使って、webAppに紐付いたSVG DOMの中に、ビットイメージを張り付ける
		- ```svgImage``` このwebAppに紐付いたSVGコンテンツのDOM(Documentオブジェクト)があらかじめ定義されている
	- ```svgMap.refreshScreen()``` 非同期での読み込みとデータ生成・SVGMapのDOM編集が完了したら再描画を明示し画面に反映する([参考](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90))

rasterMesh.js

```js
// Description:
// MeshData Visualizer.
// 
// History:
// 2022/02/14 : 1st rev.

// 読み込んだASCIIデータを保持するグローバル変数
var geoidGrid=[];
var dataProps;

onload = async function(){
	// メッシュデータを読み込みグローバル変数に保存
	await buildData();
	// 読み込んだデータからdataURIとしてビットイメージを生成
	var duri = buildImage(geoidGrid,document.getElementById("geoidCanvas")); 
	// 生成した画像の地理的な範囲
	// 画像になると、グリッドの点は画像のピクセルの中心となることに注意！
	var imageGeoArea={
		lng0: dataProps.glomn - dataProps.dglo/2,
		lat0: dataProps.glamn - dataProps.dgla/2,
		lngSpan: dataProps.nlo * dataProps.dglo,
		latSpan: dataProps.nla * dataProps.dgla
	}
	if ( typeof(svgMap)=="object" ){
		buildSvgImage(duri,imageGeoArea); // SVGコンテンツを生成
		svgMap.refreshScreen();
	}
}

async function buildData(){
	var gtxt = await loadText("gsigeo2011_ver2_1.asc");
	
	gtxt = gtxt.split("\n");
	
	dataProps = getHeader(gtxt[0]);
	var gx=0, gy=0;
	var geoidGridLine=[];
	for ( var i = 1 ; i < gtxt.length ; i++){
		var na = getNumberArray(gtxt[i]);
		gx += na.length;
		geoidGridLine = geoidGridLine.concat(na);
		if ( gx >= dataProps.nlo ){
			geoidGrid.push(geoidGridLine);
			geoidGridLine=[];
			gx=0;
		}
	}
}

function buildImage(geoidGrid, canvas){
	//
	canvas.width=dataProps.nlo;
	canvas.height=dataProps.nla;
	var context = canvas.getContext('2d');
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var pixels = imageData.data; 
	for ( var py = 0 ; py < dataProps.nla ; py++ ){
		var dy = dataProps.nla - 1 - py
		for ( var px = 0 ; px < dataProps.nlo ; px++ ){
			var base = (dy * dataProps.nlo + px) * 4;
			if ( geoidGrid[py][px]!=999){
				
				var hue = (1-(geoidGrid[py][px]-dataProps.minVal)/(dataProps.maxVal-dataProps.minVal))*270;
				var rgb = HSVtoRGB(hue,255,255);
				
				pixels[base + 0] = rgb.r;  // Red
				pixels[base + 1] = rgb.g;  // Green
				pixels[base + 2] = rgb.b;  // Blue
				pixels[base + 3] = 255;  // Alpha
			}
		}
	}
	context.putImageData(imageData, 0, 0);
	
	var duri = canvas.toDataURL('image/png');
	return ( duri );
}

function getHeader(line){
	var datas = parseLine(line);
	return {
		glamn:Number(datas[0]),
		glomn:Number(datas[1]),
		dgla:Number(datas[2]),
		dglo:Number(datas[3]),
		nla:Number(datas[4]),
		nlo:Number(datas[5]),
		ikind:Number(datas[6]),
		vern:datas[7],
		minVal:9e99,
		maxVal:-9e99
	}
}

function getNumberArray(line){
	var ans = [];
	var lineArray = parseLine( line );
	for ( var col of lineArray){
		var val = Number(col);
		if ( val != 999){
			if ( val > dataProps.maxVal){
				dataProps.maxVal=val;
			}
			if ( val < dataProps.minVal){
				dataProps.minVal=val;
			}
		}
		ans.push(val);
	}
	return ( ans );
}

function parseLine(line){
	var ans = line.trim().split(/\s+/)
	return (ans);
}


async function loadText(url){ // テキストデータをfetchで読み込む
	messageDiv.innerText="ジオイド高データを読み込み中です";
	var response = await fetch(url);
	var txt = await response.text();
	messageDiv.innerText="";
	return ( txt );
}

function HSVtoRGB (h, s, v) { // from http://d.hatena.ne.jp/ja9/20100903/1283504341
	var r, g, b; // 0..255
	while (h < 0) {
		h += 360;
	}
	h = h % 360;
	
	// 特別な場合 saturation = 0
	if (s == 0) {
		// → RGB は V に等しい
		v = Math.round(v);
		return {'r': v, 'g': v, 'b': v};
	}
	s = s / 255;
	
	var i = Math.floor(h / 60) % 6,
	f = (h / 60) - i,
	p = v * (1 - s),
	q = v * (1 - f * s),
	t = v * (1 - (1 - f) * s);

	switch (i) {
	case 0 :
		r = v;  g = t;  b = p;  break;
	case 1 :
		r = q;  g = v;  b = p;  break;
	case 2 :
		r = p;  g = v;  b = t;  break;
	case 3 :
		r = p;  g = q;  b = v;  break;
	case 4 :
		r = t;  g = p;  b = v;  break;
	case 5 :
		r = v;  g = p;  b = q;  break;
	}
	return {'r': Math.round(r), 'g': Math.round(g), 'b': Math.round(b)};
}


// 以下はSVGMapレイヤーとして動かしたときに有効になる関数
var CRSad = 100; // svgmapコンテンツのCRSきめうち・・
function  buildSvgImage(imageDataUri,imageParam){
	// dataURLを受け取って、SVGMapコンテンツに画像を張り付ける
	var rct = svgImage.createElement("image");
	rct.setAttribute("x", imageParam.lng0 * CRSad);
	rct.setAttribute("y", -(imageParam.lat0 + imageParam.latSpan) * CRSad);
	rct.setAttribute("width", imageParam.lngSpan * CRSad);
	rct.setAttribute("height", imageParam.latSpan * CRSad);
	rct.setAttribute("xlink:href",imageDataUri);
	rct.setAttribute("style","image-rendering:pixelated"); // メッシュデータなので拡大次画像のピクセルをくっきりさせる
	var root = svgImage.documentElement;
	root.appendChild(rct);
}
```
---
sidebar_position: 9
---

# チュートリアル9 WebApp Layer メッシュタイル (タイル分割されたメッシュデータ)

## はじめに  {#introduction}

webAppで非同期読み込みにより、タイル分割されたメッシュデータを表示するチュートリアルです。読み込むメッシュデータは地域基準メッシュをベースとした [Gridded XYZ](../tutorial-8/index.md#gridded-xyz)データとし、小縮尺データおよび大縮尺データを用意して簡単なタイルピラミッドを構成し、[Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))を実装しています。

可視化に用いるサンプルデータは統計局が公開する[3次メッシュの自治体コード](https://www.stat.go.jp/data/mesh/m_itiran.html)データです。

実際の動作は、 [mesh2.html](https://svgmap.org/examples/tutorials/mesh2/mesh2.html) をクリック。

### ソースコード {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/mesh2/)
- このチュートリアルで扱うメッシュデータの形式
- Container.svg: クリッカブルなレイヤーを指定
- meshTileViewer.svg: webAppが紐付けられたレイヤー、webAppsは隠れた状態で起動
- meshTileViewer.html:
- meshTileViewer.js: メッシュデータを読み込み、一個一個のメッシュをsvgのrect要素として可視化。

## チュートリアル {#tutorial}

イル分割されたメッシュデータを表示するチュートリアルです。読み込むメッシュデータは[チュートリアル8](../tutorial-8/index.md)と異なり、 [Gridded XYZ](../tutorial-8/index.md#gridded-xyz)タイプのデータを扱ってみます。

また、[チュートリアル8](../tutorial-8/index.md)よりも大きいデータ（メッシュ数が多い、細かい）を扱います。そのためタイリングに加えて簡単なタイルピラミッドを構築し、小縮尺と大縮尺で表示するデータを変化させる機能([Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))) も実装します。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/mesh2/mesh2.html)をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/mesh2.zip)

## 表示するデータ {#data-to-display}

### 使用するグリッド化ルール {#grid-rules-to-use}

- [地域基準メッシュ](https://ja.wikipedia.org/wiki/%E5%9C%B0%E5%9F%9F%E3%83%A1%E3%83%83%E3%82%B7%E3%83%A5) をグリッド化のルールとしたデータを使用します。

### データの内容 {#data-contents}

- [統計局の市区町村別メッシュ・コード一覧](https://www.stat.go.jp/data/mesh/m_itiran.html)で公開されているデータを使います
- 各メッシュがどの自治体に属しているのかを可視化することにします
- 小縮尺では２次メッシュ（約10Km四方のメッシュ）で県レベル、　大縮尺では３次メッシュ（約1Km四方）で市区町村レベルの可視化をしてみます。

## データの準備 {#data-preparation}

### 元データの準備 {#preparing-the-original-data}

- [こちらのWebApp](https://www.svgmap.org/examples/lvl0.1/etcLayers/meshCoder/japanMesh_r3.html)でデータを取得します。
- このwebAppは[統計局の市区町村別メッシュ・コード一覧](https://www.stat.go.jp/data/mesh/m_itiran.html) からすべてのCSVを自動的に取得し、指定したメッシュレベルのCSVデータが保存できます。（すべてブラウザ上で実行）
- 操作方法
	- [japanMesh_r3.html](https://www.svgmap.org/examples/lvl0.1/etcLayers/meshCoder/japanMesh_r3.html)にアクセス
		- CSVデータの収集が完了するまでしばらく待ちます。
	- ```市区町村``` を選択
	- ```３次メッシュ``` を選択
	- ```集計実行``` を押す
	- CSVをダウンロード　を選択するとCSVが保存できる (```mesh.csv```で保存)

### タイルピラミッドの構築 {#construction-of-a-tile-pyramid}

本チュートリアルはバックエンドにDBや動的なwebサービスを配置しない、[Jamstack](https://en.wikipedia.org/wiki/Jamstack)な構成とします。

取得した元データから静的なタイルぴピラミッドデータ（CSVファイル群）を生成します。生成のためのツールは[こちらに用意したmesh2tileBasic.py](https://svgmap.org/examples/tutorials/mesh2/mesh2tileBasic.py)を使います。

- [mesh2tileBasic.py](https://svgmap.org/examples/tutorials/mesh2/mesh2tileBasic.py)をローカルPCに保存
- 作業ディレクトリに```tiles``` ディレクトリを用意
- ```python mesh2tileBasic.py mesh.csv```　で実行(mesh.csvはDLした元データのファイルパス)
- ```tiles``` ディレクトリにタイル分割されたメッシュデータが保存されています。

### タイルピラミッドデータの説明 {#explination-of-tile-pyramid-data}

#### [top.csv](https://www.svgmap.org/examples/tutorials/mesh2/meshTiles/top.csv)

小縮尺用のデータ（タイルピラミッドの頂点のデータ）

- １行目：空白行
- ２行目以降：
	- １桁目：自治体コード（県コード　数字２文字）
	- ２桁目以降：２次メッシュコード　可変長
- 実際のデータの抜粋

```
01,634150,654560,664632,634260,...
02,604070,614010,614033,604054,...
03,594116,594163,594110,604115,...
...
...
```

#### [４桁の数字].csv　例: [5339.csv](https://www.svgmap.org/examples/tutorials/mesh2/meshTiles/5339.csv)

大縮尺用のタイル分割されたデータ（１次メッシュ単位で分割しています）

- ファイル名の[４桁の数字]：１次メッシュコード
- １行目：１次メッシュコード
- ２行目以降：
	- １桁目：自治体コード（市区町村コード　数字５文字）
	- ２桁目以降：３次メッシュコードの下４文字　可変長
		- １行目の１次メッシュコードを先頭に付与することで３次メッシュコードが得られる(簡易的なデータ圧縮)
		- top.csvの1行目が空白行なのは同じルールで処理できるようにするためです
- 実データの抜粋

```
5339
08211,7763,7764,7766,7767,7773,7774,...
08217,6799,7709
08224,6798,6799,7707,7708,7709,7716,...
...
...
```

#### Note

- 上記２種類のファイルが[Gridded XYZ](../tutorial-8/index.md#gridded-xyz)データに相当します。XYデータが一見ないように見えますが、メッシュコードはグリッド化されたXY座標を符号化した情報であるためです。
- また、本来のもっとも一般的なGridded XYZデータは、１行に１個ずつのXYZデータがあります。　一方、今回のデータは１行に　 Z,XY1,XY2,XY3.....XYn　という形で、共通のZ値を持った複数のXY値を１行に可変長で符号化した少し変則的なデータになっています。（データサイズが小さくなるため）

#### code_name.csv

- [チュートリアル9b](../tutorial-9b/index.md)のためのデータ。市区町村コードと自治体名称との間の辞書データです。
- １桁目：市区町村コード（数字５文字）
	- 県の自治体コードは先頭２文字を取ることで得られる
- ２桁目：国名
- ３桁目：県名
- ２桁目：市区町村名
- 実データの抜粋

```
01101,日本,北海道,札幌市中央区
01102,日本,北海道,札幌市北区
01103,日本,北海道,札幌市東区
...
...
```

### Container.svg {#container-svg}

- メッシュデータを表示する主題レイヤと、背景地図(OpenStreetMap)をanimation要素で読み込んでいます。
- [チュートリアル6](../tutorial-6/index.md#containersvg-container-svg)同様にクリッカブルなレイヤーを指定しています。
	- 後述のように、メッシュデータをベクトルデータとして可視化し対話性を実現するため、class属性でclickableを指定しています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- OpenStretMap背景地図を表示状態として読み込む -->
<animation xlink:href="./dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap" visibility="visible"/>

<!-- 自治体コード3次メッシュデータレイヤーを表示状態として読み込む -->
<animation xlink:href="meshTileViewer.svg" x="-3000" y="-3000" width="6000" height="6000" title="admCode" class="Mesh clickable" visibility="visible" opacity="0.6"/>
</svg>
```

### meshTileViewer.svg {#mesh-tile-viewer-svg}

- ドキュメントルート要素(svg要素)の、data-controller属性で、この [レイヤーを操作するwebApp](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E5.9B.BA.E6.9C.89.E3.81.AEUI)を指定しています。
	- ```data-controller="meshTileViewer.html#exec=hiddenOnLayerLoad```
	- ```exec=hiddenOnLayerLoad``` は、レイヤが表示状態になるとwebAppのウィンドが隠れた状態で動作する設定です。 ([詳しくはこちら](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E8.A9.B3.E7.B4.B0))
- ここにはデータは何もない空のコンテンツ、先述のレイヤーを操作するwebAppがこのSVGコンテンツのDOMを動的に操作して可視化が行われます。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-controller="meshTileViewer.html#exec=hiddenOnLayerLoad" viewBox="-42.8202042942663, -49.9999999999999, 513.842451531196, 600" property="Local government codes">

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />
</svg>
```

### meshTileViewer.html, meshTileViewer.js {#mesh-tile-viewer}

タイルピラミッドとして分割・階層化されたメッシュデータを縮尺と表示領域に応じて読み込み、上記SVGコンテンツのDOMを操作して一個一個のメッシュをsvgのrect要素として可視化します。

- onload
	- ```document.addEventListener("zoomPanMap", updateLayer,false);``` SVGMap.jsが伸縮スクロール時に発行する}イベントに対するハンドラを設定（伸縮スクロールに応じて表示内容を変化させるため）
	- ```updateLayer();``` ロード直後には上記のハンドラを直接動作させ初期表示状態をつくる
- ```updateLayer()``` 縮尺と領域に応じてデータDL・地図を描画
	- ```svgMap.getGeoViewBox();``` SVGMap.jsのAPI 表示している領域を地理座標で得る
	- ```svgImageProps.scale``` SVGMap.jsのAPI このWebAppが紐付いているSVGMapコンテンツの、現在の表示スケール
	- ```getTileURLs()``` 大縮尺表示のケースで表示するべきタイルのファイル名をリストアップする関数（表示している領域をもとに）
	- ```maintainImages``` 伸縮スクロールの１ステップ前に表示していたコンテンツ(SVGの図形要素)のうち、今ステップでもそのまま維持しておくタイルのファイル名をリストした連想配列。
		- タイル単位でグループ(svgのg要素)となっており、タイル単位での管理を行っている。
		- 同g要素のdata-src属性に、該当するタイルのファイル名が設定されており、これで判別している
- ```showTileMap()``` 新たにデータを読み込んで表示すべきタイル1個のデータを構築し、描画ルーチンに渡す（非同期）
	- ```meshData```: 一時的にメッシュデータ構築する変数(構造化された連想配列)
		- meshData[メッシュコード][0..n]:自治体コード (一つのメッシュに福栖の自治体が含まれることがあることに注意)
- ```buildMeshTileSvg()```
	- ```svgImage``` このwebAppに紐付られたSVGコンテンツ(meshTileViewer.svg)のDOMのオブジェクト
	- svgの```g``` 要素でタイルコンテンツのメッシュデータをグループ化
	- svgの```rect``` 要素で各メッシュデータを可視化
		- ```data-src```属性に、そのタイルコンテンツのソースファイル名を設定（次ステップでの再利用判別用）
	- ```getHue()``` 適当なハッシュ関数を使い、自治体コードに適当な色（色相 H値）を割り当てる関数
	- ```HSVtoRGB()```HSV値(S,Vは最大値固定)からRGB値を算出する関数
	- ```blendColor()``` 加色混合関数（一つのメッシュに複数の自治体（の色）が割り付けられることがあるため色混合する）
	- ```svgMap.refreshScreen()``` DOM生成が完了したら描画を指示する
		- タイルが１個読まれる毎に再描画が起きることになります（プログレッシブに表示）
		- [参考](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

```html
<!doctype html>
<html>
<head>
<title>Tiled UTM Grid Data visualizer</title>
</head>
<script src="https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/svgMapLayerLib.js"></script>
<script src="meshTileViewer.js"></script>
<body>
<h3>地域基準メッシュデータを表示します</h3>
</body>
</html>
```

```js
var meshCsvHd = "meshTiles/";
var topCsv = meshCsvHd+"top.csv";

var tileThScale = 8;

onload=function(){
	document.addEventListener("zoomPanMap", updateLayer,false);
	updateLayer();
}

function updateLayer(){
	// 縮尺と領域に応じてデータDL・地図を描画する。
	
	var tileURLs;
	var geoViewBox = svgMap.getGeoViewBox();
	
	// 表示すべきタイルを縮尺と領域に基づいてリストアップする
	if ( svgImageProps.scale > tileThScale ){
		// 大縮尺の分割タイルデータを表示する
		tileURLs= getTileURLs(geoViewBox);
	} else {
		// 小縮尺のtopCsvデータを表示する
		tileURLs=[topCsv];
	}
	
	var maintainImages={}; // 保持すべきタイルを保持する配列
	var prevImages=svgImage.getElementsByTagName("g"); // 1ステップ前までに描画完了しているタイルたち
	for ( var i = prevImages.length-1 ; i >=0  ; i-- ){ // 1ステップ前のコンテンツで維持すべきものと消すべきものを選別する
		var dataSrc = prevImages[i].getAttribute("data-src");
		if ( tileURLs.indexOf(dataSrc)>=0 ){ // 読むべきコンテンツで1ステップ前にあるものは維持
			maintainImages[dataSrc]=true;
		} else { // それ以外は消去
			prevImages[i].remove();
		}
	}
	
	// 読み込むべきタイルで1ステップ前に読み込まれていないタイルを読み込ませる
	for ( var i = 0 ; i < tileURLs.length ; i++ ){
		var durl = tileURLs[i];
		if ( maintainImages[durl] ){
			// skip loading
		} else {
			showTileMap( durl );
		}
	}
}

function getTileURLs(geoViewBox){ 
	// 表示領域の中にあるメッシュ調べ、そのファイルをリストアップ
	var tileURLs= getMeshArray(geoViewBox, 1);
	for ( var i = 0 ; i < tileURLs.length ; i++ ){
		tileURLs[i]=meshCsvHd + tileURLs[i] + ".csv";
	}
	return (tileURLs);
}

async function showTileMap(url){
	// タイルデータを読み込んでパースし、画像生成ルーチンに渡す
	var txtData = await loadText(url);
	
	var rowData = txtData.split(/[\r\n]+/);
	// 1行目はタイルのメッシュ番号
	var meshData ={}; // メッシュ番号をKeyとした連想配列としてメッシュデータを構築　Valは自治体コードの配列(複数の自治体に属するものがあるため配列)
	for ( var i = 1 ; i < rowData.length ; i++ ){
		var colData = rowData[i].split(",");
		// 1カラム目は自治体コード、2カラム目からがメッシュ番号の断片（タイルのメッシュ番号を加えてメッシュ番号になる）
		for ( var j = 1 ; j<colData.length ; j++){
			var meshNumb = rowData[0]+colData[j]; // タイルのメッシュ番号に断片を加えメッシュ番号を生成
			if ( meshData[meshNumb]){ // 複数の自治体に属するメッシュ
				meshData[meshNumb].push(colData[0]);
			} else {
				meshData[meshNumb]=[colData[0]];
			}
		}
	}
	buildMeshTileSvg(meshData, url);
}

function buildMeshTileSvg(meshs, sourceID){
	var tileGroup =  svgImage.createElement("g");
	tileGroup.setAttribute("data-src",sourceID);
	
	for ( var meshNumb in  meshs ){
		var gxy = mesh2LatLng(meshNumb); // .latitude,.longitude,.latSpan,.lngSpan
		
		var rect = svgImage.createElement("rect");
		rect.setAttribute("x",gxy.longitude * 100);
		rect.setAttribute("y",(gxy.latitude + gxy.latSpan) * -100);
		rect.setAttribute("width",gxy.lngSpan * 100);
		rect.setAttribute("height",gxy.latSpan * 100);
		rect.setAttribute("content",meshs[meshNumb].join(" "));
//		var fillHue = getHue(meshs[meshNumb][0]);
		var RGBs=[];
		for ( lgCode of meshs[meshNumb]){
			RGBs.push(HSVtoRGB(getHue(lgCode),255,255));
		}
		var fillColor = getColorString(blendColor(RGBs));
//		var fillColor = getColorString(HSVtoRGB(fillHue,255,255));
		rect.setAttribute("fill",fillColor);
		//rect.setAttribute("fill","red");
		
		tileGroup.appendChild(rect);
	}
	svgImage.documentElement.appendChild(tileGroup);
	svgMap.refreshScreen();
}

function blendColor(colors){ // 加色混合
	var ans={r:0,g:0,b:0};
	for ( color of colors ){
		ans.r += color.r;
		ans.g += color.g;
		ans.b += color.b;
	}
	ans.r = Math.floor(ans.r / colors.length);
	ans.g = Math.floor(ans.g / colors.length);
	ans.b = Math.floor(ans.b / colors.length);
	return ( ans );
}

async function loadText(url){ // テキストデータをfetchで読み込む
	var response = await fetch(url);
	var txt = await response.text();
	return ( txt );
}


// ===================================================================================
// 以下は地域基準メッシュライブラリ

var m1LatSpan = 1/1.5, m1LngSpan = 1;
var m2LatSpan = m1LatSpan/8, m2LngSpan = m1LngSpan/8;
var m3LatSpan = m2LatSpan/10, m3LngSpan = m2LngSpan/10;
var m4LatSpan = m3LatSpan/2, m4LngSpan = m3LngSpan/2;

function mesh2LatLng( meshStr ){
	// mesh4は定義が怪しい
	var latitude,longitude; // south,east corne
	var latSpan,lngSpan;
	var m1Lat,m1Lng,m2Lat,m2Lng,m3Lat,m3Lng,m4;
	if ( meshStr.length > 3){
		m1Lat = Number(meshStr.substring(0,2));
		m1Lng = Number(meshStr.substring(2,4));
		latitude  = m1Lat / 1.5;
		longitude = 100 + m1Lng;
		latSpan = m1LatSpan;
		lngSpan = m1LngSpan;
		if ( !latitude || !longitude ){
			return {
				latitude : null,
				longitude : null
			}
		}
		if ( meshStr.length > 5 ){
			m2Lat = Number(meshStr.substring(4,5));
			m2Lng = Number(meshStr.substring(5,6));
			latitude  += m2Lat * m2LatSpan;
			longitude += m2Lng * m2LngSpan;
			latSpan = m2LatSpan;
			lngSpan = m2LngSpan;
			if ( meshStr.length > 7 ){
				m3Lat = Number(meshStr.substring(6,7));
				m3Lng = Number(meshStr.substring(7,8));
				latitude  += m3Lat * m3LatSpan;
				longitude += m3Lng * m3LngSpan;
				latSpan = m3LatSpan;
				lngSpan = m3LngSpan;
				if ( meshStr.length == 9 ){
					m4 = meshStr.substring(8);
					switch(m4){
					case "1":
						// do nothing
						break;
					case "2":
						longitude += m4LngSpan;
						break;
					case "3":
						latitude += m4LatSpan;
						break;
					case "4":
						latitude += m4LatSpan;
						longitude += m4LngSpan;
						break;
					}
					latSpan = m4LatSpan;
					lngSpan = m4LngSpan;
				}
			}
		}
	}
	return {
		latitude: latitude,
		longitude: longitude,
		latSpan : latSpan,
		lngSpan : lngSpan
	}
}

function latLng2Mesh(lat,lng,meshLevel){
	lat = lat*1.5;
	lng = lng - 100;
	var m1Lat = Math.floor(lat);
	var m1Lng = Math.floor(lng);
	
	if ( meshLevel==1){
		return ( m1Lat.toString() + m1Lng.toString() );
	}
	
	lat = lat - m1Lat;
	lng = lng - m1Lng;
	
	lat = lat * 8;
	lng = lng * 8;
	
	var m2Lat = Math.floor(lat);
	var m2Lng = Math.floor(lng);
	
	if ( meshLevel==2){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() );
	}
	
	lat = lat - m2Lat;
	lng = lng - m2Lng;
	
	lat = lat * 10;
	lng = lng * 10;

	var m3Lat = Math.floor(lat);
	var m3Lng = Math.floor(lng);
	
	if ( meshLevel==3){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() + m3Lat.toString() + m3Lng.toString() );
	}
	
	lat = lat - m3Lat;
	lng = lng - m3Lng;
	
	lat = lat * 2;
	lng = lng * 2;

	var m4Lat = Math.floor(lat);
	var m4Lng = Math.floor(lng);
	var m4Num = 1;
	if ( m4Lat==1 ){
		m4Num += 2;
	}
	if ( m4Lng==1 ){
		m4Num += 1;
	}
	
	if ( meshLevel==4){
		return ( m1Lat.toString() + m1Lng.toString() + m2Lat.toString() + m2Lng.toString() + m3Lat.toString() + m3Lng.toString() + m4Num.toString() );
	}
	
	return (null);
}



function getMeshArray(geoBbox, meshLevel){
	var latStep, lngStep;
	if ( meshLevel == 1 ){
		latStep = m1LatSpan;
		lngStep = m1LngSpan;
	} else if ( meshLevel == 2 ){
		latStep = m2LatSpan;
		lngStep = m2LngSpan;
	} else if ( meshLevel == 3 ){
		latStep = m3LatSpan;
		lngStep = m3LngSpan;
	} else if ( meshLevel == 4 ){
		latStep = m4LatSpan;
		lngStep = m4LngSpan;
	} else {
		return ( null );
	}
		
	var ans = [];
	for ( var mx = geoBbox.x ; mx < geoBbox.x + geoBbox.width + lngStep ; mx += lngStep){
		if ( mx > geoBbox.x + geoBbox.width ){
			mx = geoBbox.x + geoBbox.width;
		}
	// geoBbox(.x,.y,.wjdth,.height)を包含する最小のメッシュコードのリストを返す
		for ( var my = geoBbox.y ; my < geoBbox.y + geoBbox.height + latStep ; my += latStep){
			if ( my > geoBbox.y + geoBbox.height ){
				my = geoBbox.y + geoBbox.height;
			}
//			console.log(mx,my);
			ans[latLng2Mesh(my,mx,meshLevel)]=true;
		}
	}
	
	var ans2=[];
	for ( mesh in ans ){
		ans2.push(mesh);
	}
	
	return ( ans2 );
}

// ===================================================================================


function getHue(str){ // 文字列からハッシュ関数(jenkinsOneAtATimeHash)を使って適当なHUE値(0..359)を得る
	return(jenkinsOneAtATimeHash(str)%360);
}

//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
//Credits (modified code): Bob Jenkins (http://www.burtleburtle.net/bob/hash/doobs.html)
//See also: https://en.wikipedia.org/wiki/Jenkins_hash_function
//Takes a string of any size and returns an avalanching hash string of 8 hex characters.
function jenkinsOneAtATimeHash(keyString){
	let hash = 0;
	for (charIndex = 0; charIndex < keyString.length; ++charIndex){
		hash += keyString.charCodeAt(charIndex);
		hash += hash << 10;
		hash ^= hash >> 6;
	}
	hash += hash << 3;
	hash ^= hash >> 11;
	//4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
	return (((hash + (hash << 15)) & 4294967295) >>> 0);
};

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

function getColorString(rgb){
	return ("#"+ pad16(rgb.r) + pad16(rgb.g) + pad16(rgb.b));
}

function pad16( val ){
	var bv =  "00" + val.toString(16);
	bv = bv.substr(bv.length - 2, 2);
	return ( bv );
}
```
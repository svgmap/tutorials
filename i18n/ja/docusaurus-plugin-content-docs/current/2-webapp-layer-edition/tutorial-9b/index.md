---
sidebar_position: 9.5
---

# チュートリアル9b WebApp Layer メッシュタイル カスタムダイアログ

## はじめに  {#introduction}

[チュートリアル9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9)の内容に加えて、メッシュをクリックしたときに出現するダイアログをカスタマイズしています。

実際の動作は、[mesh2b.html](https://svgmap.org/examples/tutorials/mesh2b/mesh2b.html)をクリック。

### ソースコード {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/mesh2b/)
- meshTileViewerB.html: レイヤーに紐付けられたwebApp。チュートリアル９の内容に加え、オブジェクトをクリックしたときに起動するコールバック関数を設定し、ダイアログをカスタマイズしています。

## チュートリアル {#tutorial}

[チュートリアル9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9)に加えて、メッシュ(の図形：rect要素)をクリックしたときに出現するダイアログをカスタマイズしてみます。

カスタマイズされたダイアログでは、メッシュのmetadaに記載されたメッシュコードをもとに自治体名称を検索して表示しています。 小縮尺では県名、大縮尺では市区町村名を表示します。

- 実際の動作は、[こちら](https://svgmap.org/devinfo/devkddi/tutorials/mesh2b/mesh2b.html)をクリック。
- 使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/mesh2b.zip)

異なるのはレイヤーに紐付いたwebAppです。

### [meshTileViewerB.html](https://svgmap.org/examples/tutorials/mesh2b/meshTileViewerB.html) , [meshTileViewerB.js](https://svgmap.org/examples/tutorials/mesh2b/meshTileViewerB.js) {#mesh-tile-viewr-b}

[チュートリアル9](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB9#meshTileViewer.html) のWebApp、 [meshTileViewer.html](https://svgmap.org/examples/tutorials/mesh2/meshTileViewer.html)に対して追加されている部分を解説します。 

市区町村コードをキーにした市区町村名の連想配列を作るためのデータを読み込んでいる点と、それを用いたカスタムダイアログを出現させるためのコールバック関数を設定している点が追加部分になります。



- onload=async function()
	- [svgMap.setShowPoiProperty](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setShowPoiProperty)( customShowPoiProperty, layerID);
		- 紐付いたレイヤーのオブジェクトをヒットしたときに出現する処理に独自のコールバック関数(customShowPoiProperty)に指定する
		- Custom ShowPoiProperty
			- ヒットしたオブジェクトのcontent属性にある市区町村コードをKeyにしてlgDictionaryを辞書引き、自治体名を求める
				- 一つのメッシュに複数の自治体が属しているケースがある点に注意
			- svgMap.showModal(html,400,180); 用意したhtmlをSVGMapフレームワークのモーダルダイアログに渡す
- async function loadLGdictionary()`{` // 自治体名辞書を作る
	- lgDictionary={};//市区町村コードをKeyとした自治体名辞書
- function buildMeshTileSvg(meshs, sourceID)
	- rect.setAttribute("content",meshNumb+","+meshs[meshNumb].join(" "));
		- meshs[meshNumb] 市区町村コード

meshTileViewerB.js

```js
...
...
var lgDictCsv = meshCsvHd + "code_name.csv";

onload=async function(){
	document.addEventListener("zoomPanMap", updateLayer,false);
	svgMap.setShowPoiProperty( customShowPoiProperty, layerID);
	await loadLGdictionary();
	//console.log("lgDictionary:",lgDictionary);
	updateLayer();
}

...
...

function buildMeshTileSvg(meshs, sourceID){
	var tileGroup = svgImage.createElement("g");
	tileGroup.setAttribute("data-src",sourceID);
	
	for (var meshNumb in meshes){
		...
		rect.setAttribute("content",meshNumb+","+meshs[meshNumb].join(" "));
		...
	}
	...
}

async function loadLGdictionary(){ // Create a dictionary of local government names
	var lgCsv = await loadText(lgDictCsv);
	lgCsv = lgCsv.split(/[\r\n]+/);
	for ( var line of lgCsv){
		if (line.length > 1) {
			line = line.split(",");
			lgDictionary[line[0]]=line[2]+" "+line[3];
			lgDictionary[line[0].substring(0,2)]=line[2]; // Let's also create a prefecture code dictionary at the same time.
		}
	}
}

function customShowPoiProperty(target){
	var metaSchema = null;
	// metaSchema = target.ownerDocument.firstChild.getAttribute("property").split(","); // debug 2013.8.27
	console.log("POI target:",target);
	var content = (target.getAttribute("content")).split(",");
	
	var meshCode=content[0];
	var lgCodes=content[1].split(" ");
	var lgNames=[];
	for (var lgCode of lgCodes){
		lgNames.push(lgDictionary[lgCode]);
	}
	var html = "<ul><li>Name of municipality: <ul><li>"+lgNames.join("<li>")+"</ul><li>Mesh code:"+meshCode+"</ul>";
	svgMap.showModal(html,400,180);
	
}

...
...
```
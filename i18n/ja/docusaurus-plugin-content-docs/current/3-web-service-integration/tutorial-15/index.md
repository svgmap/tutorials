# チュートリアル15 WebApp Layer 伸縮スクロールに応じたベクトル地理情報サービス結合

## はじめに  {#introduction}

動的にベクトルデータが生成・配信されているサービスをSVGMap.jsに結合します。前章と異なり、伸縮スクロールする度にその表示領域に応じたデータをサービスから取得して表示します。

ここではNatural Resources Canadaが提供している、[Geoname Service API](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249) (カナダの地名データサービス)を結合してみます。

- 実際の動作は、[vectorService1.html](https://svgmap.org/examples/tutorials/vectorService1/vectorService1.html)をクリック。
  - （Note: サービスがデータを生成配信するまでに少々時間がかかります）

## ソースコードディレクトリ {#source-code}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/vectorService1/)
- 表示領域のパラメータを伸縮スクロールの度に取得します。
- このパラメータを用いて、[仕様に](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249)基づきサービスへのクエリURLを構築、CSVを取得します。
- ポイントデータをSVGのuse要素として可視化します。
- 1ステップ前のデータは消去します。

## チュートリアル {#tutorial}

動的にベクトルデータが生成・配信されているサービスをSVGMap.jsに結合します。[チュートリアル14](../tutorial-14/index.md)に対して、こちらは伸縮スクロールする度にその表示領域に応じたデータをサービスから取得して表示します。また[チュートリアル14](../tutorial-14/index.md)はgeoJsonデータのサービスでしたがこちらはCSVデータです。

結合するサービスはNatural Resources Canadaが提供している、[Geoname Service API](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249)(カナダの地名データサービス)です。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/vectorService1/vectorService1.html)をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/vectorService1.zip)

### vectorService1.html {#vector-service-1}

- [チュートリアル14](../tutorial-14/index.md)と特に違いはありません。

### Container.svg {#container-svg}

- [チュートリアル14](../tutorial-14/index.md)と特に違いはありません。

### CanadianGeoNames.svg {#canadian-geo-names-svg}

- [チュートリアル14](../tutorial-14/index.md)と特に違いはありません。アイコンの色もこちらは赤に固定しています。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30" data-controller="CanadianGeoNames.html#exec=appearOnLayerLoad">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <defs>
 <g id="p0">
   <circle cx="0" cy="0" r="6" fill="red"/>
 </g>
 </defs>
</svg>
```

### CanadianGeoNames.html, CanadianGeoNames.js {#canadian-geo-names-js}

#### REST API 

少し複雑ですので、[Geographical names in Canada: Geoname Service that we will use this time](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249)が提供するAPIのうち今回使用する部分をまとめます。

**使用するクエリパラメータ**

今回は以下の二つを使います。

- bbox 西、南、東、北の座標(世界測地系の度の値)をカンマ区切りで指定
- num 出力する最大数
- .csv拡張子　厳密にはクエリパラメータではありませんが、パス部の拡張子を設定することで指定したメディアが配信されます。（デフォルトはhtml）今回はCSVを使うことにします。
- クロスオリジン設定　今回は別ドメインのサービスにアクセスすることになるので、ウェブサービスがクロスオリジンアクセスを許可している必要があります。[Geographical names in Canada: Geoname Service](https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249)は許可されているようです。

**配信されるデータ**

クエリパラメータに基づいたCSVデータが返信されます。1行目がスキーマ行２行目以降にデータ続きます。以下のカラムがあるようです。latitude、longitudeカラムで地図上にPointフィーチャを設置、nameカラムでそのタイトルを設置できそうです。その他のカラムはシンボルをクリックしたときにプロパティとして表示できるでしょう。データを取得してみると、カンマを含むデータがダブルクォーテーションでエスケープされていることがあるようです。

- id
- name
- language.code
- language.href
- syllabic
- feature.id
- feature.href
- category
- status.code
- status.href
- concise.code
- concise.href
- generic.code
- generic.href
- location
- province.code
- province.href
- map
- relevance
- accuracy
- Latitude
- longitude
- decision

#### コード

- ```addEventListener("zoomPanMap", getGeoNames)``` : 伸縮スクロールの度にサービスに問い合わせ、紐づいたレイヤーのSVGMapコンテンツのDOMを構築し可視化します。
  - １ステップ前（伸縮スクロール前）のデータは、たとえ現ステップでも存在していたとしても単純に全消去してから再配置しています。（タイリングなどの、より高度な仕組みは実装していない）
- ```getGeoNames()``` : サービスにと合わせて可視化する非同期関数
  - ```svgMap.getGeoViewBox()``` : 地理的な表示領域を得る
  - ```getCanadianGeoNamesReq()``` : 表示領域をもとにサービスへのクエリを組み立て
  - ```await getCsv()``` : クエリを使って非同期でCSVを取得・パース
    - ```line.split(...)``` : [こちらの記事](https://www.ipentec.com/document/csharp-read-csv-file-by-regex)をもとにダブルクォーテーションエスケープを加味してパース
  - ```drawPoints()``` : 取得したデータを可視化します。 今回はCSVから直接SVGのuse要素を作り、可視化しています。
    - ```svgImage``` : レイヤーに紐づいたwebAppに組み込まれた同レイヤーのSVGMapドキュメントオブジェクト
		-	参考: [解説書#svgImage](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)
    - ```schema``` : 紐づいたレイヤーのSVGMapコンテンツのドキュメント要素のpropertyにスキーマを設置
      - 参考: [SVGMap.jsのmetadataフレームワーク](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#metadata.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF)
    - ```"transform", `ref(svg,${lng},${-lat})` ```: svg1.2の [TransformRef](https://www.w3.org/TR/SVGTiny12/single-page.html#coords-transform-ref)を使い、サイズが変化しないアイコンを設置しています。
      - 参考: [サポートされている属性](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.B1.9E.E6.80.A7)
    - ```"content"``` : メタデータをcsvで設置
    - ```"xlink:href", "#p0"``` : defs要素内のid:p0のシンボル(赤い丸)を参照
    - ```svgMap.refreshScreen();``` : SVGMapコンテンツのDOM生成完了したら再描画する
      - 参考: [再描画の制限](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E5.86.8D.E6.8F.8F.E7.94.BB.E3.81.AE.E5.88.B6.E9.99.90)

CanadianGeoNames.html

```html
<!doctype html>
<html>
<head>
<title>basic dynamic wms layer controller</title>
<meta charset="utf-8"></meta>
</head>
<script src="CanadianGeoNames.js"></script>
<body>
<h3>Canadian GeoNames layer controller</h3>
<p>Get Canadian GeoNames Features from <a href="https://www.nrcan.gc.ca/maps-tools-and-publications/maps/geographical-names-canada/application-programming-interface-api/9249" target="_blank">Canadian GeoNames Search Service</a></p>
<div id="messageDiv" style="color:red">-</div>
</body>
</html>
```

CanadianGeoNames.js

```js
var canadianGeoNamesService = "https://geogratis.gc.ca/services/geoname/en/geonames.csv";

onload=function(){
	addEventListener("zoomPanMap",  getGeoNames);
	getGeoNames();
}


var crsAD=1;
var maxItems=100;

async function getGeoNames(){
	var geoViewBox = svgMap.getGeoViewBox(); // 地理的な表示領域を得る
	var req = getCanadianGeoNamesReq(geoViewBox); // 表示領域をもとにサービスへのクエリを組み立てる
	var csv = await getCsv(req); // クエリを使って非同期でCSVを取得
	if ( csv.length > maxItems){ // 最大数以上の場合メッセージを出す
		messageDiv.innerText="Exceeded maximum number. Please zoom in.";
	}else{
		messageDiv.innerText="";
	}
	drawPoints(csv); // 取得したデータを可視化する
}

function getCanadianGeoNamesReq(geoArea){
	var area_x0=geoArea.x;
	var area_y0=geoArea.y;
	var area_x1=geoArea.x+geoArea.width;
	var area_y1=geoArea.y+geoArea.height;
	var ans = `${canadianGeoNamesService}?bbox=${area_x0},${area_y0},${area_x1},${area_y1}&num=${maxItems}`;
	return ( ans );
}

async function getCsv(url){
	var response = await fetch(url); 
	var txt = await response.text();
	txt = txt.split("\n");
	var ans = [];
	for ( var line of txt ){
		// https://www.ipentec.com/document/csharp-read-csv-file-by-regex ダブルクォーテーションエスケープを加味したcsvパース
		line = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
		if (line.length > 1){
			ans.push(line);
		}
	}
	return ( ans );
}

function drawPoints(csv){
	removeUses();
	var schema = csv[0].join();
	var latCol=csv[0].indexOf("latitude");
	var lngCol=csv[0].indexOf("longitude");
	svgImage.documentElement.setAttribute("property",schema);
	for ( var i = 1 ; i < csv.length ; i++){
		var point = csv[i];
		var meta = point.join();
		var lat = Number(point[latCol]);
		var lng = Number(point[lngCol]);
		var use=svgImage.createElement("use");
		use.setAttribute("xlink:href","#p0");
		use.setAttribute("content",meta);
		use.setAttribute("x",0);
		use.setAttribute("y",0);
		use.setAttribute("transform",`ref(svg,${lng},${-lat})`);
		svgImage.documentElement.appendChild(use);
	}
	svgMap.refreshScreen();
}

function removeUses(){
	var uses = svgImage.getElementsByTagName("use");
	for ( var i = uses.length-1 ; i >=0 ; i--){
		uses[i].remove();
	}
}
```
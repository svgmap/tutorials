# チュートリアル2b 海岸線地図とPOI(空港)表示　(レイヤリング)

## はじめ {#introduction}

チュートリアル2aの内容に対して、POI(空港)と海岸線地図を別ファイルに分け、レイヤリング表示するチュートリアルです。

実際の動作は[こちら](https://svgmap.org/examples/tutorials/tutorial2b/tutorial2b.html)をクリック。

### ファイル構造 {#file-structure}

ファイル構成は[tutorial2bディレクトリ](https://www.svgmap.org/examples/tutorials/tutorial2b/)に以下のファイルがあります。

- [tutorial2b.html](https://www.svgmap.org/examples/tutorials/tutorial2b/tutorial2b.html)
  - チュートリアル2b用のhtml。tutrial1.htmlに対して、レイヤーリスト・On/Off UIを設置している。(id="layerList"のdiv要素)
- [Container.svg](https://www.svgmap.org/examples/tutorials/tutorial2b/Container.svg)
  - 表示する各レイヤ用のSVGファイルを読み込む（Airport.svgと、Coastline.svgの２個のファイル(レイヤ)を読み込んでいる）
- [Airport.svg](https://www.svgmap.org/examples/tutorials/tutorial2b/Airport.svg)
  - 空港情報を別ファイルとして追加。
- [Coastline.svg](https://www.svgmap.org/examples/tutorials/tutorial2b/Coastline.svg)
  - チュートリアル1のCoastline.svg

## チュートリアル {#tutorial}

レイヤリングを行うと、必要に応じてレイヤーごとに表示非表示をユーザが指示できるようになります。またレイヤーごとにデータをカプセル化して整備できるようになり、開発の効率がよくなります。　本章では背景地図と上乗せ情報(空港POI)をそれぞれレイヤーとして、レイヤリングを試してみます。

### 使用ファイル {#files-used}

使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/tutorial2b.zip)

### コンテンツの構造 {#content-structure}

```plaintext
tutorial2b.html
 |
 +-img/zoomup.png, img/zoomdown.png, img/gps.png, img/Xcursor.png (地図操作UIのイメージ類)
 |
 +-js/SVGMapLv0.1_r17.js, js/SVGMapLv0.1_LayerUI2_r4.js (SVGMapを表示するjavascriptライブラリ)
   |
   +-Container.svg (様々なデータ(レイヤー)を束ねる役割を持つ一個のSVGファイル。2aと異なりレイヤー2個を参照している)
     |
     +-Coastline.svg (実際に表示される地図レイヤーコンテンツ(海岸線)）
     |
     +-Airport.svg (実際に表示される地図レイヤーコンテンツ(空港ポイント)）
```

### tutorial2b.html {#tutorial2b-html}

チュートリアル1で使用したtutorial1.htmlに対して、レイヤーリスト表示・制御用UIを追加。（ただし、なくてもレイヤリング自体は可能。レイヤの表示非表示UIが使えないのみ）

- レイヤーリストUIを設置
  - id="**layerList**"の空の div要素を設置する（id名はフレームワークによって規定）
  - このlayerList div要素用のスタイルシートを読み込む([#layerListStyle.css](#layer-list-style-css))

#### Source code {#source-code}

```html
<!DOCTYPE html>
<html>
  <title>SVGMapLevel0.1-Rev14-Draft Tutorial2 Coastline & Air Port</title>
  <!-- Define the viewport display area as the entire screen -->
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0"
  />
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

  <!-- Import SVGMap core API -->
  <script type="module">
    import { svgMap } from "https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js";
    window.svgMap = svgMap;
  </script>

  <!-- Import the layer list UI stylesheet -->
  <link href="./js/layerListStyle.css" rel="stylesheet" type="text/css" />

  <body bgcolor="#ffffff" style="overflow:hidden;">
    <!-- Loading a container file (Container.svg) that contains multiple map SVG files (layers) -->
    <div id="mapcanvas" data-src="Container.svg"></div>
    <div id="gui">
      <!-- Zoom up button -->
      <img
        id="zoomupButton"
        style="left: 5px; top: 5px; position: absolute;"
        src="./img/zoomup.png"
        onclick="svgMap.zoomup()"
        width="20"
        height="20"
      />
      <!-- Zoom down button -->
      <img
        id="zoomdownButton"
        style="left: 5px; top: 25px; position: absolute;"
        src="./img/zoomdown.png"
        onclick="svgMap.zoomdown()"
        width="20"
        height="20"
      />
      <!-- GPS button -->
      <img
        id="gpsButton"
        style="left: 5px; top: 45px; position: absolute;"
        src="./img/gps.png"
        onclick="svgMap.gps()"
        width="20"
        height="20"
      />
      <!-- Title to display in the top right of the screen -->
      <font color="blue" style="right: 5px; top: 5px; position: absolute;"
        >SVGMapLevel0.1 Rev14 Draft : Tutorial2 Coastline & Air Port</font
      >
      <!-- Display in the bottom right of the screen -->
      <font
        color="blue"
        style="right: 5px; bottom: 5px; position: absolute;"
        size="-2"
        >by SVGMap tech.</font
      >
      <!-- Cross mark to be displayed in the center -->
      <img
        id="centerSight"
        style="opacity:0.5"
        src="./img/Xcursor.png"
        width="15"
        height="15"
      />
      <!-- Latitude and longitude (title) of the cross mark displayed in the bottom left of the screen -->
      <font
        id="posCmt"
        size="-2"
        color="brown"
        style="left: 5px; bottom: 5px; position: absolute;"
        >Lat,Lng:</font
      >
      <!-- Latitude and longitude of the cross mark displayed in the bottom left of the screen (initial display of actual values) -->
      <font
        id="centerPos"
        size="-2"
        color="brown"
        style="left: 50px; bottom: 5px; position: absolute;"
        >lat , lng</font
      >
      <!-- Display the layer list UI -->
      <div
        id="layerList"
        style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "
      ></div>
    </div>
  </body>
</html>
```

### layerListStyle.css {#layer-list-style-css}

レイヤーリストUI用のdiv要素(id:layerList)のためのスタイルシート

#### ソースコード {#source-code}

```css
/** レイヤーリストUIのスタイルシート **/
body {
  font-family: Meiryo;
}
#layerTable {
  background: #ffe0e0;
  border: 2px solid #bbb;
}
.layerItem {
  background-color: white;
}
.noGroup {
  background-color: #fff0f0;
}
#layerList {
  background-color: #ffff80;
  opacity: 0.8;
  font-size: 12px;
}

#layerList button {
  padding: 1px 3px;
}
```

### Container.svg {#container-svg}

- 表示する２つのレイヤ用のSVGファイルをレイヤーとして読み込む
  - Coastline.svg
  - Airport.svg
- レイヤーの順番は、**下の行ほど上のレイヤー**になる。[SVGのPainters Model](https://www.w3.org/TR/SVG11/render.html#PaintersModel)
- class指定でレイヤーリストUIのグルーピングが可能
- animation要素によってレイヤーを参照
- visibility属性によって初期表示状態を設定する（もしレイヤーリストUIがないと初期表示状態から変更不可能です）
- x,y,width,height値は取りうる最大領域を設定

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- 日本の海岸線データのSVGファイルを表示状態として読み込む -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap" visibility="visible"/>

<!-- 日本の空港データのSVGファイルを表示状態として読み込む -->
<animation xlink:href="Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Air Port" class="poi" visibility="visible"/>
</svg>
```

### Coastline.svg {#coastline-svg}

Coastline.svgは[チュートリアル1#Coastline.svg](../tutorial-1/#coastline-svg)と同じです。（同じデータが流用できるので開発効率が高くなる）

### Airport.svg {#airport-svg}

チュートリアル2aのCoastline_Airport.svgから、空港ポイント部分のみを抜き出して作成したSVGファイルです

#### ソースコード {#source-code}

<details>
<summary>ソースコードを表示するには展開してください</summary>

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="12078.24557, -4750.342539, 2637.1512, 2526.396468" xmlns:go="http://purl.org/svgmap/profile"  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" property="id,type,latitude,longitude,title,address,spec" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(100,0,0,-100,0,0)" />
<!-- POI用のイメージ設定 -->
 <defs>
  <g id="syl5" >
   <image xlink:href="./img/mappin1.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl6" >
   <image xlink:href="./img/mappin2.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl7" >
   <image xlink:href="./img/mappin2.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl8" >
   <image xlink:href="./img/mappin3.png" preserveAspectRatio="none" x="-5.6" y="-17.5" width="13.3" height="18.9"/>
  </g>
  <g id="syl9" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl10" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl11" >
   <image xlink:href="./img/mappin4.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl12" >
   <image xlink:href="./img/mappin5.png" preserveAspectRatio="none" x="-8" y="-25" width="19" height="27"/>
  </g>
  <g id="syl13" >
   <image xlink:href="./img/mappin3.png" preserveAspectRatio="none" x="-4" y="-12.5" width="9.5" height="13.5"/>
  </g>
 </defs>

<!-- 空港の情報 -->
<!-- Draw ug:POI using defs-ed symbols -->
 <use transform="ref(svg,14179.54536,-4539.8095)" x="0" y="0" xlink:href="#syl6" content="WKJ/RJCW,拠　点（国）,45.398095,141.7954536,稚内空港,北海道稚内市,2000×45(08/26)" xlink:title="稚内空港"/>

 <use transform="ref(svg,14118.37511,-4524.39994)" x="0" y="0" xlink:href="#syl8" content="RIS/RJER,地方管理,45.2439994,141.1837511,利尻空港,北海道利尻郡利尻富士町,1800×45(07/25)" xlink:title="利尻空港"/>

 <use transform="ref(svg,14245.81628,-4366.90539)" x="0" y="0" xlink:href="#syl7" content="AKJ/RJEC,拠　点（地）,43.6690539,142.4581628,旭川空港,北海道上川郡東神楽町,2500×60(16/34)" xlink:title="旭川空港"/>

 <use transform="ref(svg,14340.76139,-4430.68353)" x="0" y="0" xlink:href="#syl8" content="MBE/RJEB,地方管理,44.3068353,143.4076139,紋別空港,北海道紋別市,2000×45(14/32)" xlink:title="紋別空港"/>

 <use transform="ref(svg,14415.86869,-4388.14367)" x="0" y="0" xlink:href="#syl8" content="MMB/RJCM,地方管理,43.8814367,144.1586869,女満別空港,北海道網走郡大空町,2500×45(18/36)" xlink:title="女満別空港"/>

 <use transform="ref(svg,14495.63417,-4356.79867)" x="0" y="0" xlink:href="#syl8" content="SHB/RJCN,地方管理,43.5679867,144.9563417,中標津空港,北海道標津郡中標津町,2000×45(08/26)" xlink:title="中標津空港"/>

 <use transform="ref(svg,14421.14861,-4302.77597)" x="0" y="0" xlink:href="#syl6" content="KUH/RJCK,拠　点（国）,43.0277597,144.2114861,釧路空港,北海道釧路市,2500×45(17/35)" xlink:title="釧路空港"/>

 <use transform="ref(svg,14321.28353,-4273.22117)" x="0" y="0" xlink:href="#syl7" content="OBO/RJCB,拠　点（地）,42.7322117,143.2128353,帯広空港,北海道帯広市,2500×45(17/35)" xlink:title="帯広空港"/>

 <use transform="ref(svg,14136.76408,-4310.85172)" x="0" y="0" xlink:href="#syl10" content="SPK/RJCO,陸自・共用,43.1085172,141.3676408,札幌丘珠空港,北海道札幌市,1500×45(14/32)" xlink:title="札幌丘珠空港"/>

 <use transform="ref(svg,14081.53264,-4177.59875)" x="0" y="0" xlink:href="#syl6" content="HKD/RJCH,拠　点（国）,41.7759875,140.8153264,函館空港,北海道函館市,3000×45(12/30)" xlink:title="函館空港"/>

 <use transform="ref(svg,14168.9825,-4278.69075)" x="0" y="0" xlink:href="#syl6" content="CTS/RJCC,拠　点（国）,42.7869075,141.689825,新千歳空港,北海道千歳市,(A)3000×60(01L/19R)" xlink:title="新千歳空港"/>

 <use transform="ref(svg,13944.468,-4206.82092)" x="0" y="0" xlink:href="#syl8" content="OIR/RJEO,地方管理,42.0682092,139.44468,奥尻空港,北海道奥尻郡奥尻町,1500×45(12/30)" xlink:title="奥尻空港"/>

 <use transform="ref(svg,14067.56139,-4072.87761)" x="0" y="0" xlink:href="#syl8" content="AOJ/RJSA,地方管理,40.7287761,140.6756139,青森空港,青森県青森市,3000×60(06/24)" xlink:title="青森空港"/>

 <use transform="ref(svg,14138.74264,-4069.16497)" x="0" y="0" xlink:href="#syl12" content="MSJ/RJSM,米軍・共用,40.6916497,141.3874264,三沢空港,青森県三沢市,3050×45(10/28)" xlink:title="三沢空港"/>

 <use transform="ref(svg,14113.06225,-3942.93206)" x="0" y="0" xlink:href="#syl8" content="HNA/RJSI,地方管理,39.4293206,141.1306225,花巻空港,岩手県花巻市,2500×45(02/20)" xlink:title="花巻空港"/>

 <use transform="ref(svg,14021.30644,-3961.1885)" x="0" y="0" xlink:href="#syl7" content="AXT/RJSK,拠　点（地）,39.611885,140.2130644,秋田空港,秋田県秋田市,2500×60(10/28)" xlink:title="秋田空港"/>

 <use transform="ref(svg,14037.20758,-4019.54628)" x="0" y="0" xlink:href="#syl8" content="ONJ/RJSR,地方管理,40.1954628,140.3720758,大館能代空港,秋田県北秋田市,2000×45(11/29)" xlink:title="大館能代空港"/>

 <use transform="ref(svg,13977.99947,-3883.06025)" x="0" y="0" xlink:href="#syl8" content="SYO/RJSY,地方管理,38.8306025,139.7799947,庄内空港,山形県酒田市,2000×45(09/27)" xlink:title="庄内空港"/>

 <use transform="ref(svg,14036.17906,-3840.75203)" x="0" y="0" xlink:href="#syl7" content="GAJ/RJSC,拠　点（地）,38.4075203,140.3617906,山形空港,山形県東根市,2000×45(01/19)" xlink:title="山形空港"/>

 <use transform="ref(svg,14092.94397,-3813.79306)" x="0" y="0" xlink:href="#syl6" content="SDJ/RJSS,拠　点（国）,38.1379306,140.9294397,仙台空港,宮城県名取市,(A)1200×45(12/30)" xlink:title="仙台空港"/>

 <use transform="ref(svg,14040.196,-3722.91308)" x="0" y="0" xlink:href="#syl8" content="FKS/RJSF,地方管理,37.2291308,140.40196,福島空港,福島県石川郡玉川村,2500×60(01/19)" xlink:title="福島空港"/>

 <use transform="ref(svg,14040.44017,-3617.84106)" x="0" y="0" xlink:href="#syl9" content="IBR/RJAH,空自・共用,36.1784106,140.4044017,茨城空港,茨城県小美玉市,(A)2700×45(03R/21L)" xlink:title="茨城空港"/>

 <use transform="ref(svg,14038.88606,-3576.66103)" x="0" y="0" xlink:href="#syl5" content="NRT/RJAA,拠　点（会）,35.7666103,140.3888606,成田国際空港,千葉県成田市,(A)4000×60(16R/34L)" xlink:title="成田国際空港"/>

 <use transform="ref(svg,13978.32156,-3555.07211)" x="0" y="0" xlink:href="#syl6" content="HND/RJTT,拠　点（国）,35.5507211,139.7832156,東京国際空港,東京都大田区,(A)3000×60(16R/34L)" xlink:title="東京国際空港"/>

 <use transform="ref(svg,13953.74194,-3566.85689)" x="0" y="0" xlink:href="#syl13" content="***/RJTF,その他,35.6685689,139.5374194,調布飛行場,東京都調布市,800×30(17/35)" xlink:title="調布飛行場"/>

 <use transform="ref(svg,13936.33606,-3477.55611)" x="0" y="0" xlink:href="#syl8" content="OIM/RJTO,地方管理,34.7755611,139.3633606,大島空港,東京都大島町,1800×45(03/21)" xlink:title="大島空港"/>

 <use transform="ref(svg,13925.98347,-3437.18567)" x="0" y="0" xlink:href="#syl8" content="***/RJAN,地方管理,34.3718567,139.2598347,新島空港,東京都新島村,800×25(11/29)" xlink:title="新島空港"/>

 <use transform="ref(svg,13913.48717,-3419.04644)" x="0" y="0" xlink:href="#syl8" content="***/RJAZ,地方管理,34.1904644,139.1348717,神津島空港,東京都神津島村,800×25(11/29)" xlink:title="神津島空港"/>

 <use transform="ref(svg,13955.60792,-3406.89564)" x="0" y="0" xlink:href="#syl8" content="MYE/RJTQ,地方管理,34.0689564,139.5560792,三宅島空港,東京都三宅村,1200×30(02/20)" xlink:title="三宅島空港"/>

 <use transform="ref(svg,13977.97953,-3311.65797)" x="0" y="0" xlink:href="#syl8" content="HAC/RJTH,地方管理,33.1165797,139.7797953,八丈島空港,東京都八丈町,1800×45(07/25)" xlink:title="八丈島空港"/>

 <use transform="ref(svg,13911.42792,-3795.19908)" x="0" y="0" xlink:href="#syl6" content="KIJ/RJSN,拠　点（国）,37.9519908,139.1142792,新潟空港,新潟県新潟市,(A)1314×45(04/22)" xlink:title="新潟空港"/>

 <use transform="ref(svg,13718.94392,-3664.31019)" x="0" y="0" xlink:href="#syl8" content="TOY/RJNT,地方管理,36.6431019,137.1894392,富山空港,富山県富山市,2000×45(02/20)" xlink:title="富山空港"/>

 <use transform="ref(svg,13641.27908,-3640.18053)" x="0" y="0" xlink:href="#syl9" content="KMQ/RJNK,空自・共用,36.4018053,136.4127908,小松空港,石川県小松市,2700×45(06/24)" xlink:title="小松空港"/>

 <use transform="ref(svg,13692.68697,-3728.52464)" x="0" y="0" xlink:href="#syl8" content="NTQ/RJNW,地方管理,37.2852464,136.9268697,能登空港,石川県輪島市,2000×45(07/25)" xlink:title="能登空港"/>

 <use transform="ref(svg,13793.25142,-3618.64958)" x="0" y="0" xlink:href="#syl8" content="MMJ/RJAF,地方管理,36.1864958,137.9325142,松本空港,長野県松本市,2000×45(18/36)" xlink:title="松本空港"/>

 <use transform="ref(svg,13691.94908,-3525.37731)" x="0" y="0" xlink:href="#syl13" content="NKM/RJNA,その他,35.2537731,136.9194908,名古屋空港,愛知県西春日井郡豊山町,2740×45(16/34)" xlink:title="名古屋空港"/>

 <use transform="ref(svg,13681.46917,-3485.89817)" x="0" y="0" xlink:href="#syl5" content="NGO/RJGG,拠　点（会）,34.8589817,136.8146917,中部国際空港,愛知県常滑市,3500×60(18/36)" xlink:title="中部国際空港"/>

 <use transform="ref(svg,13818.35372,-3479.35906)" x="0" y="0" xlink:href="#syl8" content="FSZ/RJNS,地方管理,34.7935906,138.1835372,静岡空港,静岡県牧之原市,2500×60(12/30)" xlink:title="静岡空港"/>

 <use transform="ref(svg,13544.25181,-3479.01583)" x="0" y="0" xlink:href="#syl6" content="ITM/RJOO,拠　点（国）,34.7901583,135.4425181,大阪国際空港,大阪府豊中市,(A)1828×45(14L/32R)" xlink:title="大阪国際空港"/>

 <use transform="ref(svg,13524.41067,-3443.52619)" x="0" y="0" xlink:href="#syl5" content="KIX/RJBB,拠　点（会）,34.4352619,135.2441067,関西国際空港,大阪府泉佐野市,(A)3500×60(06R/24L)" xlink:title="関西国際空港"/>

 <use transform="ref(svg,13523.786959,-3463.670469)" x="0" y="0" xlink:href="#syl8" content="UKB/RJBE,地方管理,34.63670469,135.23786959,神戸空港,兵庫県神戸市,2500×60(09/27)" xlink:title="神戸空港"/>

 <use transform="ref(svg,13478.95714,-3551.62906)" x="0" y="0" xlink:href="#syl13" content="TKG/RJBT,その他,35.5162906,134.7895714,但馬空港,兵庫県豊岡市,1200×30(01/19)" xlink:title="但馬空港"/>

 <use transform="ref(svg,13535.71056,-3366.6415)" x="0" y="0" xlink:href="#syl8" content="SHM/RJBD,地方管理,33.666415,135.3571056,南紀白浜空港,和歌山県西牟婁郡白浜町,2000×45(15/33)" xlink:title="南紀白浜空港"/>

 <use transform="ref(svg,13416.31778,-3552.39886)" x="0" y="0" xlink:href="#syl8" content="TTJ/RJOR,地方管理,35.5239886,134.1631778,鳥取空港,鳥取県鳥取市,2000×45(10/28)" xlink:title="鳥取空港"/>

 <use transform="ref(svg,13325.44933,-3549.91892)" x="0" y="0" xlink:href="#syl9" content="YGJ/RJOH,空自・共用,35.4991892,133.2544933,米子空港,鳥取県境港市,2500×45(07/25)" xlink:title="米子空港"/>

 <use transform="ref(svg,13285.30253,-3539.616)" x="0" y="0" xlink:href="#syl8" content="IZO/RJOC,地方管理,35.39616,132.8530253,出雲空港,島根県簸川郡斐川町,2000×45(07/25)" xlink:title="出雲空港"/>

 <use transform="ref(svg,13333.02447,-3617.75225)" x="0" y="0" xlink:href="#syl8" content="OKI/RJNO,地方管理,36.1775225,133.3302447,隠岐空港,島根県隠岐郡隠岐の島町,2000×45(08/26)" xlink:title="隠岐空港"/>

 <use transform="ref(svg,13179.47744,-3467.99842)" x="0" y="0" xlink:href="#syl8" content="IWJ/RJOW,地方管理,34.6799842,131.7947744,石見空港,島根県益田市,2000×45(11/29)" xlink:title="石見空港"/>

 <use transform="ref(svg,13385.40253,-3476.23728)" x="0" y="0" xlink:href="#syl8" content="OKJ/RJOB,地方管理,34.7623728,133.8540253,岡山空港,岡山県岡山市,3000×45(07/25)" xlink:title="岡山空港"/>

 <use transform="ref(svg,13291.88794,-3443.98678)" x="0" y="0" xlink:href="#syl6" content="HIJ/RJOA,拠　点（国）,34.4398678,132.9188794,広島空港,広島県三原市,3000×60(10/28)" xlink:title="広島空港"/>

 <use transform="ref(svg,13127.49725,-3393.30717)" x="0" y="0" xlink:href="#syl7" content="UBJ/RJDC,拠　点（地）,33.9330717,131.2749725,山口宇部空港,山口県宇部市,2500×45(07/25)" xlink:title="山口宇部空港"/>

 <use transform="ref(svg,13221.98611,-3415.45625)" x="0" y="0" xlink:href="#syl12" content="IWK/RJOI,米軍・共用,34.1545625,132.2198611,岩国空港,山口県岩国市,2440×60(02/20)" xlink:title="岩国空港"/>

 <use transform="ref(svg,13403.62042,-3430.38936)" x="0" y="0" xlink:href="#syl6" content="TAK/RJOT,拠　点（国）,34.3038936,134.0362042,高松空港,香川県高松市,2500×45(08/26)" xlink:title="高松空港"/>

 <use transform="ref(svg,13457.84253,-3414.22669)" x="0" y="0" xlink:href="#syl11" content="TKS/RJOS,海自・共用,34.1422669,134.5784253,徳島空港,徳島県板野郡松茂町,2500×45(11/29)" xlink:title="徳島空港"/>

 <use transform="ref(svg,13270.87,-3383.12342)" x="0" y="0" xlink:href="#syl6" content="MYJ/RJOM,拠　点（国）,33.8312342,132.7087,松山空港,愛媛県松山市,2500×45(14/32)" xlink:title="松山空港"/>

 <use transform="ref(svg,13367.41986,-3354.74358)" x="0" y="0" xlink:href="#syl6" content="KCZ/RJOK,拠　点（国）,33.5474358,133.6741986,高知空港,高知県南国市,2500×45(14/32)" xlink:title="高知空港"/>

 <use transform="ref(svg,13103.17475,-3383.96675)" x="0" y="0" xlink:href="#syl6" content="KKJ/RJFR,拠　点（国）,33.8396675,131.0317475,北九州空港,福岡県北九州市,2500×60(18/36)" xlink:title="北九州空港"/>

 <use transform="ref(svg,13045.31556,-3360.39061)" x="0" y="0" xlink:href="#syl6" content="FUK/RJFF,拠　点（国）,33.6039061,130.4531556,福岡空港,福岡県福岡市,2800×60(16/34)" xlink:title="福岡空港"/>

 <use transform="ref(svg,13030.60919,-3315.26375)" x="0" y="0" xlink:href="#syl8" content="HSG/RJFS,地方管理,33.1526375,130.3060919,佐賀空港,佐賀県佐賀郡川副町,2000×45(11/29)" xlink:title="佐賀空港"/>

 <use transform="ref(svg,13085.79081,-3283.44322)" x="0" y="0" xlink:href="#syl6" content="KMJ/RJFT,拠　点（国）,32.8344322,130.8579081,熊本空港,熊本県上益城郡益城町,3000×45(07/25)" xlink:title="熊本空港"/>

 <use transform="ref(svg,13017.080813,-3246.08038)" x="0" y="0" xlink:href="#syl13" content="AXJ/RJDA,その他,32.4608038,130.17080813,天草空港,熊本県天草市,1000×30(13/31)" xlink:title="天草空港"/>

 <use transform="ref(svg,13173.07403,-3347.54397)" x="0" y="0" xlink:href="#syl6" content="OIT/RJFO,拠　点（国）,33.4754397,131.7307403,大分空港,大分県国東市,3000×45(01/19)" xlink:title="大分空港"/>

 <use transform="ref(svg,13143.64547,-3187.16022)" x="0" y="0" xlink:href="#syl6" content="KMI/RJFM,拠　点（国）,31.8716022,131.4364547,宮崎空港,宮崎県宮崎市,2500×45(09/27)" xlink:title="宮崎空港"/>

 <use transform="ref(svg,12992.21047,-3291.46489)" x="0" y="0" xlink:href="#syl6" content="NGS/RJFU,拠　点（国）,32.9146489,129.9221047,長崎空港,長崎県大村市,(A)1200×30(18/36)" xlink:title="長崎空港"/>

 <use transform="ref(svg,12932.65492,-3428.53933)" x="0" y="0" xlink:href="#syl8" content="TSJ/RJDT,地方管理,34.2853933,129.3265492,対馬空港,長崎県対馬市,1900×45(14/32)" xlink:title="対馬空港"/>

 <use transform="ref(svg,12978.27286,-3374.64683)" x="0" y="0" xlink:href="#syl8" content="IKI/RJDB,地方管理,33.7464683,129.7827286,壱岐空港,長崎県壱岐市,1200×30(02/20)" xlink:title="壱岐空港"/>

 <use transform="ref(svg,12883.72992,-3267.03464)" x="0" y="0" xlink:href="#syl8" content="FUJ/RJFE,地方管理,32.6703464,128.8372992,福江空港,長崎県五島市,2000×45(03/21)" xlink:title="福江空港"/>

 <use transform="ref(svg,13071.71897,-3179.42389)" x="0" y="0" xlink:href="#syl6" content="KOJ/RJFK,拠　点（国）,31.7942389,130.7171897,鹿児島空港,鹿児島県霧島市,3000×45(16/34)" xlink:title="鹿児島空港"/>

 <use transform="ref(svg,13099.16719,-3060.92667)" x="0" y="0" xlink:href="#syl8" content="TNE/RJFG,地方管理,30.6092667,130.9916719,種子島空港,鹿児島県熊毛郡中種子町,2000×45(13/31)" xlink:title="種子島空港"/>

 <use transform="ref(svg,13065.36264,-3038.79056)" x="0" y="0" xlink:href="#syl8" content="KUM/RJFC,地方管理,30.3879056,130.6536264,屋久島空港,鹿児島県熊毛郡上屋久町,1500×45(14/32)" xlink:title="屋久島空港"/>

 <use transform="ref(svg,12970.62783,-2843.15436)" x="0" y="0" xlink:href="#syl8" content="ASJ/RJKA,地方管理,28.4315436,129.7062783,奄美空港,鹿児島県奄美市,2000×45(03/21)" xlink:title="奄美空港"/>

 <use transform="ref(svg,12992.78356,-2831.90211)" x="0" y="0" xlink:href="#syl8" content="KKX/RJKI,地方管理,28.3190211,129.9278356,喜界空港,鹿児島県大島郡喜界町,1200×30(07/25)" xlink:title="喜界空港"/>

 <use transform="ref(svg,12888.33239,-2783.23517)" x="0" y="0" xlink:href="#syl8" content="TKN/RJKN,地方管理,27.8323517,128.8833239,徳之島空港,鹿児島県大島郡天城町,2000×45(01/19)" xlink:title="徳之島空港"/>

 <use transform="ref(svg,12870.39914,-2743.38942)" x="0" y="0" xlink:href="#syl8" content="OKE/RJKB,地方管理,27.4338942,128.7039914,沖永良部空港,鹿児島県大島郡和泊町,1350×30(04/22)" xlink:title="沖永良部空港"/>

 <use transform="ref(svg,12840.04583,-2704.15739)" x="0" y="0" xlink:href="#syl8" content="RNJ/RORY,地方管理,27.0415739,128.4004583,与論空港,鹿児島県大島郡与論町,1200×30(14/32)" xlink:title="与論空港"/>

 <use transform="ref(svg,12765.08083,-2620.56425)" x="0" y="0" xlink:href="#syl6" content="OKA/ROAH,拠　点（国）,26.2056425,127.6508083,那覇空港,沖縄県那覇市,3000×45(18/36)" xlink:title="那覇空港"/>

 <use transform="ref(svg,12723.88214,-2659.32767)" x="0" y="0" xlink:href="#syl8" content="AGJ/RORA,地方管理,26.5932767,127.2388214,粟国空港,沖縄県島尻郡粟国村,800×25(01/19)" xlink:title="粟国空港"/>

 <use transform="ref(svg,12671.53831,-2636.34)" x="0" y="0" xlink:href="#syl8" content="UEO/ROKJ,地方管理,26.3634,126.7153831,久米島空港,沖縄県島尻郡久米島町,2000×45(03/21)" xlink:title="久米島空港"/>

 <use transform="ref(svg,13132.45694,-2594.45475)" x="0" y="0" xlink:href="#syl8" content="KTD/RORK,地方管理,25.9445475,131.3245694,北大東空港,沖縄県島尻郡北大東村,1500×45(03/21)" xlink:title="北大東空港"/>

 <use transform="ref(svg,13126.56264,-2584.58983)" x="0" y="0" xlink:href="#syl8" content="MMD/ROMD,地方管理,25.8458983,131.2656264,南大東空港,沖縄県島尻郡南大東村,1500×45(02/20)" xlink:title="南大東空港"/>

 <use transform="ref(svg,12529.1325,-2479.221)" x="0" y="0" xlink:href="#syl8" content="MMY/ROMY,地方管理,24.79221,125.291325,宮古空港,沖縄県宮古島市,2000×45(04/22)" xlink:title="宮古空港"/>

 <use transform="ref(svg,12514.9188,-2482.6576)" x="0" y="0" xlink:href="#syl8" content="SHI/RORS,地方管理,24.826576,125.149188,下地島空港,沖縄県宮古島市,3000×60(17/35)" xlink:title="下地島空港"/>

 <use transform="ref(svg,12467.82847,-2465.47086)" x="0" y="0" xlink:href="#syl8" content="TRA/RORT,地方管理,24.6547086,124.6782847,多良間空港,沖縄県宮古郡多良間村,1500×45(18/36)" xlink:title="多良間空港"/>

 <use transform="ref(svg,12418.32569,-2434.47911)" x="0" y="0" xlink:href="#syl8" content="ISG/ROIG,地方管理,24.3447911,124.1832569,石垣空港,沖縄県石垣市,1500×45(04/22)" xlink:title="石垣空港"/>

 <use transform="ref(svg,12298.00817,-2446.52631)" x="0" y="0" xlink:href="#syl8" content="OGN/ROYN,地方管理,24.4652631,122.9800817,与那国空港,沖縄県八重山郡与那国町,2000×45(08/26)" xlink:title="与那国空港"/>

<!-- リンク付きの空港情報:このPOIをクリックするとリンク先に移動するか、コンテンツ情報を表示するかを指示するダイアログが表示される。リンクを選択すると、別タブにてリンク先を表示する -->
 <a xlink:href="http://www.google.co.jp/" target="null">
  <use transform="ref(svg,13970,-3555.07211)" x="0" y="0" xlink:href="#syl6" content="HND/RJTT,拠　点（国）,35.5507211,139.7832156,東京国際空港XXX,東京都大田区,(A)3000×60(16R/34L)" xlink:title="東京国際空港XXX"/>
 </a>

<!-- リンク付きの空港情報:このPOIをクリックするとリンク先に移動する(現在のタブ内でリンク先に移動する) -->
 <a xlink:href="http://www.google.co.jp/">
  <use transform="ref(svg,13960,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="url noTarget noMetadata"/>
 </a>
<!-- リンク付きの空港情報:このPOIをクリックするとリンク先に移動する(現在の地図で表示位置を変更する。フルURL指定)。別タブにてリンク先を表示する -->
 <a xlink:href="http://svg2.mbsrv.net/examples/tutorials/tutorial2/tutorial2.html#svgView(viewBox(global,139,35,2,2))" target="null">
  <use transform="ref(svg,13950,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="URL+hash target  noMetadata"/>
 </a>
<!-- リンク付きの空港情報:このPOIをクリックするとリンク先に移動する(現在の地図で表示位置を変更する。現在のURLにhrefの内容を追加)。現在位のタブ内でリンク先に移動する。 -->
 <a xlink:href="#svgView(viewBox(global,139,35,3,3))">
  <use transform="ref(svg,13940,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="view変更 139,35,3,3  noMetadata"/>
 </a>

<!-- リンク付きの空港情報:このPOIをクリックするとリンク先に移動する。現在位のタブ内でリンク先に移動する。 -->
 <a xlink:href="tutorial2.html">
  <use transform="ref(svg,13930,-3555.07211)" x="0" y="0" xlink:href="#syl6" xlink:title="noScheme noTarget  noMetadata"/>
 </a>
</svg>
```

</details>

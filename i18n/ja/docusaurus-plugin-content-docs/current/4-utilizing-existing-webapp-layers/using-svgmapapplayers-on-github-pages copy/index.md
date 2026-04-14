# 独自ホストにsvgmapAppLayersをコピーして利用

## はじめに  {#introduction}

[svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) の内容をダウンロードし、独自に用意したホストにコピー（クローン）して利用します。前章のGitHub Pagesの参照であった制限は生じません。

- 実際の動作は[こちら](https://www.svgmap.org/examples/tutorials/ghAppLayersClone/ghAppLayers_clone.html) をクリック
  - (このサンプルでは、国交省道路交通情報のレイヤー群と、CSVオーサリングツールレイヤー、basemapsのみを使用しています)

本章では、[svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers)リポジトリを自分のホストにコピーして使用します。 前章の[制限事項](../using-svgmapapplayers-on-github-pages/index.md#制限事項-restrictions)はありませんが、svgmapAppLayersリポジトリのアップデートの反映は自身で行う必要があります。

- 実際の動作は[こちら](https://www.svgmap.org/examples/tutorials/ghAppLayersClone/ghAppLayers_clone.html) をクリック
  - このサンプルでは、国交省道路交通情報のレイヤー群と、CSVオーサリングツールレイヤー、basemapsのみを使用しています
- 使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/ghAppLayersClone.zip)

### あらすじ {#synopsis}

- [https://github.com/svgmap/svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers)  をダウンロード（git cloneでも良い）する
  - [zipダウンロードする場合](https://github.com/svgmap/svgmapAppLayers/archive/refs/heads/main.zip) (解凍必要)
  - git cloneの場合: ```git clone git@github.com:svgmap/svgmapAppLayers.git```
- 自身が運営しているホストに内容をコピーする
- Container.svgを編集し、掲載したいレイヤーを選択する
- 必要に応じてプロキシーを構築する

### 手順 {#procedure}

- [svgmapAppLayer](https://github.com/svgmap/svgmapAppLayers)の内容を複製します
  - [https://github.com/svgmap/svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) の UI(`<>`Codeボタン⇒ [Download ZIP](https://github.com/svgmap/svgmapAppLayers/archive/refs/heads/main.zip)) でダウンロードする(解凍はシンボリックリンクが有効な環境(linux等)で実施) か、gitコマンドでクローンする　```git clone git@github.com:svgmap/svgmapAppLayers```
- 使いたいレイヤー以外のディレクトリは消去して構いません
  - ただしcommonLib（共通ライブラリ）は、各ディレクトリの中からシンボリックリンクが張られているファイル群のため、基本的には削除できません。(使用するレイヤーのディレクトリから参照されていないファイルを消すことは可能）
- authoringLayers内のbbsディレクトリ(authoringLayers/bbs)はphpを使って、オーサリングしたものをサーバに保存する機能に関する実装です、このチュートリアルでは扱いませんので不用意なサーバ動作を防ぐため必ず削除してください。
- 地図ページのhtmlを用意（前章と同じです）
- img, jsディレクトリとその内容を配置
- プロキシーサービスを構築（前章と同じです）
- Container.svgは編集して必要なレイヤーのみを残します。

### ディレクトリの構造 {#directory-structure}

このサンプルでは、国交省道路交通情報のレイヤー群と、CSVオーサリングツールレイヤー、basemapsのみを使用

```svg
|--Container.svg 
|--appLayers 
| |--mlitRoad 
| |--... 
| 
|--authoringLayers 
| |--local 
| | |--csvLayer 
| | |--... 
| 
|   
| 
--mappin.png 
|   
|--basemaps 
| 
|--... 
|   
| 
--commonLib 
| |--... 
|   
|--js 
| |--... 
|   
|--simpleCORSproxy.php
```

### Container.svg {#container-svg}

このサンプルでは、国交省道路交通情報のレイヤー群と、CSVオーサリングツールレイヤー、basemapsのみを使用

```svg
<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:go="http://purl.org/svgmap/profile" viewBox="123 -46 22 22" > 

<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1.0,0.0,0.0,-1.0,0.0,0.0)" /> 

<!-- Basemap Layers --> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicWMTS.svg" title="sentinel2_2018_WMTS" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=ort" title="DenshiKokudo:orthoPhoto" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=pale" title="DenshiKokudo:Pale" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg#map=relief" title="DenshiKokudo:relief" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/dynamicDenshiKokudo2016.svg" title="DenshiKokudo" class="basemap switch" visibility="hidden"/> 
<animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./basemaps/osmTileProviders/osmtp.svg" title="OpenStreetMap Etc" class="basemap switch" visibility="hidden"/> 
<animation x="-300" y="-300" width="600" height="600" xlink:href="./basemaps/dynamicOSM_r11.svg" title="OpenStreetMap(Global)" class="basemap switch" visibility="visible"/> 

<!-- Group of authoring tools --> 
<animation xlink:href="./authoringLayers/local/csvLayer/csvXhr_r20.svg" title="CSV data visualization" data-cross-origin-restricted="true" x="-30000" y="-30000" width="60000" height="60000" class="Authoring file editable" opacity="0.75" visibility="hidden"/> 

<!-- Ministry of Land, Infrastructure, Transport and Tourism Road Information --> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/notoEQ2024/notoRoad.svg" title="Reiwa 6 Noto Peninsula Earthquake Road restoration status" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism road information batch clickable" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/doroBosai/kinkyuYuso.svg" title="Emergency Transport Road R" data-cross-origin-proxy-required="true" opacity="0.85" <animation x="-30000" y="-30000" width =" 
  60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=imusho" title="National Highway Offices, etc." data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/>
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=station" title="Roadside Station R" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=kojiyotei" title="Construction Schedule" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=expressway" title="Expressway Pre-Traffic Restriction Section" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=jizenkisei" title="Pre-Traffic Restriction Section R" data-cross-origin-proxy-required="true" opacity="0.8" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" 
  <animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=weather" title="Hourly Rainfall" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information clickable batch" visibility="hidden"/> < 
  animation x="-30000" y="-30000" width="60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg#layer=camera" title="Live Camera" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" <animation x="-30000" y="-30000" width= " 
  60000" height="60000" xlink:href="./appLayers/mlitRoad/jpAll2023.svg" title="Traffic Restrictions" data-cross-origin-proxy-required="true" opacity="0.75" class="Ministry of Land, Infrastructure, Transport and Tourism Road Information batch" visibility="hidden"/> 
</svg>
```

## 参考情報：svgmap.jsをロードする地図ページの構成 {#reference-information}

以下のgithubリポジトリの内容をcloneすれば、本チュートリアルで説明したsvgmap.jsによる地図ウェブアプリページを簡単に構成することができます。このリポジトリはsvgmap.orgの公式デモページの一つをgithubpagesとして公開しているもので、３次元可視化機能や、カスタムレイヤーマネージメント機能等、svgmapjsが持つ拡張機能も設定済みです。

[https://github.com/svgmap/svgMapDemo](https://github.com/svgmap/svgMapDemo)

ただし、CORSプロキシについては、上記githubリポジトリのソースではsvgmap.orgの公式デモシステム専用に用意されたものが設定されていますので、ご自身のサイトで別途用意したCORSプロキシ用にhtmlの中のソースの該当部分を編集してください。[CORSプロキシの設定については、こちらを参照](../../3-web-service-integration/cross-origin-access/index.md).

参考：[上記githubリポジトリによるSVGMap公式デモページ](https://svgmap.github.io/svgMapDemo/)
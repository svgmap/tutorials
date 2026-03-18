# チュートリアル3b タイリング (svgMapToolsを用いた静的タイルの作成)

## はじめに  {#introduction}

前章ではすでに作成済みのタイルを用いていましたが、ここでは [svgMapTools](https://github.com/svgmap/svgMapTools)を用いて、shapefileからタイルデータを作成し表示してみます。実際の動作は[こちら](https://svgmap.org/devinfo/devkddi/tutorials/tutorial3b/tutorial3b.html)をクリック。

### ファイル構造 {#file-structure}

ファイル構造は以下の通りです：

- ファイル構成は[tutorial3bディレクトリ](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3b/)ディレクトリに以下のファイルがあります。
  - https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3b/
- svgMapToolsを使って、地球地図 日本のデータのうちいくつかをタイリングされたSVGMapコンテンツに変換。
  - svgMapToolsが行うタイリング(Quad Tree Composite Tiling)については、[こちらの資料](https://www.slideshare.net/totipalmate/quad-tree-composite-tiling-for-web-mapping-in-japanese)を参照。
- 変換したコンテンツを、レイヤーとして表示

## チュートリアル {#tutorial}

### 使用ファイル {#files-used}

- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/devinfo/devkddi/tutorials/tutorial3b.zip)

### タイリングされたコンテンツの準備 {#preparing-tiled-content}

- この章では、[svgMapTools](https://github.com/svgmap/svgMapTools/) を用いて、shapefileからタイリングされた地図コンテンツを準備し、それを表示します。
そのため、svgMapToolsの設定を含む[チュートリアルを先ず実施](https://github.com/svgmap/svgMapTools/tree/master/tutorials)してください。
- 本チュートリアルでは、[国土地理院の地球地図](https://www.gsi.go.jp/kankyochiri/gm_jpn.html)日本のデータ（ファイル形式：shapefile、ベクトル地理データ）を表示してみます。
  - 今回は、海岸線(coasstl)、道路(roadl)、市街地(面(builtupa)と点(builtupp))のデータを　それぞれレイヤーとして表示してみます。

#### svgMapToolsの設定 {#configuring-svgmaptools}

- svgMapToolsの設定を含む[チュートリアル](https://github.com/svgmap/svgMapTools/tree/master/tutorials)を実施

#### ソースデータのダウンロード {#download-source-data}

- [地球地図日本サイト](https://www1.gsi.go.jp/geowww/globalmap-gsi/download/data/gm-japan/gm-jpn-all_u_2_2.zip) から、 [全レイヤの入ったzipファイル](https://www.gsi.go.jp/kankyochiri/gm_jpn.html)をダウンロードして解凍

#### データを変換してコンテンツを保存 {#transform-data-and-save-content}

Shapefileから、SVGMapのタイリングされたコンテンツを生成します。

以下はWindowsで実行した例です。

- ```cd [PATH_TO_DATA]```
- ```mkdir roadl```
- ```mkdir coastl```
- ```mkdir builtup```
- ```cd [PATH_TO_TOOLS]```
- ```Shape2SVGMap.bat -micrometa2 -level 3 -limit 200 -showtile -densityControl 400 -lowresimage -strokefix 2 -color "#000000" [PATH_TO_DATA]\coastl_jpn.shp [PATH_TO_DATA]\coastl\coastl_jpn.svg```
- ```Shape2ImageSVGMap [PATH_TO_DATA]\coastl\coastl_jpn.svg -sumUp 16 -antiAlias [PATH_TO_DATA]\coastl_jpn.shp "#000000" "#000000" 0 2```
- ```Shape2SVGMap.bat -micrometa2 -level 3 -limit 200 -showtile -densityControl 400 -lowresimage -strokefix 2 -color "#00ff00" [PATH_TO_DATA]\roadl_jpn.shp -[PATH_TO_DATA]\roadl\roadl_jpn.svg```
- ```Shape2ImageSVGMap [PATH_TO_DATA]\roadl\roadl_jpn.svg -sumUp 16 -antiAlias [PATH_TO_DATA]\roadl_jpn.shp "#00ff00" "#00ff00" 0 2```
- ```Shape2SVGMap.bat -micrometa2 -level 3 -limit 200 -strokefix 2 -color "#ff0000" [PATH_TO_DATA]\builtupa_jpn.shp [PATH_TO_DATA]\builtup\builtupa_jpn.svg```
- ```Shape2SVGMap.bat -micrometa2 -level 3 -limit 200 -strokefix 2 -color "#ff0000" [PATH_TO_DATA]\builtupp_jpn.shp [PATH_TO_DATA]\builtup\builtupp_jpn.svg```
- ```[PATH_TO_DATA]\coastl, [PATH_TO_DATA]\roadl, [PATH_TO_DATA]\builtupの内容を、全てホストに転送```

Note:

- [PATH_TO_TOOLS]はsvgMapToolsのtoolsディレクトリ
- [PATH_TO_DATA]はダウンロードしたデータを解凍したディレクトリ
- builtupp_jpnおよびbuiltupa_jpnは、データサイズが大きくないので、小縮尺用のビットイメージタイルを生成していません。（タイリングも実際には不要です）

### tutorial3b.html {#tutorial3b-html}

基本的に、[Tutorial 2b](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b) で使用した [tutorial2b.html](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#tutorial2b.html)と同様です。

### Container.svg {#container-svg}

- [チュートリアル2b](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b)の[Container.svg](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB2b#Container.svg)と基本的に違いはありません。 
- ただし、今回は海岸線レイヤー、道路レイヤー、市街地(面・点)レイヤーとも、タイリングされたデータになっています。
- 各レイヤーを表す**animation要素**の参照先は、svgMapToolsで生成されたタイリングされたSVGMapコンテンツのルートのファイルになります。
- ベクトルデータをクリッカブルにするために、**class**属性に、**clickable**を加えています。
- 加えて、OpenStreetMapも非表示状態のレイヤーとして一番下に追加してあります。

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- 背景地図 OpenStreetMap (非表示状態)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="hidden"/>

<!-- 地球地図日本 海岸線-->
<animation xlink:href="coastl/coastl_jpn.svg" x="-3000" y="-3000" width="6000" height="6000" title="海岸線" class="地球地図日本 clickable" visibility="visible"/>

<!-- 地球地図日本 道路線-->
<animation xlink:href="roadl/roadl_jpn.svg" x="-3000" y="-3000" width="6000" height="6000" title="道路" class="地球地図日本 clickable" visibility="visible"/>

<!-- 地球地図日本 市街地(面)-->
<animation xlink:href="builtup/builtupa_jpn.svg" x="-3000" y="-3000" width="6000" height="6000" title="市街地(面)" class="地球地図日本 clickable" visibility="visible"/>

<!-- 地球地図日本 市街地(点)-->
<animation xlink:href="builtup/builtupp_jpn.svg" x="-3000" y="-3000" width="6000" height="6000" title="市街地(点)" class="地球地図日本 clickable" visibility="visible"/>
</svg>
```
### svgMapToolsが生成するタイリングされたコンテンツの構造 {#structure-of-tiled-content}

- レイヤーのルートとなるコンテンツ(この例では海岸線データで、coastl_jpn.svg)から、階層的に全てのベクトルデータ(.svg形式～大縮尺表示用)とラスターデータ(.png形式～小縮尺表示用)が参照されています。
- .svg形式のデータのうち、ファイル名が*cont*のものはベクトルグラフィックスデータはなく参照データだけとなっており、子・孫のコンテンツが参照されています。

```plaintext
coastl_jpn.svg
 |
 +-coastl_jpn/lvl3/tile1_0.png
 +-coastl_jpn/lvl3/tile0_1.png
 +-coastl_jpn/lvl3/tile1_1.png
 |
 +-coastl_jpn/lvl4/tile1_2.png
 +-coastl_jpn/lvl4/tile2_2.png
 +-coastl_jpn/lvl4/tile2_3.png
 |
 +-coastl_jpn_l1_2-3.svg
 |
 +-coastl_jpn_cont_l1_1-2.svg
 | |
 | +-coastl_jpn/lvl5/tile3_4.png
 |+-*.png ...
 |+-coastl_jpn_l2_2-5.svg
 |+-*.svg ...
 | +-coastl_jpn_cont_l4_14-20.svg
 | |
 |+-*.png ...
 |+-*.svg ...
 |
 +-coastl_jpn_cont_l1_2-2.svg
    |
    +-*.png ...
    +-*.svg ...
```


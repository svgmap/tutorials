# チュートリアル2c OpenStreetMapとPOI(空港)表示　(レイヤリング)

## はじめに  {#introduction}

チュートリアル2bの内容に対して、背景地図にOpenStreetMapを使用し、より実用的なページを作ってみます。実際の動作は [こちら](https://svgmap.org/examples/tutorials/tutorial2c/tutorial2c.html) をクリック。 このチュートリアルはチュートリアル2bと同じですが、背景地図としてOpenStreetMap.svgを使用する点が異なります。

### ファイル構造 {#file-structure}

ファイル構造は以下の通りです：

- tutorial2cディレクトリには以下のファイルが含まれています。
  - [tutorial2c.html](https://www.svgmap.org/examples/tutorials/tutorial2c/tutorial2c.html)
- Container.svgで参照している背景地図を、Coastline.svgからdynamicOSM_r11.svgに置き換えています。
  - dynamicOSM_r11.svgはjavascriptコードが紐付けられた動的なコンテンツ(WebAppLayer)になっています。本章ではその内容は割愛し、実用的なレイヤリングを実践してみます。
    - Note: 動的なコンテンツの詳細は[WebApp Layer編](../../2-webapp-layer-edition/index.md)で解説されています。

## チュートリアル {#tutorial}

### 使用ファイル {#files-used}

- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/tutorial2c.zip)

### コンテンツの構造 {#content-structure}

```plaintext
tutorial2b.html
 |
 +-img/zoomup.png, img/zoomdown.png, img/gps.png, img/Xcursor.png (images of map operation UI)
 |
 +-js/SVGMapLv0.1_r17.js, js/SVGMapLv0.1_LayerUI2_r4.js (Javascript library for displaying SVGMap)
   |
   +-Container.svg (An SVG file that holds various data (layers))
     |
     +-dynamicOSM_r11.svg (OpenStreetMap layer)
     | |
     | + dynamicOSM_r11.html (WebApp that dynamically generates OpenStreetMap layers)
     |
     +-Airport.svg (actual map layer content (airport points))
```
### tutorial2c.html {#tutorial2c-html}

[Tutorial 2Bチュートリアル2b](../tutorial-2b/index.md#tutorial2bhtml-tutorial2b-html)と同じ内容です

### layerListStyle.css {#layerlistsyle-css}

This is the same as [Tutorial 2B](../tutorial-2b/index.md#tutorial2bhtml-tutorial2b-html)

### Container.svg {#container-svg}

- 表示する２つのレイヤ用のSVGファイルを[レイヤーとして](../tutorial-1/index.md#レイヤリング-layering)読み込む
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

<!-- Background map OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load the SVG file of Japanese airport data as the display state -->
<animation xlink:href="Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Air Port" class="poi" visibility="visible"/>
</svg>
```

### dynamicOSM_r11.svg、 (dynamicOSM_r11.html) {#dynamicosm_r11-svg}

- Coastline.svgに代えてデフォルトで表示されるOpenStreetMapの背景地図レイヤーです
- このコンテンツは、単なるSVGコンテンツではなく、javascriptで動的にコンテンツが生成されるWebAppLayerとなっています。
  - dynamicOSM_r11.htmlは、そのjavascriptが入っているWebAppコンテンツで、 dynamicOSM_r11.svgからリンクされています。
  - WebAppLayerについては[チュートリアル:WebAppLayer編](../../2-webapp-layer-edition/index.md) で詳しく説明します。ここではCoastline.svgからこれに代えるだけで、拡大すると詳細な地図が表示される、実用的な背景地図のレイヤーを簡単に利用することができたと考えていただくだけで大丈夫です。

### Airport.svg {#airport-svg}

[チュートリアル2b](../tutorial-2b/index.md#tutorial2bhtml-tutorial2b-html)と同じ内容です。

## 追加：背景地図を選べるようにする {#added}

前章ではCoastline.svgの代わりにdynamicOSM_r11.svgを置き換えましたが、レイヤー機能を用いればユーザ側でUIから複数ある背景地図を選ぶことができます。

また、同じ方法で、上乗せ情報を複数設置し、切り替えて利用できるようにすることもできます。
  
- 実際の動作は[こちら](http://svg2.mbsrv.net/examples/tutorials/tutorial2c/tutorial2c_add.html)をクリック。
  - 画面左上のレイヤーリストUIをクリックすると、2個の背景地図が選べるようになっています。
- 使用ファイルは[こちら](https://svg2.mbsrv.net/examples/tutorials/tutorial2c/)

異なるのはContainer.svgの内容になります。

### tutorial2c_add.html {#tutorial2c_add-html}

リンク先のコンテナsvgが、Container_add.svgになっていることを除き、[前章のhtml](../tutorial-2c/index.md#tutorial2chtml-tutorial2c-html)と同じです。

### Container_add.svg {#container_add-svg}

**animation** 要素がポイントです。（他に差異はありません）

- 背景地図用のコンテンツのための**animation**要素を複数設定する
- **title**属性を背景地図ごとに異なる名前にする
- **Class** 属性
  - 背景地図に共通のクラス名を設定しておく
    - クラス名で指定した名前がレイヤーリストUIに現れるグループの名前になります。
  - さらに、UIでどちらかの背景地図だけが選ばれるようにクラス名にswitchも追加する。(同時に両方とも表示できるようにしたい場合はswitchを追加しない)
    - ```class="basemap switch"```
- デフォルトで表示状態にしたい背景地図以外は```visibility="hidden"```を設定する

#### ソースコード {#source-code}

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="122.9800817, -45.398095, 21.97626, 21.0533039" >
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />

<!-- Background map 1 Japan coastline data (hidden) -->
<animation xlink:href="Coastline.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Coastline" class="basemap switch" visibility="hidden"/>
<!-- Background map 2 OpenStreetMap (display state)-->
<animation xlink:href="dynamicOSM_r11.svg" x="-3000" y="-3000" width="6000" height="6000" title="OpenStreetMap" class="basemap switch" visibility="visible"/>

<!-- Load the SVG file of Japanese airport data as the display state -->
<animation xlink:href="Airport.svg" x="-3000" y="-3000" width="6000" height="6000" title="Japan Air Port" class="poi" visibility="visible"/>
</svg>
```

### Coastline.svg {#coastline-svg}

[チュートリアル2b](../tutorial-2b/index.md#tutorial2bhtml-tutorial2b-html)と同じ内容です。
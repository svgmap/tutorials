# チュートリアル12 WMSの利用

## はじめに  {#introduction}

指定したパラーメータに従ってビットイメージの地図データを出力するウェブサービス仕様 [Web Map Service (WMS)](https://ja.wikipedia.org/wiki/Web_Map_Service) のサービスをSVGMapのレイヤーとして表示させてみます。

[GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/) ( [海底を含む全球地形図](https://ja.wikipedia.org/wiki/%E5%A4%A7%E6%B4%8B%E6%B0%B4%E6%B7%B1%E7%B7%8F%E5%9B%B3) )を使ってみます。

まずは伸縮スクロールとは関係なく、地図コンテンツを単に表示させてみます。これは [チュートリアル4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4)と行っていることは基本的に同じです。WMSのスペックに従ってURLのクエリパートを設定するだけです。

- 実際の動作は、 [wms1.html](https://svgmap.org/examples/tutorials/wms1/wms1.html) をクリック。
  - Note: WMSが地図を生成配信するまでに少々時間がかかります）

## ソースコードディレクトリ {#source-code-directory}

- [ソースコードのディレクトリ](https://svgmap.org/examples/tutorials/wms1/)
- WMSのパラメータとSVGMapコンテンツのビットイメージ配置のパラメータの関係を理解します
- image要素によって、WMSから取得したデータを配置します

## チュートリアル {#tutorial}

指定した領域の地図データを動的に生成する仕様 [WMS(Web Map Service)](https://en.wikipedia.org/wiki/Web_Map_Service)に基づいて地図データを配信する [GEBCO Web Service](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/) と接続し、地図データを表示する最も基本的な方法を説明します。

クライアント側では特にjavascript等による動的なコードの実装なしに、単に静的なビットイメージを表示するだけのものです。したがって[チュートリアル4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4)との違いはほぼありません。

- 実際の動作は、[こちら](https://svgmap.org/examples/tutorials/wms1/wms1.html) をクリック。
- 使用ファイルの[ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/wms1.zip)

### [wms1.html](https://svgmap.org/examples/tutorials/wms1/wms1.html) {#wms1-html}

これまでと特に変わったところはありません。

### [Container.svg](https://svgmap.org/examples/tutorials/wms1/Container.svg) {#container-svg}

これまでと特に変わったところはありません。

### [wms_static.svg](https://svgmap.org/examples/tutorials/wms1/wms_static.svg) {#wms-static-svg}

image要素を使って、ビットイメージをSVGMapコンテンツに配置しているのは[チュートリアル4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4)と同じです。

[チュートリアル4](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB4)では画像の領域情報とimage要素のパラメータの関係の説明が簡素でしたが、こちらではWMSのクエリパラメータとの関係を合わせ詳細に説明します。

#### WMSのクエリパラメータ

WMSの詳細は [仕様書を参照](https://www.ogc.org/standards/wms) してください。ここでは要点を述べます。

- 決め打ちパラメータ　以下は地図のビットイメージを取得する際に基本的に常時変わらないパラメータです。
  - ```request=GetMap```
  - ```service=WMS```
  - ```version=1.1.1```
  - ```format=image/png``` データ形式はPNGが概ね常時適します。（ロスレス・透明ピクセル（データの無い場所など））
- ```layers=GEBCO_LATEST``` GEBCO WMSにどのようなレイヤーがあるかは、 [GEBCOのgetcapabilities](https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getcapabilities&service=wms&version=1.1.1)で確認できます。
- ```srs=EPSG:4326``` 空間参照系(地理座標系と図法を一体にした概念)を[EPSG:4326](https://spatialreference.org/ref/epsg/wgs-84/)(WGS84座標系)に指定しています。
  - WGS84座標系（X:経度,Y:緯度の世界測地系）のデータを、その座標系にリニアな平面(すなわち[正距円筒図法](https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%B7%9D%E5%86%86%E7%AD%92%E5%9B%B3%E6%B3%95))に図化します。
- ```bbox=120,20,150,50``` 上で指定した座標系(経度緯度座標)で図化する領域を指定
  - X1, Y1, X2, Y2の並びで指定します。（対角２点の座標） 注：X,Y,Width,Heightではない
  - 経度120°,緯度20°　と150°,50°の対角線領域のデータをリクエストしています。
- ```width=600&height=600``` 図化するビットイメージのサイズ
  - 600 x 600 pxのサイズのPNG画像をリクエストしています。
  - WMSではアスペクト比は維持されず、bboxで指定した領域が指定したサイズにきっちり収まるように出力されるアスペクト比を変化させたビットイメージが出力されます。

#### image要素のプロパティ

SVGのimage要素でWMSで取得したビットイメージを配置します。

globalCoordinateSystem要素の記述

```<globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)" />```

から、SVG座標(Xsvg, Ysvg)と地理座標(WGS84系:Xgeo(経度), Ygeo(緯度))との関係式は以下であることがわかります。

```
Xsvg = 1 * Xgeo + 0 * Ygeo + 0 ⇒ Xsvg = Xgeo
Ysvg = 0 * Xgeo - 1 * Ygeo + 0 ⇒ Ysvg = -Ygeo
```

要注意はY軸です。軸が反転していること（コンピュータグラフィックスのY軸は下向きなのに対して、通常のY軸は上向き）です。 これに伴ってグラフィックスをSVGの座標に配置するときに、原点の位置も反対側になります。（地理座標上では南端が原点ですが、SVGの座標では北端が原点）

以上に留意して、image要素のプロパティを見ていきます。

- ```xlink:href="[WMSクエリパラメータが設定されたGEVBCO WMSのURL]"```
- ```x="120"```  X軸の原点　＝　東端の経度（東端は120°）
- ```y="-50"``` Y軸の原点　＝　北端の緯度をマイナスにした値（北端は50°）
- ```width="30"```  X方向の幅 ＝　（西端-東端 = 150-120 = 30°）
- ```height="30"``` Y方向の高さ ＝　（北端-南端 = 50-20 = 30°）
- ```preserveAspectRatio="none"``` WMSのビットイメージ生成ポリシーに準じて、ビットイメージ配置時にアスペクトを維持しない。
- ```opacity="0.5"```  透明度を50%に設定して背景地図を少し見えるようにしている。

#### ソース

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120,-50,30,30">
 <globalCoordinateSystem srsName="http://purl.org/crs/84" transform="matrix(1,0,0,-1,0,0)"/>
 <image
   xlink:href="https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?
     request=GetMap&
     service=WMS&
     version=1.1.1&
     layers=GEBCO_LATEST&
     srs=EPSG%3A4326&
     bbox=120,20,150,50&
     width=600&
     height=600&
     format=image%2Fpng"
   x="120"
   y="-50"
   width="30"
   height="30"
   preserveAspectRatio="none"
   opacity="0.5"
 />
</svg>
```
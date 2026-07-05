# クロスオリジンアクセス

外部のウェブサービスを結合する場合、外部サービスによってはクロスオリジンアクセスとなることを理解し対処する必要があります。

ビットイメージの地図レイヤーに図法変換が必要な場合や、XMLHttpRequestやfetchなどでwebappのあるサイトと異なるドメインにあるウェブサービス(webapi)にアクセスする場合、 [クロスオリジンアクセス](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)制限によるエラーが起きる場合があります。このエラーはWebApp側だけでは解決できず、サーバ側の設定を調整する必要があります。

## 概要 {#overview}

SVGMapはハイパーレイヤリングアーキテクチャを持つため、 [ルートhtml文書](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) で構成されるクライアントのSVGMapフレームワークウェブアプリは、異なるオリジンのサーバにアクセスすることが基本的に必要になります。これは一般的に「 [クロスオリジンリソース共有](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS) (CORS)」と呼ばれる処理が行われる可能性があり、この時 [ウェブブラウザのネイティブな機能によるCORSのエラー](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS/Errors) が生じる可能性があることを意味します。

クロスオリジンアクセスのケースと、CORSのエラー発生の可能性を下表に示します。

**svgmapjsにおけるクロスオリジンアクセスによるエラー**
| クロスオリジンアクセスするコンテンツの種類 | コンテンツの処理 | CORSエラー発生の可能性 |
|---|---|---|
|ビットイメージ(タイルを含む)|重ね合わせ|発生しない|
|ビットイメージ(タイルを含む)|[非線形図法変換](../cross-origin-access/index.md)を伴う重ね合わせ|発生する可能性あり|
|ビットイメージ(タイルを含む)|地理空間情報処理等|発生する可能性あり|
|ベクトルデータやjson等ビットイメージ以外のデータ|重ね合わせ|発生する可能性あり|
|ベクトルデータやjson等ビットイメージ以外のデータ|地理空間情報処理等|発生する可能性あり|
|全ての種類のコンテンツ・データ|[Cesium拡張を用いた3D表示](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#svgMapCesiumWrapper..E3.81.A7.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.9B.E3.82.8BAPI)|発生する可能性あり|

## エラーの確認方法 {#how-to-check-errors}

ウェブブラウザでSVGMapのページを開き、開発ツールのコンソールもしくはネットワーク画面からエラーが確認できます。(blocked by CORS policyなどといったメッセージが出ます)

## サーバ(サービス側での対処): CORSレスポンスヘッダを返すように設定する {#server}

- Access-Control-Allow-Origin *(もしくは指定オリジン)のレスポンスヘッダを返すようにサーバを設定します。
    - [apacheの例](https://phaier.github.io/school/engineering/platform/server/apache/how-to/cors.html)
    - [etc](https://enable-cors.org/server.html)
- 外部からのアクセスを想定し 整備されたサービスでは、この設定がされており（例：地理院地図やgitHubPagesのサイト） 下記プロキシの利用は不要です。

## プロキシサービスを用意し　これを経由させる {#prepare-proxy}

- node.jsによる実装
    - [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) ( [セットアップノート](https://www.svgmap.org/wiki/index.php?title=CORS_Anywhere_setup_notes) )
- phpによる実装
    - [php-cross-domain-proxy](https://github.com/softius/php-cross-domain-proxy) (svgmap.orgの[fork](https://github.com/softius/php-cross-domain-proxy))
    - [単純なプロキシ実装例](https://www.svgmap.org/wiki/index.php?title=%E5%8D%98%E7%B4%94%E3%81%AA%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7%E5%AE%9F%E8%A3%85%E4%BE%8B)

#### プロキシ経由のクロスオリジンアクセスを容易にするためのSVGMap.jsの支援機能

プロキシ経由のクロスオリジンアクセスの対応を容易にするためのいくつかの機能がSVGMap.jsに備わっています。

SVGMap.jsがクロスオリジンアクセスを必要とするケースは主に3つあります。

1. ビットイメージ(含タイル)データの図法変換
2. ラスターGIS
3. webAppレイヤーでの独自の通信

(1) と (2) はSVGMap.jsの管理下でクロスオリジンアクセスを行う必要があるもので、SVGMap.jsの初期化時にクロスオリジンアクセスのための設定（クロスオリジンアクセスのためのプロキシの設定）を行うAPIが用意されています。

- [解説書#プロキシの設定](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.97.E3.83.AD.E3.82.AD.E3.82.B7.E3.81.AE.E8.A8.AD.E5.AE.9A)
- [解説書#setProxyURLFactory](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setProxyURLFactory)
- [解説書#setImageProxy](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#setImageProxy)

これらのAPIを用いた [初期化の例は次章](../cross-origin-access/index.md)で説明します。

**WebApp Layerにおけるクロスオリジンアクセス**

一方、3.は各レイヤーのwebApp ( [webApp Layer](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) ) が、レイヤーのコンテンツを生成するためのデータ(例えばjson形式の独自データ)を取得するときに(fetchやXMLHttpRequest等を使い)クロスオリジンアクセスするケースで、厳密にはSVGMap.jsが関与しない処理です。このようなクロスオリジンアクセスに対するケアは、基本的に個々のレイヤーwebAppの開発者が行う必要があります。

しかしプロキシ経由のアクセスを行う場合、先の1.2.のケース用に使用するプロキシを全レイヤー共通のプロキシとしても利用する場合が考えられ、この時にはSVGMap.jsの初期化で設定したプロキシを共通の関数で呼び出せる関数が用意されています。

- [解説書#getCORSURL](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getCORSURL)

getCORSURLの使用法は [後の章で紹介](../cross-origin-access/index.md)します。

#### SVGMap.jsの初期化

- 先述の機能を用いて、容易にクロスオリジンアクセスを可能にするための[ルートHTML文書](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) の初期化手順を紹介します。corsProxy.jsは次章参照
    - ルートHTML文書の完全な実装例 : [GitHub](https://github.com/svgmap/svgMapDemo/blob/main/index.html)

```html
<!doctype html>
<html>
...
<script type="module">
import { CorsProxy } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js';
import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
window.svgMap=svgMap
var corsProxy = new CorsProxy();

// プロキシの設定
var proxyPath = "https://..url..of../simpleCORSproxy.php?file=";

corsProxy.setService(proxyPath, null, true, true); // 第4パラメータをtrueにするとアクセス先URLをエンコードする
window.corsProxy = corsProxy;
svgMap.setProxyURLFactory(null,null,null, corsProxy.getURLfunction(), true); // ビットイメージ非線形図法変換の時のみプロキシを使う
</script>
...
</html>
```

**corsProxyMoule.js**

初期化を容易に行うためのライブラリをご紹介します。 [gitHub](https://github.com/svgmap/svgmapjs/blob/main/CorsProxyModule.js)
- 初期化を容易に行うためのライブラリをご紹介します。
    - pxUrl : プロキシのURL
    - directURLls : [プロキシを使用しないURLのリスト]
    - useAnonProxy : anonymous属性を付与するかどうか
    - requireEncoding : プロキシサービスに渡すURLをURLエンコードするかどうか
- corsProxy.getURLfunction : プロキシ経由のURLを得るための関数を得る

#### webAppレイヤーでのクロスオリジンアクセス

[クロスオリジンアクセスのためのSVGMap.jsの初期化](../cross-origin-access/index.md) がなされた状態の [ルートHTML文書(SVGMapページ)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) に登録されている各レイヤーのwebAppsでは、 [getCORSURL API](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#getCORSURL)を使用することができます。

このAPIは、アクセスしたいサービスのURLに対して、共通で準備されたクロスオリジンアクセス用サーバを経由したアクセスを可能にするURLが得られる機能で、たとえば以下のように利用します。

```var dataResponse = await fetch( svgMap.getCORSURL( serviceURL ) );```

一方、もしクロスオリジンアクセスの初期化をしていない[ルートHTML文書(SVGMapページ)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.83.95.E3.83.AC.E3.83.BC.E3.83.A0.E3.83.AF.E3.83.BC.E3.82.AF.E3.81.AE.E5.91.BC.E3.81.B3.E5.87.BA.E3.81.97) では、各レイヤーのwebAppsが独自にクロスオリジンアクセスの解決を行う必要があります。例えば、クロスオリジンアクセス用のプロキシとして ```https://[myproxy.mydomain.com]/proxy/``` というプロキシが用意されており、 ```?targetURL=serviceURL``` というクエリパラメータでアクセス先のサービスにアクセスする場合は、以下のようになるでしょう。
```var dataResponse = await fetch( "https://[myproxy.mydomain.com]/proxy/?targetURL=" + serviceURL );```

#### 非線形図法変換

メルカトル図法と正距円筒図法の間の図法変換など、１次アフィン変換(matrix(a,b,c,d,e,f))では変換できない座標変換を伴うもの
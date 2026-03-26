# svgmapAppLayers GitHub Pagesの利用

## はじめに  {#introduction}

[svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) GitHubリポジトリは、 [GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/what-is-github-pages) のセットアップがなされています。そのためいくつかのレイヤーはGitHub Pagesで公開されたURLをリンクするだけで利用することができます。

実際の動作は、 [ghAppLayers_wpxy.html](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers_wpxy.html)をクリック。

[The svgmapAppLayers](https://github.com/svgmap/svgmapAppLayers) リポジトリは、SVGMap.jsで利用できる様々な機能やコンテンツ提供する [WebApp Layers](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0) を集めたものです。いずれもオープンソースとして公開されています。(ライセンスは [MPL2](https://www.mozilla.org/en-US/MPL/2.0/) ( [日本語参考訳](https://www.mozilla.jp/documents/mpl/2.0/) ) (SVGMap.jsと同じ))

また、このリポジトリは [GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/what-is-github-pages)としてセットアップされています。リポジトリのルートは  [https://svgmap.github.io/svgmapAppLayers/](https://svgmap.github.io/svgmapAppLayers/) です。

そこで、本章ではGitHub Pagesとして公開されたsvgmapAppLayersのレイヤーを直接参照して地図ページを構築してみたいと思います。

実際の動作は[こちら](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers_wpxy.html)をクリック (プロキシをセットアップしたもの)
使用ファイルの [ZIPアーカイブファイル](https://www.svgmap.org/examples/tutorials/ghAppLayers.zip).

### あらすじ {#synopsis}

- svgmapAppLayersのルートディレクトリのGitHub PagesのURLは、 [https://svgmap.github.io/svgmapAppLayers/](https://svgmap.github.io/svgmapAppLayers/)
- svgmapAppLayersに登録されているレイヤーの一覧は [Container.svgのソース](https://github.com/svgmap/svgmapAppLayers/blame/main/Container.svg)で確認
    - svgmapAppLayersのGitHub PagesのwebAppを直接参照できないレイヤーは data-cross-origin-restrictedアトリビュートが付いています
    - クロスオリジンアクセスプロキシの設定が必要なレイヤーは、data-cross-origin-proxy-requiredアトリビュートが付いています
    - [コンテナsvg生成支援webApp](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html)を使うと簡単にContainer.svgを生成できます
- 必要に応じてプロキシーを構築する

### 制限事項 {#restrictions}

- データのソースにクロスオリジンアクセスするレイヤーでは、プロキシーを用意する必要があるものがあります（本省後半で解説）
- いくつかのレイヤーはGitHub Pagesの直接参照では使えません（次章　クローンを作成して使用することで使用可能になります）

### 使えるレイヤーの一覧 {#list-of-available-layers}

- [こちらのページ](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html) を参照してください
    - このページは [https://github.com/svgmap/svgmapAppLayers/blob/main/Container.svg](https://github.com/svgmap/svgmapAppLayers/blob/main/Container.svg) をもとに生成されています。
- corsRestricted がtrueのレイヤーはGitHub Pagesの直接参照では使えません
- corsProxyRequired がtrueのレイヤーはプロキシーを用意する必要があります

## プロキシーが必要ないレイヤーだけを使ってみる {#try-using-only-the-layers-that-dont-require-proxies}

- プロキシーが不要なレイヤーだけを使うページを作成してみます。プロキシの設定がないので簡単です。
    - 完全に静的なホスティングで運用可能です。( ご自身で構築したGitHub Pagesで公開することも可能です）
- 実際の動作は [こちら](https://svgmap.org/examples/tutorials/ghAppLayers/ghAppLayers.html) をクリック

### コンテナ（Conainer.svg）の準備 {#preparing-container-svg}

- [こちらのページ](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html#withoutProxy) を表示
    - プロキシが必要なレイヤーはあらかじめチェックが外れています。(GitHub Pagesの直接参照ができないレイヤー含)
- 表示したいレイヤーにチェックして、Container.svgを保存する（もしくは表示する)ボタンを押すと、Container.svgを取得できます。直接参照するリンクが組み込まれたContainerが取得できます。

### 地図ページのhtml (ghAppLayers.html) {#html-for-map-page}

- これまでの章と特に内容に違いはありません。

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
<!-- viewport 表示領域を画面全体とする定義 -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- SVGMapのコアAPIの読み込み -->
<script type="module">
  import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
  window.svgMap=svgMap
</script>

<!-- レイヤーリストUIのスタイルシート読み込み -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- 地図SVGファイルを複数含むコンテナファイル(Container.svg)の読み込み -->
 <div id="mapcanvas" data-src="Conainer.svg"></div>
 <div id="gui">
<!-- ズームアップボタン -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- ズームダウンボタン -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPSボタン -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- 画面右上に表示するタイトル -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
<!-- 画面右下に表示する -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- 中央に表示される十字マーク -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- 画面左下に表示される十字マークの緯度・経度(タイトル) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- 画面左下に表示される十字マークの緯度・経度(実際の値の初期表示) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- レイヤーリストUIの表示 -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

## プロキシーが必要なレイヤーも使えるようにセットアップする {#set-up-so-that-layers-requiring-proxies-can-also-be-used}

- プロキシーが必要なレイヤーも使うページを作成してみます。
    - プロキシーサービスの準備が必要です(PHPでも運用は可能(本チュートリアルではPHPを使用した例を提示))
- 実際の動作は[こちら](https://svgmap.org/devinfo/devkddi/tutorials/ghAppLayers/ghAppLayers_wpxy.html)をクリック

### コンテナ（Container_wpxy.svg）の準備 {#preparing-the-container-wpxy-svg}

- [こちらのページ](https://svg2.mbsrv.net/examples/tutorials/ghAppLayers/containerGenerator.html)を表示
- プロキシが必要なレイヤーもチェックさています。(GitHub Pagesの直接参照ができないレイヤーはチェック外れています)
- 表示したいレイヤーにチェックして、Container_wpxy.svgを保存する(もしくは表示する)ボタンを押すと、Container.svgを取得できます。直接参照するリンクが組み込まれたContainerが取得できます。

### 地図ページのhtml (ghAppLayers_wpxy.html) {#the-html-file-for-the-map-page}

- 違いはProxyを使用できるようにSVGMap.jsをセットアップしている点です。詳しくは [こちらの情報](https://www.svgmap.org/wiki/index.php?title=%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9) を参照ください。
    - import `{ CorsProxy }` from [https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js'](https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js') ;でプロキシーを扱うライブラリを読み込み、
    - corsProxy.setServiceでセットアップし
        - (この例では同じディレクトリに設置したPHPによるプロキシ(./simpleCORSproxy.php)を指定)
    - svgMap.setProxyURLFactoryで、SVGMap.jsに組み込んでいます。
- 使用するコンテナsvgは"Container.svg"としています。

```html
<!DOCTYPE html>
<html>
<title>SVGMapLevel0.1-Rev14-Draft Tutorial4 BitmapImageSVG</title>
<!-- viewport 表示領域を画面全体とする定義 -->
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- SVGMapのコアAPIの読み込み -->
<script type="module">
import { CorsProxy } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/CorsProxyModule.js';
import { svgMap } from 'https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js';
window.svgMap=svgMap
var corsProxy = new CorsProxy();

// プロキシの設定
var proxyPath = new URL("./simpleCORSproxy.php",location.href).href + "?file=";

corsProxy.setService(proxyPath, null, true, true); // 第4パラメータをtrueにするとアクセス先URLをエンコードする
svgMap.setProxyURLFactory(null,null,null, corsProxy.getURLfunction(), true); // ビットイメージ非線形図法変換の時のみプロキシを使う
</script>


<!-- レイヤーリストUIのスタイルシート読み込み -->
<link href="./js/layerListStyle.css" rel="stylesheet" type="text/css">

<body bgcolor="#ffffff" style="overflow:hidden;" >
<!-- 地図SVGファイルを複数含むコンテナファイル(Container.svg)の読み込み -->
 <div id="mapcanvas" data-src="Container_wpxy.svg"></div>
 <div id="gui">
<!-- ズームアップボタン -->
  <img id="zoomupButton" style="left: 5px; top: 5px; position: absolute;" src="./img/zoomup.png" onclick="svgMap.zoomup()" width="20" height="20" />
<!-- ズームダウンボタン -->
  <img id="zoomdownButton" style="left: 5px; top: 25px; position: absolute;" src="./img/zoomdown.png" onclick="svgMap.zoomdown()" width="20" height="20" />
<!-- GPSボタン -->
  <img id="gpsButton" style="left: 5px; top: 45px; position: absolute;" src="./img/gps.png" onclick="svgMap.gps()" width="20" height="20" />
<!-- 画面右上に表示するタイトル -->
  <font color="blue" style="right: 5px; top: 5px; position: absolute;" >SVGMapLevel0.1 Rev14 Draft : Tutorial4 BitmapImageSVG</font>
<!-- 画面右下に表示する -->
  <font color="blue" style="right: 5px; bottom: 5px; position: absolute;" size="-2" >by SVGMap tech.</font>
<!-- 中央に表示される十字マーク -->
  <img id="centerSight" style="opacity:0.5" src="./img/Xcursor.png" width="15" height="15"/>
<!-- 画面左下に表示される十字マークの緯度・経度(タイトル) -->
  <font id="posCmt" size="-2" color="brown" style="left: 5px; bottom: 5px; position: absolute;">Lat,Lng:</font>
<!-- 画面左下に表示される十字マークの緯度・経度(実際の値の初期表示) -->
  <font id="centerPos" size="-2" color="brown" style="left: 50px; bottom: 5px; position: absolute;" >lat , lng</font>
<!-- レイヤーリストUIの表示 -->
  <div id="layerList" style="left :30px; top: 10px; width:300px;height:90%; position: absolute; "></div>
 </div>
</body>
</html>
```

### プロキシーの準備 {#preparing-a-proxy}

今回はPHPが使えるホスティング上でPHPによる簡易プロキシーを設定することにします

- // Set acceptable referer criteria　の行は、このhtmlのあるドメイン(svgmap.org)からのアクセスみに受け付ける簡単な制限を設定しています。
- 詳しくは [単純なプロキシ実装例](https://www.svgmap.org/wiki/index.php?title=%E5%8D%98%E7%B4%94%E3%81%AA%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7%E5%AE%9F%E8%A3%85%E4%BE%8B)を参照ください。

```php
<?php
function file_get_contents_curl($url) {
	$headers = array(
	    "HTTP/1.0",
	    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
// "Accept-Encoding:gzip ,deflate",
	    "Accept-Language:ja,en-us;q=0.7,en;q=0.3",
	    "Connection:keep-alive",
	    "User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0"
	    );
    // **/
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);       

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

if($_GET["file"]){
	
	$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
	// accept only referrer within this site
	header("Access-Control-Allow-Origin: " . "*"); // MUST SET for CORS
	if (preg_match("|^https?://svgmap\.org|", $referer) || preg_match("|^https?://www\.svgmap\.org|", $referer)) { // Set acceptable referer criteria
		if ( $_GET["type"]){
			header("Content-type: " . $_GET["type"]);
		else {
			if(strpos($_GET["file"],'png')){
				header("Content-type: image/png");
			else {
				header("Content-Type:image/jpeg;");
			}
		}
// echo file_get_contents_curl( urldecode($_GET["file"]), true);
		echo file_get_contents_curl( ($_GET["file"]), true);
	else {
		echo "ERR : referer : " . $referer;
	}
else {
	foreach (getallheaders() as $name => $value) {
		echo "$name: $value<br>";
	}
	foreach ($_GET as $key => $value) {
	echo "GET Key:".$key.", Value:".$value."<br>";
	}
	echo "referrer: ".$_SERVER['HTTP_REFERER'];
}
?>
```
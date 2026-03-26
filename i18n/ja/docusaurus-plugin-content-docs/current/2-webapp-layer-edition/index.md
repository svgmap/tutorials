# Part 2: WebApp Layer編

SVGMapでは、レイヤーとして 単純な静的SVGMapコンテンツだけでなく、レイヤーにウェブアプリケーションを紐付けることでレイヤーのSVGMapコンテンツ(のDOM)をjavaScriptコードで動的に制御・変更できる[WebApp Layer機構 (Layers as Web Apps : LaWA)](https://www.svgmap.org/wiki/index.php?title=%E8%A7%A3%E8%AA%AC%E6%9B%B8#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.A2.E3.83.97.E3.83.AA.E3.82.B1.E3.83.BC.E3.82.B7.E3.83.A7.E3.83.B3.E3.81.AB.E3.82.88.E3.82.8B.E5.8B.95.E7.9A.84.E3.81.AA.E5.9C.B0.E5.9B.B3.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.BC.E3.81.A8.E3.80.81.E3.81.9D.E3.81.AE.E3.83.8F.E3.82.A4.E3.83.91.E3.83.BC.E3.83.AC.E3.82.A4.E3.83.A4.E3.83.AA.E3.83.B3.E3.82.B0)を用いることができるという特徴があります。([Web Applicationとは](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A7%E3%83%96%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3))

この機構は他のレイヤーには基本的に影響を与えないため ([カプセル化](https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%97%E3%82%BB%E3%83%AB%E5%8C%96))、アプリケーションの[スパゲッティ化](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%91%E3%82%B2%E3%83%86%E3%82%A3%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0)を抑制できます。

WebApp Layer編はこの機能を使うWebAppをコーディングします。　ただし、サーバ側には基本編と同様に動的な仕組みの構築は不要です。(依然としてサーバには静的なコンテンツ・WebAppのファイル(htmlやjs)を設置するだけで、DBMSや動的な機構 ([ウェブサービス](https://ja.wikipedia.org/wiki/Web%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)) をサーバ上に構築しません。)

なお、SVGMap.jsはWMSやWFSのような動的に地図・地理情報を配信する仕組みやDBMSを用いた動的なサーバ([ウェブサービス](https://ja.wikipedia.org/wiki/Web%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)) を接続して動作させることも可能です。 [ウェブサービス結合編](https://www.svgmap.org/wiki/index.php?title=%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB#.E3.82.A6.E3.82.A7.E3.83.96.E3.82.B5.E3.83.BC.E3.83.93.E3.82.B9.E7.B5.90.E5.90.88.E7.B7.A8)を参照ください。


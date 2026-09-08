# MONITOR Game Development Archive

CRTポートフォリオとゲーム『Monitor』の開発記事を組み合わせたViteプロジェクトです。トップページ下部で記事を選ぶと、独立した記事ページへ移動します。

トップページのABOUT欄には「Webカメラを用いた身体連動型ゲーム企画書」の要約を掲載し、PROJECTS欄から原本PDFをダウンロードできます。

- `index.html`：HOME・PROJECTS・ABOUTと記事選択
- `articles.html`：5つの評価記事を切り替える固定ビューア

## ローカルで開く

Node.jsをインストールした状態で、このフォルダーをターミナルで開きます。

```powershell
npm install
npm run dev
```

表示された `http://127.0.0.1:5173/` をブラウザで開いてください。ポートが使用中の場合は、ターミナルに表示された別のURLを開きます。`index.html`のダブルクリックではなく、Viteの開発サーバー経由で表示してください。

## エフェクトの調整

動きと強さの設定は `src/main.js` 冒頭の `CRT_CONFIG`、レイヤーの見た目は `src/styles.css` にまとめています。

- 映像ノイズの強さ・FPS・内部解像度：`CRT_CONFIG`
- 走査線：`.crt-scanlines`
- 横方向のノイズ帯：`.crt-noise-band`
- 曲面ガラス：`.crt-glass`
- 四隅の暗さ：`.crt-vignette`
- ちらつき：`@keyframes screen-flicker`
- 記事画像：`src/main.js` の `ARTICLES` にある `image`
- 記事への直接リンク：`articles.html?article=0` ～ `articles.html?article=4`

記事のメディア割り当ては次のとおりです。

- No.1：`video/Video Project 1.mp4`
- No.2：`img_graphic/2026-09-09_042128.png`
- No.3：`video/Desktop 2026.09.09 - 07.53.09.02.mp4`
- No.4：`img_graphic` の7画像（サムネイルで切り替え）
- No.5：`img/2026-08-17_174403.png`

指定された `042248` という名前の画像はフォルダー内にないため、実在する最も近いファイル名の `042128` をNo.2に使用しています。No.1とNo.3の動画は、記事画面内の標準コントロールから再生・一時停止・音量・シークを操作できます。

各エフェクトレイヤーには `pointer-events: none` を設定しているため、下にあるボタン、リンク、文字選択、スクロールを妨げません。細粒ノイズはディスプレイの更新頻度を上限としてデスクトップ最大120fps、モバイルと`prefers-reduced-motion`では60fpsに自動調整されます。

## GitHub Pagesへ公開する

`.github/workflows/deploy-pages.yml` が、`main`または`master`ブランチへのpush時にビルドと公開を行います。GitHubの **Settings → Pages → Source** で **GitHub Actions** を選択してください。

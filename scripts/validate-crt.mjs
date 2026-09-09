import { existsSync, readFileSync } from "node:fs";

const homeHtml = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const articlesHtml = readFileSync(new URL("../articles.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const javascript = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
const viteConfig = readFileSync(new URL("../vite.config.js", import.meta.url), "utf8");
const combined = `${homeHtml}\n${articlesHtml}\n${css}\n${javascript}`;

const articleTitles = [
  "身体入力が生む緊張",
  "探索と危機がつながる構成",
  "迷わず遊べる操作と安定性",
  "暗闇を読める映像設計",
  "体験を一周できるプロトタイプ",
];

const checks = {
  "Three.js / WebGLレンダラーを使用していない": !/three|webglrenderer/i.test(combined),
  "トップと記事を別HTMLに分離している":
    /class="home-page"/.test(homeHtml) &&
    /class="articles-page"/.test(articlesHtml) &&
    /articles:\s*`\$\{projectRoot\}\/articles\.html`/.test(viteConfig),
  "GitHub PagesのサブパスでCSS・JS・画像を読み込める":
    [homeHtml, articlesHtml].every((html) => !/(?:href|src)="\/(?:src|assets)\//.test(html)) &&
    /href="\.\/src\/styles\.css"/.test(homeHtml) &&
    /src="\.\/src\/main\.js"/.test(homeHtml) &&
    /src="\.\/assets\/images\/hero\.png"/.test(homeHtml),
  "以前のトップページ構成を復元している":
    ["home", "projects", "about"].every((id) => homeHtml.includes(`id="${id}"`)) &&
    /hero\.png/.test(homeHtml) &&
    /project-plan-cover\.png/.test(homeHtml),
  "企画目的を含む企画書要約を掲載している":
    /PROJECT PLAN \/ SUMMARY/.test(homeHtml) &&
    /<dt>目的<\/dt>/.test(homeHtml) &&
    ["コンセプト", "処理構成", "プレイ体験", "完成目標"].every((label) => homeHtml.includes(`<dt>${label}</dt>`)),
  "企画書原本をダウンロードできる":
    /web-camera-body-linked-game-plan\.pdf/.test(homeHtml) &&
    /download="Webカメラを用いた身体連動型ゲーム企画書\.pdf"/.test(homeHtml) &&
    existsSync(new URL("../public/assets/documents/web-camera-body-linked-game-plan.pdf", import.meta.url)) &&
    existsSync(new URL("../assets/documents/web-camera-body-linked-game-plan.pdf", import.meta.url)),
  "トップページ下部から5記事を選べる":
    /id="evaluations"/.test(homeHtml) &&
    (homeHtml.match(/articles\.html\?article=/g) ?? []).length === 5,
  "Markdownの5評価項目を掲載している": articleTitles.every((title) => javascript.includes(title)),
  "記事選択UIがある":
    /id="article-tabs"[\s\S]*?role="tablist"/.test(articlesHtml) &&
    /role = "tab"/.test(javascript) &&
    /function showArticle\(/.test(javascript),
  "前後の記事を切り替えられる":
    /id="previous-article"/.test(articlesHtml) &&
    /id="next-article"/.test(articlesHtml) &&
    /ArrowLeft/.test(javascript) &&
    /ArrowRight/.test(javascript),
  "記事ページは縦長ではなく固定ビューアになっている":
    /html,[\s\S]*?body[\s\S]*?overflow:\s*hidden/.test(css) &&
    /\.crt-content[\s\S]*?overflow:\s*hidden/.test(css),
  "トップページから選択記事へ推移できる":
    /new URLSearchParams\(window\.location\.search\)/.test(javascript) &&
    /searchParams\.set\("article"/.test(javascript) &&
    /index\.html#evaluations/.test(articlesHtml),
  "画像と本文が6:4構成": /grid-template-columns:\s*minmax\(0, 3fr\) minmax\(0, 2fr\)/.test(css),
  "画像差し替え用スロットがある":
    /image:\s*""/.test(javascript) &&
    /imageHint/.test(javascript) &&
    /id="image-placeholder"/.test(articlesHtml) &&
    /16\s*:\s*9/.test(articlesHtml),
  "No.4へimg_graphicの7画像を組み込んでいる":
    (javascript.match(/new URL\("\.\.\/img_graphic\//g) ?? []).length >= 7 &&
    !/import\s+\w+\s+from\s+"\.\.\/img_graphic\//.test(javascript) &&
    /EVALUATION 04 \/ VISUALS[\s\S]*?images:\s*\[[\s\S]*?graphicPaletteRound/.test(javascript) &&
    /id="image-gallery"/.test(articlesHtml) &&
    /className = "image-gallery__button"/.test(javascript),
  "指定メディアをNo.1・2・3・5へ割り当てている":
    /Video Project 1\.mp4/.test(javascript) &&
    /Video Project 2\.mp4/.test(javascript) &&
    /2026-09-09_042128\.png/.test(javascript) &&
    /2026-08-17_174403\.png/.test(javascript) &&
    /EVALUATION 01[\s\S]*?video:\s*projectVideo1/.test(javascript) &&
    /EVALUATION 02[\s\S]*?image:\s*gameMenuImage/.test(javascript) &&
    /EVALUATION 03[\s\S]*?videos:\s*\[[\s\S]*?src:\s*projectVideo2/.test(javascript) &&
    /EVALUATION 05[\s\S]*?image:\s*completionImage/.test(javascript),
  "No.3にWebカメラ判定とゲームオーバー条件を明記している":
    /EVALUATION 03 \/ USABILITY[\s\S]*?Webカメラから取得した映像[\s\S]*?現実の身体を動かす[\s\S]*?ゲームオーバー/.test(
      javascript,
    ),
  "No.3でProject 2とProject 3の動画を切り替えられる":
    /Video Project 3\.mp4/.test(javascript) &&
    /EVALUATION 03 \/ USABILITY[\s\S]*?videos:\s*\[[\s\S]*?projectVideo2[\s\S]*?projectVideo3/.test(javascript) &&
    /id="video-gallery"/.test(articlesHtml) &&
    /function showArticleVideo\(/.test(javascript) &&
    /className = "video-gallery__button"/.test(javascript),
  "動画を操作可能なHTMLで表示する":
    /<video id="article-video"[\s\S]*?controls[\s\S]*?playsinline/.test(articlesHtml) &&
    /articleVideo\.src = selectedVideo\.src/.test(javascript) &&
    /articleVideo\.load\(\)/.test(javascript),
  "通常の静的サーバーでもメディアURLを解決できる":
    /new URL\("\.\.\/video\/Video Project 1\.mp4", import\.meta\.url\)\.href/.test(javascript) &&
    /new URL\("\.\.\/video\/Video Project 2\.mp4", import\.meta\.url\)\.href/.test(javascript),
  "No.4の全画像をサムネイルで切り替えられる":
    /function showGalleryImage\(/.test(javascript) &&
    /articleImages\.forEach\(\(image, imageIndex\)/.test(javascript) &&
    /aria-pressed/.test(javascript),
  "記事本文だけ必要時にスクロールできる": /\.article-body[\s\S]*?overflow-y:\s*auto/.test(css),
  "両ページに映像ノイズ用Canvasがある":
    /<canvas id="crt-noise"/.test(homeHtml) &&
    /<canvas id="crt-noise"/.test(articlesHtml),
  "連続生成するノイズ映像がある":
    /requestAnimationFrame\(renderNoise\)/.test(javascript) &&
    /putImageData\(noiseImage/.test(javascript),
  "Noiseを最大120fpsへ調整している": /noiseFPS:\s*120/.test(javascript) && /mobileNoiseFPS:\s*60/.test(javascript),
  "Noise生成を高速化している":
    /new Uint32Array\(noiseImage\.data\.buffer\)/.test(javascript) &&
    /seed \^= seed << 13/.test(javascript),
  "横走査線だけを表示している":
    /\.crt-scanlines[\s\S]*?repeating-linear-gradient\(to bottom/.test(css) &&
    !/crt-sweep|scan-sweep-pass/.test(combined),
  "全エフェクトが入力を遮らない":
    ["crt-noise", "crt-scanlines", "crt-noise-band", "crt-glass", "crt-vignette"].every(
      (className) => new RegExp(`\\.${className}[\\s\\S]*?pointer-events:\\s*none`).test(css),
    ),
  "CRT曲面と周辺減光がある":
    /\.crt-glass[\s\S]*?radial-gradient/.test(css) &&
    /\.crt-vignette[\s\S]*?radial-gradient/.test(css),
  "モバイル表示に対応": /@media \(max-width:\s*760px\)/.test(css),
  "動きを減らす設定に対応": /prefers-reduced-motion/.test(css),
};

let failed = false;
for (const [label, passed] of Object.entries(checks)) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${label}`);
  if (!passed) failed = true;
}

if (failed) throw new Error("CRT記事ビューアの検証に失敗しました。");
console.log("CRT article viewer validation passed.");

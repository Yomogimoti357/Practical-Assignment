// Viteと一般的な静的サーバーの両方で解決できる画像URLにします。
const graphicPaletteRound = new URL("../img_graphic/2026-08-17_174352.png", import.meta.url).href;
const graphicPaletteRoom = new URL("../img_graphic/2026-09-09_061347.png", import.meta.url).href;
const graphicPaletteCorridor = new URL("../img_graphic/2026-09-09_061401.png", import.meta.url).href;
const graphicRoomBefore = new URL("../img_graphic/2026-09-09_061741.png", import.meta.url).href;
const graphicRoomAfter = new URL("../img_graphic/2026-09-09_061754.png", import.meta.url).href;
const graphicCorridorAfter = new URL("../img_graphic/2026-09-09_061809.png", import.meta.url).href;
const graphicCorridorBefore = new URL("../img_graphic/2026-09-09_061818.png", import.meta.url).href;
const gameMenuImage = new URL("../img_graphic/2026-09-09_042128.png", import.meta.url).href;
const completionImage = new URL("../img/2026-08-17_174403.png", import.meta.url).href;
const projectVideo1 = new URL("../video/Video Project 1.mp4", import.meta.url).href;
const projectVideo2 = new URL("../video/Video Project 2.mp4", import.meta.url).href;

const CRT_CONFIG = Object.freeze({
  noiseFPS: 120,
  mobileNoiseFPS: 60,
  reducedMotionNoiseFPS: 60,
  noiseOpacity: 0.085,
  mobileNoiseOpacity: 0.07,
  noiseScale: 0.5,
  mobileNoiseScale: 0.32,
  noiseBaseBrightness: 128,
  noiseBrightnessVariation: 25,
  noiseAlpha: 255,
  noiseDensity: 0.65,
  scanlineOpacity: 0.08,
  noiseBandOpacity: 0.07,
  noiseBandHeight: 0.03,
  noiseBandSpeed: 1,
  flickerStrength: 0.01,
  rgbShiftStrength: 1,
  curvatureStrength: 0.28,
  bulgeStrength: 0.08,
  glassHighlight: 0.13,
  vignetteStrength: 0.78,
});

// 後から画像を入れる場合は、各記事の image に "/assets/images/ファイル名" を設定します。
const ARTICLES = Object.freeze([
  {
    kicker: "EVALUATION 01 / BODY INPUT",
    title: "身体入力が生む緊張",
    shortTitle: "身体入力",
    lead: "止まるのは、画面内のキャラクターだけではありません。",
    paragraphs: [
      "本作は、キーボードとマウスによる一人称操作に、Webカメラで検知したプレイヤー自身の動きを組み合わせたホラーゲームです。敵に発見されると警告とともに行動拘束状態へ入り、危機が過ぎるまで現実の身体も静止させる必要があります。",
      "カメラ映像はプレイ画面の中心に表示せず、判定結果だけをゲームへ反映しています。連続する画像の画素差から全体の明るさの変化を除き、しきい値を複数回超えた場合だけ動作として確定することで、一瞬のノイズによる誤判定を抑えました。",
      "判定対象を『動いたかどうか』に絞り、Unity標準のWebCamTextureで完結させています。人物・姿勢・顔の向きを認識する方式ではなく、WebGLでの安定性と実装規模のバランスを優先した設計です。",
    ],
    tags: ["Webカメラ入力", "動作量検知", "WebGL対応"],
    image: "",
    video: projectVideo1,
    videoLabel: "身体入力と危機対応を紹介するProject 1プレイ動画",
    imageAlt: "身体静止判定が発生しているゲーム画面",
    imageHint: "身体静止判定中のゲーム画面を配置",
  },
  {
    kicker: "EVALUATION 02 / GAME DESIGN",
    title: "探索と危機がつながる構成",
    shortTitle: "ゲーム構成",
    lead: "進行するほど、慣れた通路が危険な場所へ変わっていきます。",
    paragraphs: [
      "プレイヤーは夜間警備員として視界の限られた廃工場を探索し、三つのイベントを完了してスタート地点へ帰還します。CRTメニュー、停電と電話による導入、探索、帰還、エンディングまでを一本の流れとして構成しました。",
      "イベントを終えるたびに敵が追加され、最大十二体まで増加します。スポーン地点の間隔と上限を設けることで、敵同士の重なりや通路の詰まりを抑えつつ、進行に合わせて危険度が高まるよう調整しています。",
      "発見後は警告、暗転、モノクロ映像、心拍音、身体静止判定が連続し、探索から危機対応へ切り替わります。イベントの説明は短い表示に留め、周囲を観察して判断する余地を残しました。",
    ],
    tags: ["廃工場探索", "段階的な難度", "敵AI"],
    image: gameMenuImage,
    imageAlt: "廃工場を探索しているゲーム画面",
    imageHint: "廃工場の探索シーンを配置",
  },
  {
    kicker: "EVALUATION 03 / USABILITY",
    title: "迷わず遊べる操作と安定性",
    shortTitle: "操作・安定性",
    lead: "特殊な体験を支えるため、基本操作はできるだけ自然に整えました。",
    paragraphs: [
      "移動と視点操作は一般的な一人称ゲームの形式にまとめています。開始前には使用するカメラを選択でき、マウス感度と全体音量も設定して保存できます。カメラが未接続の場合も状態を案内し、ゲーム全体が停止しないよう処理を分離しました。",
      "足音は固定タイマーではなく実際の移動距離に応じて再生されます。カメラの上下動や慣性も移動量と足音の周期へ合わせ、壁へ押し続けている時や空中では不要な揺れが起きない構成です。",
      "動作検知は一定間隔で実行し、画像配列を再利用して負荷を抑えています。WebGL版では、開始からエンディングまでのシーン遷移、カメラ許可、複数環境での基本操作を確認しています。",
    ],
    tags: ["設定保存", "例外処理", "負荷対策"],
    image: "",
    video: projectVideo2,
    videoLabel: "操作性と安定性を紹介するProject 2プレイ動画",
    imageAlt: "カメラ選択と設定を行う画面",
    imageHint: "カメラ選択または設定画面を配置",
  },
  {
    kicker: "EVALUATION 04 / VISUALS",
    title: "暗闇を読める映像設計",
    shortTitle: "視覚表現",
    lead: "恐怖を残しながら、進むために必要な輪郭は失わないようにしました。",
    paragraphs: [
      "暗い室内と懐中電灯を扱うため、URP 17.3のLinear色空間とHDR中間バッファを基礎に、Forward+照明、アンビエントオクルージョン、標準ポストプロセスを段階的に処理しています。",
      "後段には画面を限定色へ置き換えるFullscreen Shaderを挿入し、現在は検証用の64色パレットで見え方を評価しています。パレット処理をRenderer Featureとして分離したことで、比較や元の描画への復帰も容易になりました。",
      "さらにRGBずれやノイズを加え、懐中電灯の角度とLight Cookieを調整しています。CRTメニューからゲームオーバーまで共通のレンズ歪みと粒状感を使い、場面が変わっても視覚表現が途切れないようにしました。",
    ],
    tags: ["URP / HDR", "64色検証", "VHS表現"],
    image: graphicRoomAfter,
    images: [
      { src: graphicRoomBefore, alt: "ポストプロセス適用前の廃工場作業室" },
      { src: graphicRoomAfter, alt: "ポストプロセスとRGBずれを適用した廃工場作業室" },
      { src: graphicCorridorBefore, alt: "ポストプロセス適用前の廃工場通路" },
      { src: graphicCorridorAfter, alt: "ポストプロセスとRGBずれを適用した廃工場通路" },
      { src: graphicPaletteRoom, alt: "限定色パレットを適用した廃工場作業室" },
      { src: graphicPaletteCorridor, alt: "限定色パレットを適用した廃工場通路" },
      { src: graphicPaletteRound, alt: "限定色パレットで表示した円形設備のある空間" },
    ],
    imageAlt: "限定色とCRT表現を適用したゲーム画面",
    imageHint: "限定色・CRT表現の比較画像を配置",
  },
  {
    kicker: "EVALUATION 05 / COMPLETION",
    title: "体験を一周できるプロトタイプ",
    shortTitle: "完成度",
    lead: "企画の核を、最初から最後まで確かめられる状態にまとめています。",
    paragraphs: [
      "スタートメニュー、設定、導入、探索、イベント進行、敵AI、身体入力、ゲームオーバー、エンディングまで、作品として一周できる基本機能を実装しています。映像や音、ライト、UIもゲーム状態に合わせて連動します。",
      "カメラ未接続時の案内、敵の生成上限、NavMesh上の移動範囲など、進行を止めやすい問題にも対処しました。現在は、企画した体験を検証できる完成プロトタイプ、または短い縦切り版として位置付けています。",
      "一方で、イベントや身体入力の選択肢、敵ごとの攻略差、探索による発見には改善の余地があります。次の段階では、身体の動かし方で結果が変わる選択、ルートごとの危険と報酬、環境から読み取れる物語を追加していきます。",
    ],
    tags: ["通しプレイ対応", "完成プロトタイプ", "今後の改善"],
    image: completionImage,
    imageAlt: "ゲームのエンディングまたは全体を示す画面",
    imageHint: "エンディングまたは代表シーンを配置",
  },
]);

const screen = document.querySelector("#crt-screen");
const articlePanel = document.querySelector("#article-panel");
const articleTitle = document.querySelector("#article-title");
const articleKicker = document.querySelector("#article-kicker");
const articleLead = document.querySelector("#article-lead");
const articleBody = document.querySelector("#article-body");
const articleTags = document.querySelector("#article-tags");
const articlePosition = document.querySelector("#article-position");
const articleImage = document.querySelector("#article-image");
const articleVideo = document.querySelector("#article-video");
const imagePlaceholder = document.querySelector("#image-placeholder");
const imageSlotNumber = document.querySelector("#image-slot-number");
const imageHint = document.querySelector("#image-hint");
const imageCaption = document.querySelector("#image-caption");
const articleVisual = document.querySelector(".article-visual");
const imageGallery = document.querySelector("#image-gallery");
const imageGalleryTabs = document.querySelector("#image-gallery-tabs");
const articleTabs = document.querySelector("#article-tabs");
const previousArticle = document.querySelector("#previous-article");
const nextArticle = document.querySelector("#next-article");
const homeContent = document.querySelector(".home-page #crt-content");
const noiseCanvas = document.querySelector("#crt-noise");
const noiseContext = noiseCanvas.getContext("2d", { alpha: true });
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const mobileScreen = window.matchMedia("(max-width: 760px)");

let activeArticleIndex = 0;
let activeImageIndex = 0;
let noiseImage = null;
let noisePixels = null;
let noiseSeed = (Date.now() ^ 0xa5a5a5a5) >>> 0;
let noiseFrameId = 0;
let noiseRunning = false;
let lastNoiseTime = 0;
let noiseFrameInterval = 1000 / CRT_CONFIG.noiseFPS;

function createArticleTabs() {
  const fragment = document.createDocumentFragment();

  ARTICLES.forEach((article, index) => {
    const button = document.createElement("button");
    const number = String(index + 1).padStart(2, "0");
    button.className = "article-tab";
    button.type = "button";
    button.role = "tab";
    button.id = `article-tab-${index}`;
    button.setAttribute("aria-controls", "article-panel");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.innerHTML = `<span class="article-tab__thumb" aria-hidden="true">${number}</span><span class="article-tab__copy"><small>FILE ${number}</small><strong>${article.shortTitle}</strong></span>`;
    button.addEventListener("click", () => showArticle(index));
    fragment.append(button);
  });

  articleTabs.append(fragment);
}

function showArticle(index, moveFocus = false) {
  activeArticleIndex = (index + ARTICLES.length) % ARTICLES.length;
  const article = ARTICLES[activeArticleIndex];
  const number = String(activeArticleIndex + 1).padStart(2, "0");
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("article", String(activeArticleIndex));
  window.history.replaceState(null, "", currentUrl);

  articleKicker.textContent = article.kicker;
  articleTitle.textContent = article.title;
  articleLead.textContent = article.lead;
  articlePosition.textContent = `${number} / ${String(ARTICLES.length).padStart(2, "0")}`;
  imageSlotNumber.textContent = `IMAGE ${number}`;
  imageHint.textContent = article.imageHint;

  articleBody.replaceChildren(...article.paragraphs.map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));

  articleTags.replaceChildren(...article.tags.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));

  const articleImages = article.images ?? (article.image ? [{ src: article.image, alt: article.imageAlt }] : []);
  activeImageIndex = 0;
  imageGalleryTabs?.replaceChildren();
  articleVideo.pause();
  articleVideo.hidden = true;
  articleVideo.removeAttribute("src");
  articleVideo.removeAttribute("aria-label");
  articleVisual.classList.remove("is-video");

  if (article.video) {
    articleImage.removeAttribute("src");
    articleImage.alt = "";
    articleImage.hidden = true;
    imagePlaceholder.hidden = true;
    imageGallery.hidden = true;
    articleVisual.classList.remove("has-gallery");
    articleVisual.classList.add("is-video");
    articleVideo.src = article.video;
    articleVideo.setAttribute("aria-label", article.videoLabel);
    articleVideo.hidden = false;
    articleVideo.load();
    imageCaption.textContent = article.videoLabel;
  } else if (articleImages.length > 0) {
    showGalleryImage(articleImages, 0);
    articleImage.hidden = false;
    imagePlaceholder.hidden = true;
    imageGallery.hidden = articleImages.length < 2;
    articleVisual.classList.toggle("has-gallery", articleImages.length > 1);

    if (articleImages.length > 1) {
      const galleryFragment = document.createDocumentFragment();
      articleImages.forEach((image, imageIndex) => {
        const button = document.createElement("button");
        button.className = "image-gallery__button";
        button.type = "button";
        button.setAttribute("aria-label", `画像 ${imageIndex + 1} を表示`);
        button.setAttribute("aria-pressed", String(imageIndex === 0));
        button.classList.toggle("is-active", imageIndex === 0);
        const thumbnail = document.createElement("img");
        thumbnail.src = image.src;
        thumbnail.alt = "";
        thumbnail.loading = "lazy";
        button.append(thumbnail);
        button.addEventListener("click", () => showGalleryImage(articleImages, imageIndex));
        galleryFragment.append(button);
      });
      imageGalleryTabs.append(galleryFragment);
    }
  } else {
    articleImage.removeAttribute("src");
    articleImage.alt = "";
    articleImage.hidden = true;
    imagePlaceholder.hidden = false;
    imageGallery.hidden = true;
    articleVisual.classList.remove("has-gallery");
    imageCaption.textContent = "SCREENSHOT PLACEHOLDER";
  }

  const tabs = Array.from(articleTabs.querySelectorAll(".article-tab"));
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === activeArticleIndex;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  articlePanel.setAttribute("aria-labelledby", `article-tab-${activeArticleIndex}`);
  articleBody.scrollTop = 0;
  tabs[activeArticleIndex]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  if (moveFocus) tabs[activeArticleIndex]?.focus();
}

function showGalleryImage(images, index) {
  activeImageIndex = (index + images.length) % images.length;
  const selectedImage = images[activeImageIndex];
  articleImage.src = selectedImage.src;
  articleImage.alt = selectedImage.alt;
  imageCaption.textContent = `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")} — ${selectedImage.alt}`;
  imageGalleryTabs?.querySelectorAll(".image-gallery__button").forEach((button, buttonIndex) => {
    const selected = buttonIndex === activeImageIndex;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

previousArticle?.addEventListener("click", () => showArticle(activeArticleIndex - 1));
nextArticle?.addEventListener("click", () => showArticle(activeArticleIndex + 1));
articleTabs?.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") showArticle(0, true);
  else if (event.key === "End") showArticle(ARTICLES.length - 1, true);
  else showArticle(activeArticleIndex + (event.key === "ArrowRight" ? 1 : -1), true);
});

function initializeHomeNavigation() {
  const sections = Array.from(homeContent.querySelectorAll(".screen-section"));
  const controls = Array.from(document.querySelectorAll("[data-target]"));
  const navButtons = Array.from(document.querySelectorAll(".crt-nav__button"));

  function setActiveNavigation(id) {
    navButtons.forEach((button) => {
      const selected = button.dataset.target === id;
      button.classList.toggle("is-active", selected);
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function scrollToSection(id, behavior = reducedMotion.matches ? "auto" : "smooth") {
    const target = document.getElementById(id);
    if (!target) return;
    homeContent.scrollTo({ top: target.offsetTop, behavior });
    setActiveNavigation(id);
  }

  controls.forEach((control) => {
    control.addEventListener("click", () => scrollToSection(control.dataset.target));
  });

  homeContent.addEventListener("scroll", () => {
    const marker = homeContent.scrollTop + homeContent.clientHeight * 0.42;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });
    setActiveNavigation(current?.id);
  }, { passive: true });

  const initialSection = window.location.hash.slice(1);
  if (initialSection) requestAnimationFrame(() => scrollToSection(initialSection, "auto"));
  else setActiveNavigation("home");
}

function applyCrtConfig() {
  const isMobile = mobileScreen.matches;
  const noiseFPS = reducedMotion.matches ? CRT_CONFIG.reducedMotionNoiseFPS : isMobile ? CRT_CONFIG.mobileNoiseFPS : CRT_CONFIG.noiseFPS;
  noiseFrameInterval = 1000 / noiseFPS;
  screen.style.setProperty("--crt-noise-opacity", isMobile ? CRT_CONFIG.mobileNoiseOpacity : CRT_CONFIG.noiseOpacity);
  screen.style.setProperty("--crt-scanline-opacity", CRT_CONFIG.scanlineOpacity);
  screen.style.setProperty("--crt-noise-band-opacity", CRT_CONFIG.noiseBandOpacity);
  screen.style.setProperty("--crt-noise-band-height", `${CRT_CONFIG.noiseBandHeight * 100}%`);
  screen.style.setProperty("--crt-noise-band-duration", `${9 / CRT_CONFIG.noiseBandSpeed}s`);
  screen.style.setProperty("--crt-flicker-low", 1 - CRT_CONFIG.flickerStrength);
  screen.style.setProperty("--crt-flicker-high", 1 + CRT_CONFIG.flickerStrength * 0.66);
  screen.style.setProperty("--crt-curvature", CRT_CONFIG.curvatureStrength);
  screen.style.setProperty("--crt-bulge-strength", CRT_CONFIG.bulgeStrength);
  screen.style.setProperty("--crt-glass-highlight", CRT_CONFIG.glassHighlight);
  screen.style.setProperty("--crt-vignette-strength", CRT_CONFIG.vignetteStrength);
  screen.style.setProperty("--crt-rgb-shift", `${isMobile ? 0 : CRT_CONFIG.rgbShiftStrength}px`);
}

screen.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || !finePointer.matches) return;
  const rect = screen.getBoundingClientRect();
  screen.style.setProperty("--glare-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
  screen.style.setProperty("--glare-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
}, { passive: true });

function resizeNoiseCanvas() {
  const rect = screen.getBoundingClientRect();
  const scale = mobileScreen.matches ? CRT_CONFIG.mobileNoiseScale : CRT_CONFIG.noiseScale;
  const width = Math.round(Math.min(640, Math.max(160, rect.width * scale)));
  const height = Math.round(Math.min(420, Math.max(110, rect.height * scale)));
  if (noiseCanvas.width === width && noiseCanvas.height === height) return;
  noiseCanvas.width = width;
  noiseCanvas.height = height;
  noiseImage = noiseContext.createImageData(width, height);
  noisePixels = new Uint32Array(noiseImage.data.buffer);
}

function drawNoiseFrame() {
  if (!noiseImage) resizeNoiseCanvas();
  const { width, height } = noiseImage;
  const visibilityThreshold = Math.round(CRT_CONFIG.noiseDensity * 0xffff);
  const variationScale = (CRT_CONFIG.noiseBrightnessVariation * 2) / 0xff;
  const packedAlpha = CRT_CONFIG.noiseAlpha << 24;
  let seed = noiseSeed;

  for (let y = 0; y < height; y += 1) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    const rowBias = (seed & 0x1f) === 0 ? ((seed >>> 24) / 0xff - 0.5) * 8 : 0;
    const rowStart = y * width;
    const rowEnd = rowStart + width;
    for (let index = rowStart; index < rowEnd; index += 1) {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      const sample = seed >>> 0;
      if ((sample & 0xffff) >= visibilityThreshold) {
        noisePixels[index] = 0;
        continue;
      }
      const value = Math.max(0, Math.min(255, Math.round(CRT_CONFIG.noiseBaseBrightness + ((sample >>> 16) - 0x7f) * variationScale + rowBias)));
      noisePixels[index] = packedAlpha | (value << 16) | (value << 8) | value;
    }
  }
  noiseSeed = seed >>> 0;
  noiseContext.putImageData(noiseImage, 0, 0);
}

function renderNoise(time) {
  const elapsed = time - lastNoiseTime;
  if (elapsed + 0.75 >= noiseFrameInterval) {
    drawNoiseFrame();
    lastNoiseTime = time - (elapsed % noiseFrameInterval);
  }
  if (noiseRunning) noiseFrameId = requestAnimationFrame(renderNoise);
}

function stopNoise() {
  noiseRunning = false;
  cancelAnimationFrame(noiseFrameId);
}

function startNoise() {
  stopNoise();
  applyCrtConfig();
  resizeNoiseCanvas();
  drawNoiseFrame();
  if (document.hidden) return;
  noiseRunning = true;
  lastNoiseTime = performance.now();
  noiseFrameId = requestAnimationFrame(renderNoise);
}

if (articleTabs) {
  createArticleTabs();
  const requestedArticle = Number.parseInt(new URLSearchParams(window.location.search).get("article"), 10);
  showArticle(Number.isInteger(requestedArticle) ? requestedArticle : 0);
} else if (homeContent) {
  initializeHomeNavigation();
}
new ResizeObserver(() => {
  resizeNoiseCanvas();
  drawNoiseFrame();
}).observe(screen);
document.addEventListener("visibilitychange", startNoise);
reducedMotion.addEventListener("change", startNoise);
mobileScreen.addEventListener("change", startNoise);
startNoise();

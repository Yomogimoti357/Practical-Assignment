const slides = [
  {
    src: "img/2026-08-17_174320.png",
    alt: "強い光を放つ施設中央の装置",
    caption: "隔離区画の中央で稼働を続ける、正体不明のエネルギーコア。",
  },
  {
    src: "img/2026-08-17_174352.png",
    alt: "非常灯だけが点灯する暗い通路",
    caption: "通信の途絶えた居住ブロック。光源の残量には限りがある。",
  },
  {
    src: "img/2026-08-17_174403.png",
    alt: "暗闇の中で目を覚ます破損した探索ロボット",
    caption: "施設内で発見された旧式探索ユニット。敵か、最後の味方か。",
  },
];

const mainImage = document.querySelector("#mainImage");
const mediaStage = document.querySelector("#mediaStage");
const mediaLabel = document.querySelector("#mediaLabel");
const thumbnails = [...document.querySelectorAll(".thumbnail")];
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
const expandButton = document.querySelector("#expandButton");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector("#lightboxClose");
const wishlistButton = document.querySelector("#wishlistButton");
const cartButton = document.querySelector("#cartButton");
const toast = document.querySelector("#toast");

let activeSlide = 2;
let toastTimer;
let isWishlisted = localStorage.getItem("echo-void-wishlist") === "true";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function showSlide(index) {
  const nextIndex = (index + slides.length) % slides.length;
  mediaStage.classList.add("is-changing");

  window.setTimeout(() => {
    activeSlide = nextIndex;
    const slide = slides[activeSlide];
    mainImage.src = slide.src;
    mainImage.alt = slide.alt;
    mediaLabel.textContent = `SCREENSHOT ${String(activeSlide + 1).padStart(2, "0")}`;

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const isActive = thumbnailIndex === activeSlide;
      thumbnail.classList.toggle("is-active", isActive);
      if (isActive) {
        thumbnail.setAttribute("aria-current", "true");
      } else {
        thumbnail.removeAttribute("aria-current");
      }
    });

    mediaStage.classList.remove("is-changing");
  }, 170);
}

function updateWishlist() {
  wishlistButton.setAttribute("aria-pressed", String(isWishlisted));
  wishlistButton.querySelector("span:first-child").textContent = isWishlisted ? "♥" : "♡";
  wishlistButton.querySelector("span:last-child").textContent = isWishlisted
    ? "リストに追加済み"
    : "ウィッシュリスト";
}

function toggleWishlist() {
  isWishlisted = !isWishlisted;
  localStorage.setItem("echo-void-wishlist", String(isWishlisted));
  updateWishlist();
  showToast(isWishlisted ? "ウィッシュリストに追加しました" : "ウィッシュリストから削除しました");
}

function openLightbox() {
  const slide = slides[activeSlide];
  lightboxImage.src = slide.src;
  lightboxImage.alt = slide.alt;
  lightboxCaption.textContent = slide.caption;
  lightbox.hidden = false;
  document.body.classList.add("is-locked");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("is-locked");
  expandButton.focus();
}

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => showSlide(Number(thumbnail.dataset.index)));
});

previousButton.addEventListener("click", () => showSlide(activeSlide - 1));
nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
expandButton.addEventListener("click", openLightbox);
lightboxClose.addEventListener("click", closeLightbox);
wishlistButton.addEventListener("click", toggleWishlist);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.hidden && event.key === "Escape") {
    closeLightbox();
    return;
  }

  if (lightbox.hidden && event.key === "ArrowLeft") showSlide(activeSlide - 1);
  if (lightbox.hidden && event.key === "ArrowRight") showSlide(activeSlide + 1);
});

cartButton.addEventListener("click", () => {
  cartButton.textContent = "カートに追加済み";
  cartButton.disabled = true;
  showToast("ECHO//VOIDをカートに追加しました");
});

updateWishlist();

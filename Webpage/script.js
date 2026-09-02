const ideas = [
  { category: "create", label: "CREATE", time: "10 MIN", text: "机の上にある3つの物だけで、静物画を撮ってみる。" },
  { category: "create", label: "CREATE", time: "15 MIN", text: "好きな曲のタイトルから、架空の本の表紙を描く。" },
  { category: "create", label: "CREATE", time: "5 MIN", text: "今日聞こえた音を、言葉を使わず線だけで表現する。" },
  { category: "create", label: "CREATE", time: "20 MIN", text: "冷蔵庫にある食材で、名前のないドリンクをつくる。" },
  { category: "reset", label: "RESET", time: "5 MIN", text: "窓を開けて、いちばん遠くに見えるものを眺める。" },
  { category: "reset", label: "RESET", time: "10 MIN", text: "スマホを置いて、温かい飲みものを最後まで味わう。" },
  { category: "reset", label: "RESET", time: "15 MIN", text: "小さな引き出しをひとつだけ、空っぽにして整える。" },
  { category: "reset", label: "RESET", time: "8 MIN", text: "照明を少し暗くして、好きな香りと深呼吸を楽しむ。" },
  { category: "explore", label: "EXPLORE", time: "20 MIN", text: "いつもの道で、好きな色を5つ集めて写真に残す。" },
  { category: "explore", label: "EXPLORE", time: "30 MIN", text: "行ったことのない近所の店で、小さなものをひとつ買う。" },
  { category: "explore", label: "EXPLORE", time: "15 MIN", text: "次の角では普段と反対に曲がり、知らない景色を探す。" },
  { category: "explore", label: "EXPLORE", time: "25 MIN", text: "カメラを持たずに散歩して、帰宅後に景色をひとつ描く。" },
];

const root = document.documentElement;
const themeButton = document.querySelector("#themeButton");
const themeIcon = themeButton.querySelector(".theme-icon");
const themeLabel = themeButton.querySelector(".theme-label");
const moodButtons = [...document.querySelectorAll(".mood-button")];
const generateButton = document.querySelector("#generateButton");
const saveButton = document.querySelector("#saveButton");
const ideaCard = document.querySelector("#ideaCard");
const ideaCategory = document.querySelector("#ideaCategory");
const ideaTime = document.querySelector("#ideaTime");
const ideaText = document.querySelector("#ideaText");
const toast = document.querySelector("#toast");

let activeCategory = "all";
let currentIdeaIndex = 8;
let toastTimer;
const savedIdeas = new Set(JSON.parse(localStorage.getItem("spark-saved") || "[]"));

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☾" : "☼";
  themeLabel.textContent = isDark ? "DARK" : "LIGHT";
  themeButton.setAttribute("aria-label", isDark ? "ライトモードに切り替える" : "ダークモードに切り替える");
  localStorage.setItem("spark-theme", theme);
}

function updateSaveButton() {
  const isSaved = savedIdeas.has(currentIdeaIndex);
  saveButton.setAttribute("aria-pressed", String(isSaved));
  saveButton.querySelector(".save-icon").textContent = isSaved ? "♥" : "♡";
  saveButton.querySelector(".save-label").textContent = isSaved ? "SAVED" : "SAVE";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function showIdea(index) {
  ideaCard.classList.add("is-changing");

  window.setTimeout(() => {
    const idea = ideas[index];
    currentIdeaIndex = index;
    ideaCategory.textContent = idea.label;
    ideaTime.textContent = idea.time;
    ideaText.textContent = idea.text;
    updateSaveButton();
    ideaCard.classList.remove("is-changing");
  }, 160);
}

function generateIdea() {
  const availableIndexes = ideas
    .map((idea, index) => ({ idea, index }))
    .filter(({ idea, index }) => {
      const matchesCategory = activeCategory === "all" || idea.category === activeCategory;
      return matchesCategory && index !== currentIdeaIndex;
    })
    .map(({ index }) => index);

  const nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  showIdea(nextIndex ?? currentIdeaIndex);
}

const savedTheme = localStorage.getItem("spark-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);
updateSaveButton();

themeButton.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    moodButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    generateIdea();
  });
});

generateButton.addEventListener("click", generateIdea);

saveButton.addEventListener("click", () => {
  if (savedIdeas.has(currentIdeaIndex)) {
    savedIdeas.delete(currentIdeaIndex);
    showToast("お気に入りから外しました");
  } else {
    savedIdeas.add(currentIdeaIndex);
    showToast("お気に入りに保存しました");
  }

  localStorage.setItem("spark-saved", JSON.stringify([...savedIdeas]));
  updateSaveButton();
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();

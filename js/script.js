const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const langBtn = document.getElementById("langBtn");

/* ================= MENU ================= */
menuBtn.onclick = () => {
  menu.classList.toggle("hidden");
};

/* ================= LANGUAGE CORE ================= */
function setLang(lang) {
  // Save
  localStorage.setItem("lang", lang);

  // Update HTML lang attribute (SEO + accessibility)
  document.documentElement.lang = lang;

  // Replace all language strings
  document.querySelectorAll(".lang").forEach(el => {
    const value = el.dataset[lang];
    if (value) el.textContent = value;
  });

  // Toggle button text (show opposite language)
  langBtn.textContent = lang === "ta" ? "English" : "தமிழ்";

  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));
}

/* ================= LANGUAGE BUTTON ================= */
langBtn.onclick = () => {
  const current = localStorage.getItem("lang") || "ta";
  setLang(current === "ta" ? "en" : "ta");
};

/* ================= INIT (FORCE TAMIL FIRST) ================= */
(function forceTamilFirstPaint() {
  const savedLang = localStorage.getItem("lang") || "ta";
  setLang(savedLang);
})();

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= FREE POPUP (once per session) ================= */
  if (!sessionStorage.getItem("freePopupShown")) {
    setTimeout(() => {
      document.getElementById("freePopup")?.classList.remove("hidden");
      sessionStorage.setItem("freePopupShown", "yes");
    }, 900);
  }

});

/* ================= POPUP CLOSE ================= */
function closePopup() {
  document.getElementById("freePopup")?.classList.add("hidden");
}

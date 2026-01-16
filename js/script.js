const langBtn = document.getElementById("langBtn");

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
  if (langBtn) {
    langBtn.textContent = lang === "ta" ? "English" : "தமிழ்";
  }

  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));
}

/* ================= LANGUAGE BUTTON ================= */
if (langBtn) {
  langBtn.onclick = () => {
    const current = localStorage.getItem("lang") || "ta";
    setLang(current === "ta" ? "en" : "ta");
  };
}

/* ================= INIT (FORCE TAMIL FIRST) ================= */
(function forceTamilFirstPaint() {
  const savedLang = localStorage.getItem("lang") || "ta";
  setLang(savedLang);
})();

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= FREE POPUP (once per session) ================= */
  // Using Bootstrap Modal API
  const popupElement = document.getElementById("freePopup");

  if (popupElement && !sessionStorage.getItem("freePopupShown")) {
    // Check if bootstrap is available
    if (typeof bootstrap !== 'undefined') {
      const myModal = new bootstrap.Modal(popupElement);
      setTimeout(() => {
        myModal.show();
        sessionStorage.setItem("freePopupShown", "yes");
      }, 2000); // 2 seconds delay
    }
  }

});

/* ================= LANGUAGE & UI CORE ================= */
const langBtn = document.getElementById("langBtn");
const langToggle = document.getElementById("langToggle");

function updateLanguageToggleUI(lang) {
  // Sync button if exists
  if (langBtn) {
    langBtn.textContent = lang === "ta" ? "English" : "தமிழ்";
  }

  const langBadge = document.getElementById("langBadge");
  if (langBadge) {
    langBadge.textContent = lang === "ta" ? "தமிழ்" : "EN";
  }

  // Sync Valampuri sliding or icon toggle if exists
  if (langToggle) {
    langToggle.setAttribute("data-lang", lang);
    langToggle.setAttribute("title", lang === "ta" ? "Switch to English / ஆங்கிலத்திற்கு மாற்றுக" : "தமிழுக்கு மாற்றுக / Switch to Tamil");
    if (lang === "ta") {
      langToggle.classList.add("ta-active");
      langToggle.querySelectorAll(".lang-opt").forEach(opt => {
        opt.classList.toggle("active", opt.dataset.lang === "ta");
      });
    } else {
      langToggle.classList.remove("ta-active");
      langToggle.querySelectorAll(".lang-opt").forEach(opt => {
        opt.classList.toggle("active", opt.dataset.lang === "en");
      });
    }
  }
}

function setLang(lang) {
  // Save preference
  localStorage.setItem("lang", lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Replace all language strings with data attributes
  document.querySelectorAll(".lang").forEach(el => {
    const value = el.dataset[lang];
    if (value) el.innerHTML = value;
  });

  // Update Toggle UI
  updateLanguageToggleUI(lang);

  // Dispatch custom event for page-specific listeners
  window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));
}

/* ================= EVENT HANDLERS ================= */
if (langBtn) {
  langBtn.onclick = () => {
    const current = localStorage.getItem("lang") || "ta";
    setLang(current === "ta" ? "en" : "ta");
  };
}

if (langToggle) {
  langToggle.onclick = (e) => {
    const opt = e.target.closest(".lang-opt");
    if (opt && opt.dataset.lang) {
      setLang(opt.dataset.lang);
    } else {
      const current = localStorage.getItem("lang") || "ta";
      setLang(current === "ta" ? "en" : "ta");
    }
  };
}

/* ================= LIVE TIME & AUSPICIOUS DATE TICKER ================= */
function updateLiveTicker() {
  const tickerEl = document.getElementById("liveTimeTicker");
  const snapDateBadge = document.getElementById("snapDateBadge");
  const snapThithi = document.getElementById("snapThithi");
  const snapPaksham = document.getElementById("snapPaksham");

  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeStr = now.toLocaleDateString('en-IN', options);

  if (tickerEl) {
    tickerEl.innerHTML = `<i class="fa-solid fa-clock me-1"></i> ${timeStr}`;
  }

  if (snapDateBadge) {
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    snapDateBadge.textContent = now.toLocaleDateString('en-IN', dateOptions);
  }

  // Populate basic auspicious day status if snap items exist
  if (snapThithi && snapThithi.textContent === "--") {
    const weekdaysEn = ["Sun (Surya)", "Mon (Chandra)", "Tue (Kuja)", "Wed (Budha)", "Thu (Guru)", "Fri (Shukra)", "Sat (Shani)"];
    const weekdaysTa = ["ஞாயிறு (சூரியன்)", "திங்கள் (சந்திரன்)", "செவ்வாய் (செவ்வாய்)", "புதன் (புதன்)", "வியாழன் (குரு)", "வெள்ளி (சுக்கிரன்)", "சனி (சனி)"];
    const isTa = (localStorage.getItem("lang") || "ta") === "ta";
    snapThithi.textContent = isTa ? weekdaysTa[now.getDay()] : weekdaysEn[now.getDay()];
  }
  if (snapPaksham && snapPaksham.textContent === "--") {
    snapPaksham.textContent = "Baskara Precision CIT Calculation";
  }
}

/* ================= INIT ================= */
(function initApp() {
  const savedLang = localStorage.getItem("lang") || "ta";
  setLang(savedLang);
  updateLiveTicker();
  setInterval(updateLiveTicker, 1000);
})();

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {
  // Application initialized
});
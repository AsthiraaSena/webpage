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

/* ================= 3. FLOATING BACK TO TOP BUTTON (FITTS'S LAW) ================= */
function initBackToTop() {
  let btt = document.getElementById("backToTop");
  if (!btt) {
    btt = document.createElement("button");
    btt.id = "backToTop";
    btt.className = "back-to-top";
    btt.setAttribute("aria-label", "Back to top / மேலே செல்க");
    btt.setAttribute("title", "Back to top");
    btt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btt);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btt.classList.add("visible");
    } else {
      btt.classList.remove("visible");
    }
  }, { passive: true });

  btt.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ================= 4. CONSULTATION MULTI-STEP PROGRESS TRACKER (ZEIGARNIK EFFECT) ================= */
function initFormStepTracker() {
  const form = document.getElementById("consultationForm");
  if (!form) return;

  const step1 = document.getElementById("stepItem1");
  const step2 = document.getElementById("stepItem2");
  const step3 = document.getElementById("stepItem3");
  const progressFill = document.getElementById("stepProgressFill");
  const percentText = document.getElementById("stepPercentText");

  function updateProgress() {
    const fullName = document.getElementById("fullName")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const dob = document.getElementById("dob")?.value;
    const birthTime = document.getElementById("birthTime")?.value;
    const birthPlace = document.getElementById("birthPlace")?.value.trim();
    const consultationType = document.getElementById("consultationType")?.value;

    const hasStep1 = !!(fullName && phone);
    const hasStep2 = !!(dob && birthTime && birthPlace);
    const hasStep3 = !!consultationType;

    let progress = 33;
    if (hasStep1 && !hasStep2) {
      progress = 50;
      if (step1) { step1.className = "step-item completed"; }
      if (step2) { step2.className = "step-item active"; }
      if (step3) { step3.className = "step-item"; }
    } else if (hasStep1 && hasStep2 && !hasStep3) {
      progress = 75;
      if (step1) { step1.className = "step-item completed"; }
      if (step2) { step2.className = "step-item completed"; }
      if (step3) { step3.className = "step-item active"; }
    } else if (hasStep1 && hasStep2 && hasStep3) {
      progress = 100;
      if (step1) { step1.className = "step-item completed"; }
      if (step2) { step2.className = "step-item completed"; }
      if (step3) { step3.className = "step-item completed"; }
    } else {
      if (step1) { step1.className = "step-item active"; }
      if (step2) { step2.className = "step-item"; }
      if (step3) { step3.className = "step-item"; }
    }

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}% Completed`;
  }

  form.addEventListener("input", updateProgress);
  form.addEventListener("change", updateProgress);
  updateProgress();
}

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {
  initBackToTop();
  initFormStepTracker();
});
document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const langBtn = document.getElementById("langBtn");

  /* ===== MENU TOGGLE ===== */
  if(menuBtn && menu){
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  /* ===== LANGUAGE TOGGLE (SAFE) ===== */
  let lang = "en";

  if(langBtn){
    langBtn.addEventListener("click", () => {
      lang = lang === "en" ? "ta" : "en";
      langBtn.textContent = lang === "en" ? "தமிழ்" : "English";
    });
  }

});

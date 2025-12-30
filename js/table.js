document.addEventListener("DOMContentLoaded", () => {

let currentLang = localStorage.getItem("lang") || "en";
let fullData = [];
let rowHeight = 38;
let visibleCount = 25;

const rasiMap = {
  en:["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
  ta:["மேஷ","ரிஷ","மிது","கட","சிம்","கன்","துலா","விரு","தனு","மக","கும்","மீன"]
};

const planetMap = {
  en:["Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"],
  ta:["கேது","சுக்","சூரி","சந்","செவ்","ராகு","குரு","சனி","புத"]
};

const tbody   = document.getElementById("tableBody");
const wrapper = document.querySelector(".table-wrap");
const search  = document.getElementById("searchBox");

function toDMS(deg){
  const d=Math.floor(deg);
  const m=Math.floor((deg-d)*60);
  const s=Math.round((((deg-d)*60)-m)*60);
  return `${d}° ${m}' ${s}"`;
}

/* ================= LOAD DATA ================= */

async function loadData(){

  const mode = document.querySelector("input[name='mode']:checked").value;
  const url  = mode === "sub" ? "data/sub.json" : "data/ssb.json";

  const res = await fetch(url);
  fullData  = await res.json();

  document.getElementById("ssbHead").style.display =
    mode === "ssb" ? "" : "none";

  wrapper.scrollTop = 0;     // 🔥 CRITICAL FIX
  render(0);                // 🔥 FORCE RENDER FROM TOP
}

/* ================= RENDER ================= */

function render(forceStart = null){

  const start =
    forceStart !== null
      ? forceStart
      : Math.floor(wrapper.scrollTop / rowHeight);

  const end = start + visibleCount;
  const filter = search.value.toLowerCase();
  const mode = document.querySelector("input[name='mode']:checked").value;

  const filtered = fullData.filter(r=>{
    return (
      rasiMap[currentLang][r.Raasi-1] +
      planetMap[currentLang][r.Star-1]
    ).toLowerCase().includes(filter);
  });

  tbody.innerHTML = "";
  tbody.style.paddingTop = (start * rowHeight) + "px";
  tbody.style.paddingBottom =
    Math.max(0, (filtered.length - end) * rowHeight) + "px";

  filtered.slice(start, end).forEach(r=>{
    tbody.insertAdjacentHTML("beforeend",`
      <tr style="height:${rowHeight}px">
        <td>${r["s.no"]}</td>
        <td>${toDMS(r["D.M.S"])}</td>
        <td>${rasiMap[currentLang][r.Raasi-1]}</td>
        <td>${planetMap[currentLang][r.Star-1]}</td>
        <td>${planetMap[currentLang][r.Sub-1]}</td>
        ${mode==="ssb"
          ? `<td>${planetMap[currentLang][r.Ssb-1]}</td>`
          : ""}
      </tr>
    `);
  });
}

/* ================= EVENTS ================= */

document.querySelectorAll("input[name='mode']").forEach(r=>{
  r.addEventListener("change", loadData);   // ✅ AUTO LOAD
});

search.addEventListener("input", ()=>render(0));
wrapper.addEventListener("scroll", ()=>render());

document.getElementById("langBtn").onclick = ()=>{
  currentLang = currentLang === "en" ? "ta" : "en";
  localStorage.setItem("lang", currentLang);
  render(0);
};

/* ================= INIT ================= */

loadData();

});

let currentLang = localStorage.getItem("lang") || "en";

/* ================= MAPS ================= */

const rasiMap = {
  en:["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
  ta:["மேஷம்","ரிஷபம்","மிதுனம்","கடகம்","சிம்மம்","கன்னி","துலாம்","விருச்சிகம்","தனுசு","மகரம்","கும்பம்","மீனம்"]
};

const planetMap = {
  en:["Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"],
  ta:["கேது","சுக்","சூரி","சந்","செவ்","ராகு","குரு","சனி","புத"]
};

/* ================= HELPERS ================= */

function toDMS(deg){
  deg = Number(deg) || 0;
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${m}' ${s}"`;
}

function safeIndex(arr, index){
  return arr[index] ?? "-";
}

/* ================= LOAD TABLE ================= */

async function loadTable(){

  const mode = document.querySelector("input[name='mode']:checked").value;
  const url = mode === "sub" ? "data/sub.json" : "data/ssb.json";

  const res = await fetch(url);
  const data = await res.json();

  const tbody = document.getElementById("tableBody");
  const head  = document.getElementById("lastHead");

  head.innerText =
    mode === "sub"
      ? (currentLang==="en" ? "Sub" : "சப்")
      : (currentLang==="en" ? "SSB" : "எஸ்.எஸ்.பி");

  tbody.innerHTML = "";

 data.forEach(r => {

  // ---- SAFE FIELD EXTRACTION ----
  const sno =
    r.sno ??
    r["s.no"] ??
    "";

  const degree =
    r.degree ??
    r["D.M.S"] ??
    0;

  const rasi =
    Number(r.rasi ?? r.Raasi) - 1;

  const star =
    Number(r.star ?? r.Star) - 1;

  let lastVal;

  if (mode === "sub") {
    lastVal = Number(r.sub ?? r.Sub);
  } else {
    lastVal = Number(r.ssb ?? r.SSB);
  }

  lastVal = isNaN(lastVal) || lastVal < 1 ? -1 : lastVal - 1;

  // ---- BUILD ROW ----
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${sno}</td>
    <td>${toDMS(degree)}</td>
    <td>${safeIndex(rasiMap[currentLang], rasi)}</td>
    <td>${safeIndex(planetMap[currentLang], star)}</td>
    <td>${safeIndex(planetMap[currentLang], lastVal)}</td>
  `;

  tbody.appendChild(tr);
});


/* ================= EVENTS ================= */

document.getElementById("loadBtn").onclick = loadTable;

document.getElementById("langBtn")?.addEventListener("click",()=>{
  currentLang = currentLang === "en" ? "ta" : "en";
  localStorage.setItem("lang", currentLang);
  loadTable();
});

/* ================= INIT ================= */
loadTable();

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
  const d=Math.floor(deg);
  const mFloat=(deg-d)*60;
  const m=Math.floor(mFloat);
  const s=Math.round((mFloat-m)*60);
  return `${d}° ${m}' ${s}"`;
}

/* ================= LOAD TABLE ================= */

async function loadTable(){

  const mode = document.querySelector("input[name='mode']:checked").value;
  const url = mode === "sub" ? "data/sub.json" : "data/ssb.json";

  const res = await fetch(url);
  const data = await res.json();

  const tbody = document.getElementById("tableBody");
  const head = document.getElementById("lastHead");

  head.innerText =
    mode === "sub"
      ? (currentLang==="en" ? "Sub" : "உப")
      : (currentLang==="en" ? "SSB" : "உஉப");

  tbody.innerHTML = "";

  data.forEach(r=>{
    const lastVal = mode === "sub" ? r.sub : r.ssb;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.sno}</td>
      <td>${toDMS(r.degree)}</td>
      <td>${rasiMap[currentLang][r.rasi-1]}</td>
      <td>${planetMap[currentLang][r.star-1]}</td>
      <td>${planetMap[currentLang][lastVal-1]}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ================= EVENTS ================= */

document.getElementById("loadBtn").onclick = loadTable;

document.getElementById("langBtn")?.addEventListener("click",()=>{
  currentLang = currentLang==="en" ? "ta" : "en";
  localStorage.setItem("lang",currentLang);
  loadTable();
});

/* ================= INIT ================= */
loadTable();

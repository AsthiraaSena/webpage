document.addEventListener("DOMContentLoaded", () => {

  let currentLang = localStorage.getItem("lang") || "en";

  /* ================= MAPS ================= */

  const rasiMap = {
    en:["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
    ta:["மேஷ","ரிஷ","மிது","கட","சிம்","கன்","துலா","விரு","தனு","மக","கும்","மீன"]
  };

  const planetMap = {
    en:["Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"],
    ta:["கேது","சுக்","சூரி","சந்","செவ்","ராகு","குரு","சனி","புத"]
  };

  /* ================= HELPERS ================= */

  function toDMS(deg){
    if (deg === undefined || isNaN(deg)) return "";
    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    const s = Math.round((((deg - d) * 60) - m) * 60);
    return `${d}° ${m}' ${s}"`;
  }

  function clearTable(){
    document.getElementById("tableBody").innerHTML = "";
  }

  /* ================= SUB TABLE ================= */

  async function loadSubTable(){

    const res = await fetch("data/sub.json");
    const data = await res.json();

    clearTable();

    document.getElementById("subHead").style.display = "";
    document.getElementById("ssbHead").style.display = "none";

    const tbody = document.getElementById("tableBody");

    data.forEach(r=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r["s.no"]}</td>
        <td>${toDMS(r["D.M.S"])}</td>
        <td>${rasiMap[currentLang][r["Rassi"]-1]}</td>
        <td>${planetMap[currentLang][r["Star"]-1]}</td>
        <td>${planetMap[currentLang][r["Sub"]-1]}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* ================= SSB TABLE ================= */

  async function loadSSBTable(){

    const res = await fetch("data/ssb.json");
    const data = await res.json();

    clearTable();

    document.getElementById("subHead").style.display = "";
    document.getElementById("ssbHead").style.display = "";

    const tbody = document.getElementById("tableBody");

    data.forEach(r=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r["s.no"]}</td>
        <td>${toDMS(r["D.M.S"])}</td>
        <td>${rasiMap[currentLang][r["Raasi"]-1]}</td>
        <td>${planetMap[currentLang][r["Star"]-1]}</td>
        <td>${planetMap[currentLang][r["sub"]-1]}</td>
        <td>${planetMap[currentLang][r["ssb"]-1]}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* ================= MAIN LOAD ================= */

  function loadTable(){
    const modeRadio = document.querySelector("input[name='mode']:checked");
    if(!modeRadio) return;

    if(modeRadio.value === "sub"){
      loadSubTable();
    }else{
      loadSSBTable();
    }
  }

  /* ================= EVENTS ================= */

  document.getElementById("loadBtn").addEventListener("click", loadTable);

  document.getElementById("langBtn")?.addEventListener("click",()=>{
    currentLang = currentLang === "en" ? "ta" : "en";
    localStorage.setItem("lang", currentLang);
    loadTable();
  });

  /* ================= INIT ================= */

  loadTable();

});

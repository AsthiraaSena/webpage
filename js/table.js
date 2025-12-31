document.addEventListener("DOMContentLoaded", function () {

  let currentLang = localStorage.getItem("lang") || "en";

  const rasiMap = {
    en: [
      "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
      "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
    ],
    ta: [
      "மேஷ","ரிஷ","மிது","கட","சிம்","கன்",
      "துலா","விரு","தனு","மக","கும்","மீன"
    ]
  };

  const planetMap = {
    en: ["Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"],
    ta: ["கேது","சுக்","சூரி","சந்","செவ்","ராகு","குரு","சனி","புத"]
  };

  const tableBody = document.getElementById("tableBody");
  const loadBtn   = document.getElementById("loadBtn");
  const ssbHead   = document.getElementById("ssbHead");
  const langBtn   = document.getElementById("langBtn");

  function toDMS(deg){
    let d = Math.floor(deg);
    let mFloat = (deg - d) * 60;
    let m = Math.floor(mFloat);
    let s = Math.round((mFloat - m) * 60);

    if (s === 60) { s = 0; m++; }
    if (m === 60) { m = 0; d++; }

    return `${d}° ${m.toString().padStart(2,"0")}' ${s.toString().padStart(2,"0")}"`;
  }

  function loadTable(){

    const mode = document.querySelector("input[name='mode']:checked").value;
    const url  = mode === "sub" ? "data/sub.json" : "data/ssb.json";

    loadBtn.classList.add("loading");
    loadBtn.textContent = "Loading";

    fetch(url)
      .then(res => res.json())
      .then(data => {

        tableBody.innerHTML = "";
        ssbHead.style.display = mode === "ssb" ? "" : "none";

        data.forEach(r => {

          let row = `
            <tr>
              <td>${r["s.no"]}</td>
              <td>${toDMS(r["D.M.S"])}</td>
              <td>${rasiMap[currentLang][r["Raasi"] - 1]}</td>
              <td>${planetMap[currentLang][r["Star"] - 1]}</td>
              <td>${planetMap[currentLang][r["Sub"] - 1]}</td>
          `;

          if (mode === "ssb") {
            row += `<td>${planetMap[currentLang][r["Ssb"] - 1]}</td>`;
          }

          row += `</tr>`;
          tableBody.insertAdjacentHTML("beforeend", row);
        });

      })
      .catch(err => {
        console.error(err);
        tableBody.innerHTML =
          `<tr><td colspan="6">Error loading data</td></tr>`;
      })
      .finally(() => {
        loadBtn.classList.remove("loading");
        loadBtn.textContent = "Load";
      });
  }

  // 🔁 Load button
  loadBtn.addEventListener("click", loadTable);

  // 🌐 Language toggle
  langBtn.addEventListener("click", function () {
    currentLang = currentLang === "en" ? "ta" : "en";
    localStorage.setItem("lang", currentLang);
    langBtn.textContent = currentLang === "en" ? "தமிழ்" : "English";
    loadTable();
  });

});

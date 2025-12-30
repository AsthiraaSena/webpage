document.addEventListener("DOMContentLoaded", function () {

  const rasiMap = [
    "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  const planetMap = [
    "Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"
  ];

  const tableBody = document.getElementById("tableBody");
  const loadBtn   = document.getElementById("loadBtn");
  const subHead   = document.getElementById("subHead");
  const ssbHead   = document.getElementById("ssbHead");

 function toDMS(deg){

  let d = Math.floor(deg);

  let mFloat = (deg - d) * 60;
  let m = Math.floor(mFloat);

  let s = Math.round((mFloat - m) * 60);

  // 🔥 FIX: handle 60 seconds
  if (s === 60) {
    s = 0;
    m += 1;
  }

  // 🔥 FIX: handle 60 minutes
  if (m === 60) {
    m = 0;
    d += 1;
  }

  return `${d}° ${m.toString().padStart(2,"0")}' ${s.toString().padStart(2,"0")}"`;
}


 loadBtn.addEventListener("click", function () {

  const mode = document.querySelector("input[name='mode']:checked").value;
  const url  = mode === "sub" ? "data/sub.json" : "data/ssb.json";

  // 🔵 START animation
  loadBtn.classList.add("loading");
  loadBtn.textContent = "Loading";

  fetch(url)
    .then(res => res.json())
    .then(data => {

      tableBody.innerHTML = "";

      if (mode === "sub") {
        ssbHead.style.display = "none";
      } else {
        ssbHead.style.display = "";
      }

      data.forEach(r => {

        let row = `
          <tr>
            <td>${r["s.no"]}</td>
            <td>${toDMS(r["D.M.S"])}</td>
            <td>${rasiMap[r["Raasi"] - 1]}</td>
            <td>${planetMap[r["Star"] - 1]}</td>
            <td>${planetMap[r["Sub"] - 1]}</td>
        `;

        if (mode === "ssb") {
          row += `<td>${planetMap[r["Ssb"] - 1]}</td>`;
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
      // 🟢 STOP animation
      loadBtn.classList.remove("loading");
      loadBtn.textContent = "Load";
    });

});

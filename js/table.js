document.addEventListener("DOMContentLoaded", function () {

  const rasiMap = [
    "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  const planetMap = [
    "Ke","Ve","Sun","Mo","Mar","Ra","Jup","Sat","Mer"
  ];

  const tableBody = document.getElementById("tableBody");
  const lastHead  = document.getElementById("lastHead");
  const loadBtn   = document.getElementById("loadBtn");

  function toDMS(deg){
    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    const s = Math.round((((deg - d) * 60) - m) * 60);
    return `${d}° ${m}' ${s}"`;
  }

  loadBtn.addEventListener("click", function () {

    const mode = document.querySelector("input[name='mode']:checked").value;
    const url  = mode === "sub" ? "data/sub.json" : "data/ssb.json";

    fetch(url)
      .then(res => res.json())
      .then(data => {

        tableBody.innerHTML = "";

        if (mode === "sub") {
          lastHead.innerText = "Sub";
        } else {
          lastHead.innerText = "SSB";
        }

        data.forEach(r => {

          let row = `
            <tr>
              <td>${r["s.no"]}</td>
              <td>${toDMS(r["D.M.S"])}</td>
              <td>${rasiMap[r["Raasi"] - 1]}</td>
              <td>${planetMap[r["Star"] - 1]}</td>
              <td>${planetMap[
                (mode === "sub" ? r["Sub"] : r["Ssb"]) - 1
              ]}</td>
            </tr>
          `;

          tableBody.insertAdjacentHTML("beforeend", row);
        });

      })
      .catch(err => {
        console.error(err);
        tableBody.innerHTML =
          `<tr><td colspan="5">Error loading data</td></tr>`;
      });

  });

});

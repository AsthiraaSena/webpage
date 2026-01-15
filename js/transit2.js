/* ===============================
   PLANET TRANSIT LOGIC – 2026
   =============================== */

const planetSelect = document.getElementById("planetSelect");
const planetLabel = document.getElementById("planetLabel");
const tbody = document.getElementById("tbody");

let transitData = [];

/* 🔹 Load JSON file */
fetch("data/planet-transit-2026.json")
    .then(res => res.json())
    .then(data => {
        // remove empty rows
        transitData = data.filter(r => r.planet && r.date);
        loadPlanets();
    })
    .catch(err => {
        console.error(err);
        tbody.innerHTML = `<tr><td colspan="4">Error loading data</td></tr>`;
    });

/* 🔹 Fill planet ComboBox */
function loadPlanets() {
    const planets = [...new Set(transitData.map(r => r.planet))];

    planets.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        planetSelect.appendChild(opt);
    });
}

/* 🔹 On planet selection (no hiding combo box) */
planetSelect.addEventListener("change", () => {
    const planet = planetSelect.value;
    tbody.innerHTML = "";

    if (!planet) {
        planetLabel.textContent = "";
        tbody.innerHTML = `<tr><td colspan="4">Select a planet</td></tr>`;
        return;
    }

    // Show selected planet in label
    planetLabel.textContent = "🪐 " + planet;

    // Load all records for selected planet
    transitData
        .filter(r => r.planet === planet)
        .forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${r.house}</td>
        <td>${r.star}</td>
        <td>${r.sub}</td>
        <td>${r.date}</td>
      `;
            tbody.appendChild(tr);
        });
});

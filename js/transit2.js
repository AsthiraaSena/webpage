/* ================= TRANSLATION MAP ================= */
const transMap = {
    // Planets
    "சூரி": "Sun", "சந்": "Moon", "செவ்": "Mars", "புத": "Mer",
    "குரு": "Jup", "சுக்": "Ve", "சனி": "Sat", "ராகு": "Ra", "கேது": "Ke",
    // Signs
    "மே": "Ari", "ரிஷ": "Tau", "மிது": "Gem", "கட": "Can",
    "சிம்": "Leo", "கன்": "Vir", "துலா": "Lib", "விரு": "Sco",
    "தனு": "Sag", "மக": "Cap", "கும்": "Aqu", "மீன": "Pis",
    "மேச": "Aries", "ரிச": "Taurus"
};

function t(str) {
    const lang = localStorage.getItem("lang") || "ta";
    if (lang === "ta") return str;
    if (!str) return str;
    return transMap[str] || str;
}

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
    const lang = localStorage.getItem("lang") || "ta";
    const planets = [...new Set(transitData.map(r => r.planet))];

    // Save current selection if any
    const currentVal = planetSelect.value;
    planetSelect.innerHTML = `<option value="" class="lang" data-en="-- Choose Planet --" data-ta="-- கிரகத்தைத் தேர்வு செய்க --">${lang === "en" ? "-- Choose Planet --" : "-- கிரகத்தைத் தேர்வு செய்க --"}</option>`;

    planets.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = t(p);
        planetSelect.appendChild(opt);
    });

    if (currentVal) planetSelect.value = currentVal;
}

/* 🔹 Re-render data */
function renderTransitData() {
    const planet = planetSelect.value;
    const lang = localStorage.getItem("lang") || "ta";
    tbody.innerHTML = "";

    if (!planet) {
        planetLabel.textContent = "";
        tbody.innerHTML = `<tr><td colspan="4" class="lang" data-en="Select a planet" data-ta="கிரகத்தைத் தேர்ந்தெடுக்கவும்">Select a planet</td></tr>`;
        return;
    }

    // Show selected planet in label
    planetLabel.textContent = "🪐 " + t(planet);

    // Load all records for selected planet
    transitData
        .filter(r => r.planet === planet)
        .forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${t(r.house)}</td>
        <td>${t(r.star)}</td>
        <td>${t(r.sub)}</td>
        <td>${r.date}</td>
      `;
            tbody.appendChild(tr);
        });
}

/* 🔹 On planet selection */
planetSelect.addEventListener("change", renderTransitData);

// Re-render when language changes
window.addEventListener("languageChange", () => {
    loadPlanets(); // Update dropdown text
    renderTransitData(); // Update table content
});

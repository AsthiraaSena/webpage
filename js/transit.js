/* ================= TRANSLATION MAP ================= */
const transMap = {
  // Planets
  "சூரி": "Sun", "சந்": "Moon", "செவ்": "Mar", "புத": "Mer",
  "குரு": "Jup", "சுக்": "Ven", "சனி": "Sat", "ராகு": "Ra", "கேது": "Ke",
  "குரு-(வ)": "Jup (R)", "சனி-(வ)": "Sat (R)", "புத-(வ)": "Mer (R)",
  // Signs
  "மே": "Ari", "ரிஷ": "Tau", "மிது": "Gem", "கட": "Can",
  "சிம்": "Leo", "கன்": "Vir", "துலா": "Lib", "விரு": "Sco",
  "தனு": "Sag", "மக": "Cap", "கும்": "Aqu", "மீன": "Pis",
  "மேச": "Ari", "ரிச": "Tau",
  // Days
  "ஞாயிறு": "Sunday", "திங்கள்": "Monday", "செவ்வாய்": "Tuesday", "புதன்": "Wednesday",
  "வியாழன்": "Thursday", "வெள்ளி": "Friday", "சனி": "Sat"
};

function t(str) {
  const lang = localStorage.getItem("lang") || "ta";
  if (lang === "ta") return str;
  if (!str) return str;
  // Clean string (remove numbering if present like "1 - சிம்")
  const cleanStr = str.replace(/^\d+\s-\s/, "");
  return transMap[cleanStr] || str;
}

const dateInput = document.getElementById("dateInput");
const btn = document.getElementById("showBtn");
const tbody = document.getElementById("tbody");
const info = document.getElementById("info");

let lastData = []; // Store last fetched data for re-rendering

/* SAFE DATE PARSER */
function getSelectedDate() {
  if (!dateInput.value) return null;
  const [y, m, d] = dateInput.value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

async function loadData() {

  if (!dateInput.value) {
    alert("Select date");
    return;
  }

  const dateObj = getSelectedDate();

  btn.classList.add("loading");
  btn.innerHTML = `<span class="loader"></span>`;

  tbody.innerHTML =
    `<tr><td colspan="6" class="loading-row">Loading…</td></tr>`;
  info.innerHTML = "";

  try {
    const selDate =
      `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;

    const res = await fetch("data/panchangam_2026.json");
    const data = await res.json();

    lastData = data.filter(r => r.Date === selDate);
    renderTable();

  } catch {
    tbody.innerHTML =
      `<tr><td colspan="6">Error loading data</td></tr>`;
  } finally {
    btn.classList.remove("loading");
    const lang = localStorage.getItem("lang") || "ta";
    btn.innerHTML = lang === "en" ? "Fetch Positions" : "நிலைகளைக் காண்க";
  }
}

function renderTable() {
  const lang = localStorage.getItem("lang") || "ta";
  const dateObj = getSelectedDate();

  if (!lastData || lastData.length === 0) {
    if (dateObj) {
      const selDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
      tbody.innerHTML = `<tr><td colspan="6">No data for ${selDate}</td></tr>`;
    }
    return;
  }

  const firstRow = lastData[0];
  info.innerText = lang === "en"
    ? `📅 ${t(firstRow.Day)} | 🕉️ Ayanamsam: ${firstRow.Ayanamsam}`
    : `📅 ${firstRow.Day} | 🕉️ Ayanamsam: ${firstRow.Ayanamsam}`;

  tbody.innerHTML = "";
  lastData.forEach(r => {
    tbody.innerHTML += `
    <tr>
      <td>${t(r.Planet)}</td>
      <td>${r["D.M.S"]}</td>
      <td>${t(r.Sign)}</td>
      <td>${t(r.Star)}</td>
      <td>${t(r.Sub)}</td>
      <td>${r["S.Time"] || ""}</td>
    </tr>`;
  });
}

btn.onclick = loadData;

// Re-render when language changes
window.addEventListener("languageChange", () => {
  renderTable();
});


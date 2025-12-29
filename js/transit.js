const dateInput = document.getElementById("dateInput");
const btn = document.getElementById("showBtn");
const tbody = document.getElementById("tbody");
const info = document.getElementById("info");

/* SAFE DATE PARSER */
function getSelectedDate(){
  const [y,m,d] = dateInput.value.split("-").map(Number);
  return new Date(y, m-1, d);
}

async function loadData(){

  if(!dateInput.value){
    alert("Select date");
    return;
  }

  const dateObj = getSelectedDate();

  btn.classList.add("loading");
  btn.innerHTML = `<span class="loader"></span>`;

  tbody.innerHTML =
    `<tr><td colspan="6" class="loading-row">Loading…</td></tr>`;
  info.innerHTML = "";

  try{
    const selDate =
      `${String(dateObj.getDate()).padStart(2,'0')}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${dateObj.getFullYear()}`;

    const res = await fetch("data/panchangam_2026.json");
    const data = await res.json();

    const rows = data.filter(r => r.Date === selDate);

    if(rows.length === 0){
      tbody.innerHTML =
        `<tr><td colspan="6">No data for ${selDate}</td></tr>`;
      return;
    }

    info.innerText =
      `📅 ${rows[0].Day} | 🕉️ Ayanamsam: ${rows[0].Ayanamsam}`;

    tbody.innerHTML = "";
    rows.forEach(r=>{
      tbody.innerHTML += `
      <tr>
        <td>${r.Planet}</td>
        <td>${r["D.M.S"]}</td>
        <td>${r.Sign}</td>
        <td>${r.Star}</td>
        <td>${r.Sub}</td>
        <td>${r["S.Time"] || ""}</td>
      </tr>`;
    });

  }catch{
    tbody.innerHTML =
      `<tr><td colspan="6">Error loading data</td></tr>`;
  }finally{
    btn.classList.remove("loading");
    btn.innerHTML = "Show";
  }
}

btn.onclick = loadData;

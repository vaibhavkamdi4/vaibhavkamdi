const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

const nav = $(".nav"), menu = $(".menu");
if (menu) menu.addEventListener("click", () => nav.classList.toggle("open"));

async function getCatalog(base="research/") {
  const res = await fetch(base + "research.json?v=" + Date.now());
  if (!res.ok) throw new Error("catalog not found");
  return await res.json();
}

async function homeResearch() {
  const box = $("[data-latest-research]");
  if (!box) return;
  try {
    const items = await getCatalog("research/");
    box.innerHTML = items.slice(0,4).map(x => `
      <a class="research-row" href="research/${x.path}">
        <span class="cat">${(x.category||"research").replaceAll("-"," ").toUpperCase()}</span>
        <h3>${escapeHtml(x.title)}</h3>
        <span class="date">${escapeHtml(x.date||"")}</span>
      </a>`).join("") || `<div class="empty">No research published yet.</div>`;
  } catch(e) {
    box.innerHTML = `<div class="empty">Research catalog is being generated. Push a report and GitHub Actions will publish it automatically.</div>`;
  }
}

async function researchPage() {
  const grid = $("#research-grid");
  if (!grid) return;
  let items=[];
  try { items = await getCatalog(""); }
  catch(e) {
    grid.innerHTML = `<div class="empty">No research catalog found. Make sure GitHub Actions has completed successfully.</div>`;
    return;
  }
  const render = (filter="all") => {
    const list = filter==="all" ? items : items.filter(x => x.category===filter);
    grid.innerHTML = list.length ? list.map(x => `
      <a class="research-card" href="${x.path}">
        <div class="top">
          <span class="cat">${(x.category||"research").replaceAll("-"," ").toUpperCase()}</span>
          <span class="date">${escapeHtml(x.date||"")}</span>
        </div>
        <h2>${escapeHtml(x.title)}</h2>
        <p>${escapeHtml(x.description||"Technical security research and analysis.")}</p>
        <div class="bottom">
          <span class="read">READ REPORT →</span>
          <span class="small-tags">${(x.tags||[]).slice(0,4).map(escapeHtml).join(" · ")}</span>
        </div>
      </a>`).join("") : `<div class="empty">No reports in this category.</div>`;
  };
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  }));
  render("all");
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
homeResearch(); researchPage();

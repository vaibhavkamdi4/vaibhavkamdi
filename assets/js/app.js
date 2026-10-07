(() => {
  "use strict";

  // This repository is a GitHub Pages PROJECT site:
  // https://vaibhavkamdi4.github.io/vaibhavkamdi/
  const BASE = "/vaibhavkamdi/";
  const CATALOG = BASE + "research/research.json";

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));

  async function loadCatalog() {
    const response = await fetch(CATALOG + "?v=" + Date.now(), {
      cache: "no-store",
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("research.json is not an array");
    return data;
  }

  function card(item) {
    return `
      <a class="research-card" href="${esc(BASE + item.url)}">
        <span class="badge">${esc((item.category || "research").replaceAll("-", " ").toUpperCase())}</span>
        <h3>${esc(item.title || item.file)}</h3>
        <p>${esc(item.description || "Technical cybersecurity research report.")}</p>
        <div class="card-foot">
          <span>${esc(item.date || "")}</span>
          <span>${esc((item.tags || []).slice(0,3).join(" · "))}</span>
        </div>
      </a>`;
  }

  function diagnostic(target, error) {
    if (!target) return;
    target.className = "catalog-status error-status";
    target.innerHTML = `
      Catalog unavailable · ${esc(error.message || error)}
      <br><br>
      <a class="text-link" href="${CATALOG}" target="_blank" rel="noopener">
        Open research.json directly →
      </a>`;
  }

  async function initHome() {
    const grid = document.querySelector("#latest-research");
    if (!grid) return;
    try {
      const items = await loadCatalog();
      const sorted = [...items].sort((a,b) => String(b.date).localeCompare(String(a.date)));
      document.querySelector("#stat-total").textContent = sorted.length;
      grid.innerHTML = sorted.slice(0,3).map(card).join("") || `<div class="empty">No research reports published yet.</div>`;
    } catch (e) {
      grid.innerHTML = `<div class="empty">Research catalog is temporarily unavailable.<br><br><a class="text-link" href="${CATALOG}" target="_blank">Open catalog diagnostics →</a></div>`;
    }
  }

  async function initResearch() {
    const grid = document.querySelector("#research-grid");
    if (!grid) return;

    const status = document.querySelector("#catalog-status");
    const search = document.querySelector("#research-search");
    let items = [];
    let category = "all";

    try {
      items = await loadCatalog();
      status.className = "catalog-status ok-status";
      status.textContent = `${items.length} research report${items.length === 1 ? "" : "s"} indexed`;
    } catch (e) {
      grid.innerHTML = "";
      diagnostic(status, e);
      return;
    }

    function render() {
      const q = (search?.value || "").trim().toLowerCase();
      const filtered = items.filter(item => {
        const catOK = category === "all" || item.category === category;
        const hay = [item.title,item.description,item.category,item.date,...(item.tags || [])].join(" ").toLowerCase();
        return catOK && (!q || hay.includes(q));
      }).sort((a,b) => String(b.date).localeCompare(String(a.date)));

      grid.innerHTML = filtered.length
        ? filtered.map(card).join("")
        : `<div class="empty">No research matches this filter.</div>`;
      status.textContent = `${filtered.length} matching report${filtered.length === 1 ? "" : "s"} · ${items.length} indexed`;
    }

    document.querySelectorAll(".filter").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        category = btn.dataset.category;
        render();
      });
    });
    search?.addEventListener("input", render);
    render();
  }

  initHome();
  initResearch();
})();

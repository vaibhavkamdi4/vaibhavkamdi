const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
const nav=document.querySelector(".nav"), toggle=document.querySelector(".menu-toggle");
if(toggle) toggle.addEventListener("click",()=>nav.classList.toggle("open"));
async function loadResearchPreview(){
  const box=document.querySelector("[data-latest-research]"); if(!box)return;
  try{const r=await fetch("research/research.json?"+Date.now());const items=await r.json();
    box.innerHTML=items.slice(0,4).map(x=>`<a class="research-row" href="research/${x.path}"><span class="cat">${x.category.toUpperCase()}</span><h3>${x.title}</h3><span class="date">${x.date||""}</span></a>`).join("")||"<div class='empty'>No research published yet.</div>";
  }catch(e){box.innerHTML="<div class='empty'>Research catalog will appear after the first GitHub Actions build.</div>"}
}
loadResearchPreview();

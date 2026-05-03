// ===== VIZ — LEVEL 41 DIAGNOSTIC GALLERY =====
// Four mini residual-vs-fitted panels, each illustrating a violation of L·I·N·E.

// =====================================================
// LEVEL 41 — DIAGNOSTIC GALLERY
// =====================================================
const DIAG_PANELS = [
  {
    title: 'Panel A',
    answer: '<strong>L (Linear) broken</strong> — the residuals show clear curvature (U-shape). The true relationship is quadratic, but we fit a line.',
    points: () => {
      // residuals from a parabolic truth fit with a line
      const pts = [];
      for(let i=0;i<40;i++){
        const x = i/40 * 100;
        const r = (x-50)*(x-50)/200 - 12 + rnorm(0,1.5);
        pts.push({x, r});
      }
      return pts;
    }
  },
  {
    title: 'Panel B',
    answer: '<strong>E (Equal variance) broken</strong> — fan/megaphone shape: residual spread grows with fitted value. Heteroskedasticity.',
    points: () => {
      const pts = [];
      for(let i=0;i<40;i++){
        const x = i/40 * 100;
        const r = rnorm(0, 0.5 + x*0.15);
        pts.push({x, r});
      }
      return pts;
    }
  },
  {
    title: 'Panel C',
    answer: '<strong>I (Independence) broken</strong> — clear cyclical/temporal trend in residuals when plotted against order. Adjacent observations are correlated.',
    points: () => {
      const pts = [];
      let prev = 0;
      for(let i=0;i<40;i++){
        const x = i;
        const r = 0.7*prev + rnorm(0, 1.5);
        prev = r;
        pts.push({x, r});
      }
      return pts;
    }
  },
  {
    title: 'Panel D',
    answer: '<strong>All clear ✓</strong> — flat band, constant width, no patterns. This model\'s residuals look like white noise — exactly what you want.',
    points: () => {
      const pts = [];
      for(let i=0;i<40;i++){
        const x = i/40 * 100;
        const r = rnorm(0, 1.5);
        pts.push({x, r});
      }
      return pts;
    }
  },
];
function diagInit(){
  const gallery = document.getElementById('diag-gallery');
  if(!gallery) return;
  let html = '';
  DIAG_PANELS.forEach((panel, idx) => {
    const pts = panel.points();
    const xMin = Math.min(...pts.map(p=>p.x)), xMax = Math.max(...pts.map(p=>p.x));
    const rMin = Math.min(...pts.map(p=>p.r)), rMax = Math.max(...pts.map(p=>p.r));
    const xS = v => 25 + (v-xMin)*170/(xMax-xMin);
    const rS = v => 90 - (v-rMin)*70/((rMax-rMin)||1);
    let svgPts = `<line x1="25" y1="${rS(0)}" x2="195" y2="${rS(0)}" stroke="#475569" stroke-dasharray="3,3"/>`;
    pts.forEach(p => { svgPts += `<circle cx="${xS(p.x)}" cy="${rS(p.r)}" r="2" fill="#22d3ee" opacity="0.7"/>`; });
    html += `<div onclick="diagReveal(${idx})" id="diag-card-${idx}" style="background:#080b12; border:1px solid #1e293b; border-radius:6px; padding:8px; cursor:pointer;">
      <div style="color:#fbbf24; font-size:0.8rem; font-weight:600; margin-bottom:4px;">${panel.title}</div>
      <div style="color:#94a3b8; font-size:0.7rem;">x = order or fitted value · y = residual</div>
      <svg viewBox="0 0 220 110" style="width:100%; height:auto;">${svgPts}</svg>
      <div id="diag-ans-${idx}" style="display:none; color:#e2e8f0; font-size:0.78rem; padding:6px; background:#141821; border-radius:4px;"></div>
      <div id="diag-prompt-${idx}" style="color:#22d3ee; font-size:0.75rem; text-align:center; padding:4px;">→ click to reveal</div>
    </div>`;
  });
  gallery.innerHTML = html;
}
function diagReveal(idx){
  const ans = document.getElementById('diag-ans-'+idx);
  const prompt = document.getElementById('diag-prompt-'+idx);
  if(ans.style.display === 'none'){
    ans.innerHTML = DIAG_PANELS[idx].answer;
    ans.style.display = 'block';
    prompt.style.display = 'none';
  } else {
    ans.style.display = 'none';
    prompt.style.display = 'block';
  }
}

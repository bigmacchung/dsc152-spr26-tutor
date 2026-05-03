// ===== VIZ — LEVEL 27 PERMUTATION SHUFFLER =====
// Builds the null distribution by reshuffling group labels and renders
// the resulting dot plot live, with p-value readout.

// =====================================================
// LEVEL 27 — PERMUTATION SHUFFLER
// =====================================================
const PERM_HAND = [2,5,3,-3,8];
const PERM_CODE = [9,10,-1,14,6];
const PERM_OBS = mean(PERM_CODE) - mean(PERM_HAND);   // = 4.6
let permResults = [];

function permRender(){
  const display = document.getElementById('perm-data-display');
  if(display && !display.dataset.init){
    display.innerHTML = `<span style="color:#22d3ee;">handwritten</span>: [${PERM_HAND.join(', ')}] · mean = ${mean(PERM_HAND).toFixed(2)}<br>` +
                        `<span style="color:#fbbf24;">coding</span>: [${PERM_CODE.join(', ')}] · mean = ${mean(PERM_CODE).toFixed(2)}<br>` +
                        `Observed (mean_coding − mean_handwritten) = <span style="color:#f87171;">${PERM_OBS.toFixed(2)}</span>`;
    display.dataset.init = '1';
  }
  const dotsG = document.getElementById('perm-dots');
  if(!dotsG) return;
  // x range: -10 to 10 → SVG x: 40 to 580
  const xToSvg = v => 40 + (v + 10) * 540/20;
  // Stacked dots: count per bin
  const binSize = 0.4;
  const bins = {};
  permResults.forEach(v => { const b = Math.round(v/binSize)*binSize; bins[b] = (bins[b]||0)+1; });
  let svg = '';
  Object.keys(bins).forEach(b => {
    const v = parseFloat(b);
    const cnt = bins[b];
    for(let i=0;i<cnt;i++){
      const cx = xToSvg(v);
      const cy = 175 - i*4;
      if(cy < 30) continue;
      const isExtreme = Math.abs(v) >= Math.abs(PERM_OBS);
      svg += `<circle cx="${cx}" cy="${cy}" r="2" fill="${isExtreme?'#f87171':'#22d3ee'}" opacity="0.7"/>`;
    }
  });
  dotsG.innerHTML = svg;
  const ext = permResults.filter(v => Math.abs(v) >= Math.abs(PERM_OBS)).length;
  const p = permResults.length ? (ext/permResults.length).toFixed(3) : '—';
  document.getElementById('perm-stats').innerHTML =
    `Shuffles: ${permResults.length} · Extreme (|diff|≥${Math.abs(PERM_OBS).toFixed(1)}): ${ext} · Estimated p ≈ ${p}`;
}
function permShuffle(n){
  const all = PERM_HAND.concat(PERM_CODE);
  for(let k=0;k<n;k++){
    const sh = shuffle(all);
    const g1 = sh.slice(0,5), g2 = sh.slice(5);
    permResults.push(mean(g2) - mean(g1));
  }
  permRender();
}
function permReset(){ permResults = []; permRender(); }

// ===== VIZ — LEVEL 33 CONFOUNDING (FEV-style) =====
// Smoking-vs-FEV scatter showing how naive vs adjusted lines flip the conclusion.

// =====================================================
// LEVEL 33 — CONFOUNDING (FEV-style) SCATTER
// =====================================================
let confData = null;
function confGenerate(){
  // 260 kids, age 3..18, smoke=1 if age >= 13 with prob 0.4 else prob 0.02
  // FEV = 0.5 + 0.23*age + (-0.3)*smoke + N(0, 0.4)  ← true model: smokers WORSE
  confData = [];
  for(let i=0;i<260;i++){
    const age = 3 + Math.random()*15;
    const smokeProb = age >= 13 ? 0.45 : 0.02;
    const smoke = Math.random() < smokeProb ? 1 : 0;
    const fev = 0.5 + 0.23*age - 0.30*smoke + rnorm(0, 0.4);
    confData.push({age, smoke, fev});
  }
}
function confUpdate(){
  if(!confData) confGenerate();
  const showColor = document.getElementById('conf-color').checked;
  const showNaive = document.getElementById('conf-naive').checked;
  const showAdj = document.getElementById('conf-adj').checked;
  const xToSvg = age => 50 + (age - 3) * 530/15;
  const yMin = 0.5, yMax = 6;
  const yToSvg = v => 280 - (v - yMin)*260/(yMax-yMin);
  let pts = '';
  confData.forEach(d => {
    let fill;
    if(showColor){
      // color by age band: young=blue, mid=green, old=orange
      fill = d.age < 8 ? '#22d3ee' : d.age < 14 ? '#4ade80' : '#fbbf24';
    } else {
      fill = d.smoke ? '#f87171' : '#94a3b8';
    }
    const r = d.smoke ? 4 : 3;
    const stroke = d.smoke ? '#f87171' : 'none';
    pts += `<circle cx="${xToSvg(d.age)}" cy="${yToSvg(d.fev)}" r="${r}" fill="${fill}" stroke="${stroke}" opacity="0.7"/>`;
  });
  document.getElementById('conf-points').innerHTML = pts;
  // Lines
  let lines = '';
  if(showNaive){
    // Line by smoke status (mean FEV per smoke level), drawn as horizontal segments
    const sm = confData.filter(d=>d.smoke);
    const ns = confData.filter(d=>!d.smoke);
    const m_sm = mean(sm.map(d=>d.fev));
    const m_ns = mean(ns.map(d=>d.fev));
    lines += `<line x1="${xToSvg(3)}" x2="${xToSvg(18)}" y1="${yToSvg(m_sm)}" y2="${yToSvg(m_sm)}" stroke="#f87171" stroke-width="2" stroke-dasharray="6,3"/>`;
    lines += `<text x="${xToSvg(18)+5}" y="${yToSvg(m_sm)+3}" fill="#f87171" font-size="10">smokers (naive)</text>`;
    lines += `<line x1="${xToSvg(3)}" x2="${xToSvg(18)}" y1="${yToSvg(m_ns)}" y2="${yToSvg(m_ns)}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,3"/>`;
    lines += `<text x="${xToSvg(18)+5}" y="${yToSvg(m_ns)+3}" fill="#94a3b8" font-size="10">non-smokers (naive)</text>`;
  }
  if(showAdj){
    // Within age, fit smoke and non-smoke separately as a function of age
    const sm = confData.filter(d=>d.smoke);
    const ns = confData.filter(d=>!d.smoke);
    if(sm.length>2 && ns.length>2){
      const fitSm = ols(sm.map(d=>d.age), sm.map(d=>d.fev));
      const fitNs = ols(ns.map(d=>d.age), ns.map(d=>d.fev));
      const ageMinSm = Math.min(...sm.map(d=>d.age));
      const ageMaxSm = Math.max(...sm.map(d=>d.age));
      lines += `<line x1="${xToSvg(ageMinSm)}" x2="${xToSvg(ageMaxSm)}" y1="${yToSvg(fitSm.b0+fitSm.b1*ageMinSm)}" y2="${yToSvg(fitSm.b0+fitSm.b1*ageMaxSm)}" stroke="#f87171" stroke-width="2"/>`;
      lines += `<line x1="${xToSvg(3)}" x2="${xToSvg(18)}" y1="${yToSvg(fitNs.b0+fitNs.b1*3)}" y2="${yToSvg(fitNs.b0+fitNs.b1*18)}" stroke="#94a3b8" stroke-width="2"/>`;
    }
  }
  document.getElementById('conf-lines').innerHTML = lines;
}

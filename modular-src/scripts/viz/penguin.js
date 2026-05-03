// ===== VIZ — LEVEL 36 PENGUIN SIMPSON'S =====
// Bill length vs depth across three penguin species — illustrates Simpson's paradox.

// =====================================================
// LEVEL 36 — PENGUIN SIMPSON'S
// =====================================================
let pengData = null;
function pengGenerate(){
  // 3 species clusters
  // Adelie: bill_length ~ N(38, 2), bill_depth ~ 16 + 0.20*(bl-38) + N(0,0.5)
  // Chinstrap: bill_length ~ N(48, 2.5), bill_depth ~ 18 + 0.18*(bl-48) + N(0,0.6)
  // Gentoo: bill_length ~ N(48, 3), bill_depth ~ 14.5 + 0.22*(bl-48) + N(0,0.5)
  pengData = [];
  for(let i=0;i<50;i++){
    const bl = rnorm(38,2); pengData.push({bl, bd: 16+0.20*(bl-38)+rnorm(0,0.5), sp:'A'});
  }
  for(let i=0;i<35;i++){
    const bl = rnorm(48,2.5); pengData.push({bl, bd: 18+0.18*(bl-48)+rnorm(0,0.6), sp:'C'});
  }
  for(let i=0;i<35;i++){
    const bl = rnorm(48,3); pengData.push({bl, bd: 14.5+0.22*(bl-48)+rnorm(0,0.5), sp:'G'});
  }
}
function pengUpdate(){
  if(!pengData) pengGenerate();
  const color = document.getElementById('peng-color').checked;
  const naive = document.getElementById('peng-naive').checked;
  const adj = document.getElementById('peng-adj').checked;
  const xs = pengData.map(d=>d.bl), ys = pengData.map(d=>d.bd);
  const xMin=Math.min(...xs)-1, xMax=Math.max(...xs)+1;
  const yMin=Math.min(...ys)-0.3, yMax=Math.max(...ys)+0.3;
  const xToSvg = v => 50 + (v-xMin)*530/(xMax-xMin);
  const yToSvg = v => 280 - (v-yMin)*260/(yMax-yMin);
  let pts = '';
  pengData.forEach(d => {
    const fill = !color ? '#94a3b8' : (d.sp==='A'?'#22d3ee':d.sp==='C'?'#c084fc':'#fbbf24');
    pts += `<circle cx="${xToSvg(d.bl)}" cy="${yToSvg(d.bd)}" r="3" fill="${fill}" opacity="0.7"/>`;
  });
  document.getElementById('peng-points').innerHTML = pts;
  let lines = '';
  if(naive){
    const fit = ols(xs, ys);
    lines += `<line x1="${xToSvg(xMin)}" x2="${xToSvg(xMax)}" y1="${yToSvg(fit.b0+fit.b1*xMin)}" y2="${yToSvg(fit.b0+fit.b1*xMax)}" stroke="#f87171" stroke-width="2.5"/>`;
    lines += `<text x="${xToSvg(xMin)+5}" y="${yToSvg(fit.b0+fit.b1*xMin)-5}" fill="#f87171" font-size="10">marginal: slope ${fit.b1.toFixed(2)}</text>`;
  }
  if(adj){
    ['A','C','G'].forEach(sp => {
      const sub = pengData.filter(d=>d.sp===sp);
      if(sub.length<3) return;
      const fit = ols(sub.map(d=>d.bl), sub.map(d=>d.bd));
      const subxMin = Math.min(...sub.map(d=>d.bl)), subxMax = Math.max(...sub.map(d=>d.bl));
      const col = sp==='A'?'#22d3ee':sp==='C'?'#c084fc':'#fbbf24';
      lines += `<line x1="${xToSvg(subxMin)}" x2="${xToSvg(subxMax)}" y1="${yToSvg(fit.b0+fit.b1*subxMin)}" y2="${yToSvg(fit.b0+fit.b1*subxMax)}" stroke="${col}" stroke-width="2"/>`;
    });
  }
  document.getElementById('peng-lines').innerHTML = lines;
}

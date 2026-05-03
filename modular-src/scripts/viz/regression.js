// ===== VIZ — LEVEL 30 REGRESSION SANDBOX =====
// Slider-driven SLR sandbox: vary slope, noise, n; refits OLS and updates SE/t/p live.

// =====================================================
// LEVEL 30 — REGRESSION SANDBOX
// =====================================================
let regCachedX = null, regCachedNoise = null;
function regGenerate(){
  const n = +document.getElementById('reg-n').value;
  regCachedX = []; regCachedNoise = [];
  for(let i=0;i<n;i++){
    regCachedX.push(Math.random()*10);
    regCachedNoise.push(rnorm(0,1));
  }
}
function regUpdate(){
  if(!regCachedX || regCachedX.length !== +document.getElementById('reg-n').value) regGenerate();
  const beta1 = +document.getElementById('reg-beta1').value;
  const sigma = +document.getElementById('reg-sigma').value;
  const n = regCachedX.length;
  document.getElementById('reg-beta1-val').textContent = beta1;
  document.getElementById('reg-sigma-val').textContent = sigma;
  document.getElementById('reg-n-val').textContent = n;
  const x = regCachedX;
  const y = x.map((xi,i) => 623 + beta1*xi + sigma*regCachedNoise[i]);
  const fit = ols(x, y);
  // Plot
  const xToSvg = v => 50 + v*53;       // x range 0..10 → 50..580
  const yMin = Math.min(...y), yMax = Math.max(...y);
  const yToSvg = v => 270 - (v - yMin) * 250/(yMax - yMin || 1);
  let pts = '';
  for(let i=0;i<n;i++){
    pts += `<circle cx="${xToSvg(x[i])}" cy="${yToSvg(y[i])}" r="3" fill="#22d3ee" opacity="0.6"/>`;
  }
  document.getElementById('reg-points').innerHTML = pts;
  // Line: from x=0 to x=10
  const ln = document.getElementById('reg-line');
  ln.setAttribute('x1', xToSvg(0));
  ln.setAttribute('y1', yToSvg(fit.b0));
  ln.setAttribute('x2', xToSvg(10));
  ln.setAttribute('y2', yToSvg(fit.b0 + fit.b1*10));
  ln.setAttribute('stroke', '#fbbf24');
  // Stats display
  const sigStr = fit.p < 0.001 ? '<span style="color:#4ade80;">*** highly significant</span>' :
                 fit.p < 0.05  ? '<span style="color:#4ade80;">* significant at α=0.05</span>' :
                 '<span style="color:#94a3b8;">not significant at α=0.05</span>';
  document.getElementById('reg-stats').innerHTML =
    `β̂₁ = ${fit.b1.toFixed(2)} (true: ${beta1}) · SE(β̂₁) = ${fit.seB1.toFixed(2)} · t = ${fit.t.toFixed(2)} · p ≈ ${fit.p < 0.0001 ? '<0.0001' : fit.p.toFixed(4)}<br>` + sigStr;
}
function regResample(){ regGenerate(); regUpdate(); }

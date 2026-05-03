// ===== VIZ — LEVEL 38 F-RATIO WATERFALL =====
// Visualizes RSS_null vs RSS_full → F-statistic and approximate p-value as bars.

// =====================================================
// LEVEL 38 — F-RATIO WATERFALL
// =====================================================
function fwUpdate(){
  const delta = +document.getElementById('fw-delta').value;
  document.getElementById('fw-delta-val').textContent = delta.toFixed(1);
  // Simulate 3 groups, n=30 each
  const n = 30;
  const sigma = 1.5;
  const groups = [
    Array.from({length:n}, () => rnorm(0, sigma)),
    Array.from({length:n}, () => rnorm(delta/2, sigma)),
    Array.from({length:n}, () => rnorm(delta, sigma)),
  ];
  const all = groups.flat();
  const grandMean = mean(all);
  // RSS_null = sum (yi - grand_mean)^2
  const rssNull = all.reduce((s,x) => s+(x-grandMean)*(x-grandMean), 0);
  // RSS_full = sum within-group SS
  const rssFull = groups.reduce((s,g) => {
    const m = mean(g);
    return s + g.reduce((ss,x) => ss+(x-m)*(x-m), 0);
  }, 0);
  const totalN = 3*n;
  const F = ((rssNull - rssFull)/2) / (rssFull/(totalN-3));
  // Approximate p-value: under H0 F ~ F(2, n-3). Use a crude tail approx.
  // For F(2, df_large), p ≈ exp(-F) when F > 1 (very rough but trends right)
  // Better: use the relationship F(2, df) ≈ Chi^2(2)/2 for large df → p = exp(-F)
  let p;
  const dfDen = totalN - 3;
  if(dfDen > 30){
    // chi-square(2)/2 approximation: p = exp(-F)
    p = Math.exp(-F);
  } else {
    p = Math.pow(1 + 2*F/dfDen, -dfDen/2);
  }
  // Render bars
  const maxRss = Math.max(rssNull, rssFull, 1);
  const scale = 180 / maxRss;
  const hN = rssNull * scale;
  const hF = rssFull * scale;
  const hD = (rssNull - rssFull) * scale;
  document.getElementById('fw-bar-null').setAttribute('y', 220 - hN);
  document.getElementById('fw-bar-null').setAttribute('height', hN);
  document.getElementById('fw-bar-full').setAttribute('y', 220 - hF);
  document.getElementById('fw-bar-full').setAttribute('height', hF);
  document.getElementById('fw-bar-diff').setAttribute('y', 220 - hD);
  document.getElementById('fw-bar-diff').setAttribute('height', hD);
  document.getElementById('fw-lbl-null').textContent = rssNull.toFixed(1);
  document.getElementById('fw-lbl-full').textContent = rssFull.toFixed(1);
  document.getElementById('fw-lbl-diff').textContent = (rssNull-rssFull).toFixed(1);
  const sigLabel = p < 0.001 ? '<span style="color:#4ade80;">*** p ≈ ' + p.toExponential(1) + '</span>' :
                   p < 0.05  ? '<span style="color:#4ade80;">* p ≈ ' + p.toFixed(3) + '</span>' :
                   '<span style="color:#94a3b8;">p ≈ ' + p.toFixed(3) + '</span>';
  document.getElementById('fw-stats').innerHTML = `F = ${F.toFixed(2)} · ${sigLabel} (n_total=${totalN}, df=2, ${totalN-3})`;
}

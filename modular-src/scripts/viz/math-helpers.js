// ===== VIZ — MATH HELPERS =====
// Standalone numerical utilities used by all interactive viz modules.

// ---- Math helpers ----
function rnorm(mu, sigma) { // Box-Muller
  const u1 = Math.random(), u2 = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
function mean(arr){return arr.reduce((a,b)=>a+b,0)/arr.length;}
function variance(arr){const m=mean(arr);return arr.reduce((s,x)=>s+(x-m)*(x-m),0)/(arr.length-1);}
function sd(arr){return Math.sqrt(variance(arr));}
function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// Approximate standard-normal CDF (Abramowitz & Stegun 26.2.17), accurate to ~1e-7
function normCDF(z){const t=1/(1+0.2316419*Math.abs(z));const d=0.3989422804014327*Math.exp(-z*z/2);const p=d*t*(0.319381530+t*(-0.356563782+t*(1.781477937+t*(-1.821255978+t*1.330274429))));return z>=0?1-p:p;}
// Two-sided p-value from a t-statistic (normal approx — fine for df > ~20; conservative for small df)
function tToP(t, df){
  // Quick adjustment: scale t to a z-equivalent for small df
  const adjustedT = (df < 30) ? t * Math.sqrt(df/(df + t*t/2)) : t;
  return 2 * (1 - normCDF(Math.abs(adjustedT)));
}
// Simple OLS for x,y arrays
function ols(x, y){
  const n = x.length, mx = mean(x), my = mean(y);
  let sxy=0, sxx=0;
  for(let i=0;i<n;i++){sxy += (x[i]-mx)*(y[i]-my); sxx += (x[i]-mx)*(x[i]-mx);}
  const b1 = sxy/sxx;
  const b0 = my - b1*mx;
  // residual variance
  let rss=0; for(let i=0;i<n;i++){const yh=b0+b1*x[i]; rss += (y[i]-yh)*(y[i]-yh);}
  const sig2 = rss/(n-2);
  const seB1 = Math.sqrt(sig2/sxx);
  const t = b1/seB1;
  const p = tToP(t, n-2);
  return {b0, b1, seB1, t, p, sig2};
}

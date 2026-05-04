// ===== SEARCH + CLOSE LEVEL =====
// Two UX features: a global keyword search across all 63 level cards,
// and an auto-injected "Close" button at the bottom of every level body
// (so users don't have to scroll back up to collapse a long level).

// ----- Close-level button: collapses a level body and scrolls to header -----
function closeLevel(num) {
  const body = document.getElementById('level-body-' + num);
  if (!body) return;
  body.classList.remove('open');
  const card = document.getElementById('level-' + num);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto-append a close button to every level body (so we don't need to edit 63 cards).
// Idempotent: safe to call multiple times.
function addCloseButtons() {
  document.querySelectorAll('.level-body').forEach(body => {
    if (body.querySelector('.close-btn')) return;
    const m = body.id.match(/level-body-(.+)/);
    if (!m) return;
    const num = m[1];
    const btn = document.createElement('button');
    btn.className = 'close-btn';
    btn.textContent = '▲ Close this level';
    btn.setAttribute('data-level', num);
    btn.addEventListener('click', () => closeLevel(num));
    body.appendChild(btn);
  });
}

// ----- Search index -----
let SEARCH_INDEX = [];

function buildSearchIndex() {
  SEARCH_INDEX = [];
  document.querySelectorAll('.level-card').forEach(card => {
    const m = card.id.match(/level-(.+)/);
    if (!m) return;
    const num = m[1];
    const phaseEl = card.closest('.phase-content');
    const phase = phaseEl ? phaseEl.id.replace('phase-', '') : '?';
    const titleEl = card.querySelector('.level-title');
    const title = titleEl ? titleEl.textContent.trim() : ('Level ' + num);
    SEARCH_INDEX.push({
      cardId: card.id,
      bodyId: 'level-body-' + num,
      num: num,
      phase: phase,
      title: title,
      text: card.textContent.toLowerCase()
    });
  });
}

function searchLevels() {
  const inp = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!inp || !results) return;
  const q = inp.value.trim().toLowerCase();
  if (q.length < 2) { results.style.display = 'none'; return; }
  if (SEARCH_INDEX.length === 0) buildSearchIndex();
  const matches = SEARCH_INDEX.filter(d => d.text.includes(q));
  if (matches.length === 0) {
    results.innerHTML = '<div class="search-empty">No matches for "' + escapeHtml(q) + '"</div>';
    results.style.display = 'block';
    return;
  }
  results.innerHTML = matches.slice(0, 50).map(m => {
    const idx = m.text.indexOf(q);
    let snippet = '';
    if (idx >= 0) {
      const a = Math.max(0, idx - 40);
      const b = Math.min(m.text.length, idx + q.length + 60);
      const around = m.text.substring(a, b).replace(/\s+/g, ' ');
      const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi');
      snippet = (a > 0 ? '…' : '') + escapeHtml(around).replace(re, '<span class="search-mark">$1</span>') + (b < m.text.length ? '…' : '');
    }
    return '<div class="search-result" onclick="goToLevel(\'' + m.phase + '\',\'' + m.num + '\')">' +
           '<div style="flex:1; min-width:0;">' +
           '<span class="search-phase">P' + m.phase + ' · L' + m.num + '</span>' +
           ' <strong>' + escapeHtml(m.title) + '</strong>' +
           '<span class="search-snippet">' + snippet + '</span>' +
           '</div></div>';
  }).join('');
  results.style.display = 'block';
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

function goToLevel(phase, num) {
  document.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.phase-content').forEach(c => c.classList.remove('active'));
  const tab = document.querySelector('.phase-tab[data-phase="' + phase + '"]');
  const pane = document.getElementById('phase-' + phase);
  if (tab) tab.classList.add('active');
  if (pane) pane.classList.add('active');
  const body = document.getElementById('level-body-' + num);
  if (body) body.classList.add('open');
  const card = document.getElementById('level-' + num);
  if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  document.getElementById('search-results').style.display = 'none';
  const inp = document.getElementById('search-input');
  if (inp) inp.value = '';
}

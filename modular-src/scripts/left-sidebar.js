// ===== LEFT SIDEBAR =====
// Always-visible navigation panel anchored to the left edge (desktop only).
// Lists every phase (collapsible) and every level inside. Click a level → jumps
// to it via goToLevel(). Completion ✓ syncs with addXP. On screens < 1000px
// this panel is hidden via CSS and users rely on the existing right slide-out.

function buildLeftSidebar() {
  const container = document.getElementById('left-sidebar-content');
  if (!container) return;
  const phases = {};
  document.querySelectorAll('.level-card').forEach(card => {
    const m = card.id.match(/level-(.+)/);
    if (!m) return;
    const num = m[1];
    const phaseEl = card.closest('.phase-content');
    if (!phaseEl) return;
    const p = phaseEl.id.replace('phase-', '');
    const titleEl = card.querySelector('.level-title');
    const title = titleEl ? titleEl.textContent.trim() : 'Level ' + num;
    (phases[p] = phases[p] || []).push({ num, title });
  });
  const labels = {};
  document.querySelectorAll('.phase-tab').forEach(tab => {
    labels[tab.getAttribute('data-phase')] = tab.textContent.trim();
  });
  let html = '';
  Object.keys(phases).sort((a, b) => parseInt(a) - parseInt(b)).forEach(p => {
    const label = labels[p] || 'Phase ' + p;
    const isOpen = (p === '1') ? ' open' : '';
    html += '<div class="ls-phase' + isOpen + '" data-phase="' + p + '">';
    html += '<div class="ls-phase-header" onclick="toggleLeftSidebarPhase(\'' + p + '\')">' + escapeHtml(label) + '</div>';
    html += '<div class="ls-phase-list">';
    phases[p].forEach(lv => {
      const cleanTitle = lv.title.replace(/^Level\s+\S+\s*[—-]\s*/, '').replace(/^\s*Level\s+\S+\s*/, '');
      html += '<div class="ls-level" data-level="' + lv.num + '" onclick="goToLevel(\'' + p + '\',\'' + lv.num + '\')">';
      html += '<span class="ls-lev-num">L' + lv.num + '</span>';
      html += '<span>' + escapeHtml(cleanTitle) + '</span>';
      html += '</div>';
    });
    html += '</div></div>';
  });
  container.innerHTML = html;
  refreshLeftSidebarCompletion();
  if (window.innerWidth >= 1000) document.body.classList.add('has-left-sidebar');
}

function toggleLeftSidebarPhase(p) {
  document.querySelectorAll('.ls-phase').forEach(el => {
    if (el.getAttribute('data-phase') === p) el.classList.toggle('open');
  });
}

function refreshLeftSidebarCompletion() {
  document.querySelectorAll('.ls-level').forEach(el => {
    const num = el.getAttribute('data-level');
    const numKey = isNaN(parseInt(num)) ? num : parseInt(num);
    if (completedLevels.has(numKey)) el.classList.add('completed');
    else el.classList.remove('completed');
  });
}

function syncLeftSidebarActivePhase() {
  const activeTab = document.querySelector('.phase-tab.active');
  if (!activeTab) return;
  const ap = activeTab.getAttribute('data-phase');
  const target = document.querySelector('.ls-phase[data-phase="' + ap + '"]');
  if (target) target.classList.add('open');
}

document.querySelectorAll('.phase-tab').forEach(tab => {
  tab.addEventListener('click', () => setTimeout(syncLeftSidebarActivePhase, 10));
});

// Wrap addXP to also refresh left sidebar — IMPORTANT: this assumes
// sidebar.js's wrapper has already executed, so we chain on top of it.
const _origAddXP2 = addXP;
addXP = function(amount) {
  _origAddXP2(amount);
  refreshLeftSidebarCompletion();
};

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1000) document.body.classList.add('has-left-sidebar');
  else document.body.classList.remove('has-left-sidebar');
});

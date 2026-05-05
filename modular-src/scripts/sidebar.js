// ===== STICKY LEVEL SIDEBAR =====
// Slides in from the right when the user clicks the always-visible "📖 Levels"
// button. Lists every phase (collapsible) and every level (clickable to jump
// to + auto-close sidebar). Completed levels get a green ✓ via syncing with
// `completedLevels`.

function toggleSidebar(forceState) {
  const sb = document.getElementById('sidebar');
  const tg = document.getElementById('sidebar-toggle');
  const bd = document.getElementById('sidebar-backdrop');
  if (!sb) return;
  let open;
  if (forceState === true) open = true;
  else if (forceState === false) open = false;
  else open = !sb.classList.contains('open');
  sb.classList.toggle('open', open);
  bd.classList.toggle('open', open);
  tg.classList.toggle('hidden', open);
}

function toggleSidebarPhase(p) {
  document.querySelectorAll('.sidebar-phase').forEach(el => {
    if (el.getAttribute('data-phase') === p) {
      el.classList.toggle('open');
    } else {
      el.classList.remove('open');
    }
  });
}

function buildSidebar() {
  const container = document.getElementById('sidebar-content');
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
    html += '<div class="sidebar-phase' + isOpen + '" data-phase="' + p + '">';
    html += '<div class="sidebar-phase-header" onclick="toggleSidebarPhase(\'' + p + '\')">' + escapeHtml(label) + ' <span style="color:#64748b;font-size:0.7rem;font-weight:400;">(' + phases[p].length + ')</span></div>';
    html += '<div class="sidebar-phase-list">';
    phases[p].forEach(lv => {
      const cleanTitle = lv.title.replace(/^Level\s+\S+\s*[—-]\s*/, '').replace(/^\s*Level\s+\S+\s*/, '');
      html += '<div class="sidebar-level" data-level="' + lv.num + '" onclick="goToLevel(\'' + p + '\',\'' + lv.num + '\'); toggleSidebar(false);">';
      html += '<span class="lev-num">L' + lv.num + '</span>';
      html += '<span>' + escapeHtml(cleanTitle) + '</span>';
      html += '</div>';
    });
    html += '</div></div>';
  });
  container.innerHTML = html;
  refreshSidebarCompletion();
}

function refreshSidebarCompletion() {
  document.querySelectorAll('.sidebar-level').forEach(el => {
    const num = el.getAttribute('data-level');
    const numKey = isNaN(parseInt(num)) ? num : parseInt(num);
    if (completedLevels.has(numKey)) {
      el.classList.add('completed');
    } else {
      el.classList.remove('completed');
    }
  });
}

// Wrap addXP to refresh completion status on the sidebar
const _origAddXP = addXP;
addXP = function(amount) {
  _origAddXP(amount);
  refreshSidebarCompletion();
};

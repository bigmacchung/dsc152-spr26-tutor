// ===== NAVIGATION =====
// Phase tab switching and level-card collapse/expand.

// ===== PHASE TABS =====
document.querySelectorAll('.phase-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.phase-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('phase-' + tab.getAttribute('data-phase')).classList.add('active');
  });
});

// ===== LEVEL TOGGLE =====
function toggleLevel(num) {
  const body = document.getElementById('level-body-' + num);
  if (body.classList.contains('open')) {
    body.classList.remove('open');
  } else {
    body.classList.add('open');
    if (!completedLevels.has(num)) {
      completedLevels.add(num);
      const card = document.getElementById('level-' + num);
      const xpText = card.querySelector('.level-xp').textContent;
      const xpMatch = xpText.match(/\d+/);
      if (xpMatch) addXP(parseInt(xpMatch[0]));
    }
  }
}

// ===== XP SYSTEM =====
// XP accumulation, header display refresh, and explicit level completion (with bonus XP).

function addXP(amount) {
  xp += amount;
  currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
  updateDisplay();
  checkAchievements();
}

function updateDisplay() {
  document.getElementById('xp-disp').textContent = xp + ' XP';
  document.getElementById('level-disp').textContent = 'Level ' + currentLevel;
  document.getElementById('streak-disp').textContent = streak + ' Streak';
  document.getElementById('progress-bar').style.width = (completedLevels.size / TOTAL_LEVELS * 100) + '%';
}

// =====================================================
// completeLevel helper (was already implicit; explicit version for new completion buttons)
// =====================================================
function completeLevel(id){
  if(typeof id === 'number'){
    if(!completedLevels.has(id)){
      completedLevels.add(id);
      const card = document.getElementById('level-'+id);
      if(card){
        const xpText = card.querySelector('.level-xp').textContent;
        const m = xpText.match(/\d+/);
        if(m) addXP(parseInt(m[0]) + 25);  // bonus 25 XP for explicit completion
      }
    }
  } else {
    addXP(100); // ad hoc 'midterm-eve', 'exam-eve' style ids
  }
  showAchievement('Level Complete!', 'Bonus XP earned. Keep going.');
}

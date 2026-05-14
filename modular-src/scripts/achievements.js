// ===== ACHIEVEMENTS =====
// Toast popups and milestone unlock checks.

function showAchievement(title, desc) {
  const popup = document.getElementById('achievement-popup');
  document.getElementById('ach-title').textContent = title;
  document.getElementById('ach-desc').textContent = desc;
  popup.style.display = 'block';
  setTimeout(() => { popup.style.display = 'none'; }, 3000);
}

function checkAchievements() {
  if (completedLevels.size === 1 && !window._ach1) {
    window._ach1 = true;
    showAchievement('First Steps!', 'You opened your first level!');
  }
  if (completedLevels.size === 8 && !window._ach8) {
    window._ach8 = true;
    showAchievement('Phase 1 Complete!', 'Lectures 1-2 done!');
    launchConfetti();
  }
  if (completedLevels.size === 16 && !window._ach16) {
    window._ach16 = true;
    showAchievement('Phase 2 Complete!', 'Lectures 3-5 done!');
    launchConfetti();
  }
  if (completedLevels.size === 20 && !window._ach20) {
    window._ach20 = true;
    showAchievement('Lab Master!', 'All lab deep dives done!');
    launchConfetti();
  }
  if (completedLevels.size === 25 && !window._ach25) {
    window._ach25 = true;
    showAchievement('Quiz 1 Mastered!', 'On to regression. Lec 6 awaits.');
    launchConfetti();
  }
  if (completedLevels.size === 32 && !window._ach32) {
    window._ach32 = true;
    showAchievement('Phase 6 Complete!', 'Two-sample tests + SLR locked in.');
    launchConfetti();
  }
  if (completedLevels.size === 38 && !window._ach38) {
    window._ach38 = true;
    showAchievement('Phase 7 Complete!', 'MLR, Simpson\'s, partial F — solid.');
    launchConfetti();
  }
  if (completedLevels.size === 43 && !window._ach43) {
    window._ach43 = true;
    showAchievement('Quiz 2 Ready!', 'Diagnostics + full workflow done.');
    launchConfetti();
  }
  if (completedLevels.size === 45 && !window._ach45) {
    window._ach45 = true;
    showAchievement('Midterm Ready!', 'On to the Lab Deep Dives.');
    launchConfetti();
  }
  if (completedLevels.size === 49 && !window._ach49) {
    window._ach49 = true;
    showAchievement('LAB MASTER!', 'All 4 Lab Deep Dives complete. Quiz 2 + labs locked in.');
    launchConfetti();
  }
  if (completedLevels.size === 55 && !window._ach55) {
    window._ach55 = true;
    showAchievement('ESL PRACTICE BANK COMPLETE!', 'Simple language + math language + 90+ practice Qs all done.');
    launchConfetti();
  }
  if (completedLevels.size === 59 && !window._ach59) {
    window._ach59 = true;
    showAchievement('FULL GUIDE MASTERED!', 'Quiz 1 + Quiz 2 ESL banks done. You have seen every concept twice.');
    launchConfetti();
  }
  if (completedLevels.size === 64 && !window._ach64) {
    window._ach64 = true;
    showAchievement('LAB 6 MASTER!', 'Interactions + partial F — fully understood. You are ready for Quiz 2.');
    launchConfetti();
  }
  if (completedLevels.size === 68 && !window._ach68) {
    window._ach68 = true;
    showAchievement('SURVIVAL KIT COMPLETE!', 'You can now read any R line in this guide. Beginner mode mastered.');
    launchConfetti();
  }
  if (completedLevels.size === TOTAL_LEVELS && !window._achAll) {
    window._achAll = true;
    showAchievement('MIDTERM READY!', 'You completed everything. Go crush it Maxime!');
    launchConfetti();
  }
  if (xp >= 500 && !window._ach500) {
    window._ach500 = true;
    showAchievement('500 XP Club!', 'Halfway there!');
  }
  if (xp >= 1500 && !window._ach1500) {
    window._ach1500 = true;
    showAchievement('1500 XP Club!', 'Regression mastered!');
  }
}

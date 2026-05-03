// ===== QUIZ HANDLING =====
// Wires every .quiz-box on the page: click handlers for options, scoring, streak tracking.

document.querySelectorAll('.quiz-box').forEach(box => {
  const correctIdx = parseInt(box.getAttribute('data-answer'));
  const opts = box.querySelectorAll('.quiz-opt');
  const resultDiv = box.querySelector('.quiz-result');
  let answered = false;

  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      totalQuizzes++;

      const chosenIdx = parseInt(opt.getAttribute('data-i'));
      const isCorrect = chosenIdx === correctIdx;

      if (isCorrect) {
        opt.classList.add('correct');
        resultDiv.className = 'quiz-result show pass';
        correctQuizzes++;
        streak++;
        addXP(10);
        if (streak % 5 === 0) {
          showAchievement('Streak x' + streak + '!', 'You got ' + streak + ' in a row!');
          launchConfetti();
        }
      } else {
        opt.classList.add('wrong');
        opts[correctIdx].classList.add('correct');
        resultDiv.className = 'quiz-result show fail';
        streak = 0;
      }

      opts.forEach(o => {
        if (!o.classList.contains('correct') && !o.classList.contains('wrong')) o.classList.add('disabled');
      });

      resultDiv.textContent = (isCorrect ? 'Correct! ' : 'Not quite. ') + resultDiv.getAttribute('data-explain');
      updateDisplay();
    });
  });
});

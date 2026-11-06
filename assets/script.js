// Standalone site interactions. No tracker, backend or third-party framework required.
(() => {
  const options = [...document.querySelectorAll('.answer-option')];
  const feedback = document.getElementById('demo-feedback');
  const reset = document.getElementById('demo-reset');
  if (options.length && feedback && reset) {
    options.forEach(option => option.addEventListener('click', () => {
      const correct = option.dataset.answer === 'plausible';
      options.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.answer === 'plausible') btn.dataset.state = 'correct';
      });
      if (!correct) option.dataset.state = 'wrong';
      feedback.textContent = correct
        ? 'Exactly. “Plausible” means reasonable or believable.'
        : 'Not quite. “Plausible” means reasonable or believable.';
      feedback.classList.toggle('correct', correct);
      reset.hidden = false;
    }));
    reset.addEventListener('click', () => {
      options.forEach(btn => { btn.disabled = false; delete btn.dataset.state; });
      feedback.textContent = 'Pick an answer to see instant feedback.';
      feedback.classList.remove('correct');
      reset.hidden = true;
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const opening = mobileNav.hidden;
      mobileNav.hidden = !opening;
      menuToggle.setAttribute('aria-expanded', String(opening));
      menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // A small optional routing check for the homepage. Answers are calculated in-browser.
  const dialog = document.getElementById('check-dialog');
  if (!dialog) return;
  const title = document.getElementById('check-question');
  const choiceContainer = document.getElementById('check-options');
  const back = document.getElementById('check-back');
  const progress = document.getElementById('check-progress-fill');
  const result = document.getElementById('check-result');
  const questions = [
    { question: 'What feels hardest when you practise English?', answers: [
      { text: 'Choosing words and building accurate sentences', score: -1 },
      { text: 'Working quickly and knowing what each exam task expects', score: 1 },
      { text: 'A bit of both', score: 0 }
    ] },
    { question: 'What would help you most right now?', answers: [
      { text: 'Focused practice with grammar, vocabulary or writing arguments', score: -1 },
      { text: 'Trying TOEFL-style tasks with feedback and timing', score: 1 },
      { text: 'I’m not sure yet', score: 0 }
    ] },
    { question: 'How familiar are you with the TOEFL tasks?', answers: [
      { text: 'I know the format, but my language skills need work', score: -1 },
      { text: 'My English is solid; I need exam-specific practice', score: 1 },
      { text: 'I’m still exploring both', score: 0 }
    ] }
  ];
  let current = 0; const selected = [];
  function render() {
    result.hidden = true; choiceContainer.hidden = false;
    title.hidden = false;
    progress.style.width = `${current / questions.length * 100}%`;
    back.hidden = current === 0;
    title.textContent = `${current + 1}. ${questions[current].question}`;
    choiceContainer.replaceChildren();
    for (const [index, item] of questions[current].answers.entries()) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'check-choice';
      button.textContent = item.text;
      button.addEventListener('click', () => {
        selected[current] = index;
        current += 1;
        if (current < questions.length) render(); else showResult();
      });
      choiceContainer.append(button);
    }
  }
  function showResult() {
    progress.style.width = '100%'; back.hidden = false;
    title.hidden = true; choiceContainer.hidden = true; result.hidden = false;
    const score = selected.reduce((sum, choice, i) => sum + questions[i].answers[choice].score, 0);
    const skills = score < 0;
    const heading = skills ? 'Start with Skill Builders' : 'Start with Test Practice';
    const detail = skills
      ? 'Build confidence with focused grammar, vocabulary, typing and argument drills. Then return to the exam tasks whenever you feel ready.'
      : 'Try TOEFL task types at your own pace first, then add timed practice. You can use Skill Builders whenever you notice a gap.';
    const href = skills ? 'skill-builders.html' : 'test-practice.html';
    result.replaceChildren();
    const h3 = document.createElement('h3'); h3.textContent = heading;
    const p = document.createElement('p'); p.textContent = detail;
    const a = document.createElement('a'); a.href = href; a.className = 'btn btn-primary'; a.textContent = 'Explore this path →';
    result.append(h3,p,a);
  }
  document.querySelectorAll('[data-open-check]').forEach(button => button.addEventListener('click', () => {
    current = 0; selected.length = 0; render(); dialog.showModal();
  }));
  document.querySelectorAll('[data-close-check]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', evt => { if (evt.target === dialog) dialog.close(); });
  back.addEventListener('click', () => { current = Math.max(0, current - 1); render(); });
})();

// UI sound design: entirely optional and initially OFF. The first toggle click
// satisfies browsers' user-gesture requirement for audio playback.
(() => {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;
  let enabled = false;
  let audioContext;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  function tone(freq, duration, when = 0, volume = 0.012, type = 'sine') {
    if (!enabled || !AudioContextClass) return;
    try {
      audioContext ??= new AudioContextClass();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      const start = audioContext.currentTime + when;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.00001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.00001, start + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.015);
    } catch (_) { /* If audio is restricted, the page remains fully functional. */ }
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Disable optional interface sounds' : 'Enable optional interface sounds');
    toggle.title = enabled ? 'Sounds on — click to mute' : 'Optional sounds (off by default)';
    document.getElementById('sound-toggle-label').textContent = enabled ? 'Sound on' : 'Sound off';
    if (enabled) tone(620, 0.08, 0, 0.012);
  });

  // A delicate hover tick; no repeating audio while a button remains hovered.
  document.addEventListener('pointerover', event => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const target = event.target.closest('button:not(:disabled), a.btn');
    if (!target || target === toggle || target.contains(event.relatedTarget)) return;
    tone(450, 0.04, 0, 0.004);
  });
  document.addEventListener('click', event => {
    const btn = event.target.closest('button:not(#sound-toggle), a.btn');
    if (!btn || !enabled) return;
    const answer = btn.closest('.answer-option');
    if (answer) {
      const correct = answer.dataset.answer === 'plausible';
      if (correct) { tone(523, 0.11, 0, 0.017); tone(784, 0.16, 0.10, 0.014); }
      else tone(270, 0.12, 0, 0.011);
    } else tone(390, 0.065, 0, 0.009);
  });
})();

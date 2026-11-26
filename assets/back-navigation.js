/* Shared navigation for Dasha English TOEFL Practice Lab. */
(() => {
  if (document.getElementById('dasha-back-navigation')) return;
  const path = location.pathname.toLowerCase();
  const file = path.split('/').pop() || 'index.html';
  const inTrainers = /\/trainers\//.test(path);
  const inLabs = /\/labs\//.test(path);
  const inExercises = /\/exercises\//.test(path);
  const prefix = (inTrainers || inLabs || inExercises) ? '../' : '';
  if (file === 'index.html' && !inTrainers && !inLabs && !inExercises) return;
  const link = (href,label) => ({href:prefix+href,label});
  let parent = link('index.html','Practice Lab');
  let upper = null;
  if (inLabs) {
    const testCategory = ['reading.html','listening.html','speaking.html','writing.html'].includes(file);
    parent = link(testCategory?'test-practice.html':'skill-builders.html',testCategory?'Test Practice':'Skill Builders');
    upper = link('index.html','Practice Lab');
  } else if (inTrainers || inExercises) {
    if (/en-em|vocab/.test(file)) {
      parent = link('labs/vocabulary.html','Vocabulary Lab');
      upper = link('skill-builders.html','All Skill Builders');
    } else if (/complete-the-words/.test(file)) {
      parent = link('skill-builders.html','Skill Builders');
      upper = link('index.html','Practice Lab');
    } else if (/listening|reading|speaking|writing|test/.test(file)) {
      parent = link('test-practice.html','Test Practice');
      upper = link('index.html','Practice Lab');
    } else {
      parent = link('skill-builders.html','Skill Builders');
      upper = link('index.html','Practice Lab');
    }
  } else if (file === 'reading-tests.html') {
    parent = link('test-practice.html','Test Practice');
    upper = link('index.html','Practice Lab');
  }
  const nav = document.createElement('nav');
  nav.id = 'dasha-back-navigation';
  nav.setAttribute('aria-label','Back to Practice Lab sections');
  nav.style.cssText = 'box-sizing:border-box;width:100%;padding:11px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 20px;background:#edf5f8;border-bottom:1px solid #d5e5ea;color:#164257;font:600 13px/1.5 Inter,system-ui,-apple-system,Segoe UI,sans-serif;position:relative;z-index:5;';
  function add(item,isPrimary) {
    if (!item) return;
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = (isPrimary?'← ':'')+item.label;
    a.style.cssText='color:#164d69;text-decoration:underline;text-underline-offset:3px;padding:4px 2px;white-space:normal;';
    a.addEventListener('focus',()=>a.style.outline='2px solid #2087b5');
    a.addEventListener('blur',()=>a.style.outline='');
    nav.appendChild(a);
  }
  add(parent,true);
  add(upper,false);
  if (upper && upper.href !== prefix+'index.html') add(link('index.html','Practice Lab'),false);
  document.body.insertBefore(nav, document.body.firstChild);
})();
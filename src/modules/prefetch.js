import { historia, translatorState, vivisekcjaState, deadCodeState, badPatternsState } from './state.js';

let _saveHistoria    = () => {};
let _refreshHistoria = () => {};

export function initPrefetch(deps) {
  _saveHistoria    = deps.saveHistoria;
  _refreshHistoria = deps.refreshHistoriaIfVisible;
}

export function prefetchAll(code, fileName) {
  prefetchTranslator(code, fileName);
  prefetchVivisekcja(code, fileName);
  prefetchDeadCode(code, fileName);
  prefetchBadPatterns(code, fileName);
}

function findIdx(fileName) {
  return historia.findIndex(h => h.nazwa === fileName);
}

function prefetchTranslator(code, fileName) {
  fetch('http://localhost:8000/translator/explain-lines', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      translatorState.data     = data.lines;
      translatorState.snapshot = code;
      translatorState.cache[code] = data.lines;
      const idx = findIdx(fileName);
      if (idx >= 0) { historia[idx].translatorData = data.lines; _saveHistoria(); _refreshHistoria(); }
    })
    .catch(() => {});
}

function prefetchVivisekcja(code, fileName) {
  fetch('http://localhost:8000/vivisekcja/analyze', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      vivisekcjaState.cache    = data.markdown;
      vivisekcjaState.snapshot = code;
      const idx = findIdx(fileName);
      if (idx >= 0) {
        historia[idx].vivisekcjaData = data.markdown;
        const firstLine = data.markdown.split('\n').find(l => l.trim() && !l.startsWith('#')) || '';
        if (firstLine) historia[idx].opis = firstLine.replace(/\*\*/g, '').trim();
        _saveHistoria(); _refreshHistoria();
      }
    })
    .catch(() => {});
}

function prefetchDeadCode(code, fileName) {
  fetch('http://localhost:8000/dead-code/detect', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      deadCodeState.cache    = data.dead;
      deadCodeState.snapshot = code;
      const badge = document.querySelector('.dead-code-badge');
      if (badge && data.dead.length > 0) { badge.textContent = data.dead.length; badge.style.display = ''; }
      const idx = findIdx(fileName);
      if (idx >= 0) {
        historia[idx].deadCodeData = data.dead;
        historia[idx].problemy = data.dead.map(d => '💀 ' + d.label + ' (linia ' + d.lines[0] + ')');
        historia[idx].bledy    = data.dead.length;
        _saveHistoria(); _refreshHistoria();
      }
    })
    .catch(() => {});
}

function prefetchBadPatterns(code, fileName) {
  fetch('http://localhost:8000/bad-patterns/detect', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      badPatternsState.cache    = data.issues;
      badPatternsState.snapshot = code;
      const badge = document.querySelector('.bad-patterns-badge');
      if (badge && data.issues.length > 0) { badge.textContent = data.issues.length; badge.style.display = ''; }
      const idx = findIdx(fileName);
      if (idx >= 0) {
        const critical = data.issues.filter(i => i.severity === 'critical' || i.severity === 'high');
        const warnings = data.issues.filter(i => i.severity === 'medium'   || i.severity === 'low');
        historia[idx].badPatternsData = data.issues;
        historia[idx].problemy = (historia[idx].problemy || []).concat(critical.map(i => '⚠️ [' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'));
        historia[idx].sugestie = warnings.map(i => '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')');
        historia[idx].ostrzezenia = warnings.length;
        _saveHistoria(); _refreshHistoria();
      }
    })
    .catch(() => {});
}

import { badPatternsState, historia } from './state.js';

let _getOriginalCodeText = () => '';
let _saveHistoria        = () => {};
let _refreshHistoria     = () => {};

export function initBadPatterns(deps) {
  _getOriginalCodeText = deps.getOriginalCodeText;
  _saveHistoria        = deps.saveHistoria;
  _refreshHistoria     = deps.refreshHistoriaIfVisible;
}

const SEVERITY_COLOR = { critical: '#ef4444', high: '#f97316', medium: '#f59e0b', low: '#94a3b8' };
const SEVERITY_LABEL = { critical: '🔴 Krytyczny', high: '🟠 Wysoki', medium: '🟡 Średni', low: '⚪ Niski' };
const CATEGORY_ICON  = { security: '🔒', reliability: '⚙️', maintainability: '🧹', performance: '⚡', best_practices: '📐' };

export function toggleBadPatterns() {
  badPatternsState.active = true;
  const currentCode = _getOriginalCodeText();
  if (badPatternsState.cache && badPatternsState.snapshot === currentCode) {
    applyBadPatternResults(badPatternsState.cache);
    return;
  }
  showBadPatternsLoading();
  fetchBadPatterns(currentCode);
}

function fetchBadPatterns(code) {
  fetch('http://localhost:8000/bad-patterns/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      badPatternsState.cache    = data.issues;
      badPatternsState.snapshot = code;
      applyBadPatternResults(data.issues);
      if (historia.length > 0) {
        const critical = data.issues.filter(i => i.severity === 'critical' || i.severity === 'high');
        const warnings = data.issues.filter(i => i.severity === 'medium' || i.severity === 'low');
        historia[0].badPatternsData = data.issues;
        historia[0].problemy    = (historia[0].problemy || []).concat(critical.map(i => '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'));
        historia[0].sugestie    = (historia[0].sugestie  || []).concat(warnings.map(i => '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'));
        historia[0].bledy       = (historia[0].bledy       || 0) + critical.length;
        historia[0].ostrzezenia = (historia[0].ostrzezenia || 0) + warnings.length;
        _saveHistoria();
        _refreshHistoria();
      }
    })
    .catch(showBadPatternsError);
}

export function applyBadPatternResults(issues) {
  clearBadPatternHighlights();
  if (issues.length === 0) { showBadPatternsPanel([]); return; }
  const lineMap = {};
  issues.forEach(issue => issue.lines.forEach(n => {
    if (!lineMap[n] || severityVal(issue.severity) < severityVal(lineMap[n].severity)) lineMap[n] = issue;
  }));
  document.querySelectorAll('#editor .code-line').forEach(function(el, idx) {
    if (lineMap[idx + 1]) {
      el.classList.add('bad-pattern-highlight');
      el.style.setProperty('--bad-color', SEVERITY_COLOR[lineMap[idx + 1].severity] || '#f59e0b');
    }
  });
  const badge = document.querySelector('.bad-patterns-badge');
  if (badge) { badge.textContent = issues.length; badge.style.display = ''; }
  showBadPatternsPanel(issues);
}

export function clearBadPatternHighlights() {
  document.querySelectorAll('#editor .code-line.bad-pattern-highlight').forEach(el => { el.classList.remove('bad-pattern-highlight'); el.style.removeProperty('--bad-color'); });
  document.querySelectorAll('#editor .code-line.bad-pattern-pulse').forEach(el => el.classList.remove('bad-pattern-pulse'));
}

function severityVal(s) { return { critical: 0, high: 1, medium: 2, low: 3 }[s] || 3; }

function showBadPatternsLoading() {
  const panel = document.getElementById('panel-body');
  if (panel) panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Analizuję wzorce...</div>';
}

function showBadPatternsError() {
  const panel = document.getElementById('panel-body');
  if (panel) panel.innerHTML = '<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>';
  badPatternsState.active = false;
}

function showBadPatternsPanel(issues) {
  const panel = document.getElementById('panel-body');
  if (!panel) return;
  if (issues.length === 0) {
    panel.innerHTML = '<div class="analysis-card ok"><div class="card-title">✅ Brak złych wzorców</div><div class="card-desc">Kod wygląda czysto we wszystkich 5 kategoriach.</div></div>';
    return;
  }
  panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">⚠️ Znaleziono ' + issues.length + ' problem' + (issues.length > 1 ? 'ów' : '') + ':</div>' +
    issues.map(function(issue) {
      const sev = issue.severity || 'medium';
      const color = SEVERITY_COLOR[sev] || '#f59e0b';
      const linesText = issue.lines.length === 1 ? 'linia ' + issue.lines[0] : 'linie ' + issue.lines[0] + '–' + issue.lines[issue.lines.length - 1];
      return '<div class="analysis-card" style="border-left:3px solid ' + color + ';cursor:pointer;" onclick="highlightBadPatternLines(' + JSON.stringify(issue.lines) + ')">' +
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
        '<span style="font-size:10px;color:' + color + ';font-weight:600">' + SEVERITY_LABEL[sev] + '</span>' +
        '<span style="font-size:10px;color:#4a5568">' + (CATEGORY_ICON[issue.category] || '⚠️') + ' ' + issue.category + '</span>' +
        '</div>' +
        '<div class="card-title">' + issue.label + '</div>' +
        '<div class="card-desc">' + issue.reason + '</div>' +
        (issue.fix ? '<div class="card-desc" style="margin-top:4px;color:#22c55e;font-size:11px;">💡 ' + issue.fix + '</div>' : '') +
        '<div class="card-line">→ ' + linesText + '</div></div>';
    }).join('');
}

export function highlightBadPatternLines(lines) {
  document.querySelectorAll('#editor .code-line.bad-pattern-pulse').forEach(el => el.classList.remove('bad-pattern-pulse'));
  const editorLines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(n) {
    const el = editorLines[n - 1];
    if (el) { el.classList.add('bad-pattern-pulse'); if (n === lines[0]) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
}

export function resetBadPatterns() {
  badPatternsState.active   = false;
  badPatternsState.cache    = null;
  badPatternsState.snapshot = null;
  clearBadPatternHighlights();
  const badge = document.querySelector('.bad-patterns-badge');
  if (badge) { badge.textContent = ''; badge.style.display = 'none'; }
}

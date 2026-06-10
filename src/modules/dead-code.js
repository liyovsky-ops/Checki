import { deadCodeState, historia } from './state.js';

let _getOriginalCodeText = () => '';
let _saveHistoria        = () => {};
let _refreshHistoria     = () => {};

export function initDeadCode(deps) {
  _getOriginalCodeText = deps.getOriginalCodeText;
  _saveHistoria        = deps.saveHistoria;
  _refreshHistoria     = deps.refreshHistoriaIfVisible;
}

export function toggleDeadCode() {
  deadCodeState.active = true;
  const currentCode = _getOriginalCodeText();
  if (deadCodeState.cache && deadCodeState.snapshot === currentCode) {
    applyDeadCodeResults(deadCodeState.cache);
    return;
  }
  showDeadCodeLoading();
  fetchDeadCode(currentCode);
}

function fetchDeadCode(code) {
  fetch('http://localhost:8000/dead-code/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      deadCodeState.cache    = data.dead;
      deadCodeState.snapshot = code;
      applyDeadCodeResults(data.dead);
      if (historia.length > 0) {
        historia[0].deadCodeData = data.dead;
        historia[0].problemy = (historia[0].problemy || []).concat(
          data.dead.map(d => d.label + ' (linia ' + d.lines[0] + ')')
        );
        historia[0].bledy = (historia[0].bledy || 0) + data.dead.length;
        _saveHistoria();
        _refreshHistoria();
      }
    })
    .catch(showDeadCodeError);
}

export function applyDeadCodeResults(dead) {
  clearDeadCodeHighlights();
  if (dead.length === 0) { showDeadCodePanel([]); return; }
  const deadLines = {};
  dead.forEach(item => item.lines.forEach(n => (deadLines[n] = item)));
  document.querySelectorAll('#editor .code-line').forEach(function(el, idx) {
    if (deadLines[idx + 1]) el.classList.add('dead-highlight');
  });
  const badge = document.querySelector('.dead-code-badge');
  if (badge) { badge.textContent = dead.length; badge.style.display = ''; }
  showDeadCodePanel(dead);
}

export function clearDeadCodeHighlights() {
  document.querySelectorAll('#editor .code-line.dead-highlight').forEach(el => el.classList.remove('dead-highlight'));
}

function showDeadCodeLoading() {
  const panel = document.getElementById('panel-body');
  if (panel) panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Szukam martwego kodu...</div>';
}

function showDeadCodeError() {
  const panel = document.getElementById('panel-body');
  if (panel) panel.innerHTML = '<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>';
  deadCodeState.active = false;
}

function showDeadCodePanel(dead) {
  const panel = document.getElementById('panel-body');
  if (!panel) return;
  if (dead.length === 0) {
    panel.innerHTML = '<div class="analysis-card ok"><div class="card-title">✅ Brak martwego kodu</div><div class="card-desc">Nie znaleziono nieużywanego ani nieosiągalnego kodu.</div></div>';
    return;
  }
  panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">💀 Znaleziono ' + dead.length + ' problem' + (dead.length > 1 ? 'y' : '') + ':</div>' +
    dead.map(function(item) {
      const linesText = item.lines.length === 1 ? 'linia ' + item.lines[0] : 'linie ' + item.lines[0] + '–' + item.lines[item.lines.length - 1];
      return '<div class="analysis-card error" style="cursor:pointer;" onclick="highlightDeadLines(' + JSON.stringify(item.lines) + ')">' +
        '<div class="card-title">💀 ' + item.label + '</div>' +
        '<div class="card-desc">' + item.reason + '</div>' +
        '<div class="card-line">→ ' + linesText + '</div></div>';
    }).join('');
}

export function highlightDeadLines(lines) {
  document.querySelectorAll('#editor .code-line.dead-pulse').forEach(el => el.classList.remove('dead-pulse'));
  const editorLines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(n) {
    const el = editorLines[n - 1];
    if (el) { el.classList.add('dead-pulse'); if (n === lines[0]) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
}

export function resetDeadCode() {
  deadCodeState.active   = false;
  deadCodeState.cache    = null;
  deadCodeState.snapshot = null;
  clearDeadCodeHighlights();
  const badge = document.querySelector('.dead-code-badge');
  if (badge) { badge.textContent = ''; badge.style.display = 'none'; }
}

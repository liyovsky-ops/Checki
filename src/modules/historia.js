import { historia, CODE_LINES, translatorState, vivisekcjaState, deadCodeState, badPatternsState } from './state.js';

const HISTORIA_KEY = 'checki_historia';

let historiaCurrentView = -2;

// Callbacks injected by main.js
let _highlightLine       = (raw) => raw;
let _renderEditor        = () => {};
let _getOriginalCodeText = () => '';
let _resetDeadCode       = () => {};
let _resetBadPatterns    = () => {};
let _applyDeadCodeResults    = () => {};
let _applyBadPatternResults  = () => {};

export function initHistoria(deps) {
  _highlightLine          = deps.highlightLine;
  _renderEditor           = deps.renderEditor;
  _getOriginalCodeText    = deps.getOriginalCodeText;
  _resetDeadCode          = deps.resetDeadCode;
  _resetBadPatterns       = deps.resetBadPatterns;
  _applyDeadCodeResults   = deps.applyDeadCodeResults;
  _applyBadPatternResults = deps.applyBadPatternResults;
}

export function loadHistoria() {
  try {
    const saved = localStorage.getItem(HISTORIA_KEY);
    const items = saved ? JSON.parse(saved) : [];
    historia.length = 0;
    items.forEach(i => historia.push(i));
  } catch (e) {}
}

export function saveHistoria() {
  try { localStorage.setItem(HISTORIA_KEY, JSON.stringify(historia)); } catch (e) {}
}

export function refreshHistoriaIfVisible() {
  if (historiaCurrentView === -1) showHistoria();
  else if (historiaCurrentView >= 0) showHistoriaDetail(historiaCurrentView);
}

export function showHistoria() {
  historiaCurrentView = -1;
  const panel = document.getElementById('panel-body');
  if (historia.length === 0) {
    panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">Brak historii — wgraj plik aby zacząć.</div>';
    return;
  }
  panel.innerHTML =
    '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Ostatnio analizowane pliki</div>' +
    historia.map(function(h, i) {
      const analyzing = h.opis === 'Wgrany plik — analiza w toku.';
      const cls = h.bledy > 0 ? 'error' : h.ostrzezenia > 0 ? 'warn' : 'ok';
      return '<div class="analysis-card ' + cls + '" style="cursor:pointer;transition:transform 0.1s;" ' +
        'onclick="showHistoriaDetail(' + i + ')" onmouseover="this.style.transform=\'translateX(3px)\'" onmouseout="this.style.transform=\'translateX(0)\'">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
        '<div class="card-title" style="flex:1">📄 ' + h.nazwa + '</div>' +
        '<span style="font-size:10px;background:#0f1117;padding:2px 8px;border-radius:10px;color:#94a3b8">' + h.jezyk + '</span>' +
        '</div>' +
        '<div class="card-desc">' + (analyzing ? '⏳ Analiza w toku...' : h.opis) + '</div>' +
        '<div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;align-items:center;">' +
        '<span style="font-size:11px;color:#4a5568">🕓 ' + h.data + '</span>' +
        '<span style="font-size:11px;color:#4a5568">' + h.linie + ' linii</span>' +
        statusBadges(h) + '</div></div>';
    }).join('');
}

function statusBadges(h) {
  let out = '';
  if (h.bledy > 0)       out += '<span style="font-size:11px;color:#ef4444">● ' + h.bledy + ' błędów</span>';
  if (h.ostrzezenia > 0) out += '<span style="font-size:11px;color:#f59e0b">● ' + h.ostrzezenia + ' ostrzeżeń</span>';
  if (h.bledy === 0 && h.ostrzezenia === 0 && h.opis !== 'Wgrany plik — analiza w toku.') {
    out += '<span style="font-size:11px;color:#22c55e">● Czysto</span>';
  }
  return out;
}

export function showHistoriaDetail(i) {
  historiaCurrentView = i;
  const h = historia[i];
  const panel = document.getElementById('panel-body');
  const analyzing = h.opis === 'Wgrany plik — analiza w toku.';
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">' +
    '<button onclick="showHistoria()" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">← Wróć</button>' +
    '<span style="font-size:13px;font-weight:600;color:#e2e8f0">📄 ' + h.nazwa + '</span>' +
    '<span style="font-size:10px;background:#1a1d2e;padding:2px 8px;border-radius:10px;color:#94a3b8;border:1px solid #2d3148">' + h.jezyk + '</span>' +
    (h.kod ? '<button onclick="loadKodFromHistoria(' + i + ')" style="margin-left:auto;background:#4f46e5;border:none;color:#fff;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">⬆ Wczytaj</button>' : '') +
    '</div>' +
    '<div class="analysis-card ok">' +
    '<div class="card-title">📋 Co zawiera kod?</div>' +
    '<div class="card-desc">' + (analyzing ? '⏳ Trwa analiza...' : h.opis) + '</div>' +
    '<div style="display:flex;gap:12px;margin-top:8px;">' +
    '<span style="font-size:11px;color:#4a5568">🕓 ' + h.data + '</span>' +
    '<span style="font-size:11px;color:#4a5568">📏 ' + h.linie + ' linii</span>' +
    '</div></div>' +
    renderAnalysisStatus(h, i) +
    (h.problemy && h.problemy.length > 0
      ? '<div class="analysis-card error"><div class="card-title">🔴 Problemy (' + h.problemy.length + ')</div>' +
        h.problemy.map(p => '<div class="card-desc" style="margin-top:6px;">• ' + p + '</div>').join('') + '</div>'
      : (!analyzing ? '<div class="analysis-card ok"><div class="card-title">✅ Brak błędów</div><div class="card-desc">Nie wykryto krytycznych problemów.</div></div>' : '')) +
    (h.sugestie && h.sugestie.length > 0
      ? '<div class="analysis-card warn"><div class="card-title">💡 Sugestie (' + h.sugestie.length + ')</div>' +
        h.sugestie.map(s => '<div class="card-desc" style="margin-top:6px;">• ' + s + '</div>').join('') + '</div>'
      : '');
}

function renderAnalysisStatus(h, i) {
  function row(icon, label, done, extra) {
    return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #1a1d2e;">' +
      '<span style="font-size:13px">' + icon + '</span>' +
      '<span style="font-size:12px;color:#e2e8f0;flex:1">' + label + '</span>' +
      (done
        ? '<span style="font-size:11px;color:#22c55e">✓ Gotowe' + (extra ? ' · ' + extra : '') + '</span>'
        : '<span style="font-size:11px;color:#4a5568">⏳ ładowanie...</span>') +
      '</div>';
  }
  const deadCount = h.deadCodeData ? h.deadCodeData.length : null;
  const badCount  = h.badPatternsData ? h.badPatternsData.length : null;
  return '<div class="analysis-card" style="margin-bottom:8px;">' +
    '<div class="card-title" style="margin-bottom:6px;">📊 Status analiz</div>' +
    row('📄', 'Tłumacz kodu', !!h.translatorData) +
    row('🔬', 'Vivisekcja', !!h.vivisekcjaData) +
    row('💀', 'Martwy kod', deadCount !== null, deadCount !== null ? (deadCount > 0 ? deadCount + ' problemów' : 'czysto') : '') +
    row('⚠️', 'Złe wzorce', badCount !== null, badCount !== null ? (badCount > 0 ? badCount + ' problemów' : 'czysto') : '') +
    (h.translatorData
      ? '<div style="margin-top:8px;"><button onclick="openTranslatorFromHistoria(historia[' + i + '].translatorData)" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px;font-family:inherit">📄 Otwórz tłumaczenie</button></div>'
      : '') +
    '</div>';
}

export function addToHistoria(nazwa, linie, kodText) {
  const now = new Date();
  const godzina = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  if (historia.length > 0 && historia[0].nazwa === nazwa) {
    if (kodText) historia[0].kod = kodText;
    historia[0].translatorData = null;
    historia[0].vivisekcjaData = null;
    historia[0].deadCodeData   = null;
    historia[0].badPatternsData = null;
    historia[0].problemy = [];
    historia[0].sugestie = [];
    historia[0].bledy = 0;
    historia[0].ostrzezenia = 0;
    historia[0].opis = 'Wgrany plik — analiza w toku.';
    saveHistoria();
    return;
  }
  historia.unshift({
    nazwa, jezyk: guessLanguage(nazwa),
    data: 'dzisiaj, ' + godzina, linie, bledy: 0, ostrzezenia: 0,
    opis: 'Wgrany plik — analiza w toku.',
    problemy: [], sugestie: [],
    translatorData: null, vivisekcjaData: null,
    deadCodeData: null, badPatternsData: null,
    kod: kodText || null,
  });
  if (historia.length > 20) historia.splice(20);
  saveHistoria();
}

export function loadKodFromHistoria(i) {
  const h = historia[i];
  if (!h.kod) return;
  const ext = h.nazwa.split('.').pop().toLowerCase();
  const lines = h.kod.split('\n');
  CODE_LINES.length = 0;
  lines.forEach(line => CODE_LINES.push({ code: _highlightLine(line, ext), tip: null }));
  const fileTab = document.querySelector('.file-tab');
  if (fileTab) fileTab.textContent = '📄 ' + h.nazwa;
  _resetDeadCode();
  _resetBadPatterns();
  _renderEditor();
  const currentCode = _getOriginalCodeText();
  translatorState.data     = h.translatorData || null;
  translatorState.snapshot = h.translatorData ? currentCode : null;
  if (h.translatorData) translatorState.cache[currentCode] = h.translatorData;
  vivisekcjaState.cache    = h.vivisekcjaData  || null;
  vivisekcjaState.snapshot = h.vivisekcjaData  ? currentCode : null;
  if (h.deadCodeData && h.deadCodeData.length > 0) {
    deadCodeState.cache    = h.deadCodeData;
    deadCodeState.snapshot = currentCode;
    deadCodeState.active   = true;
    _applyDeadCodeResults(h.deadCodeData);
  }
  if (h.badPatternsData && h.badPatternsData.length > 0) {
    badPatternsState.cache    = h.badPatternsData;
    badPatternsState.snapshot = currentCode;
    badPatternsState.active   = true;
    _applyBadPatternResults(h.badPatternsData);
  }
  historiaCurrentView = -2;
  showHistoria();
}

function guessLanguage(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return { py: 'Python', js: 'JavaScript', ts: 'TypeScript', html: 'HTML', css: 'CSS', json: 'JSON', txt: 'Text' }[ext] || ext.toUpperCase();
}

loadHistoria();

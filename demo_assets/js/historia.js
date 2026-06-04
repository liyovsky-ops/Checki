// Historia analizowanych plików — dane i renderowanie

var HISTORIA_KEY = 'checki_historia';

function loadHistoria() {
  try {
    var saved = localStorage.getItem(HISTORIA_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch(e) {
    return [];
  }
}

function saveHistoria() {
  try {
    localStorage.setItem(HISTORIA_KEY, JSON.stringify(historia));
  } catch(e) {}
}

var historia = loadHistoria();

// Śledzi aktualny widok historii (-1 = lista, 0+ = detail)
var historiaCurrentView = -2; // -2 = niewidoczna

function refreshHistoriaIfVisible() {
  if (historiaCurrentView === -1) showHistoria();
  else if (historiaCurrentView >= 0) showHistoriaDetail(historiaCurrentView);
}

function showHistoria() {
  historiaCurrentView = -1;
  var panel = document.getElementById('panel-body');
  if (historia.length === 0) {
    panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">Brak historii — wgraj plik aby zacząć.</div>';
    return;
  }
  panel.innerHTML =
    '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Ostatnio analizowane pliki</div>' +
    historia.map(function(h, i) {
      var analyzing = h.opis === 'Wgrany plik — analiza w toku.';
      var cls = h.bledy > 0 ? 'error' : h.ostrzezenia > 0 ? 'warn' : 'ok';
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
        statusBadges(h) +
        '</div></div>';
    }).join('');
}

function statusBadges(h) {
  var out = '';
  if (h.bledy > 0)        out += '<span style="font-size:11px;color:#ef4444">● ' + h.bledy + ' błędów</span>';
  if (h.ostrzezenia > 0)  out += '<span style="font-size:11px;color:#f59e0b">● ' + h.ostrzezenia + ' ostrzeżeń</span>';
  if (h.bledy === 0 && h.ostrzezenia === 0 && h.opis !== 'Wgrany plik — analiza w toku.') {
    out += '<span style="font-size:11px;color:#22c55e">● Czysto</span>';
  }
  return out;
}

function showHistoriaDetail(i) {
  historiaCurrentView = i;
  var h = historia[i];
  var panel = document.getElementById('panel-body');

  var analyzing = h.opis === 'Wgrany plik — analiza w toku.';

  panel.innerHTML =
    // Nagłówek
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">' +
    '<button onclick="showHistoria()" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">← Wróć</button>' +
    '<span style="font-size:13px;font-weight:600;color:#e2e8f0">📄 ' + h.nazwa + '</span>' +
    '<span style="font-size:10px;background:#1a1d2e;padding:2px 8px;border-radius:10px;color:#94a3b8;border:1px solid #2d3148">' + h.jezyk + '</span>' +
    (h.kod ? '<button onclick="loadKodFromHistoria(' + i + ')" style="margin-left:auto;background:#4f46e5;border:none;color:#fff;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">⬆ Wczytaj</button>' : '') +
    '</div>' +

    // Opis kodu
    '<div class="analysis-card ok">' +
    '<div class="card-title">📋 Co zawiera kod?</div>' +
    '<div class="card-desc">' + (analyzing ? '⏳ Trwa analiza...' : h.opis) + '</div>' +
    '<div style="display:flex;gap:12px;margin-top:8px;">' +
    '<span style="font-size:11px;color:#4a5568">🕓 ' + h.data + '</span>' +
    '<span style="font-size:11px;color:#4a5568">📏 ' + h.linie + ' linii</span>' +
    '</div></div>' +

    // Status analiz
    renderAnalysisStatus(h, i) +

    // Błędy
    (h.problemy && h.problemy.length > 0 ?
      '<div class="analysis-card error"><div class="card-title">🔴 Problemy (' + h.problemy.length + ')</div>' +
      h.problemy.map(function(p) { return '<div class="card-desc" style="margin-top:6px;">• ' + p + '</div>'; }).join('') + '</div>'
      : (!analyzing ? '<div class="analysis-card ok"><div class="card-title">✅ Brak błędów</div><div class="card-desc">Nie wykryto krytycznych problemów.</div></div>' : '')
    ) +

    // Sugestie
    (h.sugestie && h.sugestie.length > 0 ?
      '<div class="analysis-card warn"><div class="card-title">💡 Sugestie (' + h.sugestie.length + ')</div>' +
      h.sugestie.map(function(s) { return '<div class="card-desc" style="margin-top:6px;">• ' + s + '</div>'; }).join('') + '</div>'
      : ''
    );
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

  var deadCount = h.deadCodeData ? h.deadCodeData.length : null;
  var badCount  = h.badPatternsData ? h.badPatternsData.length : null;

  return '<div class="analysis-card" style="margin-bottom:8px;">' +
    '<div class="card-title" style="margin-bottom:6px;">📊 Status analiz</div>' +
    row('📄', 'Tłumacz kodu', !!h.translatorData) +
    row('🔬', 'Vivisekcja', !!h.vivisekcjaData) +
    row('💀', 'Martwy kod', deadCount !== null, deadCount !== null ? (deadCount > 0 ? deadCount + ' problemów' : 'czysto') : '') +
    row('⚠️', 'Złe wzorce', badCount !== null, badCount !== null ? (badCount > 0 ? badCount + ' problemów' : 'czysto') : '') +
    (h.translatorData ?
      '<div style="margin-top:8px;"><button onclick="openTranslatorFromHistoria(historia[' + i + '].translatorData)" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px;font-family:inherit">📄 Otwórz tłumaczenie</button></div>'
      : '') +
    '</div>';
}

function addToHistoria(nazwa, linie, kodText) {
  var now = new Date();
  var godzina = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

  if (historia.length > 0 && historia[0].nazwa === nazwa) {
    if (kodText) historia[0].kod = kodText;
    // Reset analiz przy ponownym wgraniu
    historia[0].translatorData = null;
    historia[0].vivisekcjaData = null;
    historia[0].deadCodeData = null;
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
    nazwa: nazwa,
    jezyk: guessLanguage(nazwa),
    data: 'dzisiaj, ' + godzina,
    linie: linie,
    bledy: 0,
    ostrzezenia: 0,
    opis: 'Wgrany plik — analiza w toku.',
    problemy: [],
    sugestie: [],
    translatorData: null,
    vivisekcjaData: null,
    deadCodeData: null,
    badPatternsData: null,
    kod: kodText || null
  });

  if (historia.length > 20) historia = historia.slice(0, 20);
  saveHistoria();
}

function loadKodFromHistoria(i) {
  var h = historia[i];
  if (!h.kod) return;

  var ext = h.nazwa.split('.').pop().toLowerCase();
  var lines = h.kod.split('\n');

  CODE_LINES.length = 0;
  lines.forEach(function(line) {
    CODE_LINES.push({ code: highlightLine(line, ext), tip: null });
  });

  var fileTab = document.querySelector('.file-tab');
  if (fileTab) fileTab.textContent = '📄 ' + h.nazwa;

  if (typeof resetDeadCode === 'function') resetDeadCode();
  if (typeof resetBadPatterns === 'function') resetBadPatterns();

  renderEditor();

  var currentCode = getOriginalCodeText();

  if (h.translatorData) {
    translatorData = h.translatorData;
    translatorCodeSnapshot = currentCode;
    if (typeof translationCache !== 'undefined') translationCache[currentCode] = h.translatorData;
  } else {
    translatorData = null;
    translatorCodeSnapshot = null;
  }

  if (h.vivisekcjaData) {
    vivisekcjaCache = h.vivisekcjaData;
    vivisekcjaCodeSnapshot = currentCode;
  } else {
    vivisekcjaCache = null;
    vivisekcjaCodeSnapshot = null;
  }

  if (h.deadCodeData && h.deadCodeData.length > 0) {
    deadCodeCache = h.deadCodeData;
    deadCodeSnapshot = currentCode;
    deadCodeActive = true;
    applyDeadCodeResults(h.deadCodeData);
  }

  if (h.badPatternsData && h.badPatternsData.length > 0) {
    badPatternsCache = h.badPatternsData;
    badPatternsSnapshot = currentCode;
    badPatternsActive = true;
    applyBadPatternResults(h.badPatternsData);
  }

  historiaCurrentView = -2;
  showHistoria();
}

function guessLanguage(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  var map = { py: 'Python', js: 'JavaScript', ts: 'TypeScript', html: 'HTML', css: 'CSS', json: 'JSON', txt: 'Text' };
  return map[ext] || ext.toUpperCase();
}

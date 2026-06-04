var deadCodeActive = false;
var deadCodeCache = null;
var deadCodeSnapshot = null;

function toggleDeadCode() {
  if (deadCodeActive) {
    clearDeadCodeHighlights();
    deadCodeActive = false;
    restoreDefaultPanel();
    return;
  }

  deadCodeActive = true;
  var currentCode = getOriginalCodeText();

  if (deadCodeCache && deadCodeSnapshot === currentCode) {
    applyDeadCodeResults(deadCodeCache);
    return;
  }

  showDeadCodeLoading();
  fetchDeadCode(currentCode);
}

function fetchDeadCode(code) {
  fetch('http://localhost:8000/dead-code/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    deadCodeCache = data.dead;
    deadCodeSnapshot = code;
    applyDeadCodeResults(data.dead);
  })
  .catch(function() {
    showDeadCodeError();
  });
}

function applyDeadCodeResults(dead) {
  clearDeadCodeHighlights();

  if (dead.length === 0) {
    showDeadCodePanel([]);
    return;
  }

  // Zbierz wszystkie numery linii do podświetlenia
  var deadLines = {};
  dead.forEach(function(item) {
    item.lines.forEach(function(lineNum) {
      deadLines[lineNum] = item;
    });
  });

  // Podświetl linie w edytorze
  var lines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(el, idx) {
    var lineNum = idx + 1;
    if (deadLines[lineNum]) {
      el.classList.add('dead-highlight');
    }
  });

  // Zaktualizuj badge w sidebarze
  var badge = document.querySelector('.dead-code-badge');
  if (badge) {
    badge.textContent = dead.length > 0 ? dead.length : '';
    badge.style.display = dead.length > 0 ? '' : 'none';
  }

  showDeadCodePanel(dead);
}

function clearDeadCodeHighlights() {
  document.querySelectorAll('#editor .code-line.dead-highlight').forEach(function(el) {
    el.classList.remove('dead-highlight');
  });
}

function showDeadCodeLoading() {
  var panel = document.getElementById('panel-body');
  if (!panel) return;
  panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Szukam martwego kodu...</div>';
}

function showDeadCodeError() {
  var panel = document.getElementById('panel-body');
  if (!panel) return;
  panel.innerHTML = '<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>';
  deadCodeActive = false;
}

function showDeadCodePanel(dead) {
  var panel = document.getElementById('panel-body');
  if (!panel) return;

  if (dead.length === 0) {
    panel.innerHTML =
      '<div class="analysis-card ok">' +
      '<div class="card-title">✅ Brak martwego kodu</div>' +
      '<div class="card-desc">Nie znaleziono nieużywanego ani nieosiągalnego kodu.</div>' +
      '</div>';
    return;
  }

  var html = '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">💀 Znaleziono ' + dead.length + ' problem' + (dead.length > 1 ? 'y' : '') + ':</div>';

  dead.forEach(function(item) {
    var linesText = item.lines.length === 1
      ? 'linia ' + item.lines[0]
      : 'linie ' + item.lines[0] + '–' + item.lines[item.lines.length - 1];

    html +=
      '<div class="analysis-card error" style="cursor:pointer;" onclick="highlightDeadLines(' + JSON.stringify(item.lines) + ')">' +
      '<div class="card-title">💀 ' + item.label + '</div>' +
      '<div class="card-desc">' + item.reason + '</div>' +
      '<div class="card-line">→ ' + linesText + '</div>' +
      '</div>';
  });

  panel.innerHTML = html;
}

function highlightDeadLines(lines) {
  // Pulse na konkretnych liniach po kliknięciu karty
  document.querySelectorAll('#editor .code-line.dead-pulse').forEach(function(el) {
    el.classList.remove('dead-pulse');
  });
  var editorLines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(lineNum) {
    var el = editorLines[lineNum - 1];
    if (el) {
      el.classList.add('dead-pulse');
      if (lineNum === lines[0]) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function restoreDefaultPanel() {
  var panel = document.getElementById('panel-body');
  if (!panel) return;
  panel.innerHTML = '<div style="font-size:12px; color:#4a5568; padding: 16px 0; text-align:center;">Wybierz funkcję z panelu bocznego aby zobaczyć wyniki analizy.</div>';
}

// Resetuje stan dead-code przy zmianie pliku — wywołuje editor.js po wgraniu
function resetDeadCode() {
  deadCodeActive = false;
  deadCodeCache = null;
  deadCodeSnapshot = null;
  clearDeadCodeHighlights();
  var badge = document.querySelector('.dead-code-badge');
  if (badge) { badge.textContent = ''; badge.style.display = 'none'; }
}

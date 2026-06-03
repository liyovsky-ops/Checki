var currentMode = null;

var MODE_LABELS = {
  eco:        '🌿 Eco',
  comfort:    '☕ Comfort',
  sport:      '🏎️ Sport',
  enterprise: '🏢 Enterprise',
  security:   '🔒 Security'
};

function selectMode(mode) {
  // Kliknięcie tego samego trybu → wyłącz
  if (currentMode === mode) {
    deactivateMode();
    return;
  }

  if (currentMode) {
    document.body.classList.remove('mode-' + currentMode);
  }

  currentMode = mode;
  document.body.classList.add('mode-' + mode);

  // Sidebar — aktywny przycisk
  document.querySelectorAll('.mode-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  var activeBtn = document.querySelector('.mode-btn[data-mode="' + mode + '"]');
  if (activeBtn) activeBtn.classList.add('active');

  // Pokaż zakładki edytora
  var tabs = document.getElementById('editor-mode-tabs');
  if (tabs) {
    tabs.style.display = 'flex';
    var rewrittenBtn = document.getElementById('tab-rewritten-btn');
    if (rewrittenBtn) rewrittenBtn.textContent = '✨ ' + MODE_LABELS[mode];
  }

  // Wróć do zakładki "Oryginalny" i wyczyść przepisany
  switchEditorTab('original', document.getElementById('tab-original-btn'));
  var rewrittenEditor = document.getElementById('editor-rewritten');
  if (rewrittenEditor) {
    rewrittenEditor.innerHTML =
      '<div style="color:#4a5568; font-size:12px;">Kliknij "▶ Analizuj" aby przepisać kod w trybie ' + MODE_LABELS[mode] + '...</div>';
  }

  // Statusbar
  setStatusbarMode(MODE_LABELS[mode]);
}

function deactivateMode() {
  if (currentMode) document.body.classList.remove('mode-' + currentMode);
  currentMode = null;

  document.querySelectorAll('.mode-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });

  var tabs = document.getElementById('editor-mode-tabs');
  if (tabs) tabs.style.display = 'none';

  // Wróć do widoku oryginalnego edytora
  var orig = document.getElementById('editor');
  if (orig) orig.style.display = '';
  var rewr = document.getElementById('editor-rewritten');
  if (rewr) rewr.style.display = 'none';

  var modeSpan = document.getElementById('statusbar-mode');
  if (modeSpan) modeSpan.remove();
}

function switchEditorTab(tab, clickedBtn) {
  document.querySelectorAll('.editor-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  if (clickedBtn) clickedBtn.classList.add('active');

  var orig = document.getElementById('editor');
  var rewr = document.getElementById('editor-rewritten');

  if (tab === 'original') {
    if (orig) orig.style.display = '';
    if (rewr) rewr.style.display = 'none';
  } else {
    if (orig) orig.style.display = 'none';
    if (rewr) rewr.style.display = '';
  }
}

function getOriginalCodeText() {
  return CODE_LINES.map(function(line) {
    var div = document.createElement('div');
    div.innerHTML = line.code;
    return div.textContent || div.innerText || '';
  }).join('\n');
}

function handleAnalizuj() {
  if (!currentMode) return;

  var rewrittenEditor = document.getElementById('editor-rewritten');
  if (!rewrittenEditor) return;

  // Przełącz na zakładkę "Przepisany"
  switchEditorTab('rewritten', document.getElementById('tab-rewritten-btn'));

  rewrittenEditor.innerHTML =
    '<div style="color:#94a3b8; font-size:12px;">⏳ Przepisuję kod w trybie ' + MODE_LABELS[currentMode] + '...</div>';

  fetch('http://localhost:8000/programming-mode/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: getOriginalCodeText(), mode: currentMode })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    rewrittenEditor.innerHTML = '';
    var pre = document.createElement('pre');
    pre.style.fontFamily = "'Courier New', monospace";
    pre.style.fontSize = '13px';
    pre.style.color = '#e2e8f0';
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.lineHeight = '1.6';
    pre.style.margin = '0';
    pre.textContent = data.rewritten_code;
    rewrittenEditor.appendChild(pre);
  })
  .catch(function() {
    rewrittenEditor.innerHTML =
      '<div style="color:#ef4444; font-size:12px;">❌ Nie można połączyć się z backendem. Upewnij się że serwer działa na porcie 8000.</div>';
  });
}

function setStatusbarMode(label) {
  var statusbar = document.querySelector('.statusbar');
  if (!statusbar) return;
  var modeSpan = document.getElementById('statusbar-mode');
  if (!modeSpan) {
    modeSpan = document.createElement('span');
    modeSpan.id = 'statusbar-mode';
    statusbar.insertBefore(modeSpan, statusbar.firstChild);
  }
  modeSpan.textContent = 'Tryb: ' + label;
}

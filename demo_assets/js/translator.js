var translatorOpen = false;
var translatorWandMode = false;
var translatorData = null;
var translatorCodeSnapshot = null;

// Cache globalny: kod (string) → { lines, wandMode }
var translationCache = {};

function openTranslator() {
  var drawer = document.getElementById('translator-drawer');
  if (!drawer) return;

  translatorOpen = true;
  drawer.classList.add('open');

  var currentCode = getOriginalCodeText();

  // Jeśli kod się nie zmienił i mamy dane — pokaż od razu
  if (translatorData && translatorCodeSnapshot === currentCode) {
    if (translatorWandMode) {
      renderTranslatorWand();
    } else {
      renderTranslatorFootnotes();
    }
    return;
  }

  // Sprawdź cache globalny (np. po wgraniu tego samego pliku ponownie)
  if (translationCache[currentCode]) {
    translatorData = translationCache[currentCode];
    translatorCodeSnapshot = currentCode;
    translatorWandMode = false;
    renderTranslatorFootnotes();
    return;
  }

  // Nowy kod — tłumacz od nowa
  translatorData = null;
  translatorWandMode = false;
  translatorCodeSnapshot = null;
  renderTranslatorLoading();
  fetchTranslation(currentCode);
}

function closeTranslator() {
  var drawer = document.getElementById('translator-drawer');
  if (!drawer) return;
  translatorOpen = false;
  drawer.classList.remove('open');
}

function fetchTranslation(code) {
  fetch('http://localhost:8000/translator/explain-lines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    translatorData = data.lines;
    translatorCodeSnapshot = code;
    translationCache[code] = data.lines;
    saveTranslationToHistoria(data.lines);
    renderTranslatorFootnotes();
  })
  .catch(function() {
    renderTranslatorError();
  });
}

function saveTranslationToHistoria(lines) {
  // Zapisz tłumaczenie do wpisu historii pasującego do aktualnego pliku
  var fileTab = document.querySelector('.file-tab');
  if (!fileTab) return;
  var currentFile = fileTab.textContent.replace('📄', '').trim();

  if (typeof historia === 'undefined') return;
  for (var i = 0; i < historia.length; i++) {
    if (historia[i].nazwa === currentFile) {
      historia[i].translatorData = lines;
      break;
    }
  }
}

function renderTranslatorLoading() {
  var body = document.getElementById('translator-body');
  if (!body) return;
  body.innerHTML = '<div class="translator-loading">⏳ Tłumaczę kod...</div>';
}

function renderTranslatorError() {
  var body = document.getElementById('translator-body');
  if (!body) return;
  body.innerHTML = '<div class="translator-error">❌ Nie można połączyć się z backendem. Upewnij się że serwer działa na porcie 8000.</div>';
}

function renderTranslatorFootnotes() {
  var body = document.getElementById('translator-body');
  if (!body || !translatorData) return;

  translatorWandMode = false;
  updateWandBtn();

  var html = '';
  CODE_LINES.forEach(function(line, idx) {
    var lineNum = String(idx + 1);
    var codeText = stripHtml(line.code);
    var translation = translatorData[lineNum] || '';

    html += '<div class="tr-line-block">';
    html += '<div class="tr-code-line"><span class="tr-line-num">' + lineNum + '</span><span class="tr-code-text">' + escHtml(codeText) + '</span></div>';
    if (translation) {
      html += '<div class="tr-translation">↳ ' + escHtml(translation) + '</div>';
    }
    html += '</div>';
  });

  body.innerHTML = html;
}

function renderTranslatorWand() {
  var body = document.getElementById('translator-body');
  if (!body || !translatorData) return;

  translatorWandMode = true;
  updateWandBtn();

  var paragraphs = [];
  CODE_LINES.forEach(function(_, idx) {
    var lineNum = String(idx + 1);
    var translation = translatorData[lineNum];
    if (translation && translation.trim()) {
      paragraphs.push(translation.trim());
    }
  });

  body.innerHTML = '<div class="tr-wand-text">' + escHtml(paragraphs.join(' ')) + '</div>';
}

function toggleWand() {
  if (!translatorData) return;
  if (translatorWandMode) {
    renderTranslatorFootnotes();
  } else {
    renderTranslatorWand();
  }
}

function updateWandBtn() {
  var btn = document.getElementById('translator-wand-btn');
  if (!btn) return;
  btn.title = translatorWandMode ? 'Wróć do przypisów' : 'Scal w tekst';
  btn.style.opacity = translatorWandMode ? '0.5' : '1';
}

// Otwiera tłumacz z danymi z historii (bez wywołania LLM)
function openTranslatorFromHistoria(lines) {
  translatorData = lines;
  translatorCodeSnapshot = null; // nie wiemy jaki to kod — wymusi re-fetch przy zmianie
  translatorWandMode = false;

  var drawer = document.getElementById('translator-drawer');
  if (drawer) {
    translatorOpen = true;
    drawer.classList.add('open');
  }
  renderTranslatorFootnotes();
}

function stripHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

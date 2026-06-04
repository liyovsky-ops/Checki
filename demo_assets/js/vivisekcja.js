var vivisekcjaOpen = false;
var vivisekcjaCache = null;
var vivisekcjaCodeSnapshot = null;

function openVivisekcja() {
  var panel = document.getElementById('vivisekcja-panel');
  if (!panel) return;

  vivisekcjaOpen = true;
  panel.classList.add('open');

  var currentCode = getOriginalCodeText();

  if (vivisekcjaCache && vivisekcjaCodeSnapshot === currentCode) {
    return; // już mamy — nic nie rób
  }

  vivisekcjaCache = null;
  vivisekcjaCodeSnapshot = null;
  renderVivisekcjaLoading();
  fetchVivisekcja(currentCode);
}

function closeVivisekcja() {
  var panel = document.getElementById('vivisekcja-panel');
  if (!panel) return;
  vivisekcjaOpen = false;
  panel.classList.remove('open');
}

function fetchVivisekcja(code) {
  fetch('http://localhost:8000/vivisekcja/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    vivisekcjaCache = data.markdown;
    vivisekcjaCodeSnapshot = code;
    renderVivisekcjaContent(data.markdown);
  })
  .catch(function() {
    renderVivisekcjaError();
  });
}

function renderVivisekcjaLoading() {
  var body = document.getElementById('vivisekcja-body');
  if (!body) return;
  body.innerHTML = '<div class="viv-loading">⏳ Analizuję kod krok po kroku...</div>';
}

function renderVivisekcjaError() {
  var body = document.getElementById('vivisekcja-body');
  if (!body) return;
  body.innerHTML = '<div class="viv-error">❌ Nie można połączyć się z backendem. Upewnij się że serwer działa na porcie 8000.</div>';
}

function renderVivisekcjaContent(markdown) {
  var body = document.getElementById('vivisekcja-body');
  if (!body) return;
  body.innerHTML = markdownToHtml(markdown);
}

// Prosty renderer Markdown → HTML (obsługuje nagłówki, tabele, code blocks, bold, italic)
function markdownToHtml(md) {
  var lines = md.split('\n');
  var html = '';
  var inTable = false;
  var inCode = false;
  var codeBuffer = '';
  var tableBuffer = [];

  function flushTable() {
    if (tableBuffer.length < 2) { inTable = false; tableBuffer = []; return; }
    var out = '<table class="viv-table">';
    tableBuffer.forEach(function(row, idx) {
      var cells = row.split('|').map(function(c) { return c.trim(); }).filter(function(c) { return c; });
      if (idx === 1) return; // separator row ---
      var tag = idx === 0 ? 'th' : 'td';
      out += '<tr>' + cells.map(function(c) { return '<' + tag + '>' + inlineFormat(c) + '</' + tag + '>'; }).join('') + '</tr>';
    });
    out += '</table>';
    html += out;
    inTable = false;
    tableBuffer = [];
  }

  lines.forEach(function(line) {
    // Code block
    if (line.startsWith('```')) {
      if (inCode) {
        html += '<pre class="viv-code"><code>' + escViv(codeBuffer.trim()) + '</code></pre>';
        codeBuffer = '';
        inCode = false;
      } else {
        if (inTable) flushTable();
        inCode = true;
      }
      return;
    }
    if (inCode) { codeBuffer += line + '\n'; return; }

    // Table
    if (line.trim().startsWith('|')) {
      if (!inTable) inTable = true;
      tableBuffer.push(line.trim());
      return;
    } else if (inTable) {
      flushTable();
    }

    // Nagłówki
    if (line.startsWith('### ')) { html += '<h3 class="viv-h3">' + inlineFormat(line.slice(4)) + '</h3>'; return; }
    if (line.startsWith('## '))  { html += '<h2 class="viv-h2">' + inlineFormat(line.slice(3)) + '</h2>'; return; }
    if (line.startsWith('# '))   { html += '<h1 class="viv-h1">' + inlineFormat(line.slice(2)) + '</h1>'; return; }

    // Separatory
    if (line.trim() === '---') { html += '<hr class="viv-hr">'; return; }

    // Puste linie
    if (line.trim() === '') { html += '<div class="viv-gap"></div>'; return; }

    // Zwykły paragraf
    html += '<p class="viv-p">' + inlineFormat(line) + '</p>';
  });

  if (inTable) flushTable();
  return html;
}

function inlineFormat(text) {
  return text
    .replace(/`([^`]+)`/g, '<code class="viv-inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function escViv(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

import { vivisekcjaState, historia } from './state.js';

let _getOriginalCodeText = () => '';
let _saveHistoria = () => {};

export function initVivisekcja(deps) {
  _getOriginalCodeText = deps.getOriginalCodeText;
  _saveHistoria        = deps.saveHistoria;
}

export function openVivisekcja() {
  const panel = document.getElementById('vivisekcja-panel');
  if (!panel) return;
  panel.classList.add('open');
  const currentCode = _getOriginalCodeText();
  if (vivisekcjaState.cache) {
    vivisekcjaState.snapshot = currentCode;
    renderVivisekcjaContent(vivisekcjaState.cache);
    return;
  }
  vivisekcjaState.cache = null;
  vivisekcjaState.snapshot = null;
  renderVivisekcjaLoading();
  fetchVivisekcja(currentCode);
}

export function closeVivisekcja() {
  const panel = document.getElementById('vivisekcja-panel');
  if (panel) panel.classList.remove('open');
}

function fetchVivisekcja(code) {
  fetch('http://localhost:8000/vivisekcja/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      vivisekcjaState.cache    = data.markdown;
      vivisekcjaState.snapshot = code;
      renderVivisekcjaContent(data.markdown);
      if (historia.length > 0) {
        historia[0].vivisekcjaData = data.markdown;
        const firstLine = data.markdown.split('\n').find(l => l.trim() && !l.startsWith('#')) || '';
        if (firstLine) historia[0].opis = firstLine.replace(/\*\*/g, '').trim();
        _saveHistoria();
      }
    })
    .catch(renderVivisekcjaError);
}

function renderVivisekcjaLoading() {
  const body = document.getElementById('vivisekcja-body');
  if (body) body.innerHTML = '<div class="viv-loading">⏳ Analizuję kod krok po kroku...</div>';
}

function renderVivisekcjaError() {
  const body = document.getElementById('vivisekcja-body');
  if (body) body.innerHTML = '<div class="viv-error">❌ Nie można połączyć się z backendem. Upewnij się że serwer działa na porcie 8000.</div>';
}

function renderVivisekcjaContent(markdown) {
  const body = document.getElementById('vivisekcja-body');
  if (body) body.innerHTML = markdownToHtml(markdown);
}

function markdownToHtml(md) {
  const lines = md.split('\n');
  let html = '', inTable = false, inCode = false, codeBuffer = '', tableBuffer = [];

  function flushTable() {
    if (tableBuffer.length < 2) { inTable = false; tableBuffer = []; return; }
    let out = '<table class="viv-table">';
    tableBuffer.forEach(function(row, idx) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      if (idx === 1) return;
      const tag = idx === 0 ? 'th' : 'td';
      out += '<tr>' + cells.map(c => '<' + tag + '>' + inlineFormat(c) + '</' + tag + '>').join('') + '</tr>';
    });
    html += out + '</table>';
    inTable = false; tableBuffer = [];
  }

  lines.forEach(function(line) {
    if (line.startsWith('```')) {
      if (inCode) { html += '<pre class="viv-code"><code>' + escViv(codeBuffer.trim()) + '</code></pre>'; codeBuffer = ''; inCode = false; }
      else { if (inTable) flushTable(); inCode = true; }
      return;
    }
    if (inCode) { codeBuffer += line + '\n'; return; }
    if (line.trim().startsWith('|')) { if (!inTable) inTable = true; tableBuffer.push(line.trim()); return; }
    else if (inTable) flushTable();
    if (line.startsWith('### ')) { html += '<h3 class="viv-h3">' + inlineFormat(line.slice(4)) + '</h3>'; return; }
    if (line.startsWith('## '))  { html += '<h2 class="viv-h2">' + inlineFormat(line.slice(3)) + '</h2>'; return; }
    if (line.startsWith('# '))   { html += '<h1 class="viv-h1">' + inlineFormat(line.slice(2)) + '</h1>'; return; }
    if (line.trim() === '---')   { html += '<hr class="viv-hr">'; return; }
    if (line.trim() === '')      { html += '<div class="viv-gap"></div>'; return; }
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

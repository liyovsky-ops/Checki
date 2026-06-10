import { translatorState } from './state.js';

let _getOriginalCodeText = () => '';
let _addToHistoria = () => {};

export function initTranslator(deps) {
  _getOriginalCodeText = deps.getOriginalCodeText;
  _addToHistoria       = deps.addToHistoria;
}

let translatorOpen     = false;
let translatorWandMode = false;

export function openTranslator() {
  const drawer = document.getElementById('translator-drawer');
  if (!drawer) return;
  translatorOpen = true;
  drawer.classList.add('open');
  const currentCode = _getOriginalCodeText();
  if (translatorState.data) {
    translatorState.snapshot = currentCode;
    translatorWandMode ? renderTranslatorWand() : renderTranslatorFootnotes();
    return;
  }
  if (translatorState.cache[currentCode]) {
    translatorState.data     = translatorState.cache[currentCode];
    translatorState.snapshot = currentCode;
    translatorWandMode = false;
    renderTranslatorFootnotes();
    return;
  }
  translatorState.data = null;
  translatorState.snapshot = null;
  translatorWandMode = false;
  renderTranslatorLoading();
  fetchTranslation(currentCode);
}

export function closeTranslator() {
  const drawer = document.getElementById('translator-drawer');
  if (!drawer) return;
  translatorOpen = false;
  drawer.classList.remove('open');
}

function fetchTranslation(code) {
  fetch('http://localhost:8000/translator/explain-lines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      translatorState.data = data.lines;
      translatorState.snapshot = code;
      translatorState.cache[code] = data.lines;
      saveTranslationToHistoria(data.lines);
      renderTranslatorFootnotes();
    })
    .catch(renderTranslatorError);
}

function saveTranslationToHistoria(lines) {
  // Historia is updated via the shared state — prefetch handles this
  // Here we just update translatorState, historia will pick it up
}

function renderTranslatorLoading() {
  const body = document.getElementById('translator-body');
  if (body) body.innerHTML = '<div style="color:#94a3b8;font-size:12px;padding:16px;text-align:center;">⏳ Tłumaczę kod...</div>';
}

function renderTranslatorError() {
  const body = document.getElementById('translator-body');
  if (body) body.innerHTML = '<div style="color:#ef4444;font-size:12px;padding:16px;">❌ Błąd połączenia z backendem.</div>';
}

function renderTranslatorFootnotes() {
  const body = document.getElementById('translator-body');
  if (!body || !translatorState.data) return;
  body.innerHTML = translatorState.data.map(function(line, i) {
    return '<div style="padding:8px 0;border-bottom:1px solid #1a1d2e;">' +
      '<div style="display:flex;gap:8px;align-items:baseline;">' +
      '<span style="font-size:11px;color:#4a5568;min-width:20px">' + (i + 1) + '</span>' +
      '<code style="font-size:11px;color:#98c379;flex:1;word-break:break-all">' + escHtml(line.code || '') + '</code>' +
      '</div>' +
      (line.tip ? '<div style="font-size:12px;color:#c8d0e0;margin-top:4px;margin-left:28px;line-height:1.5">' + line.tip + '</div>' : '') +
      '</div>';
  }).join('');
}

function renderTranslatorWand() {
  const body = document.getElementById('translator-body');
  if (!body || !translatorState.data) return;
  body.innerHTML = '<div style="font-size:13px;color:#c8d0e0;line-height:1.8;padding:8px 0;">' +
    translatorState.data.filter(l => l.tip).map(l => '<p style="margin:0 0 8px">' + l.tip + '</p>').join('') +
    '</div>';
}

export function toggleWand() {
  translatorWandMode = !translatorWandMode;
  updateWandBtn();
  if (translatorState.data) translatorWandMode ? renderTranslatorWand() : renderTranslatorFootnotes();
}

function updateWandBtn() {
  const btn = document.querySelector('.translator-wand-btn');
  if (btn) {
    btn.style.opacity = translatorWandMode ? '1' : '0.5';
    btn.title = translatorWandMode ? 'Wróć do footnotes' : 'Scal w tekst';
  }
}

export function openTranslatorFromHistoria(lines) {
  if (!lines) return;
  translatorState.data = lines;
  translatorState.snapshot = null;
  translatorWandMode = false;
  const drawer = document.getElementById('translator-drawer');
  if (drawer) { translatorOpen = true; drawer.classList.add('open'); }
  renderTranslatorFootnotes();
}

function stripHtml(html) { return html.replace(/<[^>]+>/g, ''); }

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

import { CODE_LINES } from './state.js';

let currentMode = null;

const MODE_LABELS = {
  eco: '🌿 Eco', comfort: '☕ Comfort', sport: '🏎️ Sport',
  enterprise: '🏢 Enterprise', security: '🔒 Security',
};

export function selectMode(mode) {
  if (currentMode === mode) { deactivateMode(); return; }
  if (currentMode) document.body.classList.remove('mode-' + currentMode);
  currentMode = mode;
  document.body.classList.add('mode-' + mode);
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector('.mode-btn[data-mode="' + mode + '"]');
  if (activeBtn) activeBtn.classList.add('active');
  const tabs = document.getElementById('editor-mode-tabs');
  if (tabs) {
    tabs.style.display = 'flex';
    const rewrittenBtn = document.getElementById('tab-rewritten-btn');
    if (rewrittenBtn) rewrittenBtn.textContent = '✨ ' + MODE_LABELS[mode];
  }
  switchEditorTab('original', document.getElementById('tab-original-btn'));
  const rewrittenEditor = document.getElementById('editor-rewritten');
  if (rewrittenEditor) rewrittenEditor.innerHTML = '<div style="color:#4a5568;font-size:12px;">Kliknij "▶ Analizuj" aby przepisać kod w trybie ' + MODE_LABELS[mode] + '...</div>';
  setStatusbarMode(MODE_LABELS[mode]);
}

export function deactivateMode() {
  if (currentMode) document.body.classList.remove('mode-' + currentMode);
  currentMode = null;
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const tabs = document.getElementById('editor-mode-tabs');
  if (tabs) tabs.style.display = 'none';
  const orig = document.getElementById('editor');
  const rewr = document.getElementById('editor-rewritten');
  if (orig) orig.style.display = '';
  if (rewr) rewr.style.display = 'none';
  const modeSpan = document.getElementById('statusbar-mode');
  if (modeSpan) modeSpan.remove();
}

export function switchEditorTab(tab, clickedBtn) {
  document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');
  const orig = document.getElementById('editor');
  const rewr = document.getElementById('editor-rewritten');
  if (tab === 'original') { if (orig) orig.style.display = ''; if (rewr) rewr.style.display = 'none'; }
  else                    { if (orig) orig.style.display = 'none'; if (rewr) rewr.style.display = ''; }
}

export function getOriginalCodeText() {
  return CODE_LINES.map(function(line) {
    const div = document.createElement('div');
    div.innerHTML = line.code;
    return div.textContent || div.innerText || '';
  }).join('\n');
}

export function handleAnalizuj() {
  if (!currentMode) return;
  const rewrittenEditor = document.getElementById('editor-rewritten');
  if (!rewrittenEditor) return;
  switchEditorTab('rewritten', document.getElementById('tab-rewritten-btn'));
  rewrittenEditor.innerHTML = '<div style="color:#94a3b8;font-size:12px;">⏳ Przepisuję kod w trybie ' + MODE_LABELS[currentMode] + '...</div>';
  fetch('http://localhost:8000/programming-mode/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: getOriginalCodeText(), mode: currentMode }),
  })
    .then(r => r.json())
    .then(data => {
      rewrittenEditor.innerHTML = '';
      const pre = document.createElement('pre');
      Object.assign(pre.style, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: '#e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.6', margin: '0' });
      pre.textContent = data.rewritten_code;
      rewrittenEditor.appendChild(pre);
    })
    .catch(() => {
      rewrittenEditor.innerHTML = '<div style="color:#ef4444;font-size:12px;">❌ Nie można połączyć się z backendem.</div>';
    });
}

function setStatusbarMode(label) {
  const statusbar = document.querySelector('.statusbar');
  if (!statusbar) return;
  let modeSpan = document.getElementById('statusbar-mode');
  if (!modeSpan) { modeSpan = document.createElement('span'); modeSpan.id = 'statusbar-mode'; statusbar.insertBefore(modeSpan, statusbar.firstChild); }
  modeSpan.textContent = 'Tryb: ' + label;
}

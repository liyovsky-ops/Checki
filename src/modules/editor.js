import { CODE_LINES, translatorState } from './state.js';

// Callbacks injected by main.js to avoid circular imports
let _addToHistoria = () => {};
let _resetDeadCode = () => {};
let _resetBadPatterns = () => {};
let _prefetchAll = () => {};

export function initEditor(deps) {
  _addToHistoria  = deps.addToHistoria;
  _resetDeadCode  = deps.resetDeadCode;
  _resetBadPatterns = deps.resetBadPatterns;
  _prefetchAll    = deps.prefetchAll;
}

export function getOriginalCodeText() {
  return CODE_LINES.map(l => l.code.replace(/<[^>]+>/g, '')).join('\n');
}

export function renderEditor() {
  const editor = document.getElementById('editor');
  editor.innerHTML = '';
  CODE_LINES.forEach(function(line, i) {
    const div = document.createElement('div');
    div.className = 'code-line' + (line.dead ? ' dead' : '') + (line.warn ? ' warn-line' : '');
    const numSpan = document.createElement('span');
    numSpan.className = 'line-num';
    numSpan.textContent = i + 1;
    const contentSpan = document.createElement('span');
    contentSpan.className = 'line-content';
    contentSpan.innerHTML = line.code;
    div.appendChild(numSpan);
    div.appendChild(contentSpan);
    if (line.tip) {
      const btn = document.createElement('button');
      btn.className = 'question-btn';
      btn.innerHTML = '?<div class="tooltip"><div class="tooltip-label">Co robi ta linia?</div>' + line.tip + '</div>';
      div.appendChild(btn);
    }
    editor.appendChild(div);
  });
}

const PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g;

export function highlightLine(raw, ext) {
  let s = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (ext === 'py' || ext === 'python') {
    s = s.replace(/(#.*)$/, '<span class="cm">$1</span>');
    s = s.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>');
    s = s.replace(/(@\w+)/g, '<span class="op">$1</span>');
    s = s.replace(PY_KEYWORDS, '<span class="kw">$1</span>');
    s = s.replace(/\b(\w+)(?=\s*\()/g, '<span class="fn">$1</span>');
    s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="str">$1</span>');
    s = s.replace(/(__\w+__)/g, '<span class="var">$1</span>');
  }
  return s;
}

export function handleFileUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();
  reader.onload = function(e) {
    const text  = e.target.result;
    const lines = text.split('\n');
    CODE_LINES.length = 0;
    lines.forEach(line => CODE_LINES.push({ code: highlightLine(line, ext), tip: null }));
    const fileTab = document.querySelector('.file-tab');
    if (fileTab) fileTab.textContent = '📄 ' + file.name;
    translatorState.data = null;
    translatorState.snapshot = null;
    _resetDeadCode();
    _resetBadPatterns();
    renderEditor();
    input.value = '';
    _addToHistoria(file.name, lines.length, text);
    const code = getOriginalCodeText();
    _prefetchAll(code, file.name);
    analyzeCodeForTooltips(text);
  };
  reader.readAsText(file);
}

export function analyzeCodeForTooltips(code) {
  fetch('http://localhost:8000/line-tooltip/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(r => r.json())
    .then(data => {
      CODE_LINES.forEach(function(line, idx) {
        const block = findBlock(data.blocks, idx + 1);
        if (block) line.tip = '<strong>' + block.blok + '</strong><br>' + block.wyjasnienie;
      });
      renderEditor();
    })
    .catch(() => {});
}

export function findBlock(blocks, lineNum) {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].start <= lineNum && lineNum <= blocks[i].end) return blocks[i];
  }
  return null;
}

export function escHtmlEditor(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Initial CODE_LINES from demo
CODE_LINES.push(
  { code: '<span class="kw">from</span> flask <span class="kw">import</span> Flask, jsonify', tip: 'Importujemy Flask — bibliotekę do budowania serwerów webowych, oraz jsonify — funkcję która zamienia dane Pythona na format JSON.' },
  { code: '<span class="kw">import</span> sqlite3', tip: 'Importujemy sqlite3 — wbudowaną bibliotekę Pythona do obsługi bazy danych SQLite.' },
  { code: '', tip: null },
  { code: 'DB_PASSWORD = <span class="str">"haslo123"</span>  <span class="cm"># ⚠️ hardcoded!</span>', tip: "PROBLEM: Hasło jest wpisane bezpośrednio w kodzie. Użyj: os.environ.get('DB_PASSWORD')", warn: true },
  { code: 'app = Flask(<span class="var">__name__</span>)', tip: 'Tworzymy instancję aplikacji Flask.' },
  { code: '', tip: null },
  { code: '<span class="kw">def</span> <span class="fn">get_db_connection</span>():', tip: 'Definiujemy funkcję która tworzy połączenie z bazą danych.' },
  { code: "    conn = sqlite3.<span class=\"fn\">connect</span>(<span class=\"str\">'users.db'</span>)", tip: "Otwieramy plik bazy danych o nazwie 'users.db'." },
  { code: '    conn.row_factory = sqlite3.Row', tip: 'Ustawiamy sposób zwracania wyników — obiekty zamiast krotek.' },
  { code: '    <span class="kw">return</span> conn', tip: 'Zwracamy połączenie z bazą danych.' },
  { code: '', tip: null },
  { code: "<span class=\"op\">@</span>app.<span class=\"fn\">route</span>(<span class=\"str\">'/users'</span>)", tip: 'Dekorator — Flask wywoła tę funkcję gdy przyjdzie żądanie na /users.' },
  { code: '<span class="kw">def</span> <span class="fn">get_users</span>():', tip: 'Definiujemy funkcję obsługującą endpoint /users.' },
  { code: '    conn = <span class="fn">get_db_connection</span>()', tip: 'Otwieramy połączenie z bazą danych.' },
  { code: "    users = conn.<span class=\"fn\">execute</span>(<span class=\"str\">'SELECT * FROM users'</span>).<span class=\"fn\">fetchall</span>()", tip: 'Pobieramy wszystkich użytkowników z tabeli.' },
  { code: '    <span class="kw">return</span> <span class="fn">jsonify</span>([<span class="fn">dict</span>(u) <span class="kw">for</span> u <span class="kw">in</span> users])', tip: 'Zwracamy JSON z listą użytkowników.' },
  { code: '', tip: null },
  { code: '<span class="cm"># === STARY KOD — nigdy nie wywoływany ===</span>', tip: 'To jest komentarz — Python go ignoruje.', dead: true },
  { code: '<span class="kw">def</span> <span class="fn">old_get_users</span>():  <span class="cm"># 💀 martwy kod</span>', tip: 'PROBLEM: Ta funkcja nigdy nie jest wywoływana. Martwy kod — można usunąć.', dead: true },
  { code: '    <span class="kw">return</span> []', tip: 'Zwraca pustą listę. Martwy kod.', dead: true },
  { code: '', tip: null },
  { code: '<span class="kw">if</span> <span class="var">__name__</span> == <span class="str">"__main__"</span>:', tip: 'Ten blok wykona się tylko gdy uruchomisz plik bezpośrednio.' },
  { code: '    app.<span class="fn">run</span>(debug=<span class="kw">True</span>)', tip: 'Uruchamiamy serwer Flask w trybie debug.' }
);

document.addEventListener('DOMContentLoaded', renderEditor);

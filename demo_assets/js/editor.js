// Renderowanie edytora kodu z numerami linii i tooltipami przy każdej linii

var CODE_LINES = [
  { code: '<span class="kw">from</span> flask <span class="kw">import</span> Flask, jsonify', tip: "Importujemy Flask — bibliotekę do budowania serwerów webowych, oraz jsonify — funkcję która zamienia dane Pythona na format JSON." },
  { code: '<span class="kw">import</span> sqlite3', tip: "Importujemy sqlite3 — wbudowaną bibliotekę Pythona do obsługi bazy danych SQLite." },
  { code: '', tip: null },
  { code: 'DB_PASSWORD = <span class="str">"haslo123"</span>  <span class="cm"># ⚠️ hardcoded!</span>', tip: "PROBLEM: Hasło jest wpisane bezpośrednio w kodzie. Jeśli ktoś zobaczy ten plik, zobaczy hasło. Lepiej użyć: os.environ.get('DB_PASSWORD')", warn: true },
  { code: 'app = Flask(<span class="var">__name__</span>)', tip: "Tworzymy instancję aplikacji Flask. __name__ mówi Flaskowi jaki jest główny plik aplikacji." },
  { code: '', tip: null },
  { code: '<span class="kw">def</span> <span class="fn">get_db_connection</span>():', tip: "Definiujemy funkcję która tworzy połączenie z bazą danych. Słowo 'def' zaczyna definicję funkcji." },
  { code: '    conn = sqlite3.<span class="fn">connect</span>(<span class="str">\'users.db\'</span>)', tip: "Otwieramy plik bazy danych o nazwie 'users.db'. Jeśli plik nie istnieje, SQLite go utworzy." },
  { code: '    conn.row_factory = sqlite3.Row', tip: "Ustawiamy sposób zwracania wyników — zamiast krotek (tupli) dostajemy obiekty które można czytać po nazwie kolumny, np. row['name']." },
  { code: '    <span class="kw">return</span> conn', tip: "Zwracamy połączenie z bazą danych do miejsca gdzie funkcja została wywołana." },
  { code: '', tip: null },
  { code: '<span class="op">@</span>app.<span class="fn">route</span>(<span class="str">\'/users\'</span>)', tip: "Dekorator — mówi Flaskowi że funkcja poniżej ma obsługiwać adres URL /users. Gdy ktoś wejdzie na /users, Flask wywoła tę funkcję." },
  { code: '<span class="kw">def</span> <span class="fn">get_users</span>():', tip: "Definiujemy funkcję obsługującą endpoint /users. Flask wywoła ją automatycznie gdy przyjdzie żądanie GET." },
  { code: '    conn = <span class="fn">get_db_connection</span>()', tip: "Wywołujemy funkcję z linii 7 — otwieramy połączenie z bazą danych." },
  { code: '    users = conn.<span class="fn">execute</span>(<span class="str">\'SELECT * FROM users\'</span>).<span class="fn">fetchall</span>()', tip: "Wykonujemy zapytanie SQL które pobiera wszystkich użytkowników z tabeli 'users'. fetchall() zwraca wszystkie wyniki naraz." },
  { code: '    <span class="kw">return</span> <span class="fn">jsonify</span>([<span class="fn">dict</span>(u) <span class="kw">for</span> u <span class="kw">in</span> users])', tip: "Zamieniamy każdego użytkownika na słownik (dict), potem całą listę na JSON i wysyłamy jako odpowiedź HTTP." },
  { code: '', tip: null },
  { code: '<span class="cm"># === STARY KOD — nigdy nie wywoływany ===</span>', tip: "To jest komentarz — Python go ignoruje. Służy jako notatka dla programisty.", dead: true },
  { code: '<span class="kw">def</span> <span class="fn">old_get_users</span>():  <span class="cm"># 💀 martwy kod</span>', tip: "PROBLEM: Ta funkcja nigdy nie jest wywoływana nigdzie w kodzie. To 'martwy kod' — można ją bezpiecznie usunąć.", dead: true },
  { code: '    <span class="kw">return</span> []', tip: "Zwraca pustą listę. Ta linia jest martwa — nigdy się nie wykona bo funkcja nie jest wywoływana.", dead: true },
  { code: '', tip: null },
  { code: '<span class="kw">if</span> <span class="var">__name__</span> == <span class="str">"__main__"</span>:', tip: "Ten blok wykonuje się tylko gdy uruchomisz ten plik bezpośrednio (python app.py). Nie wykona się gdy inny plik zaimportuje ten moduł." },
  { code: '    app.<span class="fn">run</span>(debug=<span class="kw">True</span>)', tip: "Uruchamiamy serwer Flask. debug=True oznacza że serwer automatycznie restartuje się gdy zmienisz kod — wygodne podczas tworzenia." },
];

function renderEditor() {
  var editor = document.getElementById('editor');
  editor.innerHTML = '';

  CODE_LINES.forEach(function(line, i) {
    var div = document.createElement('div');
    div.className = 'code-line' + (line.dead ? ' dead' : '') + (line.warn ? ' warn-line' : '');

    var numSpan = document.createElement('span');
    numSpan.className = 'line-num';
    numSpan.textContent = i + 1;

    var contentSpan = document.createElement('span');
    contentSpan.className = 'line-content';
    contentSpan.innerHTML = line.code;

    div.appendChild(numSpan);
    div.appendChild(contentSpan);

    if (line.tip) {
      var btn = document.createElement('button');
      btn.className = 'question-btn';
      btn.innerHTML = '?<div class="tooltip"><div class="tooltip-label">Co robi ta linia?</div>' + line.tip + '</div>';
      div.appendChild(btn);
    }

    editor.appendChild(div);
  });
}

var PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g;

function highlightLine(raw, ext) {
  // Escape HTML najpierw
  var s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (ext === 'py' || ext === 'python') {
    // Komentarz — wszystko od # do końca (musi być pierwsze żeby nie tokenizować wnętrza)
    s = s.replace(/(#.*)$/, '<span class="cm">$1</span>');

    // Stringi — triple i single quote (tylko jeśli nie w komentarzu)
    s = s.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, function(m) {
      // Nie highlightuj jeśli już wewnątrz spana
      return '<span class="str">' + m + '</span>';
    });

    // Dekoratory
    s = s.replace(/(@\w+)/g, '<span class="op">$1</span>');

    // Słowa kluczowe (tylko poza spanami)
    s = s.replace(PY_KEYWORDS, function(m) {
      return '<span class="kw">' + m + '</span>';
    });

    // Nazwy funkcji — słowo przed (
    s = s.replace(/\b(\w+)(?=\s*\()/g, function(m, name) {
      // Nie owijaj jeśli już jest wewnątrz spana (uproszczone sprawdzenie)
      return '<span class="fn">' + name + '</span>';
    });

    // Liczby
    s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="str">$1</span>');

    // Zmienne specjalne (__name__, __main__ itp.)
    s = s.replace(/(__\w+__)/g, '<span class="var">$1</span>');
  }

  return s;
}

function handleFileUpload(input) {
  var file = input.files[0];
  if (!file) return;

  var ext = file.name.split('.').pop().toLowerCase();

  var reader = new FileReader();
  reader.onload = function(e) {
    var text = e.target.result;
    var lines = text.split('\n');

    CODE_LINES.length = 0;
    lines.forEach(function(line) {
      CODE_LINES.push({ code: highlightLine(line, ext), tip: null });
    });

    // Zaktualizuj nazwę pliku w zakładce
    var fileTab = document.querySelector('.file-tab');
    if (fileTab) fileTab.textContent = '📄 ' + file.name;

    // Wyczyść cache tłumaczenia — nowy plik
    if (typeof translatorData !== 'undefined') {
      translatorData = null;
      translatorCodeSnapshot = null;
    }

    // Wyczyść dead code i bad patterns — nowy plik
    if (typeof resetDeadCode === 'function') resetDeadCode();
    if (typeof resetBadPatterns === 'function') resetBadPatterns();

    renderEditor();
    input.value = '';

    // Dodaj do historii (z kodem)
    addToHistoria(file.name, lines.length, text);

    // Pobierz opisy linii z backendu i dodaj przyciski ?
    analyzeCodeForTooltips(text);
  };
  reader.readAsText(file);
}

function analyzeCodeForTooltips(code) {
  fetch('http://localhost:8000/line-tooltip/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    var blocks = data.blocks;

    // Przypisz tip do każdej linii na podstawie bloku
    CODE_LINES.forEach(function(line, idx) {
      var lineNum = idx + 1;
      var block = findBlock(blocks, lineNum);
      if (block) {
        line.tip = '<strong>' + block.blok + '</strong><br>' + block.wyjasnienie;
      }
    });

    renderEditor();
  })
  .catch(function() {
    // Brak backendu — zostają linie bez tooltipów, nic się nie psuje
  });
}

function findBlock(blocks, lineNum) {
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].start <= lineNum && lineNum <= blocks[i].end) {
      return blocks[i];
    }
  }
  return null;
}

function escHtmlEditor(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', function() {
  renderEditor();
});


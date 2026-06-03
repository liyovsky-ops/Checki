// Renderowanie edytora kodu z numerami linii i tooltipami przy każdej linii

const CODE_LINES = [
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

document.addEventListener('DOMContentLoaded', function() {
  const editor = document.getElementById('editor');

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
});
